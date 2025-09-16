import json
from bs4 import BeautifulSoup

def html_to_json(input_file, output_file, as_objects=True):

    with open(input_file, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")


    languages = []
    for li in soup.find_all("li"):
        a = li.find("a")
        if a and a.text.strip():
            name = a.text.strip()
            if as_objects:
                languages.append({"name": name})
            else:
                languages.append(name)


    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(languages, f, indent=2, ensure_ascii=False)

    print(f"Extracted {len(languages)} languages → {output_file}")

if __name__ == "__main__":

    html_to_json("rawdata1.html", "languages.json", as_objects=True)
