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
    if d=="left":  return f'<path d="M{x+s} {y-6} L{x} {y} L{x+s} {y+6}"/>'
    if d=="down":  return f'<path d="M{x-6} {y-s} L{x} {y} L{x+6} {y-s}"/>'
    if d=="up":    return f'<path d="M{x-6} {y+s} L{x} {y} L{x+6} {y+s}"/>'
def ell(cx,cy,rx,ry,j=None):
    """Vinglig ellips av fyra kvadratiska bågar. Kontrollpunkten ligger i hörnet
    på omskrivna rektangeln — något bulligare än en exakt ellips, vilket är
    precis vad en teckning ska vara."""
    j = J if j is None else j
    r=lambda: random.uniform(-j,j)
    kx,ky=rx*0.98,ry*0.98
    n=(cx+r(),cy-ry+r()); o=(cx+rx+r(),cy+r())
    s=(cx+r(),cy+ry+r()); v=(cx-rx+r(),cy+r())
    return (f"M{n[0]:.0f} {n[1]:.0f} Q{cx+kx:.0f} {cy-ky:.0f} {o[0]:.0f} {o[1]:.0f} "
            f"Q{cx+kx:.0f} {cy+ky:.0f} {s[0]:.0f} {s[1]:.0f} "
            f"Q{cx-kx:.0f} {cy+ky:.0f} {v[0]:.0f} {v[1]:.0f} "
            f"Q{cx-kx:.0f} {cy-ky:.0f} {n[0]:.0f} {n[1]:.0f} Z")
def circ(cx,cy,r,j=None): return ell(cx,cy,r,r,j)
def rader(x,y,W,H,n,delare=()):
    """Rutnät: vinglig ram, n-1 vågräta linjer, valfria lodräta kolumndelare."""
    h=H/n
    p=[f'<path d="{w(x,y,W,H)}"/>']
    for i in range(1,n):
        yy=y+i*h
        p.append(f'<path d="M{x+2:.0f} {yy:.0f} Q{x+W/2:.0f} {yy-1:.0f} {x+W-2:.0f} {yy:.0f}"/>')
    for dx in delare:
        p.append(f'<path d="M{dx:.0f} {y+2:.0f} Q{dx+1:.0f} {y+H/2:.0f} {dx:.0f} {y+H-2:.0f}"/>')
    return "".join(p)
def markerad(x,y,W,H,step=26):
    """Skraffering över en rad — volym och markering, aldrig fyllning."""
    return f'<g stroke-width="1.1" opacity="0.42">{hatch(x,y,W,H,step)}</g>'
