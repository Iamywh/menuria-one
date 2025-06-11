from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='web')  # <-- cambia se la tua cartella si chiama così

@app.route('/')
def home():
    return send_from_directory('web', 'index.html')
import json
from flask_cors import CORS
CORS(app)
DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "simulated_responses_menuria_es.json")
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
    app.run(host='0.0.0.0', port=5000)
