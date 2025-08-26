#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Estrae testo visibile e attributi traducibili dagli .html:
- testo dei nodi
- alt, title, placeholder, aria-label, value (button/input/option/textarea)
- data-i18n (per mappare se già presente)
Output: CSV con colonne: file, selector, type, key_hint, text
"""
import os, re, csv, sys
from bs4 import BeautifulSoup

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
OUT  = sys.argv[2] if len(sys.argv) > 2 else "i18n_html_scan.csv"

ATTRS = ["alt", "title", "placeholder", "aria-label", "value", "data-i18n"]

def css_path(el):
    parts = []
    cur = el
    while cur and cur.name and cur.name != '[document]':
        idx = ""
        if cur.parent:
            siblings = [c for c in cur.parent.find_all(cur.name, recursive=False)]
            if len(siblings) > 1:
                i = siblings.index(cur) + 1
                idx = f":nth-of-type({i})"
        ident = cur.get("id")
        cls = cur.get("class", [])
        if ident:
            parts.append(f"{cur.name}#{ident}")
        elif cls:
            parts.append(f"{cur.name}.{'.'.join(cls)}{idx}")
        else:
            parts.append(f"{cur.name}{idx}")
        cur = cur.parent
    return " > ".join(reversed(parts))

def is_hidden(el):
    # best-effort: ignora elementi con hidden/display:none
    if el.has_attr("hidden"): return True
    style = el.get("style", "")
    return "display:none" in style.replace(" ", "").lower()

def clean_text(t):
    return re.sub(r"\s+", " ", (t or "")).strip()

rows = []
for root, _, files in os.walk(ROOT):
    for f in files:
        if not f.lower().endswith(".html"): 
            continue
        path = os.path.join(root, f)
        with open(path, "r", encoding="utf-8", errors="ignore") as fh:
            soup = BeautifulSoup(fh, "html.parser")

        # testo dei nodi
        for el in soup.find_all(text=True):
            if not el.strip():
                continue
            parent = el.parent
            if parent.name in ["script", "style"]:
                continue
            if is_hidden(parent):
                continue
            txt = clean_text(el)
            if not txt:
                continue
            rows.append([path, css_path(parent), "innerText", "", txt])

        # attributi traducibili
        for tag in soup.find_all(True):
            if is_hidden(tag): 
                continue
            for a in ATTRS:
                if tag.has_attr(a):
                    val = clean_text(tag.get(a))
                    if not val: 
                        continue
                    key_hint = ""
                    if a == "data-i18n":
                        key_hint = val
                    rows.append([path, css_path(tag), f"attr:{a}", key_hint, val])

# dedup
seen = set()
dedup_rows = []
for r in rows:
    key = tuple(r)
    if key in seen: 
        continue
    seen.add(key)
    dedup_rows.append(r)

with open(OUT, "w", newline="", encoding="utf-8") as csvf:
    w = csv.writer(csvf)
    w.writerow(["file", "selector", "type", "key_hint", "text"])
    w.writerows(dedup_rows)

print(f"[OK] Scan completato. Righe: {len(dedup_rows)}")
print(f"[OUT] {OUT}")