# text-anchor är en PARAMETER, inte något man skickar via extra: två likadana
# attribut i samma tagg är ogiltigt och parsern behåller det första.
T='  <g font-family="var(--font-mono)" font-size="%s" fill="currentColor" text-anchor="%s"%s>\n%s\n  </g>'
def txt(items,size=16.5,extra="",anchor="middle"):
    return T % (size, anchor, extra,
                "\n".join(f'    <text x="{x}" y="{y}">{s}</text>' for x,y,s in items))
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

    # 6 — Nätverk 1.2 · Förfrågan och svar
    fonster=(f'<path d="{w(90,110,240,150)}"/><path d="M96 148 Q210 146 324 148"/>'
             + "".join(f'<path d="{circ(cx,129,6)}"/>' for cx in (114,134,154)))
    torn=(f'<path d="{w(600,100,150,190)}"/>'
          '<path d="M604 163 Q675 161 746 163"/><path d="M604 226 Q675 224 746 226"/>'
          + "".join(f'<path d="{circ(624,cy,6)}"/>' for cy in (132,195,258)))
    D['forfragan-och-svar']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Ett webbläsarfönster och ett servertorn. '
      'En heldragen pil dit med förfrågan och en heldragen pil tillbaka med svaret.">\n'
      + G % (fonster+torn+'<path d="M338 168 Q460 160 586 152"/>'+arrow(594,151)
             + '<path d="M586 238 Q460 246 342 254"/>'+arrow(334,255,"left"))
      + "\n" + txt([(462,136,"förfrågan"),(462,290,"svar")],15)
      + "\n" + txt([(210,332,"webbläsaren"),(675,332,"servern")]) + "\n</svg>")

    # 7 — Nätverk 1.2 · Statuskodernas fyra grupper
    def stf(x):
        return (f'<path d="{w(x,86,170,132)}"/><path d="M{x+6} 118 Q{x+85} 116 {x+164} 118"/>'
                + "".join(f'<path d="{circ(x+dx,102,5)}"/>' for dx in (18,34,50)))
    bock='<path d="M107 172 L119 188 L145 152"/>'
    nalar=("".join(f'<path d="{circ(cx,176,9)}"/><path d="M{cx} 185 Q{cx+1} 193 {cx} 200"/>'
                   for cx in (313,357))
           + '<path d="M310 158 Q335 136 358 158"/>'+arrow(358,162,"down",11))
    triangel=('<path d="M545 146 L568 190 L522 190 Z"/>'
              '<path d="M545 160 Q546 167 545 174"/><path d="{}"/>'.format(circ(545,183,2.5)))
    servern=(f'<path d="{w(733,140,44,64)}"/>'
             '<path d="M736 161 Q755 160 774 161"/><path d="M736 182 Q755 181 774 182"/>'
             + "".join(f'<path d="{circ(743,cy,3.5)}"/>' for cy in (150,171,192)))
    D['statuskodernas-fyra']=(
      '<svg viewBox="0 0 880 300" role="img" aria-label="Fyra webbläsarfönster märkta 2xx, 3xx, 4xx '
      'och 5xx, vart och ett med en symbol för vad gruppen betyder.">\n'
      + G % ("".join(stf(x) for x in (40,250,460,670))+bock+nalar+triangel+servern)
      + "\n" + txt([(125,250,"2xx"),(335,250,"3xx"),(545,250,"4xx"),(755,250,"5xx")])
      + "\n" + txt([(125,278,"lyckades"),(335,278,"leta vidare"),(545,278,"fel fråga"),
                    (755,278,"serverns fel")],14,' opacity="0.62"') + "\n</svg>")

    # 8 — Nätverk 1.1 · URL:en del för del
    gr=[(79,137,"https://"),(216,204,"shop.example.se"),(420,98,":443"),
        (518,156,"/produkter"),(674,127,"?sida=2")]
    mitt=[(x+b/2,s) for x,b,s in gr]
    skilj="".join(f'<path d="M{x} 88 Q{x+1} 110 {x} 130" stroke-dasharray="6 7" opacity="0.5"/>'
                  for x,_,_ in gr[1:])
    ner="".join(f'<path d="M{cx:.0f} 140 Q{cx+1:.0f} 158 {cx:.0f} 174"/>'+arrow(cx,180,"down",10)
                for cx,_ in mitt)
    D['url-raden']=(
      '<svg viewBox="0 0 880 232" role="img" aria-label="En URL uppdelad i fem rutor med en pil ner '
      'till varje dels namn. Rutan med värdnamnet är skrafferad.">\n'
      + G % (f'<path d="{w(79,84,722,50)}"/>'+skilj+markerad(222,88,192,42)+ner)
      + "\n" + txt([(cx,115,s) for cx,s in mitt],16)
      + "\n" + txt(list(zip([cx for cx,_ in mitt],[210]*5,
                    ["protokoll","värdnamn","port","sökväg","frågesträng"])),15) + "\n</svg>")

    # 9 — Nätverk 1.1 · Adressen hittar huset, porten hittar tjänsten
    hus=(f'<path d="{w(260,130,440,180)}"/><path d="M242 132 L480 58 L718 132"/>')
    dorrar="".join(f'<path d="M{x} 310 Q{x-1} 265 {x} 220 Q{x+35} 218 {x+70} 220 '
                   f'Q{x+71} 265 {x+70} 310"/>' for x in (290,390,490,590))
    in_=('<path d="M110 378 Q300 392 430 372 Q500 360 525 334"/>'+arrow(525,320,"up"))
    D['porten-ar-dorren']=(
      '<svg viewBox="0 0 880 440" role="img" aria-label="Ett hus med en IP-adress och fyra dörrar '
      'märkta med portnummer. En heldragen pil går in i dörren 443.">\n'
      + G % (hus+dorrar+in_)
      + "\n" + txt([(480,38,"93.184.216.34")])
      + "\n" + txt([(325,272,"22"),(425,272,"80"),(525,272,"443"),(625,272,"5432")],15)
      + "\n" + txt([(150,414,"anropet")],15,' opacity="0.62"') + "\n</svg>")

    # 10 — Linux 1.1 · Filsystemsträdet
    grenar=('<path d="M440 104 Q330 108 205 154"/><path d="M440 104 Q441 130 440 154"/>'
            '<path d="M440 104 Q550 108 675 154"/><path d="M680 206 Q681 224 680 242"/>')
    D['filsystemstradet']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Ett träd som växer nedåt från roten '
      'snedstreck, med grenar till etc, usr och home. Under home är lisa inringad.">\n'
      + G % (f'<path d="{w(400,56,80,46)}"/>'
             + "".join(f'<path d="{w(x,158,130,46)}"/>' for x in (135,375,615))
             + grenar + f'<path d="{w(615,268,130,46)}"/>'
             + f'<path d="{ell(680,291,98,48)}" stroke-width="1.5" opacity="0.5"/>')
      + "\n" + txt([(440,88,"/")],18.5)
      + "\n" + txt([(200,190,"etc"),(440,190,"usr"),(680,190,"home"),(680,300,"lisa")])
      + "\n" + txt([(680,374,"~")],18.5) + "\n</svg>")

    # 11 — SQL 1.2 · Två rader in, en rad ut
    # Radhöjd 43, inte 35: en 14-punktsetikett behöver fontstorleken plus ett
    # halvt radavstånd över OCH under sig, annars nuddar den bandlinjen.
    D['join-tva-rader-in']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Två rutnät med var sin markerad rad, och '
      'till höger ett bredare rutnät där de två raderna blivit en.">\n'
      + G % (rader(60,100,200,172,4,(170,))+rader(310,100,200,172,4,(420,))
             + rader(600,145,240,86,2,(680,760))
             # Band 2, inte band 1: band 1 är rubrikraden och den joinar ingenting.
             + markerad(64,147,192,35)+markerad(314,147,192,35)+markerad(604,192,232,35)
             + '<path d="M262 165 Q282 164 300 165"/>'+arrow(306,165)
             + '<path d="M512 165 Q560 178 590 203"/>'+arrow(596,208))
      + "\n" + txt([(115,129,"id"),(215,129,"kat"),(115,172,"12"),(215,172,"4"),
                    (115,215,"13"),(215,215,"7"),(115,258,"14"),(215,258,"4"),
                    (365,129,"id"),(465,129,"namn"),(365,172,"4"),(465,172,"Hand"),
                    (365,215,"7"),(465,215,"Mät"),(365,258,"9"),(465,258,"Verk"),
                    (640,174,"id"),(720,174,"kat"),(800,174,"namn"),
                    (640,217,"12"),(720,217,"4"),(800,217,"Hand")],15)
      + "\n" + txt([(160,310,"produkter"),(410,310,"kategorier"),(720,310,"resultatet")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 12 — SQL 1.1 · Främmande nyckeln pekar hem
    # Alla tre pilarna slutar i SAMMA punkt. Tre spetsar bredvid varandra läser
    # som en trappa; en gemensam spets läser som det den är — alla pekar dit.
    pilar=("".join('<path d="M556 %d Q460 %d 372 190"/>' % (y,(y+190)//2)
                   for y in (150,190,270))+arrow(358,190,"left"))
    D['nyckeln-pekar-hem']=(
      '<svg viewBox="0 0 880 360" role="img" aria-label="Tabellen produkter till höger har flera '
      'rader med fyran, och varje fyra pekar med en heldragen pil på en enda rad i kategorier.">\n'
      + G % (rader(60,90,290,200,5,(150,))+rader(560,90,280,200,5,(650,))
             + markerad(64,172,282,36)+pilar)
      + "\n" + txt([(105,118,"id"),(250,118,"namn"),(105,158,"2"),(250,158,"Elverktyg"),
                    (105,198,"4"),(250,198,"Handverktyg"),(105,238,"7"),(250,238,"Mätverktyg"),
                    (105,278,"9"),(250,278,"Trädgård"),
                    (605,118,"id"),(745,118,"kategori_id"),
                    (605,158,"8842"),(745,158,"4"),(605,198,"8843"),(745,198,"4"),
                    (605,238,"8844"),(745,238,"7"),(605,278,"8845"),(745,278,"4")],15)
      + "\n" + txt([(205,330,"kategorier"),(700,330,"produkter")],15,' opacity="0.62"')
      + "\n</svg>")

    # 13 — Linux 1.2 · Röret tar bara det övre
    skarm=(f'<path d="{w(660,236,170,110)}"/><path d="M745 348 Q746 362 745 374"/>'
           '<path d="M700 376 Q745 374 790 376"/>')
    D['rorets-ovre-kanal']=(
      '<svg viewBox="0 0 880 430" role="img" aria-label="Kommandot ls har två rör ut. Det övre går '
      'in i grep, det nedre böjer av förbi grep och slutar på skärmen.">\n'
      + G % (f'<path d="{w(60,140,150,90)}"/>'+f'<path d="{w(400,130,150,90)}"/>'+skarm
             + '<path d="M212 170 Q300 168 390 170"/>'+arrow(398,170)
             + '<path d="M212 208 Q300 210 330 250 Q350 282 420 288 Q520 296 644 292"/>'
             + arrow(652,292))
      + "\n" + txt([(135,192,"ls"),(475,182,"grep")])
      + "\n" + txt([(300,148,"1 · stdout"),(250,268,"2 · stderr")],15)
      + "\n" + txt([(745,410,"skärmen")],15,' opacity="0.62"') + "\n</svg>")

    # 14 — Kubernetes 1.1 · Control plane och noderna
    poddar="".join(f'<path d="{w(x,288,80,52)}"/>' for x in (82,178,352,448,622,718))
    D['control-plane-och-noder']=(
      '<svg viewBox="0 0 880 430" role="img" aria-label="En låda märkt control plane med heldragna '
      'pilar ner till tre noder, var och en med två poddar inuti.">\n'
      + G % (f'<path d="{w(320,50,240,90)}"/>'
             + "".join(f'<path d="{w(x,250,220,120)}"/>' for x in (60,330,600))+poddar
             + '<path d="M440 142 Q300 146 210 206 Q180 226 170 238"/>'+arrow(170,246,"down")
             + '<path d="M440 142 Q441 194 440 238"/>'+arrow(440,246,"down")
             + '<path d="M440 142 Q580 146 670 206 Q700 226 710 238"/>'+arrow(710,246,"down"))
      + "\n" + txt([(440,102,"Control plane")])
      + "\n" + txt([(122,320,"pod"),(218,320,"pod"),(392,320,"pod"),(488,320,"pod"),
                    (662,320,"pod"),(758,320,"pod")],13,' opacity="0.7"')
      + "\n" + txt([(170,402,"Nod 1"),(440,402,"Nod 2"),(710,402,"Nod 3")],15,' opacity="0.62"')
      + "\n</svg>")

    # 15 — Kubernetes 1.1 · Servicen är en vägskylt
    skylt=(f'<path d="{w(320,150,190,80)}"/><path d="M415 232 Q416 282 415 330"/>'
           '<path d="M385 332 Q415 330 445 332"/>')
    kryss='<path d="M658 302 L792 362"/><path d="M792 302 L658 362"/>'
    D['service-vagskylten']=(
      '<svg viewBox="0 0 880 410" role="img" aria-label="En vägskylt märkt api:5000 med en heldragen '
      'pil in från frontend och tre streckade pilar ut till poddar, varav en är överkryssad.">\n'
      + G % (f'<path d="{w(50,180,160,80)}"/>'+'<path d="M212 220 Q262 219 300 220"/>'+arrow(308,220)
             + skylt
             + "".join(f'<path d="{w(640,y,170,72)}"/>' for y in (60,178))
             + f'<g opacity="0.42"><path d="{w(640,296,170,72)}"/>{kryss}</g>'
             # Utgångarna sprids över skyltens högerkant. Utgår de från samma
             # punkt buntas de tre streckade linjerna ihop till ett hopplock.
             + '<g stroke-dasharray="8 9"><path d="M514 170 Q572 166 600 130 Q615 108 628 98"/>'
             + '<path d="M516 190 Q578 192 628 210"/>'
             + '<path d="M514 210 Q572 214 600 262 Q615 296 628 328"/></g>'
             + arrow(636,96)+arrow(636,212)+arrow(636,332))
      + "\n" + txt([(130,228,"Frontend"),(415,198,"api:5000"),(725,104,"pod"),(725,222,"pod")])
      # Den överkryssade lådan får sin etikett UNDER sig: krysset går rakt
      # igenom mitten, så en etikett inuti hade legat på ett streck.
      + "\n" + txt([(725,392,"borttagen")],14,' opacity="0.5"')
      + "\n" + txt([(415,372,"Servicen")],15,' opacity="0.62"') + "\n</svg>")

    # 16 — API 1.2 · Samlingen och medlemmen
    hylla=('<path d="M280 300 Q540 297 800 299"/><path d="M282 314 Q540 311 798 313"/>'
           '<path d="M284 314 Q282 340 286 364"/><path d="M796 313 Q798 340 794 364"/>')
    slot=(f'<path d="{w(504,210,80,96)}" stroke-dasharray="7 8" opacity="0.34"/>'
          '<path d="M544 174 Q545 190 544 202" stroke-dasharray="6 7" opacity="0.5"/>')
    D['hyllan-och-ladan']=(
      '<svg viewBox="0 0 880 386" role="img" aria-label="En hylla märkt snedstreck produkter med fem '
      'platser. Den tredje lådan är utlyft ovanför hyllan och märkt med sitt eget id.">\n'
      + G % (hylla+"".join(f'<path d="{w(x,210,80,96)}"/>' for x in (310,407,601,698))
             + slot + f'<path d="{w(504,70,80,96)}"/>'
             + '<path d="M170 118 Q330 116 492 118"/>'+arrow(500,118)
             + '<path d="M170 262 Q235 260 298 262"/>'+arrow(304,262))
      + "\n" + txt([(544,48,"/produkter/8842")],16)
      + "\n" + txt([(330,96,"GET → en"),(230,240,"GET → lista")],15)
      + "\n" + txt([(544,360,"/produkter")],16.5) + "\n</svg>")

    # 17 — Terraform 1.2 · Plan läser alla tre
    moln=('<path d="M600 342 Q568 342 568 316 Q568 294 592 292 Q596 262 630 260 '
          'Q650 234 688 240 Q718 226 744 250 Q784 248 790 278 Q814 286 809 312 '
          'Q806 340 776 342 Z"/>')
    D['state-triangeln']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Tre punkter i en triangel: main.tf överst, '
      'terraform.tfstate nere till vänster och ett moln för verkligheten nere till höger.">\n'
      + G % (f'<path d="{w(350,45,180,90)}"/>'+f'<path d="{w(70,280,230,90)}"/>'+moln
             + '<path d="M390 140 Q300 190 220 210 Q185 220 185 262"/>'+arrow(185,270,"down")
             + '<path d="M490 140 Q574 172 650 184 Q700 194 700 220"/>'+arrow(700,228,"down")
             + '<g stroke-dasharray="8 9"><path d="M312 330 Q440 336 556 330"/></g>'
             + arrow(306,330,"left")+arrow(562,330))
      + "\n" + txt([(440,96,"main.tf"),(185,332,"terraform.tfstate"),(690,306,"verkligheten")],16)
      + "\n" + txt([(434,304,"jämförs")],15) + "\n</svg>")

    # 18 — Git 1.1 · Historiken ligger redan lokalt
    # Molnet är brett med flit: tjänstnamnen är 27 tecken och behöver ett halvt
    # radavstånd fri luft ut till bågen på båda sidor.
    moln2=('<path d="M300 128 Q260 128 260 98 Q260 68 294 64 Q300 32 342 30 '
           'Q368 6 414 14 Q454 0 490 28 Q544 24 554 60 Q588 70 582 102 '
           'Q578 128 532 128 Z"/>')
    laptop2=(f'<path d="{w(250,204,360,190)}"/>'
             '<path d="M214 406 Q430 404 646 406 Q628 428 600 430 Q430 434 260 430 '
             'Q232 428 214 406 Z"/>')
    mapp=('<path d="M350 250 L412 250 L426 268 L512 268 Q516 318 512 354 '
          'Q430 358 348 354 Q344 302 350 250 Z"/>')
    D['historiken-ligger-lokalt']=(
      '<svg viewBox="0 0 880 486" role="img" aria-label="En laptop med en punkt-git-mapp inuti och '
      'en streckad pil upp till ett moln med GitHub, GitLab och Bitbucket.">\n'
      + G % (moln2+laptop2+mapp
             + '<path d="M430 196 Q428 170 430 144" stroke-dasharray="8 9"/>'+arrow(430,136,"up"))
      + "\n" + txt([(430,92,"GitHub · GitLab · Bitbucket")],13)
      + "\n" + txt([(430,312,".git")])
      + "\n" + txt([(546,168,"push · valfritt")],14,' opacity="0.62"')
      + "\n" + txt([(430,466,"din dator")],15,' opacity="0.62"')
      + "\n</svg>")

    # 19 — Kubernetes 1.3 · En image, tre miljöer
    lappar="".join(f'<path d="M692 {y} Q702 {y+1} 712 {y}"/><path d="{w(712,y-23,120,46)}"/>'
                   for y in (95,210,325))
    D['en-image-tre-miljoer']=(
      '<svg viewBox="0 0 880 420" role="img" aria-label="En låda med en image och tre heldragna '
      'pilar ut till test, stage och prod. Vid varje miljö hänger en lapp med olika värde.">\n'
      + G % (f'<path d="{w(60,150,190,100)}"/>'
             + "".join(f'<path d="{w(520,y,170,80)}"/>' for y in (55,170,285))+lappar
             + '<path d="M252 200 Q380 198 440 140 Q470 110 500 96"/>'+arrow(512,95)
             + '<path d="M252 200 Q380 200 500 210"/>'+arrow(512,212)
             + '<path d="M252 200 Q380 202 440 270 Q470 300 500 324"/>'+arrow(512,326))
      + "\n" + txt([(155,206,"searchapi:v3")],16)
      + "\n" + txt([(605,101,"test"),(605,216,"stage"),(605,331,"prod")])
      + "\n" + txt([(772,101,"db=test"),(772,216,"db=stage"),(772,331,"db=prod")],13)
      + "\n" + txt([(772,392,"ConfigMap per miljö")],14,' opacity="0.62"') + "\n</svg>")

    # 20 — Git 1.2 · Grenen pekar på en commit, HEAD på grenen
    kedja=("".join(f'<path d="{circ(cx,270,28)}"/>' for cx in (180,360,540))
           + '<path d="M208 270 Q270 268 332 270"/><path d="M388 270 Q450 268 512 270"/>')
    # Vimplarna är rymligare än de ser ut att behöva: etiketten sitter inuti och
    # ska ha ett halvt radavstånd ner till både över- och underkant.
    flagga=('<path d="M540 242 Q541 194 540 146"/>'
            '<path d="M542 146 Q600 149 658 152 Q646 174 658 196 Q600 199 542 202 Z"/>')
    head=('<path d="M730 180 Q731 127 730 74"/>'
          '<path d="M732 74 Q786 77 840 80 Q830 99 840 118 Q786 121 732 124 Z"/>')
    D['grenen-och-head']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Tre commits på rad. En flagga märkt main '
      'står på den sista, och en mindre flagga märkt HEAD pekar på main-flaggan.">\n'
      + G % (kedja+flagga+head+'<path d="M730 182 Q722 206 690 200"/>'+arrow(676,199,"left"))
      + "\n" + txt([(180,277,"A"),(360,277,"B"),(540,277,"C")])
      + "\n" + txt([(596,180,"main")],15)
      + "\n" + txt([(782,106,"HEAD")],14)
      + "\n" + txt([(360,340,"historiken")],15,' opacity="0.62"') + "\n</svg>")
    # 21 — Docker 1.1 · Punkten ritar ramen
    # Bilden bär ETT argument: punkten i kommandot ritar en gräns, och gränsen
    # avgör vad COPY når. `.dockerignore` hör till nästa sektion och är medvetet
    # utelämnad — tre argument i samma bild var det som gjorde skissen otydlig.
    ram=('<path d="M120 140 Q390 137 660 140 Q662 205 660 270 Q390 273 120 270 '
         'Q118 205 120 140 Z" stroke-dasharray="9 10" stroke-width="1.5" opacity="0.55"/>')
    kryss='<path d="M500 278 L520 298"/><path d="M520 278 L500 298"/>'
    D['byggkontexten-ramen']=(
      '<svg viewBox="0 0 880 450" role="img" aria-label="Punkten sist i docker build är inringad och '
      'en pil går från den till en streckad ram runt projektmappen. Allt inuti ramen skickas till '
      'Docker. En fil under ramen når inte in.">\n'
      + G % (f'<path d="{ell(428,51,20,26)}" stroke-width="1.5" opacity="0.6"/>'
             + '<path d="M428 82 Q422 106 340 114 Q314 118 302 120"/>'+arrow(300,128,"down")
             + ram
             + f'<path d="{w(180,170,150,70)}"/><path d="{w(380,170,210,70)}"/>'
             + '<path d="M664 205 Q690 204 712 205"/>'+arrow(718,205)
             + f'<path d="{w(730,165,120,80)}"/>'
             + f'<path d="{w(400,350,220,70)}"/>'
             + '<path d="M510 344 Q508 322 510 302" stroke-dasharray="7 8"/>' + kryss)
      + "\n" + txt([(380,58,"docker build -t app:1.0")],17,anchor="end")
      + "\n" + txt([(428,58,".")],17)
      + "\n" + txt([(255,212,"app/"),(485,212,"package.json"),(790,212,"Docker"),
                    (510,392,"../nycklar")],15)
      + "\n" + txt([(250,306,"byggkontexten")],15,' opacity="0.62"') + "\n</svg>")

    # 22 — Docker 1.2 · Samma ord, tre olika maskiner
    def sjalvpil(cx, top):
        return (f'<path d="M{cx+62} {top-4} Q{cx+66} {top-48} {cx+20} {top-50} '
                f'Q{cx-26} {top-50} {cx-22} {top-12}"/>' + arrow(cx-22, top-4, "down", 11))
    D['localhost-tre-maskiner']=(
      '<svg viewBox="0 0 880 330" role="img" aria-label="Tre lådor märkta din dator, api och db. '
      'Varje låda har en pil som vänder tillbaka in i sig själv, och alla tre bär etiketten '
      'localhost.">\n'
      + G % ("".join(f'<path d="{w(x,170,200,90)}"/>' for x in (60,340,620))
             + "".join(sjalvpil(x+100,170) for x in (60,340,620)))
      + "\n" + txt([(160,223,"din dator"),(440,223,"api"),(720,223,"db")])
      + "\n" + txt([(160,300,"localhost"),(440,300,"localhost"),(720,300,"localhost")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 23 — Kubernetes 1.2 · Selectorn matchar lappen, inte Deploymenten
    # Servicens lapp har SAMMA form som poddarnas — det är formlikheten som gör
    # att man ser att den letar efter en likadan, inte efter ett objekt.
    lapp=lambda x,y: f'<path d="{w(x,y,140,44)}"/>'
    D['selectorn-matchar-lappen']=(
      '<svg viewBox="0 0 880 470" role="img" aria-label="En Service håller upp en lapp med app kolon '
      'api. Två poddar bär samma lapp och nås av heldragna pilar. Den tredje bär app kolon versalt '
      'API och pilen dit är streckad och överkryssad.">\n'
      + G % (f'<path d="{w(330,50,220,80)}"/>'
             + '<path d="M440 132 Q441 145 440 156"/>' + lapp(370,158)
             + '<path d="M410 206 Q290 226 172 288"/>'+arrow(170,296,"down")
             + '<path d="M440 206 Q441 250 440 288"/>'+arrow(440,296,"down")
             + '<path d="M470 206 Q590 226 706 262" stroke-dasharray="8 9"/>'
             + '<path d="M707 265 L725 283"/><path d="M725 265 L707 283"/>'
             + "".join(f'<path d="{w(x,300,180,80)}"/>' for x in (70,350,630))
             + lapp(90,400) + lapp(370,400) + lapp(650,400))
      + "\n" + txt([(440,97,"Service · api")])
      + "\n" + txt([(160,347,"pod"),(440,347,"pod"),(720,347,"pod")])
      + "\n" + txt([(440,186,"app: api"),(160,428,"app: api"),(440,428,"app: api"),
                    (720,428,"app: API")],14) + "\n</svg>")

    # 24 — Kubernetes 1.2 · Ingress-objektet utan controller
    # Den tomma streckade platsen är hubbens etablerade sätt att rita frånvaro —
    # samma grepp som Gäst-OS-lagret i vm-vs-container. Inget kryss behövs.
    D['ingress-utan-controller']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Ingress-objektet till vänster, en tom '
      'streckad plats i mitten märkt finns inte, och tjänsten till höger. Båda pilarna är '
      'streckade.">\n'
      + G % (f'<path d="{w(80,150,220,110)}"/>'
             + f'<path d="{w(360,150,220,110)}" stroke-dasharray="8 9" opacity="0.38"/>'
             + f'<path d="{w(640,150,180,110)}"/>'
             + '<path d="M304 205 Q328 204 350 205" stroke-dasharray="7 8"/>'+arrow(356,205)
             + '<path d="M584 205 Q606 204 628 205" stroke-dasharray="7 8"/>'+arrow(634,205))
      + "\n" + txt([(190,211,"reglerna"),(730,211,"api")])
      + "\n" + txt([(470,211,"finns inte")],15,' opacity="0.4"')
      + "\n" + txt([(190,300,"Ingress-objektet"),(470,300,"Ingress-controllern"),
                    (730,300,"tjänsten")],15,' opacity="0.62"') + "\n</svg>")

    # 25 — Kubernetes 1.3 · Variabeln står kvar, filen byts ut
    def panel_cfg(x, varde):
        return (f'<path d="{w(x,120,300,160)}"/>'
                f'<path d="M{x+15} 207 Q{x+150} 205 {x+285} 207" opacity="0.4"/>')
    D['variabeln-star-kvar']=(
      '<svg viewBox="0 0 880 360" role="img" aria-label="Samma container två gånger. Vid start har '
      'både miljövariabeln och den monterade filen värdet info. Efter en ändring i ConfigMap har '
      'bara filen bytt till debug.">\n'
      + G % (panel_cfg(80,"info") + panel_cfg(500,"debug")
             # Glesare och blekare än standardskrafferingen: här ska den peka ut
             # raden, inte konkurrera med värdet som står i den.
             + '<g stroke-width="1.1" opacity="0.26">%s</g>' % hatch(512,214,276,56,46)
             + '<path d="M386 200 Q440 199 484 200"/>'+arrow(490,200))
      + "\n" + txt([(265,180,"LOG_LEVEL=info"),(265,235,"/cfg/log=info"),
                    (685,180,"LOG_LEVEL=info"),(685,235,"/cfg/log=debug")],15)
      + "\n" + txt([(135,180,"env"),(135,235,"fil"),(555,180,"env"),(555,235,"fil")],13,
                   ' opacity="0.62"')
      + "\n" + txt([(440,92,"ConfigMap ändras")],14,' opacity="0.62"')
      + "\n" + txt([(230,330,"vid start"),(650,330,"efteråt")],15,' opacity="0.62"')
      + "\n</svg>")

    # 26 — Terraform 1.1 · Drift är höjdskillnaden
    # Avvikelsen ritas som ett AVSTÅND, inte som en pil mellan två lådor. Det
    # skiljer bilden från state-triangeln i nästa del, som har samma två objekt.
    matt=('<path d="M334 125 L752 125" stroke-dasharray="6 8" opacity="0.4"/>'
          '<path d="M646 285 L752 285" stroke-dasharray="6 8" opacity="0.4"/>'
          '<path d="M760 131 Q761 205 760 279"/>')
    konsol=(f'<path d="{w(70,240,220,90)}"/><path d="M76 268 Q180 266 284 268"/>'
            '<path d="M150 300 L150 322 L156 316 L161 326 L166 324 L161 314 L169 313 Z"/>')
    D['driften-ar-avstandet']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="main.tf säger size lika med 2 och '
      'verkligheten säger size lika med 8. Lådorna ligger på olika höjd och avståndet mellan dem är '
      'märkt drift. En konsol med muspekare pekar in i verkligheten.">\n'
      + G % (f'<path d="{w(70,80,260,90)}"/>' + konsol
             + f'<path d="{w(380,240,260,90)}"/>'
             + '<path d="M294 285 Q330 284 368 285"/>'+arrow(374,285)
             + matt + arrow(760,123,"up") + arrow(760,287,"down"))
      + "\n" + txt([(200,132,"size = 2"),(510,292,"size = 8")],16)
      + "\n" + txt([(812,212,"drift")],15)
      + "\n" + txt([(200,206,"main.tf")],15,' opacity="0.62"')
      + "\n" + txt([(180,364,"konsolen"),(510,364,"verkligheten")],15,' opacity="0.62"')
      + "\n</svg>")

    # 27 — Terraform 1.2 · Tre namn i samma block
    # Kodraden är styckad i separata text-element med känt ankare, så att
    # understrykningarna sitter under rätt token oavsett monofontens bredd.
    D['tre-namn-i-blocket']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Ett resource-block där typen, resursnamnet '
      'och argumentet name är understrukna. Tre pilar leder ner till tre lådor märkta name, typen '
      'och resursnamnet, med ägaren under varje.">\n'
      + G % ('<path d="M198 84 Q311 82 424 84"/><path d="M438 84 Q455 82 472 84"/>'
             + '<path d="M128 132 Q229 130 330 132"/>'
             + '<path d="M230 138 Q206 170 187 196"/>'+arrow(185,204,"down")
             + '<path d="M400 90 Q422 140 432 194"/>'+arrow(435,204,"down")
             + '<path d="M455 90 Q580 130 695 194"/>'+arrow(700,204,"down")
             + f'<path d="{w(90,210,190,60)}"/><path d="{w(340,210,190,60)}"/>'
             + f'<path d="{w(590,210,220,60)}"/>')
      + "\n" + txt([(186,70,"resource")],16,anchor="end")
      + "\n" + txt([(196,70,'"azurerm_resource_group"'),(436,70,'"rg"'),(484,70,"{"),
                    (128,118,'name = "rg-shop-prod"')],16,anchor="start")
      + "\n" + txt([(185,248,"name"),(435,248,"typen"),(700,248,"resursnamnet")])
      + "\n" + txt([(185,306,"Azure"),(435,306,"providern"),(700,306,"din fil")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 28 — Linux 1.1 · Prompten, del för del
    # Tokens sätts som separata text-element med 14 px luft emellan. Skrivs de
    # som en sträng hamnar understrykningarna under `~` och `$` 3 px isär och
    # läser som ett enda streck.
    D['prompten-rad-for-rad']=(
      '<svg viewBox="0 0 880 300" role="img" aria-label="Prompten lisa snabel-a shop-prod-01 kolon '
      'tilde dollar. Tre delar är understrukna med var sin pil ner till en låda. Sista tecknet har '
      'en anteckning bredvid sig.">\n'
      + G % ('<path d="M252 112 Q282 110 311 112"/><path d="M358 112 Q450 110 542 112"/>'
             + '<path d="M588 112 Q595 110 601 112"/>'
             + '<path d="M281 116 Q240 150 194 186"/>'+arrow(190,194,"down")
             + '<path d="M450 116 Q446 152 442 186"/>'+arrow(440,194,"down")
             + '<path d="M594 116 Q640 150 686 186"/>'+arrow(690,194,"down")
             + f'<path d="{w(90,200,200,70)}"/><path d="{w(340,200,200,70)}"/>'
             + f'<path d="{w(590,200,200,70)}"/>')
      + "\n" + txt([(250,80,"lisa"),(326,80,"@"),(356,80,"shop-prod-01"),(557,80,":"),
                    (587,80,"~"),(616,80,"$")],26,anchor="start")
      + "\n" + txt([(672,86,"$ vanlig · # root")],14,' opacity="0.62"',anchor="start")
      + "\n" + txt([(190,244,"användaren"),(440,244,"maskinen"),(690,244,"katalogen")],16)
      + "\n</svg>")

    # 29 — Linux 1.2 · PATH är en rad du står utanför
    # Den streckade ramen gör "utanför sökningen" till ett rumsligt faktum i
    # stället för en bildtext — samma grepp som byggkontexten-ramen.
    D['path-raden']=(
      '<svg viewBox="0 0 880 450" role="img" aria-label="Tre kataloger i en streckad ram märkt PATH '
      'genomsöks i tur och ordning och slutar i command not found. Katalogen du står i ligger utanför '
      'ramen.">\n'
      + G % ('<path d="M30 105 Q345 102 660 105 Q662 170 660 235 Q345 238 30 235 '
             'Q28 170 30 105 Z" stroke-dasharray="9 10" stroke-width="1.5" opacity="0.55"/>'
             + '<path d="M130 86 Q128 104 130 118"/>'+arrow(130,126,"down")
             + f'<path d="{w(50,130,160,80)}"/><path d="{w(250,130,200,80)}"/>'
             + f'<path d="{w(490,130,130,80)}"/>'
             + '<path d="M214 170 Q229 169 238 170"/>'+arrow(244,170)
             + '<path d="M454 170 Q469 169 478 170"/>'+arrow(478,170)
             + '<path d="M624 170 Q638 169 646 170"/>'+arrow(652,170)
             + f'<path d="{w(250,310,260,80)}"/>')
      + "\n" + txt([(130,58,"deploy.sh")],18)
      + "\n" + txt([(130,177,"/usr/bin"),(350,177,"/usr/local/bin"),(555,177,"/bin")],15)
      + "\n" + txt([(668,176,"command not found")],14,anchor="start")
      + "\n" + txt([(380,357,"./deploy.sh")],16)
      + "\n" + txt([(345,272,"PATH, i ordning")],15,' opacity="0.62"')
      + "\n" + txt([(380,424,"katalogen du står i")],15,' opacity="0.62"')
      + "\n</svg>")

    # 30 — Git 1.2 · Merge mot rebase
    # r=26, inte 22: en tvåteckensetikett som C' behöver mer luft ut till bågen
    # än en enteckens. Vid r=22 nuddar cirkeln etikettens ruta.
    def commit(cx, cy, txt_=None): return f'<path d="{circ(cx,cy,26)}"/>'
    D['merge-vs-rebase']=(
      '<svg viewBox="0 0 880 350" role="img" aria-label="Till vänster möts två utvecklingslinjer i en '
      'merge-commit. Till höger ligger samma commits på en rak linje, men två av dem har fått '
      'primtecken för att visa att de är nya objekt.">\n'
      + G % ("".join(commit(x,120) for x in (70,160,380))
             + "".join(commit(x,225) for x in (230,320))
             + '<path d="M96 120 Q115 119 134 120"/>'
             + '<path d="M186 120 Q270 118 354 120"/>'
             + '<path d="M178 138 Q194 170 212 207"/>'
             + '<path d="M256 225 Q275 224 294 225"/>'
             + '<path d="M338 207 Q352 170 362 138"/>'
             + "".join(commit(x,120) for x in (520,610,700,790))
             + '<path d="M546 120 Q565 119 584 120"/>'
             + '<path d="M636 120 Q655 119 674 120"/>'
             + '<path d="M726 120 Q745 119 764 120"/>')
      + "\n" + txt([(70,126,"A"),(160,126,"B"),(380,126,"M"),(230,231,"C"),(320,231,"D"),
                    (520,126,"A"),(610,126,"B"),(700,126,"C'"),(790,126,"D'")],15)
      + "\n" + txt([(745,180,"nya hashar")],14,' opacity="0.62"')
      + "\n" + txt([(225,315,"merge"),(655,315,"rebase")],15,' opacity="0.62"')
      + "\n</svg>")

    # 31 — API 1.1 · Resursen är ett urval ur raden
    # De tre streckade pilarna slutar i tomma luften, utan pilspets. Det är
    # bilden av att fälten inte kommer med — inget kryss behövs.
    D['resursen-ar-ett-urval']=(
      '<svg viewBox="0 0 880 430" role="img" aria-label="Databasraden till vänster har sex fält. Tre '
      'heldragna pilar går vidare till svaret till höger. Tre streckade pilar slutar i tomma '
      'luften.">\n'
      + G % (rader(60,90,380,270,6,(290,)) + rader(580,90,280,135,3,(700,))
             + "".join(f'<path d="M444 {y} Q510 {y-1} 570 {y}"/>'+arrow(576,y)
                       for y in (112,157,202))
             + "".join(f'<path d="M444 {y} Q490 {y-1} 530 {y}" stroke-dasharray="7 8"/>'
                       for y in (247,292,337)))
      + "\n" + txt([(175,120,"id"),(365,120,"8842"),
                    (175,165,"namn"),(365,165,"Skruvmejsel"),
                    (175,210,"pris"),(365,210,"149"),
                    (175,255,"inkopspris"),(365,255,"62"),
                    (175,300,"leverantor_id"),(365,300,"7"),
                    (175,345,"senast_andrad_av"),(365,345,"lisa"),
                    (640,120,"id"),(780,120,"8842"),
                    (640,165,"namn"),(780,165,"Skruvmejsel"),
                    (640,210,"pris"),(780,210,"149")],14)
      + "\n" + txt([(250,400,"databasraden"),(720,400,"svaret")],15,' opacity="0.62"')
      + "\n</svg>")

    # 32 — API 1.1 · Grinden går att runda
    D['grinden-gar-att-runda']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Webbläsaren går genom formulärets kontroller '
      'till API:et. curl går utanför grinden och når API:et direkt.">\n'
      + G % (f'<path d="{w(50,80,200,90)}"/>' + f'<path d="{w(360,70,200,110)}"/>'
             + f'<path d="{w(660,140,180,100)}"/>' + f'<path d="{w(50,270,200,90)}"/>'
             + '<path d="M252 125 Q300 124 348 125"/>'+arrow(354,125)
             + '<path d="M564 125 Q612 128 640 164"/>'+arrow(652,170)
             + '<path d="M252 315 Q450 318 570 276 Q615 258 640 220"/>'+arrow(652,215))
      + "\n" + txt([(150,132,"webbläsaren"),(460,132,"formuläret"),(750,196,"API:et"),
                    (150,322,"curl")])
      + "\n" + txt([(460,214,"klientens kontroller")],15,' opacity="0.62"')
      + "\n" + txt([(430,352,"går runt")],14,' opacity="0.62"') + "\n</svg>")

    # 33 — API 1.2 · Vem skriver numret
    # Asymmetrin ÄR poängen: numret står i paketet till höger och i servern till
    # vänster. Det behövs ingen text som säger vem som bestämmer.
    D['vem-skriver-numret']=(
      '<svg viewBox="0 0 880 430" role="img" aria-label="Vid POST skickas paketet utan nummer och '
      'servern sätter id 8842. Vid PUT står 8842 redan på paketet och servern lägger den där.">\n'
      + G % (f'<path d="{w(80,80,220,110)}"/>'
             + '<path d="M190 194 Q191 216 190 238"/>'+arrow(190,246,"down")
             + f'<path d="{w(80,260,220,100)}"/>'
             + f'<path d="{w(580,80,220,110)}"/>'
             + '<path d="M592 146 Q690 144 788 146" opacity="0.4"/>'
             + '<path d="M690 194 Q691 216 690 238"/>'+arrow(690,246,"down")
             + f'<path d="{w(580,260,220,100)}"/>')
      + "\n" + txt([(190,142,"{ namn, pris }"),(690,126,"{ namn, pris }"),(690,172,"8842")],15)
      + "\n" + txt([(190,300,"servern"),(690,316,"servern")],16)
      + "\n" + txt([(190,332,"id = 8842")],14)
      + "\n" + txt([(190,400,"POST /produkter"),(690,400,"PUT /produkter/8842")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 34 — SQL 1.1 · Kopplingstabellen
    # De två pilarna som korsar varandra till höger är avsiktliga: korsningen ÄR
    # många-till-många. Med bara en främmande nyckel går den inte att rita.
    D['kopplingstabellen']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Tabellen produkt_taggar i mitten har tre '
      'rader. Varje rad pekar med en pil åt vänster mot en produkt och en pil åt höger mot en tagg. '
      'Två av pilarna korsar varandra.">\n'
      + G % (rader(60,105,180,150,2) + rader(340,90,260,180,3,(470,))
             + rader(700,105,160,150,2,(760,))
             + '<path d="M336 120 Q292 124 256 138"/><path d="M336 180 Q292 172 256 148"/>'
             + arrow(248,142,"left")
             + '<path d="M336 240 Q292 234 256 212"/>' + arrow(248,217,"left")
             + '<path d="M604 120 Q650 124 688 138"/><path d="M604 240 Q650 210 688 148"/>'
             + arrow(696,142)
             + '<path d="M604 180 Q650 190 688 212"/>' + arrow(696,217))
      + "\n" + txt([(150,150,"8842"),(150,225,"8843"),
                    (405,127,"8842"),(535,127,"3"),
                    (405,187,"8842"),(535,187,"7"),
                    (405,247,"8843"),(535,247,"3"),
                    (730,150,"3"),(810,150,"rea"),(730,225,"7"),(810,225,"nyhet")],15)
      + "\n" + txt([(150,310,"produkter"),(470,310,"produkt_taggar"),(780,310,"taggar")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 35 — Azure 1.0 · Resurs-ID:t är hela adressen
    # Anatomiformen lodrätt i stället för vågrätt: strängen är för lång för en rad
    # i 880 px, och artikeln bryter den på samma ställen. Rutan är ETT objekt —
    # en sträng — med fyra namngivna delar, precis som url-raden.
    idrader=[("/subscriptions/12345678-…-90ab","prenumeration"),
             ("/resourceGroups/shop-prod","resursgrupp"),
             ("/providers/Microsoft.Storage","leverantör"),
             ("/storageAccounts/shopbilder","resurs")]
    idsep="".join(f'<path d="M64 {y} Q300 {y-1} 528 {y}" stroke-dasharray="6 7" opacity="0.45"/>'
                  for y in (113,170,227))
    idpil="".join(f'<path d="M536 {y} Q552 {y+1} 566 {y}"/>'+arrow(572,y,"right",10)
                  for y in (84,141,198,255))
    D['resurs-id-raden']=(
      # Smalare viewBox än de andra: bilden är 59..707 bred, och 880 hade gett
      # ett tomt fält till höger som läser som att något fattas.
      '<svg viewBox="0 0 768 336" role="img" aria-label="Ett resurs-ID brutet på fyra rader i en '
      'ruta. Varje rad har en pil åt höger till sitt namn: prenumeration, resursgrupp, leverantör '
      'och resurs.">\n'
      + G % (f'<path d="{w(60,56,470,228)}"/>'+idsep+idpil)
      + "\n" + txt([(78,89+i*57,s) for i,(s,_) in enumerate(idrader)],13.5,anchor="start")
      + "\n" + txt([(590,89+i*57,e) for i,(_,e) in enumerate(idrader)],15,anchor="start")
      + "\n" + txt([(295,320,"ett resurs-ID")],15,' opacity="0.62"') + "\n</svg>")

    # 36 — Azure 1.0 · Logisk zon vs fysisk zon
    # Båda pilarna är streckade: mappningen är härledd, inte ett flöde. Att de
    # INTE korsar varandra är ett val — poängen bärs av att siffran är densamma
    # och huset ett annat, och en korsning hade bara gjort bilden svårare.
    hus="".join(f'<path d="{w(x,120,130,90)}"/><path d="M{x-14} 122 L{x+65} 70 L{x+144} 122"/>'
                for x in (330,510,690))
    zonpil=('<path d="M258 118 Q470 96 682 164" stroke-dasharray="8 9"/>'+arrow(688,168)
            +'<path d="M258 272 Q350 266 452 210" stroke-dasharray="8 9"/>'+arrow(458,205))
    D['zon-ettan']=(
      '<svg viewBox="0 0 880 396" role="img" aria-label="Två klippbräden märkta zon 1 pekar med '
      'streckade pilar in i en region med tre hus. Prenumeration A pekar på az3 och prenumeration B '
      'på az1.">\n'
      + G % (f'<path d="{w(300,36,560,232)}" stroke-dasharray="9 10" opacity="0.45"/>'
             + hus + f'<path d="{w(50,86,206,74)}"/><path d="{w(50,240,206,74)}"/>' + zonpil)
      + "\n" + txt([(153,132,"zon 1"),(153,286,"zon 1")],17)
      + "\n" + txt([(395,242,"az1"),(575,242,"az2"),(755,242,"az3")],15)
      + "\n" + txt([(153,184,"Prenumeration A"),(153,338,"Prenumeration B")],13.5,' opacity="0.62"')
      + "\n" + txt([(580,308,"swedencentral")],15,' opacity="0.62"') + "\n</svg>")

    # 37 — Azure 1.1 · Container Apps skalar till noll
    plattor=(f'<path d="{w(60,248,340,24)}"/>'
             f'<path d="{w(480,248,340,24)}" stroke-dasharray="8 9" opacity="0.35"/>')
    repliker=(f'<path d="{w(90,158,120,86)}"/><path d="{w(240,158,120,86)}"/>'
              f'<path d="{w(510,158,120,86)}" stroke-dasharray="7 8" opacity="0.28"/>'
              f'<path d="{w(660,158,120,86)}" stroke-dasharray="7 8" opacity="0.28"/>')
    # Mätaren står i höjd med replikerna, inte ovanför dem: den ska läsas som
    # den tomma plattans räkneverk, inte som en egen rubrik.
    matare=(f'<path d="{circ(820,200,30)}"/><path d="M820 200 Q806 194 800 184"/>')
    D['skala-till-noll']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Till vänster två repliker på en heldragen '
      'platta märkt dagtid. Till höger en streckad tom platta märkt natten, med en mätare som står '
      'på noll.">\n'
      + G % (plattor + repliker + matare)
      + "\n" + txt([(150,208,"replik"),(300,208,"replik")],15)
      + "\n" + txt([(820,208,"0")],17)
      + "\n" + txt([(230,318,"dagtid"),(650,318,"natten")],18.5) + "\n</svg>")

    # 38 — Azure 1.1 · Stoppad vs frigjord
    # Båda maskinerna är avstängda — strömsymbolen är densamma. Skillnaden ligger
    # helt i plattan under: skrafferad = hårdvaran är fortfarande din och kostar.
    stromb=lambda cx,cy: f'<path d="{circ(cx,cy,13)}"/><path d="M{cx} {cy-9} Q{cx+1} {cy-2} {cx} {cy+5}"/>'
    D['stoppad-vs-frigjord']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Två avstängda serverlådor. Den vänstra står '
      'på en skrafferad platta märkt hårdvaran reserverad, den högra svävar över en streckad tom '
      'platta märkt hårdvaran släppt.">\n'
      + G % (f'<path d="{w(60,268,320,26)}"/>' + markerad(66,272,308,18,22)
             + f'<path d="{w(110,130,220,132)}"/>' + stromb(300,152)
             + f'<path d="{w(500,268,320,26)}" stroke-dasharray="8 9" opacity="0.33"/>'
             + f'<path d="{w(550,110,220,132)}"/>' + stromb(740,132))
      + "\n" + txt([(220,200,"VM"),(660,180,"VM")],17)
      + "\n" + txt([(220,330,"hårdvaran reserverad"),(660,330,"hårdvaran släppt")],13.5,
                   ' opacity="0.62"')
      + "\n" + txt([(220,376,"stoppad"),(660,376,"frigjord")],18.5) + "\n</svg>")

    # 39 — AWS 1.0 · ARN:ens anatomi
    # Vågrät anatomiform, till skillnad från Azures lodräta resurs-id-raden: en ARN
    # ryms på en rad, och POÄNGEN är de två tomma rutorna. Skrafferingen markerar
    # dem — det är tomrummet som ska dra ögat, inte texten.
    arnseg=[(149,96,"arn","prefix"),(245,96,"aws","partition"),(341,80,"s3","tjänst"),
            (421,80,"","region"),(501,80,"","konto"),(581,150,"min-hink","resurs")]
    arnsep="".join(f'<path d="M{x} 78 Q{x+1} 100 {x} 120" stroke-dasharray="6 7" opacity="0.5"/>'
                   for x,_,_,_ in arnseg[1:])
    arnner="".join(f'<path d="M{x+b/2:.0f} 130 Q{x+b/2+1:.0f} 148 {x+b/2:.0f} 164"/>'
                   + arrow(x+b/2,170,"down",10) for x,b,_,_ in arnseg)
    D['arn-raden']=(
      '<svg viewBox="0 0 880 244" role="img" aria-label="En ARN uppdelad i sex rutor med en pil ner '
      'till varje dels namn. Rutorna för region och konto är tomma och skrafferade.">\n'
      + G % (f'<path d="{w(149,74,582,50)}"/>'+arnsep
             + markerad(425,78,72,42,20) + markerad(505,78,72,42,20) + arnner)
      + "\n" + txt([(x+b/2,105,s) for x,b,s,_ in arnseg if s],15)
      + "\n" + txt([(x+b/2,200,e) for x,b,_,e in arnseg],14.5) + "\n</svg>")

    # 40 — AWS 1.0 · Resursgrupp vs taggar
    # Lapparna HÄNGER under lådorna, inte ovanpå. Första försöket satte dem ovanför
    # och då skar den streckade ellipsen rakt genom etiketttexten — ögat läste
    # strecken som en del av lappen. Hängande lappar ger 19–26 px fri luft överallt.
    lappar="".join(f'<path d="M{x+27} 230 Q{x+28} 240 {x+27} 250"/><path d="{w(x,250,54,28)}"/>'
                   for x in (546,726))
    D['taggen-inte-behallaren']=(
      '<svg viewBox="0 0 880 384" role="img" aria-label="Till vänster två lådor inuti en ram. Till '
      'höger två fristående lådor med varsin hängande lapp, omslutna av en streckad ellips.">\n'
      + G % (f'<path d="{w(70,100,330,180)}"/>'
             + f'<path d="{w(105,146,110,84)}"/><path d="{w(245,146,110,84)}"/>'
             + f'<path d="{w(520,146,110,84)}"/><path d="{w(700,146,110,84)}"/>' + lappar
             + f'<path d="{ell(660,200,200,118)}" stroke-dasharray="9 10" opacity="0.45"/>')
      + "\n" + txt([(573,268,"prod"),(753,268,"prod")],13)
      + "\n" + txt([(235,352,"resursgruppen"),(660,352,"taggarna")],18.5) + "\n</svg>")

    # 41 — AWS 1.1 · Fargate tar bort noden
    D['fargate-utan-nod']=(
      '<svg viewBox="0 0 880 366" role="img" aria-label="Till vänster två tasks som står på en '
      'heldragen instans. Till höger samma två tasks över en streckad, tom platta.">\n'
      + G % (f'<path d="{w(70,220,330,78)}"/>'
             + f'<path d="{w(108,124,112,82)}"/><path d="{w(250,124,112,82)}"/>'
             + f'<path d="{w(480,220,330,78)}" stroke-dasharray="8 9" opacity="0.3"/>'
             + f'<path d="{w(518,124,112,82)}"/><path d="{w(660,124,112,82)}"/>')
      + "\n" + txt([(164,172,"task"),(306,172,"task"),(574,172,"task"),(716,172,"task")],14)
      + "\n" + txt([(235,266,"EC2-instans")],15)
      + "\n" + txt([(645,266,"ingen instans")],15,' opacity="0.42"')
      + "\n" + txt([(235,344,"EC2-läget"),(645,344,"Fargate")],18.5) + "\n</svg>")

    # 42 — AWS 1.1 · Publik IP vs elastisk IP
    # Spikarna till höger är två små cirklar, inte en dekoration: de är hela
    # skillnaden mellan bilderna och därför det enda som skiljer dem åt i form.
    D['ip-lappen-byts']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Två maskiner med varsin skylt. Den vänstra '
      'skylten dras iväg av en streckad pil, den högra hålls fast av två spikar.">\n'
      + G % (f'<path d="{w(80,86,240,130)}"/><path d="M200 216 Q201 224 200 232"/>'
             + f'<path d="{w(110,232,180,46)}"/>'
             + '<path d="M298 255 Q342 264 374 252" stroke-dasharray="7 8"/>' + arrow(380,250)
             + f'<path d="{w(560,86,240,130)}"/><path d="M680 216 Q681 224 680 232"/>'
             + f'<path d="{w(590,232,180,46)}"/>'
             + f'<path d="{circ(606,255,6)}"/><path d="{circ(754,255,6)}"/>')
      + "\n" + txt([(200,158,"EC2"),(680,158,"EC2")],17)
      + "\n" + txt([(200,262,"52.16.7.9")],14.5)
      + "\n" + txt([(680,262,"elastisk")],14.5)
      + "\n" + txt([(200,344,"publik IP"),(680,344,"elastisk IP")],18.5) + "\n</svg>")

    return D

if __name__ == "__main__":
    for namn, svg in alla().items():
        print('\n  /* ---- %s ---- */\n  "%s": `\n%s`,' % (namn, namn, svg))
