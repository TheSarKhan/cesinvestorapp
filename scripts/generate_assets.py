# Invorent brend assets — yaşıl zəmində ağ yük maşını markası.
# icon.png, adaptive-icon.png, splash-icon.png, favicon.png üretir.
from PIL import Image, ImageDraw

BRAND = (21, 163, 74, 255)   # #15A34A
BRAND_DK = (15, 138, 62, 255) # #0F8A3E
WHITE = (255, 255, 255, 255)

def rr(d, box, r, fill):
    d.rounded_rectangle(box, radius=r, fill=fill)

def draw_truck(img, hub_color):
    """Mərkəzləşmiş ağ yük maşını çək. hub_color = təkər mərkəzi (zəminlə qaynaşır)."""
    S = img.size[0]
    d = ImageDraw.Draw(img)
    bw = 0.60 * S
    bh = 0.30 * S
    x0 = (S - bw) / 2
    y0 = (S - bh) / 2 - 0.04 * S

    baseline = y0 + bh

    # Kargo gövdəsi (sol) — hündür qutu
    rr(d, [x0, y0, x0 + 0.55 * bw, baseline], r=0.09 * bw, fill=WHITE)
    # Kabin (sağ) — alçaq, eyni baseline; ön tərəfi maili görünüş üçün ayrı qutu
    cab_x0 = x0 + 0.585 * bw
    cab_top = y0 + 0.40 * bh
    rr(d, [cab_x0, cab_top, x0 + bw, baseline], r=0.07 * bw, fill=WHITE)
    # Kabin pəncərəsi — kiçik, ön-üst (zəmin rəngi ilə oyuq)
    win = 0.135 * bw
    rr(d, [x0 + bw - win - 0.05 * bw, cab_top + 0.16 * bh,
           x0 + bw - 0.05 * bw, cab_top + 0.16 * bh + win * 0.78],
       r=0.018 * bw, fill=hub_color)

    # Təkərlər — kiçik, gövdənin altında aydın boşluqla
    r = 0.10 * bw
    hub = 0.042 * bw
    cy = baseline + r * 0.55
    for cx in (x0 + 0.21 * bw, x0 + 0.78 * bw):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=WHITE)
        d.ellipse([cx - hub, cy - hub, cx + hub, cy + hub], fill=hub_color)

def icon_full(S, bg=BRAND):
    img = Image.new("RGBA", (S, S), bg)
    draw_truck(img, hub_color=bg)
    return img

def icon_rounded(S, bg=BRAND):
    # Yuvarlaq künclü logo (splash üçün şəffaf fonda)
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    rr(d, [0, 0, S, S], r=0.22 * S, fill=bg)
    draw_truck(img, hub_color=bg)
    return img

def adaptive_fg(S, bg=BRAND):
    # Android adaptive foreground: şəffaf fon, ağ maşın təhlükəsiz zonada (~62%)
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    inner = int(S * 0.62)
    truck = Image.new("RGBA", (inner, inner), (0, 0, 0, 0))
    draw_truck(truck, hub_color=bg)  # hub bg=green → Android yaşıl fonu ilə qaynaşır
    img.paste(truck, ((S - inner) // 2, (S - inner) // 2), truck)
    return img

OUT = "assets"
icon_full(1024).save(f"{OUT}/icon.png")
adaptive_fg(1024).save(f"{OUT}/adaptive-icon.png")
icon_rounded(1024).save(f"{OUT}/splash-icon.png")
icon_full(196).save(f"{OUT}/favicon.png")
print("OK: icon, adaptive-icon, splash-icon, favicon written")
