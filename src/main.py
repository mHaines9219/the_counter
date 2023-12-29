
from bs4 import BeautifulSoup
import re
import requests

url = "https://en.wikipedia.org/wiki/2023_Jishishan_earthquake"
response = requests.get(url)

the_array = []
if response.status_code==200:
    soup = BeautifulSoup(response.text, 'html.parser')

    def contains_the(text):
        return re.findall(r'\bthe\b',text, re.IGNORECASE)

    the_elements = soup.find_all(string=contains_the)

    for element in the_elements:
        matches = contains_the(element)
        for match in matches:
            the_array.append(match)

        length = len(the_array)
    print(length)
else:
    print("Bummer man")