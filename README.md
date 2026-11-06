# Siyakha Productions website

## Run locally
1. Open the folder in Visual Studio Code.
2. Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".

## Structure
- Five pages: index, about, technical-sound, printing, contact.
- `css/style.css` - design tokens (top of file), layout, responsive rules, motion.
- `js/main.js` (menu, year) and `js/forms.js` (validation + submission).
- `assets/logos/siyakha-logo.jpg` - supplied logo, unaltered.
- `assets/images/` - supplied photographs, resized for the web.

## Contact details
Address, phone, email and the WhatsApp link (`https://wa.me/27677041461`) appear in the footer of every page, on the contact page, and as a floating WhatsApp button.

## Contact form (sends to info@siyakhaproductions.co.za)
The form posts to FormSubmit (`data-endpoint` in `contact.html`). One-time activation: once the site is live, submit the form once; FormSubmit emails a confirmation link to info@siyakhaproductions.co.za. Click it, and every later enquiry arrives in that inbox. The form has a hidden spam trap and client-side validation. To use Formspree or another service instead, change `data-endpoint` and the response check in `js/forms.js`.

## Photos
Several supplied photos show other companies' branding (for example the vehicle wrap). Confirm you have the right to use each one, and only describe photos as Siyakha's own work if they are.

## Before launch
Add canonical URLs, an og:image and a sitemap.xml (see robots.txt) once the domain is confirmed.
