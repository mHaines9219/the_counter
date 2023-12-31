from bs4 import BeautifulSoup, Comment
import re
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process-url', methods=['POST'])
def process_url():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"Error": "Failed to retrieve webpage"}), 500

    soup = BeautifulSoup(response.text, 'html.parser')

    # Remove script and style elements
    for script_or_style in soup(["script","head", "style", "head", "title", "[document]"]):
        script_or_style.extract()

    # Remove comments
    for comment in soup.find_all(text=lambda text: isinstance(text, Comment)):
        comment.extract()

    text = soup.get_text()

    def contains_the(text):
        return re.findall(r'\bthe\b', text, re.IGNORECASE)

    results = contains_the(text)

    return jsonify({'results': len(results)})

if __name__ == '__main__':
    app.run(debug=True)
