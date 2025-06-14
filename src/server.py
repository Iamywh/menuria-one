from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os

# Inizializza Flask usando 'docs' come cartella statica
app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)  # Abilita CORS per permettere l'accesso dal browser

# Serve index.html quando si apre la home del sito
@app.route('/')
def home():
    return render_template('index.html')

# Carica la knowledge base da /data/simulated_responses_menuria_es.json
DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "simulated_responses_menuria_es.json")
with open(DATA_FILE, 'r', encoding='utf-8') as file:
    KNOWLEDGE_BASE = json.load(file)

# Visitor count file
COUNT_FILE = os.path.join(os.path.dirname(__file__), "data", "visitor_count.txt")
if not os.path.exists(COUNT_FILE):
    with open(COUNT_FILE, 'w') as f:
        f.write('0')

# Rating count file
RATING_FILE = os.path.join(os.path.dirname(__file__), "data", "rating_counts.json")
if not os.path.exists(RATING_FILE):
    with open(RATING_FILE, 'w') as f:
        json.dump({'happy': 0, 'neutral': 0, 'sad': 0}, f)

# Route per ricevere le domande e rispondere
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

# Route to increment and return visitor count
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

# Route to store customer rating
@app.route('/rate', methods=['POST'])
def rate():
    data = request.get_json()
    rating = data.get('rating')
    with open(RATING_FILE, 'r+') as f:
        counts = json.load(f)
        if rating in counts:
            counts[rating] += 1
        f.seek(0)
        json.dump(counts, f)
        f.truncate()
    return jsonify({'status': 'ok'})

# Avvio dell'app sulla porta 5000, compatibile con Replit
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
