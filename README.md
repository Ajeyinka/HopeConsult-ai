# Hope Impact Consulting — VS Code edition

Open this folder in VS Code. Edit each page directly; all files are plain HTML, CSS, and JavaScript (no build tools required).

## Structure
- `index.html` — homepage
- `services.html` and the six service-detail pages — services
- `about.html`, `industries.html`, `contact.html` — main pages
- `css/style.css` — shared site styling, including responsive media queries
- `js/main.js` — mobile navigation, resource filters, and consultation form
- `images/` — SVG artwork and favicon
- `sitemap.xml`, `robots.txt` — search engine discovery

## Edit guide
1. Change page copy and meta title/description in each HTML file.
2. Change colors and layout in `css/style.css` (search for `:root`).
3. Replace SVGs in `images/` or change image `src` in HTML.
4. Configure the `data-endpoint` attribute on the contact form to enable submissions; the form will not send until configured.
5. Verify business details, legal pages, and metadata before publishing.

Use the VS Code **Live Server** extension for local preview, or deploy this folder to Netlify.


## Legal pages
`privacy.html` and `terms.html` now contain structured draft policies. Review all [CONFIRM] items with the company and qualified counsel before publishing. The policies do not establish actual data-handling practices by themselves.
