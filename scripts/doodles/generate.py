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
    hus="".join(f'<path d="{w(x,96,140,86)}"/><path d="M{x-14} 98 L{x+70} 46 L{x+154} 98"/>'
                for x in (280,480,680))
    # Klippbräden ligger UNDER regionen och pilarna går upp underifrån. Första
    # versionen hade dem till vänster, och då korsade pilarna rakt genom husen
    # och landade ovanpå az-etiketterna — oläsbart.
    zonpil=('<path d="M160 266 Q230 232 344 196" stroke-dasharray="8 9"/>'+arrow(350,191,"up")
            +'<path d="M440 266 Q580 242 744 196" stroke-dasharray="8 9"/>'+arrow(750,191,"up"))
    D['zon-ettan']=(
      '<svg viewBox="0 0 880 420" role="img" aria-label="Tre hus i en streckad region. Två '
      'klippbräden under regionen, båda märkta zon 1, pekar med streckade pilar upp mot olika hus.">\n'
      + G % (f'<path d="{w(240,30,600,190)}" stroke-dasharray="9 10" opacity="0.45"/>'
             + hus + f'<path d="{w(60,270,200,74)}"/><path d="{w(340,270,200,74)}"/>' + zonpil)
      + "\n" + txt([(350,150,"az1"),(550,150,"az2"),(750,150,"az3")],15)
      + "\n" + txt([(163,314,"zon 1"),(443,314,"zon 1")],17)
      + "\n" + txt([(540,208,"swedencentral")],14,' opacity="0.55"')
      + "\n" + txt([(163,368,"Prenumeration A"),(443,368,"Prenumeration B")],13.5,
                   ' opacity="0.62"') + "\n</svg>")

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

    # 43 — CI/CD 1.0 · Artefakt vs cache
    # Vänster: heldragna pilar, lådan lämnas vidare. Höger: streckade pilar upp till
    # hyllan och ner igen — cachen KAN saknas nästa gång, och streckat är hubbens
    # tecken för härlett eller uteblivet.
    hylla=('<path d="M540 150 Q660 148 790 150"/><path d="M542 162 Q660 160 788 162"/>'
           '<path d="M544 162 Q542 186 546 208"/><path d="M786 161 Q788 186 784 208"/>')
    D['artefakten-och-cachen']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Till vänster lämnas en låda vidare mellan '
      'två jobb med heldragna pilar. Till höger går en streckad dubbelriktad linje mellan ett jobb '
      'och en låda på en hylla.">\n'
      + G % (f'<path d="{w(60,150,130,90)}"/>' + '<path d="M194 195 Q202 196 210 195"/>' + arrow(216,195)
             + f'<path d="{w(222,166,66,58)}"/>'
             + '<path d="M292 195 Q300 196 308 195"/>' + arrow(314,195)
             + f'<path d="{w(320,150,130,90)}"/>'
             + hylla + f'<path d="{w(606,88,120,58)}"/>'
             + f'<path d="{w(600,250,140,86)}"/>'
             # EN linje med huvud i båda ändar: hämtas och läggs tillbaka är samma väg.
             + '<path d="M668 244 Q670 208 668 172" stroke-dasharray="7 8"/>'
             + arrow(668,166,"up") + arrow(668,250,"down"))
      + "\n" + txt([(125,200,"jobb 1"),(385,200,"jobb 2"),(670,298,"jobb")],15)
      + "\n" + txt([(255,364,"artefakten"),(665,364,"cachen")],18.5) + "\n</svg>")

    # 44 — CI/CD 1.1 · Matrisen
    rutor="".join(f'<path d="{w(x,y,160,96)}"/>' for x in (430,620) for y in (78,208))
    fanpil="".join(f'<path d="M232 {a} Q330 {b} 420 {c}"/>' + arrow(426,c)
                   for a,b,c in ((186,150,126),(194,176,176),(206,214,240),(214,240,290)))
    D['matrisen-fyra-korningar']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Ett jobb till vänster med fyra pilar ut '
      'till ett rutnät med fyra jobb, ett per kombination av Node-version och operativsystem.">\n'
      + G % (f'<path d="{w(70,150,160,100)}"/>' + rutor + fanpil)
      + "\n" + txt([(150,206,"ett jobb")],15)
      + "\n" + txt([(510,116,"22"),(700,116,"22"),(510,246,"24"),(700,246,"24")],17)
      + "\n" + txt([(510,148,"ubuntu"),(700,148,"windows"),
                    (510,278,"ubuntu"),(700,278,"windows")],13.5,' opacity="0.7"')
      + "\n" + txt([(150,352,"i filen"),(605,352,"fyra jobb")],18.5) + "\n</svg>")

    # 45 — CI/CD 1.1 · Nyckeln som upphör
    # Nyckeln är samma form på båda sidor. Bara linjen skiljer — heldragen mot
    # streckad — så ögat läser skillnaden som livslängd, inte som två olika saker.
    def nyckel(cx, dash=""):
        return (f'<path d="{circ(cx,170,30)}"{dash}/>'
                f'<path d="{w(cx+28,158,150,24)}"{dash}/>'
                f'<path d="{w(cx+114,182,14,20)}"{dash}/>'
                f'<path d="{w(cx+140,182,14,20)}"{dash}/>')
    D['nyckeln-som-upphor']=(
      '<svg viewBox="0 0 880 356" role="img" aria-label="Till vänster en heldragen nyckel som '
      'hänger på en ring. Till höger samma nyckel ritad med streckade linjer, inuti en streckad '
      'ram.">\n'
      + G % (f'<path d="{circ(140,170,44)}"/>' + '<path d="M184 170 Q196 171 208 170"/>'
             + nyckel(238)
             + f'<path d="{w(556,104,300,132)}" stroke-dasharray="9 10" opacity="0.4"/>'
             + nyckel(616, ' stroke-dasharray="7 8" opacity="0.5"'))
      + "\n" + txt([(290,318,"secret"),(706,318,"OIDC-token")],18.5) + "\n</svg>")

    # 46 — Observability 1.0 · De tre signalerna
    # Taxonomiformen: tre fysiska föremål bredvid varandra, ett per signal.
    # Boken har rader, mätaren en visare, tråden går genom tre lådor. Ingen pil
    # mellan dem — de är alternativ, inte ett flöde.
    bok=(f'<path d="{w(70,110,230,150)}"/><path d="M185 112 Q186 184 185 258"/>'
         + "".join(f'<path d="M96 {y} Q140 {y-1} 172 {y}"/><path d="M198 {y} Q242 {y-1} 274 {y}"/>'
                   for y in (146,176,206,236)))
    matare=(f'<path d="{circ(475,185,78)}"/><path d="M475 185 Q452 168 436 142"/>'
            + f'<path d="{circ(475,185,7)}"/>'
            + "".join(f'<path d="M{475+x1} {185+y1} L{475+x2} {185+y2}"/>'
                      for x1,y1,x2,y2 in ((-55,-40,-46,-33),(0,-68,0,-57),(55,-40,46,-33))))
    # Tråden går RAKT genom lådorna med en knut i varje. Första versionen lät den
    # slingra sig mellan dem, och då lästes den som ett klotter i stället för som
    # ett sammanhang som passerar tre ställen.
    trad=(f'<path d="{w(660,118,180,52)}"/><path d="{w(660,194,180,52)}"/>'
          f'<path d="{w(660,270,180,52)}"/>'
          '<path d="M750 100 Q754 220 750 340" stroke-width="1.6"/>'
          + "".join(f'<path d="{circ(750,y,7)}"/>' for y in (144,220,296)))
    D['tre-signalerna']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En uppslagen bok, en mätare med visare, och '
      'tre lådor med en rak tråd som går genom alla tre med en knut i varje.">\n'
      + G % (bok + matare + trad)
      + "\n" + txt([(185,352,"logg"),(475,352,"mätvärde"),(750,368,"spårning")],18.5) + "\n</svg>")

    # 47 — Observability 1.0 · Kardinalitetsexplosionen
    # Vänster: fem lådor med luft emellan. Höger: samma hylla proppfull av smala
    # lådor. Ingen siffra i bilden — mängden ÄR poängen, och en siffra hade fått
    # ögat att läsa den i stället för att se skillnaden.
    def hyllplan(x0,x1,y):
        return (f'<path d="M{x0} {y} Q{(x0+x1)/2:.0f} {y-2} {x1} {y}"/>'
                f'<path d="M{x0} {y+12} Q{(x0+x1)/2:.0f} {y+10} {x1} {y+12}"/>'
                f'<path d="M{x0+4} {y+12} Q{x0+2} {y+36} {x0+6} {y+58}"/>'
                f'<path d="M{x1-4} {y+11} Q{x1-2} {y+36} {x1-6} {y+58}"/>')
    D['kardinalitetsexplosionen']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Två hyllor. Den vänstra har fem lådor med '
      'luft emellan, den högra är proppfull av smala lådor.">\n'
      + G % (hyllplan(56,404,236) + "".join(f'<path d="{w(x,150,54,86)}"/>' for x in (72,140,208,276,344))
             + hyllplan(476,824,236)
             + "".join(f'<path d="{w(x,150,14,86)}" stroke-width="1.4"/>'
                       for x in range(482,818,17)))
      + "\n" + txt([(230,346,"status"),(650,346,"status + user_id")],18.5) + "\n</svg>")

    # 48 — Observability 1.1 · Pull vs push
    D['pull-och-push']=(
      '<svg viewBox="0 0 880 386" role="img" aria-label="Till vänster hämtar en databas från två '
      'tjänster med pilar som pekar mot databasen. Till höger skickar tjänsterna själva, med pilar '
      'som pekar från dem.">\n'
      + G % (f'<path d="{w(60,86,120,64)}"/><path d="{w(60,216,120,64)}"/>'
             + f'<path d="{w(276,146,132,84)}"/>'
             + '<path d="M270 174 Q226 148 186 122"/>' + arrow(180,118,"left")
             + '<path d="M270 202 Q226 228 186 248"/>' + arrow(180,251,"left")
             + f'<path d="{w(478,86,120,64)}"/><path d="{w(478,216,120,64)}"/>'
             + f'<path d="{w(694,146,132,84)}"/>'
             + '<path d="M604 122 Q648 148 688 174"/>' + arrow(694,178)
             + '<path d="M604 248 Q648 228 688 202"/>' + arrow(694,198))
      + "\n" + txt([(120,124,"tjänst"),(120,254,"tjänst"),
                    (538,124,"tjänst"),(538,254,"tjänst")],14)
      + "\n" + txt([(342,194,"db"),(760,194,"db")],15)
      + "\n" + txt([(234,352,"pull"),(652,352,"push")],18.5) + "\n</svg>")

    # 49 — Observability 1.1 · Medelvärdet döljer svansen
    # Staplarna är sorterade så att svansen hamnar till höger, och medellinjen
    # dras HELA vägen över bilden: poängen är att den passerar under den höga
    # stapeln utan att röra den.
    hojder=[38,44,50,54,58,62,66,72,80,96,150]
    staplar="".join(f'<path d="{w(70+i*66,268-h,48,h)}"/>' for i,h in enumerate(hojder))
    D['medelvardet-doljer-svansen']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Elva staplar som växer åt höger. En '
      'vågrät linje märkt medel ligger lågt och passerar under den sista, mycket högre stapeln, '
      'som är märkt p95.">\n'
      + G % (staplar + '<path d="M56 208 Q440 206 824 208" stroke-dasharray="9 9"/>'
             + '<path d="M796 118 Q798 152 796 186"/>' + arrow(796,192,"down")
             + '<path d="M60 288 Q440 290 824 288" opacity="0.5"/>')
      # Etiketten sitter i VÄNSTER ände. I höger ände krockade den med p95-pilens
      # spets — ögat läste dem som ett enda hopklumpat märke.
      + "\n" + txt([(62,200,"medel")],15,' opacity="0.75"',"start")
      + "\n" + txt([(796,108,"p95")],16)
      + "\n" + txt([(440,332,"svarstider, sorterade")],15,' opacity="0.62"') + "\n</svg>")

    # 50 — Cyber 1.0 · Hotet och sprickan
    # Molnet är streckat i konturen: det är en omständighet, inte ett föremål du
    # äger. Väggen är heldragen — den är din, och det är sprickan du kan laga.
    # Tre lösa cirklar lästes inte som ett moln. En bred ellips med två bulor
    # ovanpå, alla streckade, ger en sammanhängande blob.
    moln=(f'<path d="{ell(146,140,92,44)}" stroke-dasharray="8 9"/>'
          f'<path d="{ell(118,110,42,26)}" stroke-dasharray="8 9"/>'
          f'<path d="{ell(180,114,34,22)}" stroke-dasharray="8 9"/>')
    spricka=('<path d="M620 98 L636 138 L612 174 L640 216 L616 254 L630 286"/>')
    D['hotet-och-sprickan']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Ett streckat moln till vänster med en '
      'streckad pil mot en heldragen tegelvägg till höger, där en spricka går genom väggen.">\n'
      + G % (moln + rader(470,96,320,190,4,(576,682))
             + spricka
             + '<path d="M234 132 Q380 128 596 152" stroke-dasharray="8 9"/>' + arrow(602,154))
      + "\n" + txt([(140,340,"hot"),(630,340,"sårbarhet")],18.5) + "\n</svg>")

    # 51 — Cyber 1.0 · Förtroendegränsen
    D['fortroendegransen']=(
      '<svg viewBox="0 0 880 360" role="img" aria-label="En streckad lodrät linje delar bilden. En '
      'pil från internet korsar linjen genom en kontrollpunkt in i appen. En andra pil från appen '
      'till databasen korsar ingenting.">\n'
      + G % ('<path d="M400 40 Q403 170 400 300" stroke-dasharray="9 10" opacity="0.5"/>'
             + f'<path d="{w(70,140,200,90)}"/>'
             + f'<path d="{w(490,78,180,84)}"/><path d="{w(490,206,180,84)}"/>'
             + '<path d="M274 184 Q350 168 476 128"/>' + arrow(482,126)
             + f'<path d="{circ(400,150,15)}"/>'
             + '<path d="M580 166 Q582 184 580 198"/>' + arrow(580,204,"down"))
      + "\n" + txt([(170,192,"internet"),(580,126,"app"),(580,254,"databas")],15)
      + "\n" + txt([(170,330,"obetrott"),(580,330,"betrott")],18.5) + "\n</svg>")

    # 52 — Cyber 1.1 · Injektionen bryter ut
    # Luckan är streckad i BÅDA raderna och exakt lika bred. Det är jämförelsen:
    # samma mall, och lappen nedtill är helt enkelt större än hålet den ska i.
    # Nedre lappen är bredare än REMSAN, inte bara än hålet. Första versionen
    # gjorde den bara bredare än luckan, och då låg den kvar inuti remsan — de två
    # raderna såg identiska ut och "bryter ut" syntes inte alls.
    def rad(y, sx, sw):
        return (f'<path d="{w(150,y,580,56)}"/>'
                f'<path d="{w(390,y+8,140,40)}" stroke-dasharray="6 7" opacity="0.45"/>'
                f'<path d="{w(sx,y+11,sw,34)}"/>')
    D['injektionen-bryter-ut']=(
      '<svg viewBox="0 0 880 392" role="img" aria-label="Två likadana remsor med en streckad lucka. '
      'I den övre ryms lappen i luckan, i den undre är lappen bredare än hela remsan och sticker ut '
      'på båda sidor.">\n'
      + G % (rad(80,410,100) + rad(240,95,690))
      + "\n" + txt([(460,113,"lisa")],15)
      + "\n" + txt([(440,273,"' OR '1'='1")],15)
      + "\n" + txt([(440,180,"avsedd indata"),(440,352,"indata som bryter ut")],18.5)
      + "\n</svg>")

    # 53 — Cyber 1.1 · XSS vs CSRF
    # Vänster har en RETURPIL, höger har ingen. Det är hela skillnaden i bilden,
    # och den motsvarar att angriparen ser svaret i det ena fallet men inte det andra.
    D['xss-och-csrf']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Till vänster två pilar fram och tillbaka '
      'mellan angripare och webbläsare. Till höger en streckad pil ner i webbläsaren och en pil '
      'vidare till tjänsten, utan returpil.">\n'
      + G % (f'<path d="{w(40,120,146,84)}"/><path d="{w(252,120,150,84)}"/>'
             + '<path d="M192 146 Q216 145 240 146"/>' + arrow(246,146)
             + '<path d="M246 180 Q216 181 192 180"/>' + arrow(186,180,"left")
             + f'<path d="{w(468,120,150,84)}"/><path d="{w(688,120,150,84)}"/>'
             + '<path d="M624 162 Q652 161 680 162"/>' + arrow(686,162)
             + f'<path d="{w(486,20,120,52)}"/>'
             + '<path d="M546 74 Q548 92 546 108" stroke-dasharray="7 8"/>' + arrow(546,114,"down"))
      + "\n" + txt([(113,168,"angripare"),(327,168,"webbläsare"),
                    (543,168,"webbläsare"),(763,168,"tjänsten"),(546,52,"angripare")],14)
      + "\n" + txt([(220,336,"XSS"),(653,336,"CSRF")],18.5) + "\n</svg>")

    # 54 — Git 1.2 · fetch vs pull
    # Vänsterpanelen har EN pil, högerpanelen två. Tomrummet där den andra pilen
    # saknas är hela poängen — fetch stannar vid fjärrgrenen.
    def synk(x, andra):
        p=(f'<path d="{w(x,56,130,58)}"/><path d="{w(x,176,130,58)}"/>'
           f'<path d="{w(x+190,176,150,58)}"/>'
           f'<path d="M{x+65} 118 Q{x+67} 142 {x+65} 166"/>'+arrow(x+65,172,"down"))
        if andra:
            p+=f'<path d="M{x+134} 205 Q{x+160} 204 {x+184} 205"/>'+arrow(x+190,205)
        return p
    D['fetch-och-pull']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler. I båda går en pil från origin '
      'ner till origin/main. Bara i den högra går en andra pil vidare till arbetskopian.">\n'
      + G % (synk(60, False) + synk(500, True))
      + "\n" + txt([(125,90,"origin"),(125,210,"origin/main"),(385,210,"arbetskopian"),
                     (565,90,"origin"),(565,210,"origin/main"),(825,210,"arbetskopian")],13)
      + "\n" + txt([(230,330,"fetch"),(670,330,"pull")],18.5) + "\n</svg>")

    # 55 — Git 1.2 · Squash vs merge-commit
    def gren(x, kvar):
        p=(f'<path d="M{x} 220 Q{x+170} 218 {x+340} 220"/>'
           f'<path d="{circ(x+30,220,10)}"/><path d="{circ(x+300,220,10)}"/>'
           f'<path d="M{x+110} 150 Q{x+155} 149 {x+200} 150"/>'
           + "".join(f'<path d="{circ(x+cx,150,9)}"/>' for cx in (110,155,200)))
        if kvar:
            p+=(f'<path d="M{x+40} 212 Q{x+72} 178 {x+104} 154"/>'
                f'<path d="M{x+208} 156 Q{x+256} 186 {x+290} 212"/>')
        else:
            p+=(f'<path d="M{x+210} 158 Q{x+262} 186 {x+286} 210" stroke-dasharray="7 8"/>'
                + arrow(x+292,215))
        return p
    D['squash-eller-merge']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster tre commits ovanför '
      'huvudlinjen med en streckad pil ner till en enda commit. Till höger är de tre commitarna '
      'sammanbundna med huvudlinjen i båda ändar.">\n'
      + G % (gren(50, False) + gren(490, True))
      + "\n" + txt([(220,296,"squash"),(660,296,"merge-commit")],18.5) + "\n</svg>")

    # 56 — K8s 1.3 · Två tak, en container
    # Båda panelerna har samma tak och samma stigande kurva fram till det. Det som
    # SKILJER är enda gången ögat behöver stanna: kurvan viker av och fortsätter,
    # eller tar slut i ett kryss. Den streckade fortsättningen är gemensam — det är
    # "vad containern ville", alltså det uteblivna, i båda fallen.
    def tak(x, doda):
        ty, bx = 132, x + 196          # taknivå, brytpunkt
        p = (f'<path d="M{x} {ty} Q{x+170} {ty-2} {x+340} {ty}"/>'
             f'<path d="M{x+12} 292 Q{x+112} 286 {bx} {ty+9}"/>'
             f'<path d="M{bx} {ty+9} Q{bx+26} {ty-22} {bx+52} {ty-52}" '
             f'stroke-dasharray="7 8" opacity="0.4"/>')
        if doda:
            p += (f'<path d="M{bx-16} {ty-7} L{bx+16} {ty+25}"/>'
                  f'<path d="M{bx+16} {ty-7} L{bx-16} {ty+25}"/>')
        else:
            p += f'<path d="M{bx} {ty+9} Q{x+266} {ty+12} {x+336} {ty+10}"/>'
        return p
    D['tva-tak-en-container']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler med samma vågräta tak. Till '
      'vänster viker den stigande kurvan av under taket och fortsätter. Till höger slutar den i '
      'ett kryss vid taket. I båda fallen fortsätter en streckad linje upp genom taket.">\n'
      + G % (tak(40, False) + tak(480, True))
      + "\n" + txt([(42,116,"limit"),(482,116,"limit")],14,' opacity="0.7"',"start")
      + "\n" + txt([(210,336,"cpu · stryps"),(650,336,"minne · dödas")],18.5) + "\n</svg>")

    # 57 — K8s 1.3 · Reserverat, inte använt
    # Poängen är att den streckade ramen är STÖRRE än skrafferingen inuti den, och
    # att det ändå är ramen som tar slut. Skrafferingen ligger i botten av varje
    # fack, så den läses som en nivå och inte som en andra låda.
    #
    # Två omritningar: (1) tre fack à 152 px sprack ut ur noden — facken räknas nu
    # ur nodens innermått. (2) Etiketterna låg 14 px från ramen, under luftkravet.
    # De ligger i stället som en teckenförklaring ÖVER bilden, där de har hela
    # radavståndet fritt och dessutom förklarar de två streckens betydelse en gång
    # för alla i stället för att peka på ett enskilt fack.
    NX, NW, NB = 60, 760, 22           # nodens vänsterkant, bredd, inre marginal
    FW = (NW - 4 * NB) // 3            # fackbredd ur innermåttet, aldrig tvärtom
    def fack(i):
        x = NX + NB + i * (FW + NB)
        return (f'<path d="{w(x,118,FW,122)}" stroke-dasharray="8 9" opacity="0.55"/>'
                + markerad(x + 8, 206, FW - 16, 30, 22))
    forklaring=('<path d="M60 60 Q78 59 96 60" stroke-dasharray="8 9" opacity="0.55"/>'
                + f'<g stroke-width="1.1" opacity="0.42">{hatch(340,50,36,20,14)}</g>')
    D['reserverat-inte-anvant']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="En nod med tre streckade fack som fyller '
      'den helt. I botten av varje fack ligger en liten skrafferad nivå som upptar en bråkdel av '
      'facket. Över bilden förklaras streckad ram som reserverat och skraffering som använt.">\n'
      + G % (forklaring + f'<path d="{w(NX,96,NW,166)}"/>'
             + "".join(fack(i) for i in range(3)))
      + "\n" + txt([(106,65,"reserverat"),(386,65,"använt")],13,' opacity="0.62"',"start")
      + "\n" + txt([(440,306,"noden")],18.5) + "\n</svg>")

    # 58 — TF 1.2 · Modulens två slitsar
    # Lådan är heldragen och STÄNGD: inget streck visar vad som finns inuti, för
    # det är precis vad anroparen inte får se. Den överkryssade streckade pilen
    # måste peka mot lådans mitt — pekar den mot kanten läses den som "in i
    # lådan" i stället för "in till det inre", och poängen tappas.
    lada = f'<path d="{w(330,120,220,150)}"/>'
    inpil = ('<path d="M96 168 Q212 166 320 168"/>' + arrow(326,168) +
             '<path d="M96 226 Q212 228 320 226"/>' + arrow(326,226))
    utpil = ('<path d="M556 196 Q676 194 792 196"/>' + arrow(798,196))
    # Lådan lämnas TOM. Ett försök att antyda innehållet med en liten streckad
    # cirkel läste som en smuts på pappret, och motsade dessutom hela poängen:
    # anroparen ser inte in. Frånvaron är bilden.
    nekad = ('<path d="M440 348 Q438 300 440 250" stroke-dasharray="7 8" opacity="0.5"/>'
             + arrow(440,244,"up")
             + '<path d="M424 292 L456 320"/><path d="M456 292 L424 320"/>')
    D['modulens-tva-slitsar']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En stängd låda med två heldragna pilar in '
      'från vänster och en heldragen pil ut åt höger. Underifrån går en streckad pil mot lådans '
      'inre, överkryssad.">\n'
      + G % (lada + inpil + utpil + nekad)
      + "\n" + txt([(92,162,"prefix"),(92,220,"roll")],14,' opacity="0.7"',"end")
      + "\n" + txt([(802,190,"namn")],14,' opacity="0.7"',"start")
      + "\n" + txt([(440,104,"modules/namn")],18.5)
      + "\n" + txt([(440,378,"local.namn")],14,' opacity="0.62"') + "\n</svg>")

    # 59 — TF 1.2 · Gardinen, inte kassaskapet
    # Gardinen hänger FRAMFÖR terminalen och skymmer den. Filen bredvid har inget
    # framför sig alls — det är frånvaron av skydd som är bilden, inte en symbol
    # för det. Därför får filen inte heller något lås eller kryss.
    skarm = (f'<path d="{w(80,120,300,170)}"/>'
             '<path d="M80 158 Q230 156 380 158"/>')
    gardin = ('<path d="M64 112 Q230 109 396 112"/>'
              + "".join(f'<path d="M{x} 118 Q{x+7} 200 {x} 282" stroke-width="1.4" '
                        f'opacity="0.55"/>' for x in range(96, 381, 36)))
    fil = ('<path d="M540 118 Q634 116 706 118 L748 162 Q751 226 748 290 '
           'Q634 293 542 291 Q538 204 540 118 Z"/>'
           '<path d="M706 118 Q705 146 708 162 Q728 164 748 162"/>'
           + "".join(f'<path d="M568 {y} Q638 {y-2} 712 {y}" stroke-width="1.3" '
                     f'opacity="0.6"/>' for y in (206, 236, 266)))
    D['gardinen-inte-kassaskapet']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Till vänster en terminal med en gardin '
      'hängande framför sig. Till höger en fil med tre synliga textrader och ingenting framför.">\n'
      + G % (skarm + gardin + fil)
      + "\n" + txt([(230,148,"&lt;sensitive&gt;")],15,' opacity="0.75"')
      + "\n" + txt([(230,344,"utskriften"),(644,344,"terraform.tfstate")],18.5) + "\n</svg>")

    # 60 — Azure 1.2 · Tre delar, en tilldelning
    # Medvetet INGEN hierarki och inga staplade lådor: Azure 1.1 har redan en
    # Stack över hanteringsgrupp → prenumeration → resursgrupp, och en andra
    # lådstapel hade lästs som en upprepning. Den här visar sammanfogningen —
    # tre strömmar som möts i en punkt — vilket är en form hubben inte har än.
    def gren(y, etikett_y):
        return f'<path d="M196 {y} Q300 {y} 372 {etikett_y}"/>'
    knut = (gren(96,190) + gren(196,196) + gren(296,202)
            + f'<path d="{circ(404,196,26)}"/>'
            + '<path d="M432 196 Q548 194 664 196"/>' + arrow(670,196))
    D['tre-delar-en-tilldelning']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Tre linjer märkta principal, roll och '
      'scope löper ihop i en ring, och ur ringen går en pil ut till en ruta märkt behörighet.">\n'
      + G % (knut + f'<path d="{w(676,164,150,64)}"/>')
      + "\n" + txt([(188,102,"principal"),(188,202,"roll"),(188,302,"scope")],15,
                   ' opacity="0.8"',"end")
      # Etiketten låg först på y=332 — 104 px under lådan, vilket läste som en
      # fristående text i stället för som lådans namn. 34 px under underkanten
      # ger luft nog utan att bandet mellan dem bryts.
      + "\n" + txt([(751,262,"behörighet")],18.5) + "\n</svg>")

    # 61 — Azure 1.2 · Fickan som är tom
    # Nyckeln till vänster ritas TVÅ gånger — i appen och i filen — för det är
    # hela poängen: en hemlighet finns alltid på minst två ställen. Till höger
    # finns den på noll, och tokenet är streckat eftersom det upphör.
    nyckel = lambda cx,cy: (f'<path d="{circ(cx,cy,11)}"/>'
                            f'<path d="M{cx+11} {cy} Q{cx+34} {cy+1} {cx+56} {cy}"/>'
                            f'<path d="M{cx+42} {cy} Q{cx+43} {cy+9} {cx+42} {cy+16}"/>'
                            f'<path d="M{cx+54} {cy} Q{cx+55} {cy+8} {cx+54} {cy+14}"/>')
    vanster = (f'<path d="{w(56,120,300,140)}"/>' + nyckel(104,168)
               + f'<path d="{w(120,296,172,62)}" stroke-width="1.4" opacity="0.7"/>'
               + nyckel(150,326))
    hoger = (f'<path d="{w(524,120,300,140)}"/>'
             + f'<path d="{w(556,150,84,52)}" stroke-dasharray="7 8" opacity="0.45"/>'
             + '<path d="M700 300 Q702 268 700 238" stroke-dasharray="7 8" opacity="0.6"/>'
             + arrow(700,232,"up")
             + f'<path d="{w(646,300,108,44)}" stroke-dasharray="7 8" opacity="0.6"/>')
    D['fickan-som-ar-tom']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Till vänster en app med en nyckel i, och '
      'samma nyckel en gång till i en fil under. Till höger en app med en tom streckad ficka och '
      'en streckad pil upp från ett streckat token.">\n'
      + G % (vanster + hoger)
      + "\n" + txt([(206,246,"appen"),(674,246,"appen")],14,' opacity="0.62"')
      + "\n" + txt([(206,342,"och i filen")],14,' opacity="0.62"')
      + "\n" + txt([(700,330,"token")],14,' opacity="0.62"')
      + "\n" + txt([(598,180,"tom")],13,' opacity="0.45"')
      + "\n" + txt([(206,384,"tjänstprincipal"),(674,384,"managed identity")],18.5) + "\n</svg>")

    # 62 — AWS 1.2 · Lappen på vem
    # Pilen är IDENTISK i båda panelerna — det är hela poängen: samma åtkomst,
    # olika ställe att skriva den på. Bara lappens placering får skilja, annars
    # börjar ögat leta efter en skillnad i flödet som inte finns.
    def lapp(x, y):
        return (f'<path d="{w(x,y,66,44)}" stroke-width="1.4" opacity="0.75"/>'
                + f'<g stroke-width="1.1" opacity="0.4">{hatch(x+6,y+6,54,32,16)}</g>')
    def par(x, pa_resursen):
        p = (f'<path d="{circ(x+40,196,26)}"/>'
             f'<path d="M{x+18} 232 Q{x+40} 214 {x+62} 232"/>'
             f'<path d="M{x+76} 196 Q{x+156} 194 {x+234} 196"/>' + arrow(x+240,196)
             + f'<path d="{w(x+252,164,88,64)}"/>')
        return p + (lapp(x+270, 250) if pa_resursen else lapp(x+8, 250))
    D['lappen-pa-vem']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler med samma pil från en person '
      'till en behållare. I den vänstra sitter en skrafferad lapp under personen, i den högra '
      'under behållaren.">\n'
      + G % (par(60, False) + par(500, True))
      + "\n" + txt([(100,318,"policyn"),(830,318,"policyn")],13,' opacity="0.62"')
      + "\n" + txt([(230,352,"identitetsbaserad"),(670,352,"resursbaserad")],18.5) + "\n</svg>")

    # 63 — AWS 1.2 · Rollens två policyer
    # Dörren och fönstret sitter på SAMMA låda. Två separata lådor hade lästs som
    # två roller — och förväxlingen artikeln vill rätta är just att de tror att
    # rollen bara har en policy.
    rollada = f'<path d="{w(300,110,280,180)}"/>'
    dorr = ('<path d="M300 168 Q298 200 300 232"/>'
            '<path d="M300 168 Q330 166 358 168 Q360 200 358 232 Q330 234 300 232"/>'
            '<path d="M348 202 Q351 200 348 198"/>'
            '<path d="M150 200 Q222 198 292 200"/>' + arrow(298,200))
    fonster = ('<path d="M520 156 Q550 154 578 156 Q580 186 578 214 Q550 216 520 214 '
               'Q518 186 520 156 Z"/>'
               '<path d="M549 156 Q551 186 549 214"/>'
               '<path d="M520 185 Q550 183 578 185"/>'
               '<path d="M588 200 Q660 198 730 200" stroke-dasharray="7 8"/>' + arrow(736,200))
    D['rollens-tva-policyer']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="En låda märkt rollen med en dörr på '
      'vänster sida och ett fönster på höger. En heldragen pil går in genom dörren, en streckad '
      'pil ut genom fönstret.">\n'
      + G % (rollada + dorr + fonster)
      + "\n" + txt([(146,194,"vem")],14,' opacity="0.7"',"end")
      + "\n" + txt([(742,194,"vad")],14,' opacity="0.7"',"start")
      + "\n" + txt([(440,90,"rollen")],18.5)
      + "\n" + txt([(220,330,"förtroendepolicy"),(672,330,"behörighetspolicy")],15,
                   ' opacity="0.75"') + "\n</svg>")

    # 64 — Cyber 1.2 · Envägsmuren
    # Muren släpper igenom ÅT ETT HÅLL: den framåtgående pilen korsar den obehindrat,
    # returpilen tar stopp. Att rita muren som ogenomtränglig åt båda håll hade sagt
    # "ingenting kommer fram", vilket är fel — hashen kommer ju fram.
    # Nyckelsymbolen mellan pilarna ströks: i 544 px renderad bredd blev den en
    # klubba, och de dubbelriktade pilarna säger redan "vändbar" på egen hand.
    kryptering = (f'<path d="{w(40,146,120,68)}"/><path d="{w(250,146,120,68)}"/>'
                  '<path d="M164 166 Q205 164 244 166"/>' + arrow(250,166)
                  + '<path d="M246 198 Q205 200 166 198"/>' + arrow(160,198,"left"))
    mur = (f'<path d="{w(630,124,18,104)}"/>'
           + f'<g stroke-width="1.1" opacity="0.5">{hatch(633,127,12,98,14)}</g>')
    # Krysset ligger PÅ muren, inte bredvid returpilens spets — det är muren som
    # stoppar, och läggs krysset i mellanrummet läses det som att pilen tog slut
    # av sig själv. Tidigare version klämde in mur, spets och kryss på 37 px.
    hashning = (f'<path d="{w(460,146,120,68)}"/><path d="{w(700,146,120,68)}"/>'
                + '<path d="M584 164 Q639 162 694 164"/>' + arrow(700,164)
                + mur
                + '<path d="M696 202 Q682 203 668 202" stroke-dasharray="6 7"/>'
                + arrow(662,202,"left")
                + '<path d="M625 188 L653 216"/><path d="M653 188 L625 216"/>')
    D['envagsmuren']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster två lådor med pilar åt båda '
      'håll och en nyckel emellan. Till höger går en pil genom en skrafferad mur men returpilen '
      'stoppas av den och är överkryssad.">\n'
      + G % (kryptering + hashning)
      + "\n" + txt([(100,256,"klartext"),(310,256,"chiffer"),
                    (520,256,"klartext"),(760,256,"hash")],13,' opacity="0.62"')
      + "\n" + txt([(205,308,"kryptering"),(640,308,"hashning")],18.5) + "\n</svg>")

    # 65 — Cyber 1.2 · Biljetten och listan
    # Vänsterpanelen har en LISTA att stryka i, högerpanelen har ingen. Frånvaron
    # av listan är hela poängen — inte att biljetten ser annorlunda ut. Därför får
    # den högra biljetten bara två extra rader, inte en egen form.
    biljett = lambda x,y,rader_: (f'<path d="{w(x,y,104,58)}"/>'
        + "".join(f'<path d="M{x+16} {y+18+i*16} Q{x+52} {y+16+i*16} {x+88} {y+18+i*16}" '
                  f'stroke-width="1.2" opacity="0.55"/>' for i in range(rader_)))
    lista = (rader(258, 118, 168, 132, 4)
             + '<path d="M266 184 Q342 182 418 184"/>')
    vanster = (biljett(60, 160, 1) + '<path d="M170 188 Q212 186 250 188"/>' + arrow(256,188)
               + lista)
    hoger = (biljett(600, 160, 2)
             + '<path d="M584 188 Q656 190 720 188" stroke-dasharray="6 7" opacity="0.6"/>'
             + '<path d="M636 172 L668 204"/><path d="M668 172 L636 204"/>')
    D['biljetten-och-listan']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster en biljett med en pil till en '
      'lista där en rad är överstruken. Till höger en biljett med text i och ingen lista alls, med '
      'en överkryssad streckad linje tvärs över.">\n'
      + G % (vanster + hoger)
      + "\n" + txt([(112,254,"id"),(342,272,"listan hos servern"),
                    (652,254,"allt står i den")],13,' opacity="0.62"')
      + "\n" + txt([(240,314,"session"),(652,314,"token")],18.5) + "\n</svg>")

    # 66 — Obs 1.2 · Vattenfallet och staketet
    # Staketet MÅSTE vara många och identiska — det är antalet som är diagnosen,
    # inte längden. Åtta pinnar räckte inte för att läsa som "för många"; med
    # arton blir formen självförklarande innan man läst en etikett.
    # Första försöket la de korta spannen på EN rad. Vid 544 px renderad bredd
    # blev de 11 px långa med 10 px mellanrum och lästes som en streckad linje —
    # och streckat betyder "uteblivet" i formspråket, alltså raka motsatsen.
    # En trappa är dessutom vad ett riktigt vattenfall visar: varje fråga väntar
    # på den förra, så de kan inte ligga på samma rad.
    stapel = lambda x,y,bredd,tj=2: (f'<path d="M{x} {y} Q{x+bredd/2:.0f} {y-1} {x+bredd} {y}" '
                                     f'stroke-width="{tj}"/>')
    trappa = "".join(stapel(158+i*52, 186+i*16, 62, 3) for i in range(10))
    vattenfall = (stapel(80, 104, 720) + stapel(122, 146, 656) + trappa
                  + stapel(150, 372, 640))
    D['vattenfallet-och-staketet']=(
      '<svg viewBox="0 0 880 440" role="img" aria-label="Ett vattenfallsdiagram med två breda '
      'staplar överst, sedan tio korta staplar i en trappa nedåt höger, och en bred stapel '
      'underst.">\n'
      + G % vattenfall
      + "\n" + txt([(78,94,"GET /orders"),(120,136,"handler")],13,' opacity="0.62"',"start")
      + "\n" + txt([(148,362,"rendering")],13,' opacity="0.62"',"start")
      + "\n" + txt([(700,196,"10 × SELECT")],14,' opacity="0.75"',"start")
      + "\n" + txt([(460,420,"tiden går åt höger")],13,' opacity="0.45"') + "\n</svg>")

    # 67 — Obs 1.2 · Kedjan som bryts
    # De två spåren ritas på OLIKA höjd, inte bara med ett glapp emellan. Ligger
    # de på samma linje läser ögat dem som ett spår med ett hål — och poängen är
    # att verktyget ser två separata spår som inte vet om varandra.
    def spar(x, y, n, etikett_x):
        p = "".join(f'<path d="{w(x+i*116, y, 84, 46)}"/>' for i in range(n))
        p += "".join(f'<path d="M{x+84+i*116} {y+23} Q{x+96+i*116} {y+22} {x+108+i*116} {y+23}"/>'
                     + arrow(x+114+i*116, y+23) for i in range(n-1))
        return p
    brott = ('<path d="M400 152 Q432 176 464 200" stroke-dasharray="7 8" opacity="0.45"/>'
             '<path d="M414 158 L446 190"/><path d="M446 158 L414 190"/>')
    D['kedjan-som-bryts']=(
      '<svg viewBox="0 0 880 320" role="img" aria-label="Tre sammanlänkade lådor uppe till vänster '
      'och två nere till höger. Den streckade pilen mellan grupperna är överkryssad.">\n'
      + G % (spar(60, 84, 3, 0) + brott + spar(524, 196, 2, 0))
      + "\n" + txt([(222,72,"trace A"),(640,184,"trace B")],13,' opacity="0.62"')
      + "\n" + txt([(222,180,"frontend → api"),(640,292,"→ lager → db")],13,' opacity="0.5"')
      + "\n</svg>")

    # 68 — Nätverk 1.2 · Kedjan till roten
    # De två nedre korten står på marken (kommer över nätet). Det översta ligger
    # PÅ laptopen — det är hela poängen, och därför måste laptopen ritas ut som
    # föremål. Pilarna pekar UPPÅT: signaturen går nedifrån och valideras uppåt.
    def kort(x, y, w_, h_):
        return (f'<path d="{w(x,y,w_,h_)}"/>'
                + "".join(f'<path d="M{x+12} {y+16+i*13} Q{x+w_/2:.0f} {y+14+i*13} '
                          f'{x+w_-12} {y+16+i*13}" stroke-width="1.1" opacity="0.5"/>'
                          for i in range(2)))
    # Etiketterna låg först UNDER varje kort och hamnade då 10 px från kortkanten
    # — under luftkravet, och de lästes som en del av ramen. De ligger nu i
    # vänsterkant, där inget streck går vågrätt, och kan aldrig krocka.
    laptop = ('<path d="M602 200 Q700 198 798 200 Q800 250 798 288 Q700 290 604 288 '
              'Q598 244 602 200 Z"/>'
              '<path d="M582 302 Q700 299 818 302 Q818 310 810 312 Q700 315 590 312 '
              'Q582 310 582 302 Z"/>')
    kedja = (kort(190, 110, 180, 90) + kort(190, 250, 180, 90)
             + '<path d="M280 244 Q282 226 280 210"/>' + arrow(280,204,"up")
             + '<path d="M376 154 Q470 152 566 154" stroke-dasharray="7 8"/>'
             + arrow(572,154)
             + kort(628, 218, 144, 56))
    D['kedjan-till-roten']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Två kort ovanpå varandra till vänster med '
      'en pil uppåt mellan dem, och en streckad pil vidare till ett tredje kort som ligger på en '
      'laptop till höger.">\n'
      + G % (laptop + kedja)
      + "\n" + txt([(176,160,"mellanled"),(176,300,"servercert")],13,' opacity="0.62"',"end")
      + "\n" + txt([(471,138,"måste sluta här")],13,' opacity="0.45"')
      + "\n" + txt([(700,364,"ditt rotlager")],18.5) + "\n</svg>")

    # 69 — Nätverk 1.2 · SNI väljer certet
    # Namnet ritas som en lapp UTANFÖR kuvertet — i klartext, före krypteringen.
    # Det är den detaljen artikeln bygger på, så den får inte hamna inuti servern.
    def cert(x, y, vald):
        p = f'<path d="{w(x,y,104,56)}"' + ('/>' if vald else ' stroke-dasharray="7 8" opacity="0.4"/>')
        return p
    server = (f'<path d="{w(520,96,300,208)}"/>'
              + "".join(cert(548, 120+i*62, i==1) for i in range(3)))
    lapp = (f'<path d="{w(60,168,150,56)}"/>'
            '<path d="M216 196 Q330 194 442 196"/>' + arrow(448,196)
            + f'<path d="{w(300,236,120,44)}" stroke-width="1.3" opacity="0.65"/>')
    D['sni-valjer-certet']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="En klient till vänster med en pil in i en '
      'serverlåda som innehåller tre certifikat, varav ett är heldraget och två streckade. Under '
      'pilen ligger en lapp med värdnamnet.">\n'
      + G % (server + lapp)
      + "\n" + txt([(135,202,"klienten")],14,' opacity="0.75"')
      + "\n" + txt([(360,264,"namnet i klartext")],13,' opacity="0.62"')
      + "\n" + txt([(670,86,"en IP-adress")],18.5)
      + "\n" + txt([(600,220,"valt")],13,' opacity="0.6"') + "\n</svg>")

    # 70 — API 1.2 · Hinken fylls på
    # Droppen ovanifrån är JÄMN (en enda smal pil), skopan tar flera mynt på en
    # gång. Kontrasten mellan de två takterna är hela token bucket-idén — ritar
    # man in ett flöde ut blir det i stället en balansräkning, vilket är fel bild.
    hink = ('<path d="M330 168 Q400 166 470 168 Q462 264 452 320 Q400 326 348 320 '
            'Q338 264 330 168 Z"/>'
            '<path d="M322 168 Q400 164 478 168" stroke-width="2.2"/>')
    mynt = "".join(f'<path d="{circ(cx,cy,13)}"/>' for cx,cy in
                   ((372,268),(404,282),(436,266),(390,232),(424,228)))
    dropp = ('<path d="M400 62 Q402 100 400 138" stroke-dasharray="5 12"/>'
             + arrow(400,144,"down"))
    skopa = ('<path d="M560 214 Q622 212 684 214 Q676 262 668 288 Q622 294 578 288 '
             'Q568 258 560 214 Z"/>'
             '<path d="M488 236 Q524 234 556 236"/>' + arrow(490,236,"left")
             + f'<path d="{circ(600,252,12)}"/><path d="{circ(636,250,12)}"/>')
    D['hinken-fylls-pa']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En hink med mynt i, en jämn streckad '
      'droppe uppifrån, och en skopa till höger som tar flera mynt på en gång.">\n'
      + G % (dropp + hink + mynt + skopa)
      + "\n" + txt([(400,44,"påfyllning, jämn takt")],13,' opacity="0.6"')
      + "\n" + txt([(400,368,"hinken"),(622,368,"ett anrop")],18.5) + "\n</svg>")

    # 71 — API 1.2 · Grinden står hos klienten
    # Samma svarspil till BÅDA klienterna — det är det som gör poängen. Grinden
    # är ett eget föremål framför den ena, inte en egenskap hos servern. Ritas
    # grinden vid servern säger bilden raka motsatsen till vad artikeln lär ut.
    grind = ('<path d="M296 108 Q298 160 296 212"/>'
             + "".join(f'<path d="M262 {y} Q296 {y-2} 330 {y}" stroke-width="1.3" '
                       f'opacity="0.7"/>' for y in (132, 160, 188)))
    D['grinden-star-hos-klienten']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="En serverlåda till höger skickar samma svar '
      'till två klienter till vänster. Framför den övre klienten står ett galler, framför den undre '
      'ingenting.">\n'
      + G % (f'<path d="{w(640,120,190,130)}"/>'
             + f'<path d="{w(70,128,150,64)}"/>' + f'<path d="{w(70,258,150,64)}"/>'
             + '<path d="M630 156 Q470 154 340 158"/>' + arrow(334,158,"left")
             + '<path d="M630 208 Q440 240 226 286"/>' + arrow(220,288,"left")
             + grind)
      + "\n" + txt([(145,166,"webbläsare"),(145,296,"curl")],14,' opacity="0.78"')
      + "\n" + txt([(296,244,"CORS")],13,' opacity="0.62"')
      + "\n" + txt([(735,282,"samma svar, båda gångerna")],13,' opacity="0.5"')
      + "\n" + txt([(735,110,"API:et")],18.5) + "\n</svg>")

    # 72 — Git 1.3 · Reflogen minns vägen
    # Grenpilen är HELDRAGEN och pekar bara på den nya spetsen — det är allt
    # `git log` visar. De föräldralösa commitarna ritas streckade: de finns, men
    # inget pekar på dem. Reflogens pil går BAKÅT till en av dem, vilket är den
    # enda vägen tillbaka och därför bildens hela innehåll.
    rad = lambda y, xs, streck: "".join(
        f'<path d="{circ(x,y,14)}"' + (' stroke-dasharray="6 7" opacity="0.45"/>' if streck else '/>')
        for x in xs)
    linje = lambda y, x1, x2, streck: (
        f'<path d="M{x1} {y} Q{(x1+x2)//2} {y-2} {x2} {y}"'
        + (' stroke-dasharray="6 7" opacity="0.45"/>' if streck else '/>'))
    ny = rad(150, (300, 400, 500), False) + linje(150, 214, 286, False) \
         + linje(150, 314, 386, False) + linje(150, 414, 486, False)
    gammal = rad(280, (300, 400), True) + linje(280, 214, 286, True) + linje(280, 314, 386, True)
    stam = rad(150, (100, 200), False) + linje(150, 114, 186, False) \
           + f'<path d="M214 164 Q252 220 286 272" stroke-dasharray="6 7" opacity="0.45"/>'
    reflog = ('<path d="M520 196 Q470 250 428 288" stroke-dasharray="7 8"/>'
              + arrow(422,292))
    D['reflogen-minns-vagen']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En heldragen rad commits åt höger och en '
      'streckad rad nedanför som ingen pekar på. En streckad pil från den heldragna raden ner till '
      'den streckade är märkt reflog.">\n'
      + G % (stam + ny + gammal + reflog)
      + "\n" + txt([(556,148,"rabatt")],15,' opacity="0.8"',"start")
      + "\n" + txt([(556,286,"föräldralösa")],13,' opacity="0.5"',"start")
      + "\n" + txt([(474,262,"reflog")],13,' opacity="0.62"',"end")
      + "\n" + txt([(400,368,"samma ändring, andra hashar")],13,' opacity="0.45"') + "\n</svg>")

    # 73 — SQL 1.2 · Lost update
    # Två spår, samma tre hållpunkter, förskjutna i tid. Att BÅDA läser 100 måste
    # synas samtidigt — därför står läsvärdena i egna etiketter och inte i en
    # gemensam kolumn. Resultatet längst till höger är enda stället siffrorna
    # skiljer sig, och det är där ögat ska landa.
    def spar(y, dx):
        p = f'<path d="M{90+dx} {y} Q{380+dx} {y-2} {670+dx} {y}"/>'
        for x, r in ((130+dx, 15), (330+dx, 15), (560+dx, 15)):
            p += f'<path d="{circ(x,y,r)}"/>'
        return p
    tid = '<path d="M70 348 Q400 346 800 348" stroke-width="1.3" opacity="0.4"/>' + arrow(806,348)
    D['lost-update-tva-spar']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Två vågräta spår med tre hållpunkter var, '
      'förskjutna i tid. Båda läser 100, båda skriver 70.">\n'
      + G % (spar(126, 0) + spar(246, 60) + tid)
      + "\n" + txt([(130,80,"läser 100"),(330,80,"räknar 70"),(560,80,"skriver 70")],13,
                   ' opacity="0.62"')
      + "\n" + txt([(190,306,"läser 100"),(390,306,"räknar 70"),(620,306,"skriver 70")],13,
                   ' opacity="0.62"')
      + "\n" + txt([(60,132,"A"),(60,252,"B")],17,' opacity="0.8"',"end")
      + "\n" + txt([(400,382,"två uttag à 30, saldot blev 70")],13,' opacity="0.5"') + "\n</svg>")

    # 74 — SQL 1.2 · Migrationerna och märket
    # Filerna staplas NEDIFRÅN och upp i körordning, och märket sitter i kanten
    # vid den senast körda. De ovanför är streckade — de finns i repot men inte
    # i databasen. Utan märket vore bilden bara en filhög.
    def fil(x, y, k, streck):
        d = ' stroke-dasharray="7 8" opacity="0.45"' if streck else ''
        return (f'<path d="{w(x,y,300,52)}"{d}/>')
    stapel = ("".join(fil(240, 92 + i * 66, i, True) for i in range(2))
              + "".join(fil(240, 224 + i * 66, i, False) for i in range(2)))
    marke = ('<path d="M160 250 Q196 248 232 250"/>' + arrow(238,250)
             + f'<path d="{w(60,228,96,44)}"/>')
    D['migrationerna-och-market']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Fyra filer i en stapel. De två nedersta är '
      'heldragna, de två översta streckade. En pil från vänster pekar på den översta heldragna.">\n'
      + G % (stapel + marke)
      + "\n" + txt([(560,124,"0004_…"),(560,190,"0003_…"),
                    (560,256,"0002_…"),(560,322,"0001_…")],14,' opacity="0.7"',"start")
      + "\n" + txt([(108,254,"databasen")],13,' opacity="0.7"')
      + "\n" + txt([(390,378,"kvar att köra ligger ovanför")],13,' opacity="0.45"') + "\n</svg>")

    # 75 — Docker 1.4 · Signalen till PID 1
    # Pilen in är IDENTISK i båda panelerna — det är bara vad den träffar som
    # skiljer. Skalet ritas som en extra låda i vägen, och pilen vidare därifrån
    # är streckad och överkryssad: den vidarebefordran som aldrig sker.
    def mottagare(x, mellanlada):
        p = f'<path d="M{x} 176 Q{x+40} 174 {x+78} 176"/>' + arrow(x+84,176)
        if mellanlada:
            p += (f'<path d="{w(x+90,144,86,64)}"/>'
                  f'<path d="M{x+182} 176 Q{x+208} 174 {x+234} 176" stroke-dasharray="6 7" '
                  f'opacity="0.5"/>' + arrow(x+240,176)
                  + f'<path d="M{x+196} 160 L{x+222} 192"/><path d="M{x+222} 160 L{x+196} 192"/>'
                  + f'<path d="{w(x+248,144,96,64)}" stroke-dasharray="7 8" opacity="0.45"/>')
        else:
            p += f'<path d="{w(x+90,144,96,64)}"/>'
        return p
    D['signalen-till-pid-ett']=(
      '<svg viewBox="0 0 880 320" role="img" aria-label="Två paneler med samma inkommande pil märkt '
      'SIGTERM. I den vänstra träffar den en låda märkt sh, och pilen vidare till appen är streckad '
      'och överkryssad. I den högra träffar den appen direkt.">\n'
      + G % (mottagare(40, True) + mottagare(560, False))
      + "\n" + txt([(76,164,"SIGTERM"),(596,164,"SIGTERM")],12,' opacity="0.7"',"middle")
      + "\n" + txt([(173,184,"sh"),(386,184,"app"),(698,184,"app")],14)
      + "\n" + txt([(230,268,"shell-form · 10 s"),(698,268,"exec-form · 0 s")],17) + "\n</svg>")

    # 76 — Linux 1.2 · TOFU och rotlagret
    # Vänsterpanelen har INGEN tredje part — bara du och servern, plus en bok du
    # själv skriver i. Högerpanelen har en tredje låda ovanför som redan skrivit
    # under. Frånvaron respektive närvaron av den lådan ÄR bilden; allt annat
    # måste vara identiskt för att kontrasten ska läsas.
    def dator(x, y): return f'<path d="{w(x,y,110,58)}"/>'
    vanster = (dator(60, 150) + dator(300, 150)
               + '<path d="M176 172 Q238 170 294 172"/>' + arrow(300,172)
               + '<path d="M294 196 Q238 198 176 196" stroke-dasharray="6 7"/>'
               + arrow(170,196,"left")
               + f'<path d="{w(90,252,110,50)}"/>'
               + '<path d="M116 268 Q145 266 174 268" stroke-width="1.1" opacity="0.55"/>'
               + '<path d="M116 284 Q145 282 174 284" stroke-width="1.1" opacity="0.55"/>')
    hoger = (dator(500, 150) + dator(740, 150)
             + '<path d="M616 172 Q678 170 734 172"/>' + arrow(740,172)
             + f'<path d="{w(600,44,150,56)}"/>'
             + '<path d="M676 106 Q678 128 676 144" stroke-dasharray="6 7" opacity="0.6"/>'
             + arrow(676,150,"down"))
    D['tofu-och-rotlagret']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster två datorer och en anteckningsbok '
      'under den ena. Till höger två datorer och en tredje låda ovanför som pekar ner mot servern.">\n'
      + G % (vanster + hoger)
      + "\n" + txt([(115,184,"du"),(355,184,"servern"),
                    (555,184,"du"),(795,184,"servern")],13,' opacity="0.7"')
      + "\n" + txt([(145,318,"known_hosts"),(675,80,"rotlagret")],13,' opacity="0.62"')
      + "\n" + txt([(220,120,"TOFU"),(660,318,"CA")],17) + "\n</svg>")

    # 77 — Embedded 1.0 · Flash och RAM
    # PROPORTIONEN är hela bilden: flashstapeln är fyra gånger RAM-stapeln, och
    # det skrafferade i RAM är bara en liten del. Rita dem lika stora och
    # artikelns poäng — att RAM tar slut först — försvinner helt.
    def stapel(x, y, bredd, hojd, delar):
        p = [f'<path d="{w(x,y,bredd,hojd)}"/>']
        ack = y
        for h, skraffa in delar[:-1]:
            ack += h
            p.append(f'<path d="M{x+2} {ack:.0f} Q{x+bredd/2:.0f} {ack-1:.0f} {x+bredd-2} {ack:.0f}"/>')
        ack = y
        for h, skraffa in delar:
            if skraffa:
                p.append(markerad(x+4, ack+3, bredd-8, h-6, 20))
            ack += h
        return "".join(p)
    flash = stapel(120, 70, 210, 260, [(150, False), (70, True), (40, False)])
    ram   = stapel(560, 200, 210, 130, [(34, True), (56, False), (40, True)])
    D['flash-och-ram']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En hög stapel till vänster märkt flash och '
      'en betydligt lägre till höger märkt RAM, båda uppdelade i skiktade fält.">\n'
      + G % (flash + ram)
      + "\n" + txt([(116,150,"programmet"),(116,262,"const-data"),(116,316,"ledigt")],13,
                   ' opacity="0.7"',"end")
      + "\n" + txt([(786,225,"variabler"),(786,268,"ledigt"),(786,318,"stacken")],13,
                   ' opacity="0.7"',"start")
      + "\n" + txt([(225,368,"flash · 256 kB"),(665,368,"RAM · 64 kB")],18.5) + "\n</svg>")

    # 78 — Embedded 1.0 · Vaken en sekund
    # Linjen måste vara PÅTAGLIGT lång och platt för att toppen ska läsa som
    # försumbar. En kort linje med en topp ser ut som en normal graf; en linje
    # som fyller hela bredden med en enda spik säger "899 mot 1" utan siffror.
    spik = ('<path d="M60 300 Q220 298 372 300"/>'
            '<path d="M372 300 L380 118 L392 118 L400 300"/>'
            '<path d="M400 300 Q600 302 820 300"/>')
    matt = ('<path d="M372 336 Q376 340 372 344"/><path d="M400 344 Q396 340 400 336"/>'
            '<path d="M372 340 Q386 339 400 340"/>')
    D['vaken-en-sekund']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="En nästan helt vågrät linje över hela '
      'bilden med en enda smal hög topp en bit in.">\n'
      + G % (spik + matt)
      + "\n" + txt([(386,104,"vaken")],14,' opacity="0.8"')
      + "\n" + txt([(200,286,"deep sleep"),(640,286,"deep sleep")],13,' opacity="0.55"')
      + "\n" + txt([(440,348,"1 sekund")],12,' opacity="0.6"',"start")
      + "\n" + txt([(440,382,"strömförbrukning över en kvart")],13,' opacity="0.5"') + "\n</svg>")

    # 79 — Embedded 1.1 · Paketen i storlek
    # Kuverten måste ha SAMMA form och skilja sig bara i storlek — det är
    # proportionen som är argumentet. Ritas de olika (ett brev, en låda, en säck)
    # läser ögat "olika sorters saker" i stället för "samma sak, olika mycket".
    def kuvert(cx, cy, b, h):
        return (f'<path d="{w(cx-b/2,cy-h/2,b,h)}"/>'
                f'<path d="M{cx-b/2:.0f} {cy-h/2:.0f} Q{cx:.0f} {cy:.0f} '
                f'{cx+b/2:.0f} {cy-h/2:.0f}"/>')
    D['paketen-i-storlek']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Tre kuvert av samma form i kraftigt olika '
      'storlek, märkta CoAP tio byte, MQTT tjugofyra byte och HTTP drygt tusen byte.">\n'
      + G % (kuvert(110, 262, 46, 30) + kuvert(300, 254, 74, 48)
             + kuvert(620, 196, 300, 190))
      + "\n" + txt([(110,318,"CoAP"),(300,318,"MQTT"),(620,318,"HTTP")],18.5)
      + "\n" + txt([(110,344,"10 byte"),(300,344,"24 byte"),
                    (620,344,"~1 100 byte headers")],13,' opacity="0.62"') + "\n</svg>")

    # 80 — Embedded 1.1 · Dörren öppnas inifrån
    # Väggen är samma i båda panelerna. Skillnaden är enbart pilens RIKTNING och
    # att den högra pilen är dubbelriktad — det är hela NAT-poängen. Ritas väggen
    # med en dörr som "öppnas" blir det en berättelse om tillstånd, inte om vem
    # som initierar, och då är bilden fel.
    def vagg(x):
        return (f'<path d="M{x} 96 Q{x+3} 200 {x} 304"/>'
                + f'<g stroke-width="1.1" opacity="0.45">{hatch(x-9,100,18,200,22)}</g>')
    vanster = (f'<path d="{w(40,168,104,58)}"/>' + vagg(268)
               + f'<path d="{w(330,168,104,58)}"/>'
               + '<path d="M320 196 Q300 194 286 196" stroke-dasharray="6 7"/>'
               + arrow(280,196,"left")
               + '<path d="M254 180 L282 212"/><path d="M282 180 L254 212"/>')
    hoger = (f'<path d="{w(500,168,104,58)}"/>' + vagg(728)
             + f'<path d="{w(790,168,80,58)}"/>'
             + '<path d="M610 190 Q668 188 722 190"/>' + arrow(728,190)
             + '<path d="M722 208 Q668 210 612 208"/>' + arrow(606,208,"left"))
    D['dorren-oppnas-inifran']=(
      '<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler med en skrafferad vägg. I den '
      'vänstra stoppas en streckad pil utifrån av väggen och är överkryssad. I den högra går en '
      'dubbelriktad pil genom väggen, initierad inifrån.">\n'
      + G % (vanster + hoger)
      + "\n" + txt([(92,202,"enheten"),(382,202,"servern"),
                    (552,202,"enheten"),(830,202,"broker")],13,' opacity="0.72"')
      + "\n" + txt([(268,80,"NAT"),(728,80,"NAT")],13,' opacity="0.5"')
      + "\n" + txt([(237,346,"servern ringer upp"),(665,346,"enheten ringer upp")],17)
      + "\n</svg>")

    # 81 — Grafana 1.0 · Tre källor, en frame
    # Kärlen MÅSTE ha olika form. Tre likadana lådor med olika etiketter säger
    # "tre av samma sak", vilket är raka motsatsen till poängen — att svaren
    # kommer i olika format. Brickan är därför den enda regelbundna formen i
    # bilden, och det är den regelbundenheten som är budskapet.
    cylinder = ('<path d="M66 64 Q118 50 170 64 Q170 100 170 122 '
                'Q118 138 66 122 Q66 100 66 64 Z"/>'
                '<path d="M66 64 Q118 80 170 64"/>')
    skal = '<path d="M60 288 Q118 296 176 288 Q172 344 118 348 Q64 344 60 288 Z"/>'
    konvergens = ('<path d="M180 96 Q320 104 448 178"/>' + arrow(456,182)
                  + '<path d="M190 206 Q320 208 448 212"/>' + arrow(456,214)
                  + '<path d="M180 312 Q320 302 448 246"/>' + arrow(456,242))
    D['tre-kallor-en-frame']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Tre olika formade kärl märkta Prometheus, '
      'Loki och InfluxDB. Från vart och ett går en heldragen pil till samma rutnät, märkt data '
      'frame, med kolumnerna Time, Value och labels.">\n'
      + G % (cylinder + f'<path d="{w(58,176,124,58)}"/>' + skal
             + rader(470,150,352,140,4,delare=(587,704)) + konvergens)
      + "\n" + txt([(118,168,"Prometheus"),(118,262,"Loki"),(118,378,"InfluxDB")],15)
      + "\n" + txt([(528,174,"Time"),(645,174,"Value"),(763,174,"labels")],13,' opacity="0.66"')
      + "\n" + txt([(646,326,"data frame")],18.5) + "\n</svg>")

    # 82 — Grafana 1.0 · Instant mot range
    # Filmremsan bär BÅDE "flera i följd" och "samma sak upprepad" i en enda
    # fysisk form. Två grafer bredvid varandra hade blivit lärkitets formspråk
    # i stället för doodlens — och Split gör redan det jobbet när det behövs.
    foto = f'<path d="{w(112,96,180,158)}"/><path d="{w(132,116,140,118)}"/>'
    remsa = [f'<path d="{w(408,96,430,158)}"/>']
    for px in range(424, 812, 48):
        remsa.append(f'<path d="{w(px,104,26,16)}"/>')
        remsa.append(f'<path d="{w(px,230,26,16)}"/>')
    prickar = "".join(f'<path d="{circ(px,py,9)}"/>' for px,py in
                      ((452,192),(516,170),(580,180),(644,152),(708,162),(772,140)))
    D['instant-vs-range']=(
      '<svg viewBox="0 0 880 348" role="img" aria-label="Till vänster en fotoram med en enda prick. '
      'Till höger en filmremsa med perforering och sex prickar på olika höjd.">\n'
      + G % (foto + f'<path d="{circ(202,175,9)}"/>' + "".join(remsa) + prickar)
      + "\n" + txt([(202,296,"instant"),(623,296,"range")],18.5)
      + "\n" + txt([(202,322,"ett värde per serie"),(623,322,"en punkt per steg")],13,
                   ' opacity="0.62"') + "\n</svg>")

    # 83 — Grafana 1.1 · Vad en larminstans är
    # Papperet är ETT och korten är TRE — det är hela bilden. Frestelsen är att
    # rita tre papper också, men då försvinner poängen: regeln skrevs en gång.
    # Etiketterna ligger inuti korten, som i compose-en-fil, eftersom tre
    # etiketter under tre staplade kort hade lagt text tätt intill nästa låda.
    ark = ('<path d="M70 120 Q160 118 220 119 L250 152 Q253 220 250 290 '
           'Q160 293 72 291 Q68 205 70 120 Z"/>'
           '<path d="M220 119 Q219 140 222 152 Q236 154 250 152"/>'
           '<path d="M96 176 Q160 174 224 176" stroke-width="1.2" opacity="0.55"/>'
           '<path d="M96 206 Q160 204 224 206" stroke-width="1.2" opacity="0.55"/>')
    grenar = ('<path d="M256 175 Q400 168 528 124"/>' + arrow(534,122)
              + '<path d="M256 205 Q400 206 528 205"/>' + arrow(534,205)
              + '<path d="M256 235 Q400 244 528 286"/>' + arrow(534,288))
    D['en-regel-tre-instanser']=(
      '<svg viewBox="0 0 880 390" role="img" aria-label="Ett papper märkt en regel med tre '
      'heldragna pilar ut till tre kort, ett per etikettuppsättning.">\n'
      + G % (ark + "".join(f'<path d="{w(540,y,250,62)}"/>' for y in (92,174,256)) + grenar)
      + "\n" + txt([(665,130,"service=chat"),(665,212,"service=cart"),
                    (665,294,"service=api")],14)
      + "\n" + txt([(160,330,"en regel")],18.5)
      + "\n" + txt([(665,356,"tre instanser")],15,' opacity="0.62"') + "\n</svg>")

    # 84 — Grafana 1.1 · Vad en notifieringspolicy är
    # Facken staplas, inte radas — ett träd matchas uppifrån och ner, och den
    # lodräta ordningen bär det. Bara EN pil ritas: en streckad pil till de
    # andra facken hade betytt "uteblivet flöde", inte "ej vald gren".
    kuvert = (f'<path d="{w(60,168,148,84)}"/>'
              '<path d="M64 172 L134 216 L204 172"/>')
    facken = rader(430, 92, 400, 240, 3)
    vagen = '<path d="M214 202 Q320 200 414 150"/>' + arrow(420,146)
    D['sorteringsfacken']=(
      '<svg viewBox="0 0 880 396" role="img" aria-label="Ett kuvert märkt team lika med platform '
      'med en heldragen pil in i det översta av tre fack i en hylla märkt notifieringspolicyn.">\n'
      + G % (kuvert + facken + vagen)
      # Etiketten låg först på y=210 och skar rakt genom vikningens V. Under
      # vecket (som bottnar på 216) finns 36 px ledig kuvertyta — där ligger den.
      + "\n" + txt([(134,242,"team=platform")],13,' opacity="0.72"')
      + "\n" + txt([(630,150,"team=platform"),(630,230,"team=data"),
                    (630,310,"default")],14)
      + "\n" + txt([(134,290,"larmet")],18.5)
      + "\n" + txt([(630,368,"notifieringspolicyn")],15,' opacity="0.62"') + "\n</svg>")

    # 85 — Loki 1.0 · Vad en chunk är
    # Storleksskillnaden ÄR budskapet. Kortet får därför inte ritas lika högt
    # som högen "för symmetrins skull" — då blir bilden en tvådelad låda och
    # säger ingenting om varför det uteblivna indexet är billigt.
    kort = (f'<path d="{w(90,150,150,92)}"/>'
            '<path d="M110 180 Q165 178 220 180" stroke-width="1.2" opacity="0.55"/>'
            '<path d="M110 206 Q165 204 220 206" stroke-width="1.2" opacity="0.55"/>')
    hog = rader(500,90,300,220,8) + markerad(504,204,292,102,30)
    D['indexet-och-hogen']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Ett litet kort märkt indexet med en '
      'heldragen pil till en betydligt större skrafferad hög märkt chunkarna.">\n'
      + G % (kort + hog + '<path d="M248 196 Q370 194 484 196"/>' + arrow(492,196))
      + "\n" + txt([(165,286,"indexet"),(650,348,"chunkarna")],18.5)
      + "\n" + txt([(368,176,"pekar på")],13,' opacity="0.62"') + "\n</svg>")

    # 86 — Loki 1.0 · Kardinalitetsfällan
    # SJU fack, inte nittiofem. Fler än så renderar som en streckad linje vid
    # 544 px, och streckat betyder "uteblivet" i formspråket — alltså tvärtom.
    # Talen står i brödtexten; bilden bär bara formen på skillnaden.
    def hylla(x1,x2):
        return (f'<path d="M{x1} 252 Q{(x1+x2)//2} 250 {x2} 252"/>'
                f'<path d="M{x1+2} 264 Q{(x1+x2)//2} 262 {x2-2} 264"/>')
    fa = "".join(f'<path d="{w(x,140,150,108)}"/>' for x in (80,240))
    manga = "".join(f'<path d="{w(476+i*48,140,38,108)}"/>' for i in range(7))
    D['tva-hyllor-en-explosion']=(
      '<svg viewBox="0 0 880 360" role="img" aria-label="Två hyllor. Den vänstra har två breda '
      'lådor, den högra sju smala — lika mycket innehåll, fler fack att öppna.">\n'
      + G % (hylla(64,406) + fa + hylla(460,822) + manga)
      + "\n" + txt([(235,306,"cluster"),(645,306,"pod_id")],18.5)
      + "\n" + txt([(235,332,"få strömmar"),(645,332,"många strömmar")],13,
                   ' opacity="0.62"') + "\n</svg>")

    # 87 — Loki 1.1 · Vad ett derived field är
    # Raden ritas OFÖRÄNDRAD, med en inramning runt ett ord — inte som två
    # rader före och efter. Poängen är att derived fieldet inte rör innehållet;
    # ritar man en "före och efter"-bild säger den tvärtom att raden skrivs om.
    remsa = (f'<path d="{w(60,128,470,80)}"/>'
             '<path d="M84 158 Q150 156 216 158" stroke-width="1.2" opacity="0.5"/>'
             '<path d="M440 158 Q472 156 506 158" stroke-width="1.2" opacity="0.5"/>'
             f'<path d="{w(240,144,176,48)}"/>')
    spar = (f'<path d="{w(672,112,150,96)}"/>'
            '<path d="M692 140 Q726 139 760 140" stroke-width="1.4" opacity="0.5"/>'
            '<path d="M706 162 Q748 161 790 162" stroke-width="1.4" opacity="0.5"/>'
            '<path d="M700 184 Q724 183 748 184" stroke-width="1.4" opacity="0.5"/>')
    trad = '<path d="M420 162 Q524 136 650 146"/>' + arrow(658,148)
    D['kroken-i-raden']=(
      '<svg viewBox="0 0 880 300" role="img" aria-label="En loggrad med ett inramat ord märkt '
      'traceID. En heldragen tråd går från ramen till ett kort med tre förskjutna staplar, '
      'märkt spåret.">\n'
      + G % (remsa + spar + trad)
      + "\n" + txt([(328,174,"traceID")],13)
      + "\n" + txt([(546,118,"derived field")],13,' opacity="0.62"')
      + "\n" + txt([(295,250,"loggraden"),(747,250,"spåret")],18.5) + "\n</svg>")

    # 88 — Ansible 1.0 · Ansible är agentlöst
    # Ingen streckad låda inuti servern. En liten streckad form inuti en låda
    # läses som smuts, inte som "något tillfälligt" — och poängen här är just
    # att servern är tom efteråt. Tomheten ritas alltså som tomhet.
    dator = ('<path d="M70 110 Q130 108 188 109 Q191 150 188 186 '
             'Q130 188 72 186 Q68 148 70 110 Z"/>'
             '<path d="M52 198 Q130 196 206 197 Q196 214 182 216 '
             'Q130 218 76 216 Q62 214 52 198 Z"/>')
    burk = (f'<path d="{w(700,96,120,150)}"/>'
            '<path d="M712 132 Q760 131 808 132" stroke-width="1.3" opacity="0.5"/>'
            '<path d="M712 172 Q760 171 808 172" stroke-width="1.3" opacity="0.5"/>')
    dit = '<path d="M222 140 Q380 132 620 138"/>' + arrow(628,138)
    hem = '<path d="M628 206 Q420 214 232 208"/>' + arrow(224,208,"left")
    D['paketet-som-inte-blir-kvar']=(
      '<svg viewBox="0 0 880 330" role="img" aria-label="En laptop och en server med två heldragna '
      'pilar mellan sig: modulen kopieras dit, svaret kommer tillbaka. Servern är tom.">\n'
      + G % (dator + burk + dit + hem)
      + "\n" + txt([(420,118,"modulen kopieras"),(420,238,"svaret tillbaka")],13,
                   ' opacity="0.62"')
      + "\n" + txt([(129,288,"din maskin"),(760,288,"servern")],18.5) + "\n</svg>")

    # 89 — Ansible 1.0 · Fallgropen i --check
    # Den tredje rutan är streckad OCH tom. Streckat betyder "uteblivet" i
    # formspråket, vilket är exakt rätt här: torrkörningen visar ingenting om
    # det steget. Fylls rutan med text tappar bilden sin enda poäng.
    rutor = (f'<path d="{w(240,70,400,62)}"/>'
             f'<path d="{w(240,152,400,62)}"/>'
             f'<path d="{w(240,234,400,62)}" stroke-dasharray="8 9" opacity="0.38"/>')
    D['halet-i-torrkorningen']=(
      '<svg viewBox="0 0 880 370" role="img" aria-label="Tre rutor under varandra märkta file, copy '
      'och command. De två första är heldragna och rapporterar changed. Den tredje är streckad och '
      'tom, och rapporterar skipping.">\n'
      + G % rutor
      + "\n" + txt([(440,108,"file"),(440,190,"copy")],16.5)
      + "\n" + txt([(440,272,"command")],16.5,' opacity="0.45"')
      + "\n" + txt([(690,108,"changed"),(690,190,"changed")],13,' opacity="0.62"',"start")
      + "\n" + txt([(690,272,"skipping")],13,' opacity="0.45"',"start")
      + "\n" + txt([(440,336,"--check")],18.5) + "\n</svg>")

    # 90 — Ansible 1.1 · Handler vs task
    # EN klocka, två trådar. Två klockor (en som ringer, en som tiger) hade
    # blivit en före/efter-bild, och då handlar den om tid i stället för om
    # villkor. Poängen är att samma handler nås av två olika utfall.
    klocka = ('<path d="M660 202 Q662 116 730 112 Q798 117 800 202"/>'
              '<path d="M644 202 Q730 208 816 202"/>'
              f'<path d="{circ(730,218,9)}"/>'
              + markerad(668,150,124,50,26))
    trad_ja = '<path d="M286 108 Q460 112 636 152"/>' + arrow(644,154)
    trad_nej = ('<path d="M286 220 Q460 214 636 188" stroke-dasharray="8 9" opacity="0.4"/>'
                + f'<g opacity="0.4">{arrow(644,186)}</g>')
    D['klockan-som-inte-ringer']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="Två rutor märkta changed och ok. Från '
      'changed går en heldragen tråd till en klocka, från ok en streckad som tonar bort.">\n'
      + G % (f'<path d="{w(80,76,200,62)}"/><path d="{w(80,190,200,62)}"/>'
             + klocka + trad_ja + trad_nej)
      + "\n" + txt([(180,114,"changed")],16.5)
      + "\n" + txt([(180,228,"ok")],16.5,' opacity="0.45"')
      + "\n" + txt([(730,288,"handlern")],18.5) + "\n</svg>")

    # 91 — InfluxDB 1.0 · Vad line protocol är
    # Anatomiformen ur referensens typologi (D3), samma som `url-raden`. Här
    # bär den en extra sak: kommatecknet mellan låda ett och två ritas ut,
    # mellanrummen mellan de andra lämnas tomma. Det är hela syntaxregeln.
    lprutor = "".join(f'<path d="{w(x,80,bredd,64)}"/>' for x,bredd in
                      ((60,130),(206,200),(422,210),(648,210)))
    ned = "".join(f'<path d="M{x} 148 Q{x+2} 164 {x} 180"/>' for x in (125,306,527,753))
    D['line-protocol-raden']=(
      '<svg viewBox="0 0 880 260" role="img" aria-label="En rad line protocol uppdelad i fyra rutor '
      'med pilar ner till etiketterna mätning, taggar, fält och tid. Mellan de två första rutorna '
      'står ett kommatecken.">\n'
      + G % (lprutor + ned)
      + "\n" + txt([(125,120,"temp"),(306,120,"rum=lager"),
                    (527,120,"value=21.5"),(753,120,"1783638000")],15)
      + "\n" + txt([(198,120,",")],17,' opacity="0.7"')
      + "\n" + txt([(125,210,"mätning"),(306,210,"taggar"),
                    (527,210,"fält"),(753,210,"tid")],18.5) + "\n</svg>")

    # 92 — InfluxDB 1.1 · Vad retention är
    # Ingen fallande låda och ingen rörelse. Streckat betyder "uteblivet" i
    # formspråket, så de borttagna lådorna RITAS streckade och står kvar på
    # sin plats — bilden blir ett tillstånd att läsa, inte ett förlopp.
    planka = ('<path d="M110 212 Q465 209 830 212"/>'
              '<path d="M112 224 Q465 221 828 224"/>')
    kvar = "".join(f'<path d="{w(x,112,100,98)}"/>' for x in (360,475,590,705))
    borta = "".join(f'<path d="{w(x,112,100,98)}" stroke-dasharray="8 9" opacity="0.35"/>'
                    for x in (130,245))
    grans = '<path d="M352 78 Q354 158 352 242" stroke-dasharray="6 8" opacity="0.5"/>'
    D['hyllan-har-en-ande']=(
      '<svg viewBox="0 0 880 300" role="img" aria-label="En hylla med sex lådor. De två till vänster '
      'om en streckad gräns är streckade och borttagna; de fyra till höger är heldragna och kvar.">\n'
      + G % (planka + borta + kvar + grans)
      + "\n" + txt([(352,62,"retention")],15,' opacity="0.62"')
      + "\n" + txt([(190,268,"borttagna")],15,' opacity="0.45"')
      + "\n" + txt([(580,268,"kvar i bucketen")],18.5) + "\n</svg>")

    # 93 — ArgoCD 1.0 · Push vs pull i utrullning
    # Pilen från klustret är HELDRAGEN och pilen från pipelinen STRECKAD och
    # överkryssad. Ritas båda heldragna blir bilden "två vägar in", vilket är
    # raka motsatsen: poängen är att bara den ena riktningen finns.
    repofil = ('<path d="M60 80 Q140 78 168 79 L200 112 Q203 166 200 220 '
               'Q140 223 62 221 Q57 150 60 80 Z"/>'
               '<path d="M168 79 Q167 100 170 112 Q184 114 200 112"/>'
               '<path d="M84 140 Q130 138 176 140" stroke-width="1.2" opacity="0.5"/>'
               '<path d="M84 168 Q130 166 176 168" stroke-width="1.2" opacity="0.5"/>')
    klustret = (f'<path d="{w(560,60,260,200)}"/>'
                f'<path d="{w(590,96,90,54)}"/><path d="{w(700,96,90,54)}"/>'
                f'<path d="{w(590,176,200,54)}"/>')
    hamtar = '<path d="M548 130 Q380 122 216 128"/>' + arrow(208,128,"left")
    stoppad = ('<path d="M486 322 Q524 302 546 254" stroke-dasharray="7 8" opacity="0.45"/>'
               '<g opacity="0.55"><path d="M540 232 L566 258"/>'
               '<path d="M566 232 L540 258"/></g>')
    D['pilen-pekar-inat']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="En fil märkt Git-repot och en låda märkt '
      'klustret. En heldragen pil går från klustret till filen. En streckad pil från en låda märkt '
      'pipeline stoppas av ett kryss innan den når klustret.">\n'
      + G % (repofil + klustret + f'<path d="{w(300,300,180,58)}"/>' + hamtar + stoppad)
      + "\n" + txt([(382,106,"hämtar")],13,' opacity="0.62"')
      + "\n" + txt([(390,336,"pipeline")],15)
      + "\n" + txt([(130,258,"Git-repot"),(690,298,"klustret")],18.5) + "\n</svg>")

    # 94 — ArgoCD 1.0 · Sync status vs health status
    # Taxonomiformen (D6). Rutorna innehåller SLUTSATSEN, inte statusparet —
    # statusparen står redan i brödtexten, och en bild som upprepar dem säger
    # inget nytt. Det bilden tillför är att alla fyra rutorna är ifyllda.
    rutnat = (f'<path d="{w(200,90,480,200)}"/>'
              '<path d="M202 190 Q440 188 678 190"/>'
              '<path d="M440 92 Q442 190 440 288"/>')
    D['de-tva-axlarna']=(
      '<svg viewBox="0 0 880 360" role="img" aria-label="Ett rutnät med två kolumner, Synced och '
      'OutOfSync, och två rader, Healthy och Degraded. Alla fyra rutor är ifyllda med en slutsats.">\n'
      + G % rutnat
      + "\n" + txt([(320,72,"Synced"),(560,72,"OutOfSync")],15)
      + "\n" + txt([(186,148,"Healthy"),(186,248,"Degraded")],15,'',"end")
      # Ingen undertext här: bildtexten i MDX säger redan "två frågor, fyra
      # svar", och samma mening två gånger under samma bild är brus.
      + "\n" + txt([(320,148,"allt stämmer"),(560,148,"någon rörde klustret"),
                    (320,248,"felet är i repot"),(560,248,"båda delarna")],14) + "\n</svg>")

    # 95 — ArgoCD 1.1 · Vad en finalizer gör
    # Lådan ritas LYFT men haken sitter kvar i marken. Ritas den halvvägs
    # borta blir bilden ett förlopp; poängen är ett låst tillstånd — något
    # som drar uppåt och något som håller emot, samtidigt.
    mark = ('<path d="M180 300 Q440 297 700 300"/>'
            f'<g stroke-width="1.1" opacity="0.4">{hatch(184,302,512,16,30)}</g>')
    haken = ('<path d="M336 242 Q326 264 334 282"/>'
             '<path d="M334 282 Q348 294 358 284"/>')
    lyft = '<path d="M400 112 Q402 84 400 64"/>' + arrow(400,56,"up")
    D['finalizern-haller-kvar']=(
      '<svg viewBox="0 0 880 360" role="img" aria-label="En låda märkt Application lyfts uppåt av en '
      'pil märkt delete, men hålls kvar av en hake ner i marken.">\n'
      + G % (f'<path d="{w(300,130,200,110)}"/>' + mark + haken + lyft)
      + "\n" + txt([(400,42,"delete")],13,' opacity="0.62"')
      + "\n" + txt([(400,192,"Application")],15)
      + "\n" + txt([(440,336,"resurserna i klustret")],15,' opacity="0.62"') + "\n</svg>")

    # 96 — ArgoCD 1.1 · Krypterat i repot vs hämtat vid körning
    # Nyckeln ritas INUTI klustret och har ingen pil alls. En streckad pil
    # tillbaka hade betytt "uteblivet flöde" och fått läsaren att leta efter
    # ett flöde som inte finns. Att nyckeln bara ligger där ÄR budskapet.
    kuvert = (f'<path d="{w(100,150,140,72)}"/>'
              '<path d="M104 154 L170 196 L236 154"/>'
              f'<path d="{circ(170,206,11)}"/>')
    nyckel = (f'<path d="{circ(676,158,17)}"/>'
              '<path d="M694 158 Q730 156 764 158"/>'
              '<path d="M744 158 Q745 170 744 176"/>'
              '<path d="M760 158 Q761 168 760 174"/>')
    resan = '<path d="M292 186 Q440 180 588 184"/>' + arrow(596,184)
    D['nyckeln-stannar-i-klustret']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="En låda märkt repot med ett förseglat '
      'kuvert i. En heldragen pil till en låda märkt klustret, där en nyckel ligger. Nyckeln har '
      'ingen pil.">\n'
      + G % (f'<path d="{w(60,110,220,140)}"/>' + kuvert
             + f'<path d="{w(600,90,240,180)}"/>' + nyckel + resan)
      + "\n" + txt([(440,164,"kuvertet")],13,' opacity="0.62"')
      + "\n" + txt([(170,296,"repot"),(720,306,"klustret")],18.5) + "\n</svg>")

    # 97 — Observability 1.3 · Vad varje extra nia kostar
    # Stegen blir SMALARE och HÖGRE åt höger. Ritas de lika breda blir bilden
    # en vanlig trappa och säger "lika steg"; poängen är att varje nia ger
    # mindre tid och kostar mer. Bredden är tiden, höjden är priset.
    # Höjderna är valda så att det översta steget slutar på y=28 — hade summan
    # blivit större hade trappan gått ut ur viewBoxen upptill, och bredderna så
    # att den längsta etiketten ryms i det smalaste steget.
    def trappa():
        p=[]; x=90; y=300
        for br,h in ((190,40),(140,56),(100,76),(84,100)):
            p.append(f'<path d="{w(x,y-h,br,h)}"/>')
            x+=br; y-=h
        return "".join(p)
    D['niorna-kostar-mer']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="En trappa med fyra steg. Varje steg är '
      'smalare och högre än det förra, märkta 99, 99,9, 99,99 och 99,999 procent.">\n'
      + G % (trappa() + '<path d="M70 302 Q440 299 810 302"/>')
      + "\n" + txt([(185,286,"99 %"),(350,236,"99,9 %"),
                    (470,170,"99,99 %"),(562,82,"99,999 %")],14)
      + "\n" + txt([(440,346,"bredden är tiden du får, höjden är priset")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 98 — Observability 1.3 · Vad en burn rate är
    # Hinkarna är LIKA STORA och fyllda lika mycket. Enda skillnaden är hålet.
    # Ritas den ena mindre blir bilden om budgetens storlek i stället för om
    # takten den töms i — och burn rate handlar just om takten.
    def hink(x, halstorlek):
        kropp=(f'<path d="M{x} 110 Q{x+80} 106 {x+160} 110 '
               f'Q{x+146} 200 {x+134} 258 Q{x+80} 264 {x+26} 258 '
               f'Q{x+14} 200 {x} 110 Z"/>')
        niva=f'<path d="M{x+12} 168 Q{x+80} 164 {x+148} 168" stroke-width="1.3" opacity="0.55"/>'
        yta=markerad(x+16,170,128,80,26)
        hal=f'<path d="{ell(x+80,258,halstorlek,halstorlek*0.4)}"/>'
        return kropp+niva+yta+hal
    droppar=lambda x,n: "".join(f'<path d="M{x+80} {272+i*18} Q{x+82} {280+i*18} {x+80} {286+i*18}"/>'
                                for i in range(n))
    D['tva-hinkar-ett-hal']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Två lika stora hinkar med lika mycket i. '
      'Den vänstra har ett litet hål och en droppe, den högra ett stort hål och en stråle.">\n'
      + G % (hink(110,7) + droppar(110,1) + hink(610,20) + droppar(610,3))
      + "\n" + txt([(190,346,"burn rate 1"),(690,346,"burn rate 14,4")],18.5)
      + "\n</svg>")

    # 99 — Observability 1.4 · Vad larmtrötthet är
    # Högen ritas som en förskjuten stapel, inte som separata lappar i rad —
    # många små former tätt i rad renderar som en streckad linje vid 544 px,
    # och streckat betyder "uteblivet" i formspråket.
    hog = "".join(f'<path d="{w(90+i*4,96+i*13,220,60)}" opacity="{0.9-i*0.11:.2f}"/>'
                  for i in range(7))
    D['hogen-som-ingen-laser']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="En hög med sju staplade lappar till '
      'vänster och en ensam lapp till höger.">\n'
      + G % (hog + f'<path d="{w(590,150,220,60)}"/>')
      + "\n" + txt([(210,296,"hundra larm"),(700,246,"ett larm")],18.5) + "\n</svg>")

    # 100 — Observability 1.4 · Sida vs ticket
    # Telefonen ritas UPPRÄTT och korgen LIGGANDE. Formskillnaden gör jobbet:
    # den ena kräver att någon tar upp den, den andra att något läggs i den.
    telefon = (f'<path d="{w(150,80,120,190)}"/>'
               f'<path d="{w(166,100,88,138)}"/>'
               f'<path d="{circ(210,254,9)}"/>')
    korg = ('<path d="M560 200 Q690 196 820 200 Q812 256 806 262 '
            'Q690 268 574 262 Q568 256 560 200 Z"/>'
            '<path d="M584 214 Q690 210 796 214" stroke-width="1.2" opacity="0.5"/>'
            f'<path d="{w(636,140,110,50)}"/>')
    D['telefonen-och-korgen']=(
      '<svg viewBox="0 0 880 340" role="img" aria-label="En upprätt telefon till vänster och en '
      'liggande korg med ett papper i till höger.">\n'
      + G % (telefon + korg)
      + "\n" + txt([(210,306,"sidan"),(690,306,"ärendet")],18.5)
      + "\n" + txt([(210,332,"kostar sömn"),(690,332,"kostar en plats i kön")],13,
                   ' opacity="0.62"') + "\n</svg>")

    # 101 — Meddelanden 1.0 · Kedjan som faller ihop
    # Framåtpilarna är heldragna, bakåtpilarna streckade. Det är hela bilden:
    # anropen går fram, svaren kommer inte tillbaka. Krysset sitter på den
    # SISTA lådan men det är den FÖRSTA som är drabbad — därför måste båda
    # bakåtpilarna vara streckade, inte bara den närmast krysset.
    def bakat(x1, x2, y):
        return (f'<path d="M{x1} {y} Q{(x1+x2)//2} {y-4} {x2+13} {y}" '
                f'stroke-dasharray="7 8" opacity="0.45"/>'
                f'<g opacity="0.45">{arrow(x2, y, "left")}</g>')
    kryss = ('<g opacity="0.75"><path d="M648 118 Q730 168 812 216"/>'
             '<path d="M812 118 Q730 168 648 216"/></g>')
    D['kedjan-som-faller-ihop']=(
      '<svg viewBox="0 0 880 330" role="img" aria-label="Tre lådor på rad: Kund, Kassa och '
      'Mejltjänst. Pilarna framåt är heldragna, pilarna tillbaka är streckade, och lådan längst '
      'till höger är överkryssad.">\n'
      + G % (f'<path d="{w(50,100,200,120)}"/><path d="{w(340,100,200,120)}"/>'
             f'<path d="{w(630,100,200,120)}"/>' + kryss
             + '<path d="M258 142 Q295 139 327 142"/>' + arrow(332,142)
             + '<path d="M548 142 Q585 139 617 142"/>' + arrow(622,142)
             + bakat(325, 262, 190) + bakat(615, 552, 190))
      + "\n" + txt([(150,262,"Kund"),(440,262,"Kassa"),(730,262,"Mejltjänst")],18.5)
      + "\n" + txt([(730,290,"svarar på 12 s")],13,' opacity="0.62"') + "\n</svg>")

    # 102 — Meddelanden 1.0 · Kö vs logg
    # Det TREDJE kortet i kön är streckat — streckat betyder "uteblivet" i
    # formspråket, alltså exakt vad ett konsumerat meddelande är. Loggens kort
    # är heldragna hela vägen; det som skiljer läsarna åt är bara var pilen står.
    def lasare(x, y=252):
        return f'<path d="M{x} {y+26} Q{x+1} {y+14} {x} {y+3}"/>' + arrow(x, y, "up", 11)
    ko = (f'<path d="{w(40,104,340,146)}"/>'
          f'<path d="{w(58,124,90,106)}"/><path d="{w(165,124,90,106)}"/>'
          f'<path d="{w(272,124,90,106)}" stroke-dasharray="7 8" opacity="0.4"/>')
    logg = ("".join(f'<path d="{w(x,124,60,106)}"/>' for x in (500,570,640,710,780))
            + lasare(600) + lasare(740) + lasare(810))
    D['kon-och-loggen']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Till vänster en låda med två hela kort '
      'och ett streckat. Till höger fem hela kort i rad med tre pilar under, som pekar upp mot '
      'var sitt kort.">\n'
      + G % (ko + logg)
      + "\n" + txt([(210,318,"Kö"),(670,318,"Logg")],18.5)
      + "\n" + txt([(210,346,"läst är borta"),(670,346,"läst ligger kvar")],13,
                   ' opacity="0.62"') + "\n</svg>")

    # 103 — Meddelanden 1.1 · Retry och dead letter
    # De tre försöken är STRECKADE, flytten till dead letter HELDRAGEN. Ritas
    # försöken heldragna läser bilden som att arbetet blev gjort tre gånger,
    # vilket är motsatsen — de misslyckades allihop.
    forsok = "".join(
        f'<path d="M285 {y} Q440 {y-22} 588 {y}" stroke-dasharray="7 8" opacity="0.5"/>'
        + f'<g opacity="0.5">{arrow(594, y)}</g>' for y in (85, 110, 135))
    D['forsoken-och-dead-letter']=(
      '<svg viewBox="0 0 880 460" role="img" aria-label="En låda märkt kö och en märkt konsument, '
      'med tre streckade bågar emellan. Från kön går en heldragen pil ner till en låda märkt dead '
      'letter.">\n'
      + G % (f'<path d="{w(60,60,220,100)}"/><path d="{w(600,60,220,100)}"/>' + forsok
             + '<path d="M170 215 Q173 250 170 284"/>' + arrow(170, 290, "down")
             + f'<path d="{w(60,300,220,90)}"/>')
      + "\n" + txt([(440,44,"tre försök")],14,' opacity="0.62"')
      + "\n" + txt([(170,190,"kö"),(710,190,"konsument"),(170,420,"dead letter")],18.5)
      + "\n</svg>")

    # 104 — Meddelanden 1.1 · Retryn som bryter ordningen
    # Den tomma platsen är streckad — streckat betyder "uteblivet", och kortet
    # som lämnat sin plats är exakt det. Glappet före det sista kortet är med
    # flit: det ligger inte bredvid raden, det ligger EFTER den.
    kort = "".join(f'<path d="{w(x,150,100,120)}"/>' for x in (90,330,450,690))
    tom = f'<path d="{w(210,150,100,120)}" stroke-dasharray="7 8" opacity="0.4"/>'
    bage = ('<path d="M260 142 Q500 52 736 140"/>' + arrow(740, 146, "down"))
    D['ordningen-som-bryts']=(
      '<svg viewBox="0 0 880 380" role="img" aria-label="Fyra kort i rad märkta 1, 3 och 4, med en '
      'streckad tom plats där kort 2 låg. En båge går från den tomma platsen till ett kort märkt 2 '
      'längst till höger.">\n'
      + G % (kort + tom + bage)
      + "\n" + txt([(140,222,"1"),(380,222,"3"),(500,222,"4"),(740,222,"2")],21)
      + "\n" + txt([(440,330,"skickat 1 2 3 4  ·  utfört 1 3 4 2")],15,' opacity="0.62"')
      + "\n</svg>")

    # 105 — Kafka 1.0 · Nyckeln väljer partitionen
    # Båda korten bär SAMMA nyckel och båda pilarna landar i samma rad. Ritas
    # två olika nycklar blir bilden om fördelning; poängen är motsatsen — att
    # nyckeln tar bort valet. Raderna är breda och låga för att läsa som logg,
    # inte som lådor.
    rader3 = "".join(f'<path d="{w(430,y,390,75)}"/>' for y in (60,165,270))
    till_p2 = ('<path d="M195 120 Q320 150 420 292"/>' + arrow(424, 300)
               + '<path d="M195 280 Q310 292 420 306"/>' + arrow(425, 307))
    D['nyckeln-valjer-raden']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Två kort märkta kund-7 till vänster. Två '
      'pilar går från dem till den nedersta av tre rader, märkt P2.">\n'
      + G % (f'<path d="{w(40,80,150,80)}"/><path d="{w(40,240,150,80)}"/>'
             + rader3 + till_p2)
      + "\n" + txt([(115,128,"kund-7"),(115,288,"kund-7")],16)
      + "\n" + txt([(465,105,"P0"),(465,210,"P1"),(465,315,"P2")],17)
      + "\n" + txt([(625,378,"topic ordrar")],15,' opacity="0.62"') + "\n</svg>")

    # 106 — Kafka 1.0 · Gruppen och partitionerna
    # Den fjärde konsumentens linje är STRECKAD och slutar i tomma intet —
    # utan pilspets, eftersom den inte når något. Ritas den med spets läser
    # bilden som att den ändå får något, vilket är precis felet den ska visa.
    par = "".join(f'<path d="{w(50,y,240,66)}"/>' for y in (60,146,232))
    kons = "".join(f'<path d="{w(600,y,220,60)}"/>' for y in (40,126,212,298))
    kopplingar = "".join(
        f'<path d="M295 {a} Q450 {(a+b)//2} 592 {b}"/>' + arrow(597, b)
        for a, b in ((93,70),(179,156),(265,242)))
    tom = '<path d="M592 328 Q520 322 448 316" stroke-dasharray="7 8" opacity="0.45"/>'
    D['gruppen-och-partitionerna']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Tre lådor märkta P0, P1 och P2 till '
      'vänster, kopplade med heldragna pilar till tre av fyra konsumenter. Den fjärde konsumentens '
      'linje är streckad och slutar i tomma intet.">\n'
      + G % (par + kons + kopplingar + tom)
      + "\n" + txt([(170,102,"P0"),(170,188,"P1"),(170,274,"P2")],17)
      + "\n" + txt([(710,78,"1"),(710,164,"2"),(710,250,"3"),(710,336,"4")],17)
      + "\n" + txt([(170,348,"topic ordrar"),(710,384,"konsumentgrupp")],15,
                   ' opacity="0.62"') + "\n</svg>")

    # 107 — Kafka 1.1 · Hot partition
    # Staplarna måste ha LUFT mellan korten. Sex kort tätt på varandra renderar
    # som en streckad yta vid 544 px, och streckat betyder "uteblivet" i
    # formspråket — raka motsatsen till "den här har mest".
    def stapel(x, antal):
        return "".join(f'<path d="{w(x,250-i*38,190,30)}"/>' for i in range(antal))
    D['partitionerna-i-obalans']=(
      '<svg viewBox="0 0 880 400" role="img" aria-label="Tre högar av kort märkta P0, P1 och P2. '
      'Den mittersta högen är sex kort hög, de andra två och ett.">\n'
      + G % (stapel(90,2) + stapel(345,6) + stapel(600,1))
      + "\n" + txt([(185,322,"P0"),(440,322,"P1"),(695,322,"P2")],18.5)
      + "\n" + txt([(440,372,"en nyckel dominerar")],15,' opacity="0.62"') + "\n</svg>")

    # 108 — Kafka 1.1 · Compaction lämnar luckor
    # Korten som stryks ritas KVAR med kryss. Ritas de bort blir bilden en rad
    # med tre kort och luckan i numreringen syns inte — och luckan är poängen.
    kort5 = "".join(f'<path d="{w(x,60,140,100)}"/>' for x in (60,225,390,555,720))
    kryssa = "".join(
        f'<g opacity="0.62"><path d="M{x+18} 78 Q{x+70} 110 {x+122} 142"/>'
        f'<path d="M{x+122} 78 Q{x+70} 110 {x+18} 142"/></g>' for x in (60,225,390))
    # Korten är TOMMA. Ett kryss rakt genom en etikett gör den svårläst, och
    # hubbens konvention (service-vagskylten) är att ett överkryssat objekt bär
    # sin text utanför krysset. Här räcker offsetnumren — luckan är poängen.
    D['compaction-lamnar-luckor']=(
      '<svg viewBox="0 0 880 310" role="img" aria-label="Fem kort i rad, där de tre första är '
      'överkryssade. Under korten står offsetnumren noll till fyra, och de tre första är blekta.">\n'
      + G % (kort5 + kryssa)
      + "\n" + txt([(130,200,"0"),(295,200,"1"),(460,200,"2")],17,' opacity="0.38"')
      + "\n" + txt([(625,200,"3"),(790,200,"4")],17)
      + "\n" + txt([(440,268,"numren räknas inte om")],15,' opacity="0.62"') + "\n</svg>")

    return D

if __name__ == "__main__":
    for namn, svg in alla().items():
        print('\n  /* ---- %s ---- */\n  "%s": `\n%s`,' % (namn, namn, svg))
