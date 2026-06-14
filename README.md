# Lume OS — AI-Powered Marketing Operations Platform

<p align="center">
  <strong>The operating system for modern marketing growth.</strong><br/>
  Plan, automate, and scale your global campaigns from a single unified workspace.
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#ai-studio">AI Studio</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#architecture">Architecture</a>
</p>

---

## Overview

**Lume OS** is a full-stack marketing operations platform designed for agencies, freelancers, and SMBs. It replaces the fragmented stack of ten+ tools with one cohesive workspace — combining campaign planning, AI-assisted content generation, real-time analytics, automation workflows, and CRM — all within a beautifully crafted, lightning-fast web application.

> 🌍 Used by 4,200+ teams worldwide · 28 languages · SOC 2 · GDPR · CCPA

---

## ✨ Features

### Landing & Marketing Site
- **Modern, conversion-optimized landing page** with hero, features, use-cases, integrations, and pricing sections
- **SEO-ready** with OpenGraph meta tags, sitemap generation, and semantic HTML
- **Responsive design** crafted with Tailwind CSS v4 and a custom design token system

### Authentication & User Management
- **Email + password authentication** with secure session handling
- **Google OAuth** social login
- **User profiles** with display name, workspace name, and avatar support
- **Role-based access control** (RBAC) with `admin`, `moderator`, and `user` roles
- Row-Level Security (RLS) on all database tables

### Dashboard
- **Unified workspace dashboard** with KPI overview cards (Revenue, MQLs, CAC, Automations)
- **Sidebar navigation** with collapsible layout and active route highlighting
- **Workspace-aware** — each user has a personal workspace context

### 🤖 AI Studio
Three AI-powered tools running on the Lovable AI Gateway (Google Gemini):

| Tool | Description |
|------|-------------|
| **Campaign Copilot** | Chat with an AI marketing strategist. Ask about campaign planning, channel strategy, SEO, email flows, and optimization. |
| **Ad Copy Generator** | Generate headlines, descriptions, CTAs, and hashtags tailored to your product, audience, tone, and channel. |
| **Campaign Analyzer** | Paste campaign data (CSV, metrics, notes) and get instant Markdown reports with insights and recommendations. |

All AI generations are logged to the database for audit and reuse.

### Marketing Pages
- `/features` — Detailed platform capabilities
- `/pricing` — Three-tier pricing (Starter, Growth, Agency)
- `/use-cases` — Tailored solutions for Agencies, Freelancers, and SMBs
- `/integrations` — 200+ integrations showcase
- `/resources` — Helpful content hub

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                        │
│  TanStack Router (file-based) · TanStack Query · React 19  │
│  Tailwind CSS v4 · Radix UI · shadcn/ui · Lucide Icons    │
├─────────────────────────────────────────────────────────────┤
│                      Server Functions                       │
│        createServerFn · Zod validation · Auth middleware     │
│              Lovable AI Gateway · Supabase RLS              │
├─────────────────────────────────────────────────────────────┤
│                        Data Layer                         │
│        Supabase PostgreSQL · Row-Level Security · Auth     │
│              profiles · user_roles · ai_generations         │
└─────────────────────────────────────────────────────────────┘
```

### Route Structure

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/auth` | Public | Sign in / Sign up |
| `/features` | Public | Platform features |
| `/pricing` | Public | Pricing plans |
| `/use-cases` | Public | Use case stories |
| `/integrations` | Public | Integrations directory |
| `/resources` | Public | Resources hub |
| `/dashboard` | Authenticated | Main dashboard |
| `/ai-studio` | Authenticated | AI tools (chat, copy, analyze) |
| `/api/chat` | Authenticated | Streaming AI chat endpoint |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [TanStack Start v1](https://tanstack.com/start) — Full-stack React 19 with SSR & server functions |
| **Router** | TanStack Router (file-based, type-safe) |
| **Styling** | Tailwind CSS v4 with CSS custom properties design tokens |
| **UI Kit** | Radix UI primitives + shadcn/ui components |
| **Backend** | Supabase (PostgreSQL + Auth + RLS) |
| **AI** | Lovable AI Gateway (Google Gemini 3 Flash) |
| **Auth** | Supabase Auth (email/password + Google OAuth) |
| **State** | TanStack Query v5 |
| **Icons** | Lucide React |
| **Build** | Vite 7 |
| **Runtime** | Cloudflare Workers (edge) |

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Lovable](https://lovable.dev) account (for AI Gateway)

### 1. Clone the repository

```bash
git clone https://github.com/tanzirrabby/lume-os.git
cd lume-os
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Lovable AI Gateway
LOVABLE_API_KEY=your-lovable-api-key
```

### 4. Set up the database

Run the Supabase migrations to create tables, RLS policies, and the `has_role` security definer function:

```bash
supabase db push
```

Migrations included:
- `profiles` table with workspace fields
- `user_roles` table with enum-based RBAC
- `has_role()` security definer function
- `ai_generations` audit log table

### 5. Configure Auth (Supabase Dashboard)

1. Go to **Authentication → Providers**
2. Enable **Google** OAuth and add your Client ID / Secret
3. Set your **Site URL** and **Redirect URLs**
4. Configure **Email templates** if needed

### 6. Start the development server

```bash
bun run dev
```

The app will be available at `http://localhost:3000`.

### 7. Build for production

```bash
bun run build
```

---

## 📁 Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── integrations/
│   │   ├── lovable/         # AI Gateway integration
│   │   └── supabase/        # Supabase client, auth, middleware
│   ├── lib/
│   │   ├── ai.functions.ts  # AI server functions (copy, analyze)
│   │   └── ai-gateway.server.ts
│   ├── routes/
│   │   ├── _authenticated/  # Protected routes (dashboard, ai-studio)
│   │   ├── api/chat.ts       # Streaming chat API
│   │   ├── auth.tsx          # Auth page
│   │   ├── index.tsx         # Landing page
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   └── ...
│   ├── router.tsx           # TanStack Router config
│   ├── start.ts             # TanStack Start config
│   └── styles.css           # Global styles + design tokens
├── supabase/
│   └── migrations/          # Database migrations
├── .env
├── package.json
└── vite.config.ts
```

---

## 🔐 Security

- **Row-Level Security (RLS)** is enabled on all tables
- `user_roles` uses a separate table (never store roles on `profiles`)
- `has_role()` is a `SECURITY DEFINER` function to avoid recursive RLS
- Service role key is **never imported at module scope** in client-reachable files
- All privileged server functions verify caller identity via `requireSupabaseAuth` + role checks
- Zod input validation on all server functions

---

## 🧠 AI Capabilities

| Feature | Model | Endpoint |
|---------|-------|----------|
| Campaign Copilot (chat) | Google Gemini 3 Flash | `/api/chat` (streaming) |
| Ad Copy Generator | Google Gemini 3 Flash | `generateAdCopy` server function |
| Campaign Analyzer | Google Gemini 3 Flash | `analyzeCampaign` server function |

All AI calls go through the **Lovable AI Gateway** with `createLovableAiGatewayProvider`.

---

## 🌐 Deployment

This project is built for **Cloudflare Workers** (edge runtime) via TanStack Start.

### Deploy to Lovable
1. Push to your connected GitHub repo
2. Lovable automatically builds and deploys
3. Configure environment variables in Lovable project settings

### Deploy Elsewhere
The codebase uses standard open-source technologies and can be deployed anywhere that supports:
- Vite + TanStack Start
- Node.js 20+ or a Workers-compatible runtime
- Supabase for database and auth

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/tanzirrabby">@tanzirrabby</a>
</p>
