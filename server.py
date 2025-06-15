from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
import datetime

app = Flask(__name__, template_folder="src/templates", static_folder="src/static")
CORS(app)

# === Percorsi
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
LANG_RESPONSES_DIR = os.path.join(DATA_DIR, 'lang_responses')
COUNT_FILE = os.path.join(DATA_DIR, 'visitor_count.txt')
RATING_FILE = os.path.join(DATA_DIR, 'rating_counts.json')
FEEDBACK_LOG = os.path.join(DATA_DIR, 'feedback.json')
# === Crea le cartelle mancanti (se non esistono)
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
        "ru": "Извините, у меня нет ответа на это."
    }
    return fallback.get(lang, fallback["en"])

# === Caricamento KB
KNOWLEDGE_BASES = load_knowledge_bases()

# === Inizializzazione file
if not os.path.exists(COUNT_FILE):
    with open(COUNT_FILE, 'w') as f:
        f.write('0')

if not os.path.exists(RATING_FILE):
    with open(RATING_FILE, 'w') as f:
        json.dump({'happy': 0, 'neutral': 0, 'sad': 0}, f)

if not os.path.exists(FEEDBACK_LOG):
    with open(FEEDBACK_LOG, 'w') as f:
        f.write('[]')

# === Rotte
@app.route('/')
def home():
    return render_template('index.html')

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

@app.route('/visitor-count', methods=['GET'])
def visitor_count():
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

@app.route('/rate', methods=['POST'])
def rate():
    data = request.get_json()
    rating = data.get('rating')
    lang = data.get('lang', 'unknown')

    if rating not in ['happy', 'neutral', 'sad']:
        return jsonify({'error': 'Invalid rating'}), 400

    with open(RATING_FILE, 'r+') as f:
        counts = json.load(f)
        counts[rating] += 1
        f.seek(0)
        json.dump(counts, f)
        f.truncate()

    feedback_entry = {
        "rating": rating,
        "language": lang,
        "timestamp": datetime.datetime.now().isoformat()
    }
    with open(FEEDBACK_LOG, 'r+') as f:
        try:
            logs = json.load(f)
        except json.JSONDecodeError:
            logs = []
        logs.append(feedback_entry)
        f.seek(0)
        json.dump(logs, f, indent=2)
        f.truncate()

    return jsonify({'status': 'ok'})

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

# === Avvio
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
