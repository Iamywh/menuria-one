from flask import Flask, request, jsonify, send_from_directory, redirect, render_template
from flask_cors import CORS
import os
import json
import datetime
# --- aggiunte ---
import threading  # se non è già importato sopra


BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(
    __name__,
    static_folder=os.path.join(BASE_DIR, "static"),
    template_folder=os.path.join(BASE_DIR, "templates")
)
app.url_map.strict_slashes = False   # 👉 /home e /home/ sono equivalenti
CORS(app)

TAKEAWAY_DIR = os.path.join(BASE_DIR, 'takeaway')
os.makedirs(TAKEAWAY_DIR, exist_ok=True)

USERS_FILE = os.path.join(TAKEAWAY_DIR, 'UserDatabase.json')
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w', encoding='utf-8') as f:
        json.dump({"version": 1, "users": []}, f, ensure_ascii=False, indent=2)

USERS_LOCK = threading.Lock()


# === Percorsi dati
DATA_DIR = os.path.join(BASE_DIR, 'data')
LANG_RESPONSES_DIR = os.path.join(DATA_DIR, 'lang_responses')
COUNT_FILE = os.path.join(DATA_DIR, 'visitor_count.txt')
RATING_FILE = os.path.join(DATA_DIR, 'rating_counts.json')
FEEDBACK_LOG = os.path.join(DATA_DIR, 'feedback.json')

# === Crea cartelle se mancano
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(LANG_RESPONSES_DIR, exist_ok=True)

# === Funzioni
def load_knowledge_bases():
    bases = {}
    if not os.path.exists(LANG_RESPONSES_DIR):
        return bases
    for filename in os.listdir(LANG_RESPONSES_DIR):
        if filename.endswith('.json'):
            lang_code = filename.replace("simulated_responses_menuria_", "").replace(".json", "")
            with open(os.path.join(LANG_RESPONSES_DIR, filename), 'r', encoding='utf-8') as f:
                bases[lang_code] = json.load(f)
    return bases

def get_fallback(lang):
    fallback = {
        "es": "Lo siento, no tengo una respuesta para eso.",
        "en": "Sorry, I don't have an answer for that.",
        "it": "Mi dispiace, non ho una risposta per questo.",
        "fr": "Désolé, je n’ai pas de réponse à cela.",
        "de": "Es tut mir leid, ich habe keine Antwort darauf.",
        "pt": "Desculpe, não tenho uma resposta para isso.",
        "ru": "Извините, у меня нет ответа на это."
    }
    return fallback.get(lang, fallback["en"])

# === Carica knowledge base
KNOWLEDGE_BASES = load_knowledge_bases()

# === Inizializza file dati
if not os.path.exists(COUNT_FILE):
    with open(COUNT_FILE, 'w') as f:
        f.write('0')

if not os.path.exists(RATING_FILE):
    with open(RATING_FILE, 'w') as f:
        json.dump({'happy': 0, 'neutral': 0, 'sad': 0}, f)

if not os.path.exists(FEEDBACK_LOG):
    with open(FEEDBACK_LOG, 'w') as f:
        f.write('[]')

# === Rotte principali statiche
@app.route('/')
def root():
    return redirect('/home')

@app.route('/gallery')
def gallery():
    return send_from_directory('gallery', 'index.html')

@app.route('/menus')
def menus():
    return send_from_directory('menus', 'index.html')

@app.route('/restaurant')
def restaurant():
    return send_from_directory('restaurant', 'index.html')

@app.route('/bookings')
def bookings():
    return render_template('bookings.html')

@app.route('/takeaway')
def takeaway():
    return send_from_directory('takeaway', 'index.html')

# ✅ Rotta generica: /home, /menus, /gallery, /restaurant
@app.route('/<section>')
@app.route('/<section>/')
def section_index(section):
    if section in ['home', 'restaurant', 'menus', 'gallery','bookings','takeaway']:
        return send_from_directory(section, 'index.html')
    return "Not found", 404

# === Rotte per servire CSS, JS, IMG da cartelle proprie
@app.route('/<folder>/<path:filename>')
def serve_static_folder_file(folder, filename):
    allowed = ['home', 'gallery', 'menus', 'restaurant', 'static', 'templates', 'takeaway']
    if folder in allowed:
        return send_from_directory(folder, filename)
    return "Accesso negato", 403

