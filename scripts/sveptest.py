"""Sveptest över Learn Hub — de räknebara kriterierna ur grundmodellen.

Räknebara kriterier hittar avdrift som omläsning missar, också i artiklar som
redan är godkända. Svepet har fångat: en artikel med bara två vs-sektioner sex
serier efter att den förklarats klar, en ritad doodle vars `<Doodle>`-anrop
aldrig lades in i MDX:en, och ett kyrilliskt "а" mitt i ett svenskt ord.

    python3 scripts/sveptest.py                    # hela hubben
    python3 scripts/sveptest.py git-vad-git-sparar.mdx

Exitkod 1 om någon artikel har en anmärkning, så det går att köra i en pipeline.
Standarden står i docs/pedagogik/01-grundmodellen.md.
"""
import re
import sys
import pathlib

BAS = pathlib.Path(__file__).resolve().parent.parent / "src" / "content" / "learn"

# De fem sista sektionerna, ordagrant identiska i varje artikel.
OBLIGATORISKA = [
    "Vad det här betyder i ditt arbete",
    "Vanliga nybörjarförväxlingar",
    "Prova själv",
    "Snabb sammanfattning",
    "Nästa del",
]

NEDVARDERANDE = r"\b(helt enkelt|självklart|trivialt|uppenbarligen)\b"

# ASCII-DIAGRAM = block som RITAR (linjer, hörn, pilar). Ett omärkt block med
# kommandoutdata eller en tvåkolumnslista är inte ett diagram, och 40-teckens-
# regeln gäller inte det — den finns för att en BILD ska gå att uppfatta i ett
# svep på mobilens 315 px. Kod som scrollar i sin egen ruta är rätt beteende.
RITTECKEN = r"[─│└┬┘┌┐├┤┴→←↓↑\\]"


def analysera(sokvag):
    text = sokvag.read_text(encoding="utf-8")
    rubriker, kodrader, diagramrader = [], [], []
    i_kodblock, stangning, ar_omarkt = False, "", False

    for rad in text.split("\n"):
        fence = re.match(r"^(```+|~~~+)(.*)$", rad)
        if fence:
            if not i_kodblock:
                i_kodblock, stangning = True, fence.group(1)
                ar_omarkt = fence.group(2).strip() in ("", "text", "txt")
            elif rad.startswith(stangning):
                i_kodblock = False
            continue
        if i_kodblock:
            ritar = ar_omarkt and re.search(RITTECKEN, rad)
            (diagramrader if ritar else kodrader).append(rad)
        elif rad.startswith("## "):
            rubriker.append(rad[3:].strip())

    langa = [m for m in re.findall(r"[A-ZÅÄÖ][^.!?\n]{40,}[.!?]", text)
             if len(m.split()) > 30]

    return {
        "fil": sokvag.name,
        "h2": len(rubriker),
        "vs": len([r for r in rubriker if " vs " in r]),
        "max_kod": max((len(r) for r in kodrader), default=0),
        "max_diagram": max((len(r) for r in diagramrader), default=0),
        "saknar": [s for s in OBLIGATORISKA if s not in rubriker],
        "kom_ihag": 'type="kom-ihag"' in text,
        "check": "<Check" in text,
        "doodle": text.count("<Doodle") + text.count("**DOODLE**"),
        "del": text.count("<Del "),
        "langa": langa,
        "nedvarderande": re.findall(NEDVARDERANDE, text),
        # Homoglyfer: ett kyrilliskt "а" renderar identiskt med det latinska men
        # bryter sökning, stavningskontroll och diff. Omöjligt att se, billigt
        # att mäta.
        "homoglyf": sorted({c for c in text if 0x400 <= ord(c) <= 0x4FF}),
    }


def anmarkningar(a):
    fel = []
    if not 15 <= a["h2"] <= 22:
        fel.append(f"h2={a['h2']} (ska vara 15–22)")
    if a["vs"] < 3:
        fel.append(f"vs={a['vs']} (minst 3)")
    if a["max_kod"] > 55:
        fel.append(f"kodrad {a['max_kod']} tecken (max 55)")
    if a["max_diagram"] > 40:
        fel.append(f"ASCII-diagram {a['max_diagram']} tecken (max 40)")
    if a["saknar"]:
        fel.append("saknar sektion: " + " · ".join(a["saknar"]))
    if not a["kom_ihag"]:
        fel.append("ingen kom-ihag-box")
    if not a["check"]:
        fel.append("ingen Check")
    if a["doodle"] == 0:
        fel.append("ingen doodle och ingen brief")
    if 0 < a["del"] < 3:
        fel.append(f"{a['del']} Del-block (2–4 plus slutblocket, eller inga)")
    if a["langa"]:
        fel.append(f"{len(a['langa'])} mening(ar) över 30 ord")
    if a["nedvarderande"]:
        fel.append("nedvärderande ord: " + ", ".join(sorted(set(a["nedvarderande"]))))
    if a["homoglyf"]:
        fel.append("kyrilliska tecken: " + " ".join(a["homoglyf"]))
    return fel


def main():
    filer = [BAS / n for n in sys.argv[1:]] or sorted(BAS.glob("*.mdx"))
    antal_fel = 0
    for fil in filer:
        a = analysera(fil)
        fel = anmarkningar(a)
        if fel:
            antal_fel += 1
            print(f"✗ {a['fil']}")
            for f in fel:
                print(f"    {f}")
            for mening in a["langa"][:3]:
                print(f"    {len(mening.split())} ord: {mening[:96]}…")
        elif len(filer) < 8:
            print(f"✓ {a['fil']:<46} h2={a['h2']} vs={a['vs']} "
                  f"kod={a['max_kod']} doodle={a['doodle']} del={a['del']}")
    print(f"\n{len(filer)} artiklar · {antal_fel} med anmärkning")
    return 1 if antal_fel else 0


if __name__ == "__main__":
    raise SystemExit(main())
