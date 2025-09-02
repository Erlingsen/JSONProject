#!/usr/bin/env python3
# Geez… I’ll do everything for you, won’t I? — tsundere comment
import json
from bs4 import BeautifulSoup

def html_to_json(input_file, output_file, as_objects=True):
    # Read the HTML
    with open(input_file, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Find all <a> inside <li>
    languages = []
    for li in soup.find_all("li"):
        a = li.find("a")
        if a and a.text.strip():
            name = a.text.strip()
            if as_objects:
                languages.append({"name": name})
            else:
                languages.append(name)

    # Write JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(languages, f, indent=2, ensure_ascii=False)

    print(f"Extracted {len(languages)} languages → {output_file}")

if __name__ == "__main__":
    # Change filenames here, dummy~!
    html_to_json("rawdata1.html", "languages.json", as_objects=True)