# === JSON lingua
@app.route('/data/lang.json')
def serve_lang_json():
    return send_from_directory(DATA_DIR, 'lang.json')

# === Contatore visitatori
@app.route('/data/visitor-count', methods=['GET'])
def serve_visitor_count():
    with open(COUNT_FILE, 'r+') as f:
        try:
            count = int(f.read())
        except ValueError:
            count = 0
        count += 1
        f.seek(0)
        f.write(str(count))
        f.truncate()
    return jsonify({'count': count})

# === Feedback emoji
@app.route('/rate', methods=['POST'])
def rate():
    data = request.get_json()
    rating = data.get('rating')
    lang = data.get('lang', 'unknown')
    timestamp = datetime.datetime.now().isoformat()

    if rating not in ['happy', 'neutral', 'sad']:
        return jsonify({'error': 'Invalid rating'}), 400

    with open(RATING_FILE, 'r+') as f:
        try:
            counts = json.load(f)
        except:
            counts = {'happy': 0, 'neutral': 0, 'sad': 0}
        counts[rating] += 1
        f.seek(0)
        json.dump(counts, f)
        f.truncate()

    entry = {
        'timestamp': timestamp,
        'rating': rating,
        'language': lang
    }

    try:
        with open(FEEDBACK_LOG, 'r+') as f:
            feedback = json.load(f)
            feedback.append(entry)
            f.seek(0)
            json.dump(feedback, f, indent=2)
            f.truncate()
    except:
        with open(FEEDBACK_LOG, 'w') as f:
            json.dump([entry], f, indent=2)

    return jsonify({'success': True})

# === Feedback commenti
@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    comment = data.get('comment', '').strip()
    lang = data.get('lang', 'unknown')
    url = data.get('url', '/')
    timestamp = datetime.datetime.now().isoformat()

    if not comment:
        return jsonify({'error': 'Empty comment'}), 400

    entry = {
        'timestamp': timestamp,
        'comment': comment,
        'language': lang,
        'url': url
    }

    try:
        with open(FEEDBACK_LOG, 'r+', encoding='utf-8') as f:
            feedback_list = json.load(f)
            feedback_list.append(entry)
            f.seek(0)
            json.dump(feedback_list, f, indent=2, ensure_ascii=False)
            f.truncate()
    except:
        with open(FEEDBACK_LOG, 'w', encoding='utf-8') as f:
            json.dump([entry], f, indent=2, ensure_ascii=False)

    return jsonify({'success': True})


# === Chat
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').strip().lower()
    lang = data.get('lang', 'es').lower()

    if not user_message:
        return jsonify({'response': get_fallback(lang)})

    knowledge = KNOWLEDGE_BASES.get(lang)
    if not knowledge:
        return jsonify({'response': "Idioma no soportado / Language not supported"}), 400

    for entry in knowledge.values():
        if entry['domanda'].lower() in user_message or user_message in entry['domanda'].lower():
            return jsonify({'response': entry['risposta']})

    return jsonify({'response': get_fallback(lang)})

# === Analytics
@app.route('/analytics')
def analytics():
    token = request.args.get('token')
    if token != 'menuria2025':
        return "Acceso no autorizado", 403

    with open(COUNT_FILE, 'r') as f:
        visitor_count = int(f.read())

    with open(RATING_FILE, 'r') as f:
        ratings = json.load(f)

    with open(FEEDBACK_LOG, 'r') as f:
        feedback_list = json.load(f)

    return render_template('analytics.html', visitors=visitor_count, ratings=ratings, feedback=feedback_list)

# =============== PRENOTAZIONI + TELEGRAM ======================
from urllib.parse import quote
import uuid, threading, time, re, requests

RESERVATIONS_FILE = os.path.join(DATA_DIR, 'reservations.json')
os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(RESERVATIONS_FILE):
    with open(RESERVATIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, ensure_ascii=False, indent=2)

LOCK = threading.Lock()
CLOSED_SLOTS = {"22:30"}   # cucina chiusa a quest’ora
MAX_GUESTS   = 20

def _load_reservations():
    with LOCK:
        with open(RESERVATIONS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)

def _save_reservations(rows):
    with LOCK:
        with open(RESERVATIONS_FILE, 'w', encoding='utf-8') as f:
            json.dump(rows, f, ensure_ascii=False, indent=2)

