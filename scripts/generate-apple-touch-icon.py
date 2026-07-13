from PIL import Image, ImageDraw
import os

src = os.path.join(os.path.dirname(__file__), '..', 'public', 'favicon.png')
out_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
out = os.path.join(out_dir, 'apple-touch-icon.png')

img = Image.open(src).convert('RGBA')
# Resize to recommended Apple touch icon size
img = img.resize((180, 180), Image.Resampling.LANCZOS)

# Optional: add rounded corners / background for iOS
bg = Image.new('RGBA', (180, 180), (242, 242, 242, 255))
mask = Image.new('L', (180, 180), 0)
mask_draw = ImageDraw.Draw(mask)
mask_draw.rounded_rectangle([0, 0, 180, 180], radius=36, fill=255)

# Composite with rounded mask
rounded = Image.new('RGBA', (180, 180), (0, 0, 0, 0))
rounded.paste(img, (0, 0), mask)
final = Image.alpha_composite(bg, rounded)
final.save(out, 'PNG')
print(f'Saved Apple touch icon to {out}')
