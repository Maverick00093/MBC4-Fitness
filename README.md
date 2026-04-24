# MBC4 Fitness — Official Website

> West London's top-rated personal trainer. Transform your body and mind with expert 1-on-1 coaching.

## 🏋️ About

MBC4 Fitness is a professional personal training service run by Tyhe, based at West 12 Shopping Centre, Shepherd's Bush, London W12 8PP.

**Features:**
- 🎨 Premium dark gold theme with Three.js 3D hero
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth GSAP-style scroll animations
- 📧 Working contact & booking forms with email notifications
- 🗺️ Google Maps integration
- 💬 WhatsApp quick-contact button
- ⭐ 5.0 Google rating showcase

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm (included with Node.js)

### 1. Clone & Install

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. Configure Backend

```bash
cd server
cp .env.example .env
```

Edit `.env` with your email credentials:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=tyhe@mbc4fitness.com
CLIENT_URL=http://localhost:3000
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

### 3. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

Visit **http://localhost:3000** in your browser.

## 📁 Project Structure

```
mbc4-fitness/
├── client/                    # React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx     # Sticky navigation bar
│   │   │   ├── Hero.jsx       # Full-screen hero section
│   │   │   ├── ThreeScene.jsx # Three.js 3D dumbbell + particles
│   │   │   ├── Stats.jsx      # Animated stats counter bar
│   │   │   ├── Benefits.jsx   # 3-column benefits grid
│   │   │   ├── Services.jsx   # Service cards with 3D tilt
│   │   │   ├── Testimonials.jsx # Auto-scrolling carousel
│   │   │   ├── AboutPreview.jsx # Split about section
│   │   │   ├── CTABanner.jsx  # Call-to-action banner
│   │   │   ├── Footer.jsx     # Full footer with map
│   │   │   └── WhatsAppButton.jsx # Floating WhatsApp
│   │   ├── pages/             # Route page components
│   │   │   ├── Home.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── App.jsx            # Root component with routing
│   │   ├── main.jsx           # Entry point
│   │   └── global.css         # Design system & tokens
│   ├── index.html             # Root HTML with SEO
│   ├── package.json
│   └── vite.config.js
├── server/                    # Express.js backend
│   ├── routes/
│   │   ├── contact.js         # POST /api/contact
│   │   └── booking.js         # POST /api/book
│   ├── middleware/
│   │   ├── validation.js      # express-validator rules
│   │   └── rateLimit.js       # Rate limiting (5/15min)
│   ├── server.js              # Main Express server
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#D4AF37` | Gold — main brand color |
| `--bg-dark` | `#0A0A0A` | Near-black background |
| `--bg-card` | `#111111` | Card backgrounds |
| `--accent` | `#FF6B35` | Coral CTA accent |
| Font Heading | Playfair Display | Elegant serif headings |
| Font Body | Inter | Clean body text |
| Font Accent | Rajdhani | Sporty badges/stats |

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Three.js, Bootstrap 5, CSS Custom Properties  
**Backend:** Node.js, Express.js, Nodemailer, express-validator, express-rate-limit  
**3D:** Three.js (WebGL) — metallic dumbbell model + gold particle system

## 📧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Contact form submission |
| POST | `/api/book` | Booking request submission |
| GET | `/api/health` | Server health check |

## 📄 License

© 2026 MBC4 Fitness. All rights reserved.
