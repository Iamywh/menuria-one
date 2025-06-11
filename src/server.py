from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Percorso del file JSON con le risposte simulate
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'simulated_responses_menuria_es.json')

# Carica le risposte simulate
with open(DATA_FILE, 'r', encoding='utf-8') as file:
    KNOWLEDGE_BASE = json.load(file)

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

if __name__ == '__main__':
    app.run(debug=True)
