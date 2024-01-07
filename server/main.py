from bs4 import BeautifulSoup
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
    # add addenum to url if not typed correctly
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"Error": "Failed to retrieve webpage"}), 500
    
    soup = BeautifulSoup(response.text, 'html.parser')

    def contains_the(text):
        return re.findall(r'\bthe\b', text, re.IGNORECASE)

    the_elements = soup.find_all(string=contains_the)  # Corrected line

    results = []
    for element in the_elements:
        matches = contains_the(element)
        for match in matches:
            results.append(match)

    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
