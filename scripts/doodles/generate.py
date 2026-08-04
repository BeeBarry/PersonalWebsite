"""Generator för lärkitets doodles (src/components/learn/doodles.ts).

Bilderna är committade som färdig SVG — det är den filen som gäller. Det här
skriptet finns för att STILEN ska gå att skruva om i efterhand utan att rita
om varje bild för hand.

    J = 4.0   snabb skiss, tydligt handritad
    J = 1.2   stadig hand  <- nuvarande
    J = 0     linjal, bara mjuka hörn

Rundade hörn och ändar behålls oavsett J. Det är de som gör att bilden läser
som en teckning i stället för som ett diagram — inte vinglingen.

Kör:  python3 scripts/doodles/generate.py
"""
import random, re
# J styr hur handritat det ser ut: 4.0 = skiss, 1.2 = stadig hand, 0 = teknisk
J = 1.2
Q = 1.0   # hur mycket kanterna bågnar

def rs(): random.seed(7)
def w(x,y,W,H,j=None):
    j = J if j is None else j
    r=lambda: random.uniform(-j,j)
    x1,y1=x+r(),y+r(); x2,y2=x+W+r(),y+r()
    x3,y3=x+W+r(),y+H+r(); x4,y4=x+r(),y+H+r()
    return (f"M{x1:.0f} {y1:.0f} Q{x+W/2:.0f} {y+r()-Q:.0f} {x2:.0f} {y2:.0f} "
            f"Q{x+W+r()+Q:.0f} {y+H/2:.0f} {x3:.0f} {y3:.0f} "
            f"Q{x+W/2:.0f} {y+H+r()+Q:.0f} {x4:.0f} {y4:.0f} "
            f"Q{x+r()-Q:.0f} {y+H/2:.0f} {x1:.0f} {y1:.0f} Z")
def hatch(x,y,W,H,step=32):
    out=[]
    for i in range(0,int(W+H),step):
        x1,y1=x+i,y+H; x2,y2=x+i-H,y
        if x1>x+W: y1=y+H-(x1-(x+W)); x1=x+W
        if x2<x: y2=y+(x-x2); x2=x
        if x1>x2: out.append(f'<path d="M{x1:.0f} {y1:.0f} L{x2:.0f} {y2:.0f}"/>')
    return "".join(out)
def arrow(x,y,d="right",s=13):
    if d=="right": return f'<path d="M{x-s} {y-6} L{x} {y} L{x-s} {y+6}"/>'
    if d=="down":  return f'<path d="M{x-6} {y-s} L{x} {y} L{x+6} {y-s}"/>'
    if d=="up":    return f'<path d="M{x-6} {y+s} L{x} {y} L{x+6} {y+s}"/>'
T='  <g font-family="var(--font-mono)" font-size="%s" fill="currentColor" text-anchor="middle"%s>\n%s\n  </g>'
def txt(items,size=16.5,extra=""):
    return T % (size, extra, "\n".join(f'    <text x="{x}" y="{y}">{s}</text>' for x,y,s in items))
G='  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n%s\n  </g>'

