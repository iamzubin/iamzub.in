from PIL import Image, ImageDraw, ImageFont
import os

# Canvas size for Open Graph
WIDTH, HEIGHT = 1200, 630

# Brand colors from CSS
PRIMARY = (40, 56, 129)    # #283881
BACKGROUND = (242, 242, 242)  # #f2f2f2
WHITE = (255, 255, 255)

img = Image.new('RGB', (WIDTH, HEIGHT), BACKGROUND)
draw = ImageDraw.Draw(img)

# Try to load system fonts; fall back to default if unavailable
try:
    title_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 84)
    subtitle_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 42)
    name_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 52)
except Exception:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    name_font = ImageFont.load_default()

# Decorative rounded rectangle card
card_margin = 60
draw.rounded_rectangle(
    [card_margin, card_margin, WIDTH - card_margin, HEIGHT - card_margin],
    radius=40,
    fill=PRIMARY,
    outline=None,
)

# Title text
title = "Full-Stack Developer"
title_bbox = draw.textbbox((0, 0), title, font=title_font)
title_w = title_bbox[2] - title_bbox[0]
draw.text(((WIDTH - title_w) // 2, 160), title, font=title_font, fill=WHITE)

# Subtitle
subtitle = "I ship complex product features, build lightweight desktop apps,"
subtitle2 = "and rescue fragile codebases for scaling startups."
sub_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
sub_w = sub_bbox[2] - sub_bbox[0]
draw.text(((WIDTH - sub_w) // 2, 300), subtitle, font=subtitle_font, fill=WHITE)
sub2_bbox = draw.textbbox((0, 0), subtitle2, font=subtitle_font)
sub2_w = sub2_bbox[2] - sub2_bbox[0]
draw.text(((WIDTH - sub2_w) // 2, 360), subtitle2, font=subtitle_font, fill=WHITE)

# Name / URL
name_text = "Zubin Choudhary  •  iamzub.in"
name_bbox = draw.textbbox((0, 0), name_text, font=name_font)
name_w = name_bbox[2] - name_bbox[0]
draw.text(((WIDTH - name_w) // 2, 500), name_text, font=name_font, fill=BACKGROUND)

# Save
output_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, 'og-image.png')
img.save(output_path, 'PNG')
print(f'Saved OG image to {output_path}')
