# Active Travel & Logistics — website handoff

This folder is the production one-page site. It is static (no build step): upload the whole folder to any host (Netlify, Vercel, GitHub Pages, cPanel…).

- `index.html` — page markup (no inline styles)
- `css/styles.css` — all styles; brand tokens are CSS variables at the top (`--orange`, `--sky`, `--navy`, …)
- `js/main.js` — mobile navigation drawer, contact form → WhatsApp, form pre-fill from service/destination cards, footer year
- `assets/logo.png` — logo (trimmed)
- `assets/about-team.jpg` — About section team photo

Layout widths use container-query units against the `.page` wrapper, exactly as in the approved design. The mobile drawer sits outside `.page` on purpose: the wrapper's containment would otherwise trap `position: fixed`.

## Contact form
Submitting the form opens WhatsApp with the request pre-filled, addressed to the number in `data-whatsapp="…"` on `<form id="booking-form">` in `index.html` (country code + number, digits only). The visitor presses Send in WhatsApp to deliver it. Full name is required; empty fields are left out of the message.

## Brand tokens
| Token | Hex | Use |
|---|---|---|
| Active Orange | #C64A0C (hover #A33B08, tint #FCEBDF) | Buttons / actions only |
| Sky Blue | #1E93C8 (links/small text #0E6F9E, tint #E3F3FB) | Icons, large headings |
| Deep Navy | #0F2A3D | Hero overlay, stats band, footer, international cards |
| Warm Sand | #F7F3EF | Alternate sections |
| Border | #E6DED6 · Ink #1C1E21 · Muted #5B6470 · White #FFFFFF | |

Type: Poppins 700/600 (hero 56px, sections 36px, cards 22px), DM Sans body 16/26. Pill buttons, 14px card radius, 96px section padding (64px on mobile).

Rules: no small #1E93C8 text on white; orange only for actions; logo only on white/sand (white panel on navy); visible focus rings.

## Real details (all in `index.html`)
All filled in: phone/WhatsApp +252 61 458 5666 (`252614585666` in links and the form), email, office address, 100+ destinations, 10k+ travellers, hero photo (`assets/hero.jpeg`, 1456×720), Google Map (pin on Hayat Market), Facebook page link in the footer.

## Prompt to paste into Claude Code
> This folder contains the approved design for the Active Travel & Logistics website (`index.html` + `assets/`). Read `README.md` and `index.html` first. Turn it into a production website: keep the design, colors, fonts and spacing exactly as they are; move the inline styles into a clean stylesheet using CSS variables for the brand tokens in the README; make the mobile menu button open a working navigation drawer; make the contact form send submissions (ask me which service: email, Formspree, or WhatsApp); add the hero photo and Google Map when I provide them; replace every `[placeholder]` with the real details I give you; and check that it works well on phone, tablet and desktop.
