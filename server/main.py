from bs4 import BeautifulSoup, Comment
import re
import requests
from flask import Flask, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="../dist")
CORS(app)


@app.route("/process-url", methods=["POST"])
@cross_origin()
def process_url():
    data = request.json
    url = data.get("url")
    wordToSearch = data.get("wordToSearch")
    print(wordToSearch)
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"Error": "Failed to retrieve webpage"}), 500

    soup = BeautifulSoup(response.text, "html.parser")

    text = soup.get_text()

    def contains_word(text, wordToSearch):
        pattern = rf"{wordToSearch}"
        return re.findall(pattern, text, re.IGNORECASE)

    results = contains_word(text, wordToSearch)

    return jsonify({"results": len(results), "word": wordToSearch, "url": url})


@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run()
