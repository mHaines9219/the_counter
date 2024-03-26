from bs4 import BeautifulSoup, Comment
import re
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/process-url", methods=["POST"])
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

    # Remove script and style elements
    # for script_or_style in soup(
    #     ["script", "head", "style", "head", "title", "[document]"]
    # ):
    #     script_or_style.extract()

    # Remove comments
    # for comment in soup.find_all(text=lambda text: isinstance(text, Comment)):
    #     comment.extract()

    # for comment in soup.find_all(string=lambda text: isinstance(text, Comment)):
    #     comment.extract()

    text = soup.get_text()

    # def contains_word(text):
    #     return re.findall(r"\bthe\b", text, re.IGNORECASE)

    def contains_word(text, wordToSearch):
        # Use an f-string to insert the variable into the regex pattern
        pattern = rf"{wordToSearch}"
        return re.findall(pattern, text, re.IGNORECASE)

    # try .string
    # or try this table_bs.find_all(string="Florida")
    results = contains_word(text, wordToSearch)

    return jsonify({"results": len(results), "word": wordToSearch, "url": url})


if __name__ == "__main__":
    app.run(debug=True)
