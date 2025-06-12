from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

# Inizializza Flask usando 'docs' come cartella statica
app = Flask(__name__, static_folder='docs')
CORS(app)  # Abilita CORS per permettere l'accesso dal browser

# Serve index.html quando si apre la home del sito
@app.route('/')
def home():
    return send_from_directory('docs', 'index.html')

# Carica la knowledge base da /data/simulated_responses_menuria_es.json
DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "simulated_responses_menuria_es.json")
with open(DATA_FILE, 'r', encoding='utf-8') as file:
    KNOWLEDGE_BASE = json.load(file)

# Route per ricevere le domande e rispondere
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').lower()

    if not user_message:
        return jsonify({'response': "No he recibido ningún mensaje. ¿Podrías repetirlo, por favor?"}), 400

    for entry in KNOWLEDGE_BASE.values():
        if entry['domanda'].lower() in user_message:
            return jsonify({'response': entry['risposta'].replace('\n', '<br>')})

    return jsonify({'response': "Lo siento, no tengo una respuesta para eso. ¿Puedes intentar preguntarlo de otra forma?"})

# Avvio dell'app sulla porta 5000, compatibile con Replit
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
