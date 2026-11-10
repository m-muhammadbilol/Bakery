# Crumb & Crust: Bakery Menu

Static site, no build step.

## Run
Open `index.html` in a browser, or run `npx serve .` in this folder.

## Files
- `index.html`: page structure (hero, menu intro, category nav, cart drawer)
- `styles.css`: design tokens and layout
- `app.js`: product data (`P` array), filtering, cart (localStorage)

## Replace the illustrations with real photos
Product art is generated SVG (function `art`). To use photos, put images in an `images/` folder,
add an `img: 'images/name.jpg'` field to each product in `P`, and make `art(p)` return `p.img`.