def _send_telegram(text):
    token = os.getenv("7597380720:AAFG45u2V6gM4ldoYmdAwzAgHodu8Ci7My4")  # metti in ENV
    chat  = os.getenv("Assistant_LaCasita_bot")    # metti in ENV
    if not token or not chat:
        return
    try:
        requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={"chat_id": chat, "text": text, "parse_mode": "HTML"},
            timeout=6
        )
    except Exception as e:
        app.logger.error(f"Telegram error: {e}")

def _overlaps_slot(a, b):   # stessa mezz’ora => conflitto
    return a == b

@app.get("/api/reservations")
def list_reservations():
    date = request.args.get("date")
    time_hm = request.args.get("time")
    rows = _load_reservations()
    if date:
        rows = [r for r in rows if r["date"] == date]
    if time_hm:
        rows = [r for r in rows if _overlaps_slot(r["time"], time_hm)]
    return jsonify(rows)

@app.post("/api/reservations")
def create_reservation():
    p = request.get_json(force=True)

    # campi minimi
    for k in ("date","time","firstName","lastName","phone","guests"):
        if not p.get(k):
            return jsonify({"error":"missing_fields"}), 400

    if p["time"] in CLOSED_SLOTS:
        return jsonify({"error":"kitchen_closed"}), 400

    guests = int(p["guests"])
    if guests < 1 or guests > MAX_GUESTS:
        return jsonify({"error":"max_guests_exceeded"}), 400

    table_id = p.get("tableId")
    # per <=6 obbligo scelta tavolo
    if guests <= 6 and not table_id:
        return jsonify({"error":"table_required_for_small_groups"}), 400

    rows = _load_reservations()

    # conflitto: stesso tavolo stesso slot
    if table_id:
        for r in rows:
            if r["date"] == p["date"] and r.get("tableId") == table_id and _overlaps_slot(r["time"], p["time"]):
                return jsonify({"error":"table_already_booked"}), 409

    res = {
        "id": str(uuid.uuid4()),
        "date": p["date"],
        "time": p["time"],
        "firstName": p["firstName"].strip(),
        "lastName": p["lastName"].strip(),
        "phone": p["phone"].strip(),
        "guests": guests,
        "tableId": table_id,                         # null per >6
        "allergies": (p.get("allergies") or "").strip(),
        "highchair": bool(p.get("highchair", False)),
        "roofExclusive": bool(p.get("roofExclusive", False)),
        "createdAt": int(time.time()),
        "status": "pending"
    }
    rows.append(res)
    _save_reservations(rows)

    # Sala dedotta da prefisso ID
    sala = ("Terraza" if table_id and table_id.startswith("T") else
            "Sala Interna" if table_id and (table_id.startswith("S") or table_id.startswith("C")) else
            "Azotea" if table_id and table_id.startswith("A") else
            "Assegnare")

    # --- WhatsApp link (senza f-string annidati) ---
    wa_phone = re.sub(r"\D", "", res["phone"])
    table_part = f", tavolo {res['tableId']}" if res.get("tableId") else ""
    wa_msg = (
        f"¡Hola {res['firstName']}! Soy La Casita del Nazareno. "
        f"Hemos recibido tu solicitud: {res['date']} {res['time']}, "
        f"{res['guests']} personas{table_part}. "
        "Te confirmaremos pronto por WhatsApp. ¡Gracias!"
    )
    wa_link = f"https://wa.me/{wa_phone}?text={quote(wa_msg)}"

    # Messaggio Telegram
    txt = (
        f"📅 <b>Nuova prenotazione</b>\n"
        f"• Data/Ora: {res['date']} {res['time']}\n"
        f"• Nome: {res['firstName']} {res['lastName']}\n"
        f"• Tel: {res['phone']}\n"
        f"• Persone: {res['guests']}\n"
        f"• Tavolo: {res['tableId'] or '—'} ({sala})\n"
        f"• Seggiolone: {'Sì' if res['highchair'] else 'No'}\n"
        f"• Terrazza esclusiva: {'Sì' if res['roofExclusive'] else 'No'}\n"
        f"• Allergie: {res['allergies'] or '—'}\n"
        f"• WhatsApp: {wa_link}\n"
        f"ID: {res['id']}"
    )
    _send_telegram(txt)

    return jsonify(res), 201
# ==============================================================


# === Avvio
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))
