<div align="center">

![App Logo](public/Favicon.svg)

# OSI Model Simulator – Frontend

[![Proprietary](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-blue.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

**Landing site for OSI Model Simulator** — the marketing website for the [OSI Model Simulator app](https://app.osi-model-simulator.roboticela.com).

[Features](#-features) • [Installation](#-installation) • [API](#-api) • [Support](#-support)

</div>

---

## Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment variables](#environment-variables)
- [Running the Application](#-running-the-application)
- [Building for Production](#-building-for-production)
- [API](#-api)
- [Email templates](#email-templates)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)
- [About Roboticela](#-about-roboticela)

---

## About

This repository is the **web frontend** for **OSI Model Simulator**:

- **Landing page** — Marketing site with hero, features, how it works, demo, downloads, comparison, FAQ, and about.
- **Support page** — `/support` with a contact form (full name, email, message); submissions are sent to you via SMTP using a configurable HTML email template.
- **Contact API** — `POST /api/contact` for the support form; sends email via SMTP using the template in `EmailStructures/support-contact.html`.

The full **OSI Model Simulator** product is an educational app (Tauri + React) that visualizes how messages travel through the seven OSI layers. This Next.js app serves the public website and support form with CORS enabled for the app domain.

### Why This Project?

- **Proprietary** — © Roboticela. All rights reserved.
- **Next.js** — Fast, modern React framework with API routes
- **CORS-ready** — Configured for `app.osi-model-simulator.roboticela.com` and localhost
- **Modern UI** — Tailwind CSS, Framer Motion, light/dark theme

---

## Features

### Website

- **Hero & value proposition** — Clear messaging and call-to-action for the OSI Model Simulator
- **Features & comparison** — Simulator capabilities, protocols, and transmission media
- **Downloads & platforms** — Links to desktop app and protocol/platform info
- **Support page** — `/support` contact form (full name, email, message) with success/error feedback
- **FAQ, stats, use cases** — Trust and common questions
- **Responsive & themed** — Works on all devices with light/dark mode

### API

- **`POST /api/contact`** — Accepts support form data; sends email via SMTP using the HTML template in `EmailStructures/support-contact.html`
- **CORS** — Allows `https://app.osi-model-simulator.roboticela.com`, `http://app.osi-model-simulator.roboticela.com`, and localhost
- **Validation** — Required fields and SMTP config (contact)

---

## Technology Stack

| Layer        | Tech |
|-------------|------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI**        | [React 19](https://reactjs.org/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons**     | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Language**  | [TypeScript 5](https://www.typescriptlang.org/) |
| **Contact / SMTP** | [nodemailer](https://nodemailer.com/) |

### Development

- **Linting** — ESLint + eslint-config-next
- **Package manager** — npm

---

## Prerequisites

- **Node.js** (v20 or higher) — [Download](https://nodejs.org/)
- **npm** — Comes with Node.js

No Rust or Tauri required; this repo is the Next.js web app only.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Roboticela/OSI-Model-Simulator-Frontend.git
cd OSI-Model-Simulator-Frontend
```

### 2. Install dependencies

```bash
npm install
```

---

## Environment variables

For the **Support** contact form to send email, copy `.env.example` to `.env.local` and set:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server host (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | Port (e.g. `587`) |
| `SMTP_SECURE` | `true` for 465, `false` for 587 |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` or `SMTP_PASSWORD` | SMTP password |
| `SMTP_FROM` | Sender address (e.g. `OSI Model Simulator Support <noreply@example.com>`) |
| `CONTACT_EMAIL` | Where support messages are delivered |

Without these, the Support page form will still render but `POST /api/contact` will return a configuration error.

---

## Running the Application

### Development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Production (local)

```bash
npm run build
npm run start
```

---

## Building for Production

```bash
npm run build
```

Output is in `.next/`. Deploy to Vercel, Node, or any Next.js-compatible host.

### Lint

```bash
npm run lint
```

---

## API

### `POST /api/contact`

Sends a support/contact message via SMTP. Used by the [Support page](/support).

**Request**

- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "message": "Your message here."
}
```

**Response**

- **Success (200):** `{ "success": true }`
- **Error (4xx/5xx):** JSON `{ "error": "...", "message": "..." }`

**CORS:** Allowed origins: `https://app.osi-model-simulator.roboticela.com`, `http://app.osi-model-simulator.roboticela.com`, `http://localhost:3000`, `http://127.0.0.1:3000`. Email is sent using the HTML template in `EmailStructures/support-contact.html` (placeholders `{{fullName}}`, `{{email}}`, `{{message}}`).

---

## Email templates

Support form emails use HTML from the **EmailStructures** folder:

| File | Purpose |
|------|---------|
| `EmailStructures/support-contact.html` | Template for messages submitted via the Support page. Placeholders: `{{fullName}}`, `{{email}}`, `{{message}}`. |

Edit the HTML to change layout, branding, or copy. The API replaces the placeholders with escaped user input when sending.

---

## Project Structure

```
OSI-Model-Simulator-Frontend/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Support form → SMTP (uses EmailStructures)
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Imports from @/components
│   └── support/
│       ├── layout.tsx
│       └── page.tsx           # Support / contact form (imports @/components)
├── assets/                   # Static assets (e.g. CompanyLogo.png)
├── components/               # Page sections & UI (outside app; use @/components)
│   ├── About.tsx
│   ├── Comparison.tsx
│   ├── Demo.tsx
│   ├── Downloads.tsx
│   ├── FAQ.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Navbar.tsx
│   ├── Platforms.tsx
│   ├── Stats.tsx
│   ├── SystemRequirements.tsx
│   ├── TechnologyStack.tsx
│   ├── ThemeToggle.tsx
│   ├── UseCases.tsx
│   └── WhyChoose.tsx
├── EmailStructures/
│   └── support-contact.html  # HTML email template for support messages
├── public/
│   ├── Favicon.svg
│   ├── icon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature` or `fix/your-fix`
3. Commit with clear messages (e.g. `Add: ...`, `Fix: ...`, `Docs: ...`)
4. Push and open a Pull Request

Please follow existing code style (TypeScript, Tailwind, React/Next.js conventions).

---

## Support

- **Support form:** [/support](/support) — submit questions or feedback (requires SMTP env vars).
- **Issues:** [GitHub Issues](https://github.com/Roboticela/OSI-Model-Simulator-Frontend/issues)
- **OSI Model Simulator app:** [app.osi-model-simulator.roboticela.com](https://app.osi-model-simulator.roboticela.com)
- **Roboticela:** [github.com/Roboticela](https://github.com/Roboticela)

---

## License

This project is **proprietary** to **Roboticela**. All rights reserved.

- Unauthorized copying, modification, distribution, or use is prohibited.
- For licensing inquiries, contact [Roboticela](https://github.com/Roboticela).

See [LICENSE](LICENSE) for full terms.

---

## About Roboticela

<div align="center">

![Company Logo](assets/CompanyLogo.png)

**Roboticela** builds high-quality software for developers and educators.

</div>

- **GitHub:** [github.com/Roboticela](https://github.com/Roboticela)
- **OSI Model Simulator:** [Roboticela OSI Model Simulator](https://github.com/Roboticela/osi-model-simulator) (desktop app)
- **This repo:** Web frontend for OSI Model Simulator (proprietary)

---

**Built with ❤️ by [Roboticela](https://github.com/Roboticela)**

© Roboticela. All rights reserved.
