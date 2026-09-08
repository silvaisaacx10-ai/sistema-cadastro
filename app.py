from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
# Permite que o seu Front-end converse com esse Back-end
CORS(app) 

# SEU TOKEN PROTEGIDO NO SERVIDOR
TOKEN_API = '216767750hzDNQCcbyx391367600'

@app.route('/validar-cpf', methods=['GET'])
def validar_cpf():
    cpf = request.args.get('cpf')
    data_nasc = request.args.get('data')

    if not cpf or not data_nasc:
        return jsonify({"erro": "Faltam parâmetros"}), 400

    url = f"https://ws.hubdodesenvolvedor.com.br/v2/cpf/?cpf={cpf}&data={data_nasc}&token={TOKEN_API}"

    try:
        resposta = requests.get(url)
        dados = resposta.json()
        return jsonify(dados)
    except Exception as e:
        return jsonify({"erro": "Erro ao conectar com a API."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)