from pathlib import Path
from bs4 import BeautifulSoup
import sys

def estrai_da_index_html(dir_or_file: Path) -> dict:
    """
    Se passi una cartella: apre <cartella>/index.html
    Se passi un file: usa direttamente quel file (deve essere index.html)
    """
    target = dir_or_file
    if dir_or_file.is_dir():
        target = dir_or_file / "index.html"

    if not target.exists():
        raise FileNotFoundError(f"File non trovato: {target}")
    if target.name.lower() != "index.html":
        raise ValueError(f"Il file deve chiamarsi index.html, trovato: {target.name}")

    with target.open("r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    results = {}
    for el in soup.find_all(attrs={"data-i18n": True}):
        key = (el.get("data-i18n") or "").strip()
        if not key:
            continue
        if el.name == "input" and el.has_attr("placeholder"):
            text = (el.get("placeholder") or "").strip()
        else:
            text = el.get_text(strip=True)
        if (key not in results) or (not results[key] and text):
            results[key] = text
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso:\n  python estracti18n_single.py <percorso_cartella_o_index.html>")
        sys.exit(0)

    path = Path(sys.argv[1]).resolve()
    data = estrai_da_index_html(path)

    keys = sorted(data.keys())
    print(f"Chiavi trovate: {len(keys)}\n")
    for k in keys:
        v = (data[k] or "").replace('"', '\\"')
        print(f'{k}: "{v}"')

    out_file = path if path.is_file() else path / "i18n_keys.txt"
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(f"Chiavi trovate: {len(keys)}\n\n")
        for k in keys:
            v = (data[k] or "").replace('"', '\\"')
            f.write(f'{k}: "{v}"\n')
    print(f"\nSalvato in: {out_file}")
