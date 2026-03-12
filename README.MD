<p align="center">
  <h1>🪖 BuildCorp</h1>
</p>

<h1 align="center">BuildCorp — Construction Services Showcase</h1>

<p align="center">
  A modern, professional construction company website built with Laravel and React — featuring a dynamic project portfolio, service showcase, client testimonials, and a full admin dashboard for content management.
</p>

<p align="center">
  <img src="/screens/1.png>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-1-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="public/screens/1.png" width="49%"/>
  <img src="public/screens/2.png" width="49%"/>
</p>
<p align="center">
  <img src="public/screens/3.png" width="49%"/>
  <img src="public/screens/4.png" width="49%"/>
</p>
<p align="center">
  <img src="public/screens/5.png" width="49%"/>
  <img src="public/screens/6.png" width="49%"/>
</p>

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Laravel 11** | Core framework — routing, ORM, API, storage |
| **MySQL** | Relational database for projects, categories, testimonials |
| **Laravel Storage** | Image uploads for projects and services |
| **RESTful API** | JSON endpoints consumed by the React frontend |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | Component-based UI |
| **TypeScript** | Type-safe frontend development |
| **Axios** | HTTP client for API communication |
| **Tailwind CSS** | Utility-first responsive styling |
| **shadcn/ui** | Accessible, modern UI components |

---

## ✨ Key Features

### 🌐 Public Showcase
- **Hero section** with company stats — 500+ projects, 20+ years experience, 100% client satisfaction
- **Services section** — Civil, Commercial, Industrial, and Residential construction with detailed descriptions
- **Featured Projects** — Dynamic project portfolio with category, location, and year
- **Client Testimonials** — Testimonials from clients with names and companies
- Fully **responsive design** — mobile, tablet, and desktop ready
- Smooth animations and professional visual presentation

### 🛠️ Admin Dashboard
- **Project management** — Add, edit, and delete projects with image uploads, title, location, year, and category
- **Category management** — Create and manage service categories displayed on the frontend
- Protected admin routes — only authenticated admins can access the dashboard
- Image upload with Laravel Storage and public URL generation

### 🔗 Laravel + React Architecture
- Laravel serves a **RESTful API** with JSON responses
- React frontend consumes the API via **Axios**
- Clean separation between backend and frontend
- Centralized API service layer in the frontend for maintainability

---

## ⚙️ Installation & Setup

### Requirements
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8+

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/buildcorp.git
cd buildcorp
```

### 2. Install dependencies
```bash
composer install
npm install
```

### 3. Environment setup
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure your `.env`
```env
APP_NAME=BuildCorp
APP_URL=http://localhost:8000

DB_DATABASE=buildcorp
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Database setup
```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### 6. Run the application
```bash
# Terminal 1 — Laravel server
php artisan serve

# Terminal 2 — Vite dev server
npm run dev
```

Visit `http://localhost:8000`

---

## 🗂️ Project Structure

```
buildcorp/
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/          # Project & Category management
│   │   └── Api/            # Public API endpoints
│   └── Models/             # Project, Category, Testimonial
├── resources/
│   └── js/
│       ├── components/     # Hero, Services, Projects, Testimonials...
│       ├── pages/          # Home, ProjectDetail, Admin Dashboard
│       └── services/       # Axios API service layer
├── routes/
│   ├── web.php
│   └── api.php
└── storage/
    └── app/public/         # Uploaded project images
```

---

## 🔮 Future Work

| Feature | Description |
|---------|-------------|
| 🐳 **Docker** | Containerize for one-command deployment |
| 📬 **Contact Form** | Quote request form with email notification to admin |
| 🌍 **Multi-language** | Arabic / French / English support for wider reach |
| 📊 **Project Filter** | Filter projects by category, year, and location on the frontend |
| 🗺️ **Map Integration** | Show project locations on an interactive Google Maps view |
| 📱 **Mobile App** | React Native app for project portfolio showcase |
| ⭐ **Client Reviews** | Admin-managed testimonials panel with approval system |
| 🔍 **SEO Optimization** | Meta tags, Open Graph, and sitemap for search engines |
| 📈 **Analytics** | Admin dashboard with visitor stats and project view counts |
| 🎬 **Video Support** | Upload and display project walkthrough videos |

---

## 📄 License

Copyright (c) 2025 Your Name. All rights reserved.
This source code is published for portfolio and demonstration purposes only.
Viewing is permitted. Copying, modifying, or redistributing is not.

---

<p align="center">Built by <strong>Amokrane Ahmed</strong></p>