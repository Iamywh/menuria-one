from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
import datetime

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# Percorso base (un livello sopra questo file)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

@app.route('/')
def home():
    return render_template('index.html')

# Load KB
DATA_FILE = os.path.join(BASE_DIR, "data", "simulated_responses_menuria_es.json")
with open(DATA_FILE, 'r', encoding='utf-8') as file:
    KNOWLEDGE_BASE = json.load(file)

# Visitor counter
COUNT_FILE = os.path.join(BASE_DIR, "data", "visitor_count.txt")
if not os.path.exists(COUNT_FILE):
    with open(COUNT_FILE, 'w') as f:
        f.write('0')

# Rating counter
RATING_FILE = os.path.join(BASE_DIR, "data", "rating_counts.json")
if not os.path.exists(RATING_FILE):
    with open(RATING_FILE, 'w') as f:
        json.dump({'happy': 0, 'neutral': 0, 'sad': 0}, f)

# Feedback log
FEEDBACK_LOG = os.path.join(BASE_DIR, "data", "feedback.json")
if not os.path.exists(FEEDBACK_LOG):
    with open(FEEDBACK_LOG, 'w') as f:
        f.write('[]')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').lower()

    if not user_message:
        return jsonify({'response': "No he recibido ningún mensaje. ¿Podrías repetirlo, por favor?"}), 400

    for entry in KNOWLEDGE_BASE.values():
        if entry['domanda'].lower() in user_message:
            return jsonify({'response': entry['risposta']})

    return jsonify({'response': "Lo siento, no tengo una respuesta para eso. ¿Puedes intentar preguntarlo de otra forma?"})

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
    lang = data.get('lang', 'unknown')  # puoi passare la lingua dal frontend

    # Aggiorna conteggi rating
    with open(RATING_FILE, 'r+') as f:
        counts = json.load(f)
        if rating in counts:
            counts[rating] += 1
        f.seek(0)
        json.dump(counts, f)
        f.truncate()

    # Log singolo feedback
    feedback_entry = {
        "rating": rating,
        "lang": lang,
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