def alla():
    rs()
    D={}
    # 1 — VM vs container
    D['vm-vs-container']=(
      '<svg viewBox="0 0 880 404" role="img" aria-label="Två staplar bredvid varandra. Den virtuella '
      'maskinen har ett gäst-OS-lager som containern saknar.">\n'
      + G % (f'<path d="{w(60,78,262,52)}"/><path d="{w(60,140,262,66)}"/>'
             f'<path d="{w(60,216,262,52)}"/><path d="{w(60,278,262,56)}"/>'
             f'<g stroke-width="1.1" opacity="0.6">{hatch(66,146,250,54,34)}</g>'
             f'<path d="{w(558,78,262,52)}"/>'
             f'<path d="{w(558,140,262,66)}" stroke-dasharray="8 9" opacity="0.38"/>'
             f'<path d="{w(558,216,262,52)}"/><path d="{w(558,278,262,56)}"/>')
      + "\n" + txt([(191,111,"App"),(191,180,"Gäst-OS"),(191,250,"Hypervisor"),(191,314,"Värd-OS"),
                    (689,111,"App"),(689,250,"Docker"),(689,314,"Värd-OS")])
      + "\n" + txt([(689,180,"finns inte")],15,' opacity="0.4"')
      + "\n" + txt([(191,376,"Virtuell maskin"),(689,376,"Container")],18.5) + "\n</svg>")
    # 2 — Registry-hyllan
    planka=('<path d="M150 258 Q440 255 750 257"/><path d="M152 272 Q440 269 748 271"/>'
            '<path d="M154 272 Q152 300 156 326"/><path d="M746 271 Q748 300 744 326"/>')
    klam=('<path d="M212 296 Q212 308 224 309 L438 311 Q450 311 450 322 '
          'Q450 311 462 310 L732 308 Q744 307 744 295" stroke-width="1.3" opacity="0.7"/>')
    D['registry-hyllan']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En hylla med tre lådor märkta v1, v2 och '
      'latest. En klammer under dem märkt repository.">\n'
      + G % (planka+"".join(f'<path d="{w(x,150,140,104)}"/>' for x in (206,376,546))+klam)
      + "\n" + txt([(276,208,":v1"),(446,208,":v2"),(616,208,":latest")])
      + "\n" + txt([(448,104,"Registry · ghcr.io")],18.5)
      + "\n" + txt([(448,348,"Repository · searchapi")],15,' opacity="0.62"') + "\n</svg>")
    # 3 — Compose: en fil, tre containrar
    fil=('<path d="M72 108 Q160 106 232 107 L272 150 Q275 212 272 274 Q160 277 74 275 '
         'Q70 192 72 108 Z"/><path d="M232 107 Q231 134 234 150 Q254 152 272 150"/>')
    ring=('<path d="M436 190 Q436 26 646 24 Q856 26 856 190 Q856 350 646 352 Q436 350 436 190 Z" '
          'stroke-width="1.5" opacity="0.5"/>')
    pil=('<path d="M276 192 Q360 190 420 142 Q450 118 524 112"/>'
         '<path d="M276 192 Q400 191 524 192"/>'
         '<path d="M276 192 Q360 193 420 242 Q450 266 524 272"/>'
         + arrow(530,111) + arrow(530,192) + arrow(530,273))
    D['compose-en-fil']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En fil märkt compose.yaml med tre pilar '
      'till tre lådor inneslutna i en ring märkt eget nätverk.">\n'
      + G % (fil+ring+"".join(f'<path d="{w(536,y,242,62)}"/>' for y in (78,160,242))+pil)
      + "\n" + txt([(172,202,"compose.yaml")],16)
      + "\n" + txt([(657,116,"webshop"),(657,198,"api"),(657,280,"db")])
      + "\n" + txt([(646,384,"eget nätverk")],15,' opacity="0.62"') + "\n</svg>")
    # 4 — Compose-nätverket
    ring2=('<path d="M262 186 Q262 58 520 56 Q782 58 782 186 Q782 320 520 322 Q262 320 262 186 Z" '
           'stroke-width="1.5" opacity="0.5"/>')
    laptop=('<path d="M60 152 Q120 150 178 151 Q181 190 178 224 Q120 226 62 224 Q58 188 60 152 Z"/>'
            '<path d="M44 236 Q120 234 196 235 Q186 250 172 252 Q120 254 66 252 Q52 250 44 236 Z"/>')
    studs=('<path d="M200 194 Q226 195 248 190" stroke-dasharray="8 8"/>'
           '<path d="M252 176 L268 204"/><path d="M268 176 L252 204"/>')
    D['compose-natverket']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="En ring märkt shop_default med två lådor '
      'inuti. En laptop utanför når inte in.">\n'
      + G % (ring2+f'<path d="{w(320,146,168,72)}"/><path d="{w(572,146,168,72)}"/>'
             + f'<path d="M492 182 Q530 181 566 182"/>{arrow(570,182)}' + laptop + studs)
      + "\n" + txt([(404,190,"api"),(656,190,"db")])
      + "\n" + txt([(530,168,"db:5432")],14,' opacity="0.7"')
      + "\n" + txt([(120,292,"din dator")],15,' opacity="0.62"')
      + "\n" + txt([(522,356,"shop_default")],15,' opacity="0.62"') + "\n</svg>")
    # 5 — Volymen står kvar
    def panel(x, c=True):
        p=""
        if c:
            p+=(f'<path d="M{x+18} 76 Q{x+130} 74 {x+242} 75 Q{x+245} 122 {x+242} 168"/>'
                f'<path d="M{x+18} 76 Q{x+15} 122 {x+18} 168"/>'
                f'<path d="M{x+18} 168 Q{x+130} 170 {x+242} 168" stroke-dasharray="7 8" opacity="0.5"/>'
                f'<path d="M{x+130} 104 Q{x+129} 170 {x+130} 214"/>'+arrow(x+130,220,"down"))
        else:
            p+=(f'<path d="M{x+18} 46 Q{x+130} 44 {x+242} 45 Q{x+245} 92 {x+242} 138" '
                f'stroke-dasharray="8 9" opacity="0.26"/>'
                f'<path d="M{x+18} 46 Q{x+15} 92 {x+18} 138" stroke-dasharray="8 9" opacity="0.26"/>'
                f'<path d="M{x+130} 176 Q{x+129} 150 {x+130} 128" opacity="0.42"/>'
                + arrow(x+130,124,"up").replace('<path','<path opacity="0.42"'))
        return p+f'<path d="{w(x+52,232,176,72)}"/>'
    D['volymen-star-kvar']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Två paneler. I den vänstra skriver '
      'containern genom sin botten ner i volymen. I den högra är containern borta och volymen kvar.">\n'
      + G % (panel(80,True)+panel(520,False))
      + "\n" + txt([(210,132,"container"),(220,278,"volym"),(660,278,"volym")])
      + "\n" + txt([(210,352,"containern kör"),(650,352,"containern borta")],15,' opacity="0.62"')
      + "\n</svg>")
    return D

if __name__ == "__main__":
    for namn, svg in alla().items():
        print('\n  /* ---- %s ---- */\n  "%s": `\n%s`,' % (namn, namn, svg))
