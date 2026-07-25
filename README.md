# Ryoit — Digital Marketing & Mobile Technology Platform

<div align="center">

![Ryoit Logo](https://img.shields.io/badge/Ryoit-Platform-6366f1?style=for-the-badge&labelColor=0f0a1a)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A modern educational and marketplace platform for Digital Marketing, Mobile Technology & More.**

</div>

---

## 📋 Overview

Ryoit is a full-stack learning and marketplace platform built for Ethiopia and beyond, covering:

- 📱 **Digital Marketing** — Facebook, Instagram, TikTok, YouTube, Telegram, SEO, Google Ads, Meta Ads
- 🔧 **Mobile Solutions** — Phone Repair, IMEI Repair, Hardware/Software, GSM, Flashing & Unlocking
- 🛒 **Marketplace** — Buy and sell mobile accessories, tools and tech products
- 📰 **Tech News** — Latest technology news and updates
- 🤝 **Community** — Forums, opportunities, and social media services

---

## 🗂 Project Structure

```
├── Digital_Marketing_course/     # Frontend (React 19 + TypeScript + Vite + TailwindCSS)
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── home/             # Homepage sections
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   └── ui/               # Generic UI components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── layouts/              # Page layouts (Main, Dashboard, Admin)
│   │   ├── pages/                # Route pages
│   │   │   ├── admin/            # Admin panel pages
│   │   │   ├── auth/             # Login, Register
│   │   │   ├── courses/          # Courses listing & detail
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── home/             # Landing page
│   │   │   ├── marketplace/      # Marketplace listing & detail
│   │   │   ├── mobile-solutions/ # Mobile solutions
│   │   │   ├── news/             # Tech news
│   │   │   └── static/           # About, Contact, FAQ, Privacy, Terms
│   │   ├── redux/                # Redux Toolkit state management
│   │   ├── routes/               # React Router v6 route config
│   │   ├── services/             # Axios API service layer
│   │   ├── types/                # TypeScript interfaces & types
│   │   └── utils/                # Utility functions
│   └── vercel.json               # Vercel SPA routing config
│
└── digital-marketing-platform-api/  # Backend (Node.js + Express + Prisma + PostgreSQL)
    ├── prisma/
    │   ├── schema.prisma         # Database schema
    │   └── seed.ts               # Database seed script
    └── src/
        ├── config/               # Database, environment config
        ├── controllers/          # Route handlers
        ├── middlewares/          # Auth, upload, error handlers
        ├── routes/               # Express route definitions
        ├── services/             # Token service
        ├── types/                # TypeScript interfaces
        └── utils/                # AppError, asyncHandler
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **PostgreSQL** database (local or [Neon](https://neon.tech))

---

### Frontend Setup

```bash
# Navigate to the frontend directory
cd Digital_Marketing_course

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs at **http://localhost:5173**

#### Environment Variables (Frontend)

Create a `.env.local` file in `Digital_Marketing_course/`:

```env
VITE_API_URL=http://localhost:5000
```

---

### Backend Setup

```bash
# Navigate to the backend directory
cd digital-marketing-platform-api

# Install dependencies
npm install

# Copy the environment file
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/ryoit_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
```

```bash
# Run database migrations
npx prisma migrate dev --name init

# Seed the database with initial data
npx ts-node prisma/seed.ts

# Start the development server
npm run dev
```

The API runs at **http://localhost:5000**

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool & dev server |
| TailwindCSS | 3.x | Utility-first CSS |
| Redux Toolkit | 2.x | State management |
| React Query | 5.x | Server state & caching |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client |
| Framer Motion | 11.x | Animations |
| React Helmet | 6.x | SEO meta tags |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥18 | Runtime |
| Express | 4.x | HTTP framework |
| TypeScript | 5.x | Type safety |
| Prisma | 5.x | ORM |
| PostgreSQL | 14+ | Database |
| bcryptjs | 2.x | Password hashing |
| jsonwebtoken | 9.x | JWT authentication |
| Zod | 3.x | Request validation |
| Helmet | 7.x | Security headers |
| Multer | 1.x | File uploads |

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Courses
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses (paginated) |
| GET | `/api/courses/featured` | Get featured courses |
| GET | `/api/courses/:slug` | Get single course |
| POST | `/api/courses` | Create course (Admin) |
| PATCH | `/api/courses/:id` | Update course (Admin) |
| DELETE | `/api/courses/:id` | Delete course (Admin) |
| POST | `/api/courses/:id/enroll` | Enroll in course |

### Marketplace
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/marketplace` | Get all listings (paginated) |
| GET | `/api/marketplace/:id` | Get single listing |
| POST | `/api/marketplace` | Create listing (Auth) |
| PATCH | `/api/marketplace/:id` | Update listing (Owner/Admin) |
| DELETE | `/api/marketplace/:id` | Delete listing (Owner/Admin) |

### Mobile Solutions
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/mobile-solutions` | Get all services |
| GET | `/api/mobile-solutions/:slug` | Get single service |
| POST | `/api/mobile-solutions` | Create service (Admin) |
| PATCH | `/api/mobile-solutions/:id` | Update service (Admin) |
| DELETE | `/api/mobile-solutions/:id` | Delete service (Admin) |

### News
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/news` | Get all articles (paginated) |
| GET | `/api/news/latest` | Get latest articles |
| GET | `/api/news/:slug` | Get single article |
| POST | `/api/news` | Create article (Admin) |
| PATCH | `/api/news/:id` | Update article (Admin) |
| DELETE | `/api/news/:id` | Delete article (Admin) |

---

## 📦 Deployment

### Frontend (Vercel)

1. Push the `Digital_Marketing_course/` directory to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Set **Framework Preset** to `Vite`
4. Set **Root Directory** to `Digital_Marketing_course`
5. Add environment variable: `VITE_API_URL=<your_api_url>`
6. Deploy!

### Backend (Render / Railway)

1. Push the `digital-marketing-platform-api/` directory to GitHub
2. Connect to [Render](https://render.com) or [Railway](https://railway.app)
3. Set **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Set **Start Command**: `node dist/server.js`
5. Add all environment variables from `.env.example`
6. Deploy!

### Database (Neon)

1. Sign up at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Set it as `DATABASE_URL` in your backend's environment variables

---

## 🔐 Default Admin Account

After running the seed script, use these credentials to access the admin panel:

```
Email:    admin@ryoit.com
Password: admin123
```

> ⚠️ **Change the admin password immediately after first login in production!**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by the **Ryoit Team**

</div>
