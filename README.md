# LUXE LIVING — Progressive Web App (PWA) & Haute Furniture Atelier

An international luxury furniture web application engineered with an editorial, architectural aesthetic inspired by contemporary Italian design, rich emerald velvets, book-matched natural marbles, and sculptural champagne brass accents.

> *"Where Luxury Meets Living."*

---

## 📱 Progressive Web App (PWA) Features

- **Installable Native App Experience**: Can be added directly to desktop or mobile home screens with custom 192x192 and 512x512 app icons, standalone orientation, and theme color `#0B3D2E`.
- **Offline Reliability (`sw.js`)**: Service Worker precaches the application shell, collections, and customizer assets so the entire atelier remains responsive without network access.
- **Interactive Bespoke Customizer (`customizer.html`)**: Real-time 3D-feeling interactive furniture customizer allowing users to customize silhouettes, loomed Italian velvets, marbles, plinth metals, and dimensions with live price recalculation and dossier export.
- **Multi-Currency Engine**: Live currency switching between USD ($), EUR (€), GBP (£), and AED (د.إ) across the entire application.
- **Atelier Command Palette (`Cmd+K` / `Ctrl+K`)**: Instant fuzzy search across products, materials, services, and showroom locations.
- **Curated Wishlist System**: Persistent favorites with quick add/remove, dedicated drawer, and one-click "Move All to Bag".
- **Mobile Bottom App Bar**: Fixed native app bottom navigation on mobile devices (Home, Catalog, Customizer, Wishlist, Bag).

---

## 🏛️ Brand Identity & Visual Palette

- **Deep Emerald Green**: `#0B3D2E` *(Luxury accents, dark sections, velvety atmospheric glows)*
- **Obsidian Black**: `#111111` *(High-contrast backdrop, deep architectural surfaces)*
- **Champagne Gold**: `#C5A46D` *(Refined decorative borders, subtle highlights, active states)*
- **Warm Ivory**: `#F4EFE6` *(Clean editorial typography, warm highlights, soft backdrops)*
- **Warm Taupe**: `#756B60` *(Secondary metadata, quiet textures, neutral balance)*

---

## 📄 Complete Web Application Pages

1. **[Home (index.html)](file:///c:/Users/ayode/Desktop/prospira%20office/index.html)**:
   - **Revolution Slider Hero**: 100vh full-screen cinematic slider featuring 3 curated slides with Ken Burns zoom/pan, line-by-line masked reveals, live slide timer progress bar, navigation arrows, dot pagination, and touch swipe support.
   - **Featured Collections**: Interactive categorised displays for Living Room, Bedroom, Dining Room, Accent Furniture, and Luxury Decor.
   - **Featured Furniture Catalog**: Curated product cards with live category filtering, "Signature Piece" badges, pricing, and modal interactions.
   - **Why Luxe Living**: Four value pillars (Timeless Craftsmanship, Exceptional Comfort, Curated Luxury, Personalised Experience).
   - **Editorial Lifestyle Section**: Asymmetrical magazine layout showcasing the flagship showroom with the signature quote: *"Luxury is not just how your home looks. It is how it makes you feel."*
   - **Grand Call to Action**: *"Let Your Space Tell Your Story."*

2. **[Bespoke Customizer (customizer.html)](file:///c:/Users/ayode/Desktop/prospira%20office/customizer.html)**:
   - Real-time 3D visualizer canvas with dynamic material tinting.
   - Modular silhouette switcher (*The Aurelia Sectional*, *Sovereign Dining Table*, *Palazzo Bed*).
   - Swatch selections for velvets, silks, bouclés, and Calacatta Viola marbles.
   - Hardware and plinth metal finishes (Champagne Gold, Antique Bronze, Gunmetal).
   - Dimension and scale modular pricing.
   - One-click "Export Spec Dossier" and "Add Custom Commission to Bag".

3. **[About Us (about.html)](file:///c:/Users/ayode/Desktop/prospira%20office/about.html)**:
   - Page Hero: *"Designed for the Art of Living."*
   - Brand Story: Complete authentic narrative on shaping living experiences.
   - Philosophy, Vision & Mission: Deep dive into the triad of form, materiality, and emotional resonance.
   - Quality, Craftsmanship & Materials: Italian Calacatta & Spanish Nero Marquina marbles, custom loomed velvets, and kiln-dried European hardwood internal joinery.
   - The Luxe Living Experience: 4-stage client journey from private consultation to white-glove installation.
   - Flagship Showroom Atmosphere: Featuring the brand's Madison Avenue exhibition gallery.

4. **[Our Services (services.html)](file:///c:/Users/ayode/Desktop/prospira%20office/services.html)**:
   - **01. Luxury Furniture Sales**: Direct acquisition of bespoke living, dining, and bedroom suites.
   - **02. Furniture Customisation**: Tailored dimensions, custom fabric loomed dye lots, and rare stone selections.
   - **03. Interior Styling**: Curated color palettes, moodboards, and sculptural lighting coordination.
   - **04. Space Planning**: Architectural scale floorplans, circulation flow, and 3D elevation modeling.
   - **05. Furniture Consultation**: In-person showroom VIP appointments and virtual studio sessions.
   - **06. Delivery & Installation**: White-glove logistics, climate-controlled transit, and care certification.

5. **[Contact Us (contact.html)](file:///c:/Users/ayode/Desktop/prospira%20office/contact.html)**:
   - Functional, validated contact form with real-time error detection.
   - Required Subject dropdown covering all 6 inquiry categories.
   - Interactive submission with instant client reference dossier modal (`LX-XXXXXX`).
   - WhatsApp integration banner with editable phone number and prefilled message generator.
   - Editable phone, direct email, and Madison Avenue flagship showroom details.
   - Flagship showroom preview card and consultation booking shortcuts.

---

## ⚡ Interactive Web App Features

- **Universal Cart Drawer**: Real-time quantity adjustment, item removal, dynamic subtotal calculation, free white-glove delivery threshold tracking, and concierge checkout inquiry modal.
- **Curated Wishlist Drawer**: LocalStorage-backed wishlist with heart triggers on each product card.
- **Product Quick View Modal**: Interactive fabric/finish swatches, material specs, dimensions, and instant add-to-bag actions.
- **VIP Consultation Booking Modal**: Date picker, service selector, and client contact capture accessible from any page.
- **WhatsApp Concierge**: Floating launcher in bottom corner with prefilled consultation routing.

---

## 💻 How to View & Run

1. Open `index.html` or `customizer.html` directly in any modern browser:
   ```bash
   start index.html
   ```
2. Or run a lightweight local HTTP server:
   ```bash
   npx serve .
   ```
