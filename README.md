# Xynraco

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-6.19.1-2D3748?logo=prisma)

A modern web-based code playground and collaboration platform with AI-powered code suggestions, real-time editing, and seamless GitHub integration.

[Documentation](SETUP.md) • [Demo](#) • [Report Bug](https://github.com/abdhullah200/Xynraco/issues)

</div>

---

## 🎯 About Xynraco

**Xynraco** is a browser-based IDE and code playground that lets developers write, test, and execute code without leaving their browser. It combines the power of modern web technologies with local AI capabilities to provide an intelligent development environment.

Whether you're prototyping a React component, building a Node.js API, or learning a new framework, Xynraco provides instant access to 6 project templates, AI-assisted coding, and real-time execution—all locally on your machine.

---

## ✨ Core Features

### 🎨 Interactive Code Playground
- Launch projects with 6 pre-configured templates (React, NextJS , Express, Vue, Hono ,Angular)
- Full-featured Monaco Editor (VS Code engine) with syntax highlighting, autocomplete, and debugging
- Built-in file explorer and project structure management
- Real-time code execution in your browser with WebContainers

### 🤖 AI-Powered Code Assistance
- Local AI integration with Ollama—no external API calls or subscriptions
- CodeLlama and LLaMA 3 models for intelligent code suggestions and completions
- Fast, private AI responses running entirely on your machine
- AI chat for code explanations and debugging

### 🔐 Secure Authentication
- Multi-provider OAuth support (GitHub and Google)
- Session management via NextAuth.js
- User profile management and settings dashboard
- Seamless GitHub account linking and repository access

### 🔗 GitHub Integration
- Import repositories directly into Xynraco
- Sync code with GitHub repositories
- GitHub authentication for quick login
- Repository browser and project management

### 📁 Project Persistence
- All projects saved to MongoDB Atlas cloud database
- Organize playgrounds by name and category
- Star/bookmark favorite projects
- Restore previous project versions
- Cross-device access to all your projects

### 📱 Responsive & Mobile-Ready
- Works on desktop, tablet, and mobile devices
- Mobile-optimized sidebar navigation
- Touch-friendly interface
- Access your playgrounds anywhere

### 🎯 Real-Time Collaboration
- Shareable project links
- Live code editing
- Multi-user workspace support

---

## 🏗️ How It Works

### Architecture Overview
Xynraco combines modern frontend and backend technologies:

1. **Frontend** - Next.js 15 with React 19 provides a blazingly fast, responsive UI
2. **Editor** - Monaco Editor powers a professional code editing experience
3. **Runtime** - WebContainers execute code directly in the browser (Node.js environment)
4. **Terminal** - Integrated xterm.js terminal for command-line access
5. **Database** - MongoDB Atlas stores projects, user profiles, and preferences
6. **Authentication** - NextAuth.js manages secure OAuth with GitHub and Google
7. **AI** - Local Ollama instance provides intelligent code suggestions without sending code to servers

### Project Structure
```
Xynraco/
├── app/                    # Next.js App Router with API routes
│   ├── (auth)/            # Authentication & login pages
│   ├── (root)/            # Public pages & dashboard
│   ├── api/               # Backend API endpoints
│   ├── dashboard/         # User dashboard & project management
│   ├── playground/        # Code editor & execution
│   └── settings/          # User settings & profile
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui component library
│   ├── modal/            # Dialog & modal components
│   └── providers/        # Context providers (Auth, Theme)
├── features/             # Feature modules
│   ├── playground/       # Editor & execution logic
│   ├── dashboard/        # Project management
│   ├── ai/              # AI integration
│   ├── auth/            # Authentication flows
│   └── WebContainers/   # Runtime container logic
├── lib/                 # Utilities & database helpers
├── prisma/             # Database schema & models
└── public/             # Static assets & 6 templates
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17.0 or higher ([Download](https://nodejs.org/))
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)
- **Ollama** installed locally for AI features (https://ollama.com/)
- **Git** for cloning the repository

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/abdhullah200/Xynraco.git
cd Xynraco

# 2. Install all dependencies
npm install

# 3. Create .env file with required credentials
# (See Configuration section below)

# 4. Start the development server
npm run dev
```

Visit **http://localhost:3000** in your browser and start creating!

### What Happens When You Run `npm run dev`?

1. Turbopack bundles your code with blazing speed
2. Next.js App Router starts on port 3000
3. MongoDB connection initializes (requires DATABASE_URL in .env)
4. NextAuth session management becomes active
5. Ollama AI becomes available (if running locally)
6. Hot reload enabled—changes instantly reflect in browser

---

## 📦 Tech Stack Explained

### Frontend Layer
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js 15** | Full-stack React framework with App Router, API routes, and Turbopack bundler | 15.5.9 |
| **React 19** | Modern UI library with automatic batching and improved Server Components | 19.x |
| **TypeScript 5** | Type safety for all JavaScript code | 5.x |
| **TailwindCSS 3** | Utility-first CSS framework for rapid styling | 3.x |
| **shadcn/ui** | Pre-built, accessible component library (buttons, dialogs, forms, etc.) | Latest |
| **Lucide React** | Beautiful, consistent icon library with 400+ icons | Latest |

### Editor & Runtime
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Monaco Editor** | VS Code's editor engine—syntax highlighting, autocomplete, debugging | Latest |
| **WebContainers** | Browser-based Node.js runtime—run real code without a server | Latest |
| **xterm.js** | Terminal emulation for integrated CLI access | Latest |

### Backend & Database
| Technology | Purpose | Version |
|-----------|---------|---------|
| **NextAuth.js 5** | Enterprise authentication with OAuth, session management, and CSRF protection | 5.x |
| **Prisma 6** | Type-safe ORM for database operations with migrations | 6.19.1 |
| **MongoDB Atlas** | Scalable NoSQL cloud database—free tier available | Latest |

### AI & Intelligence
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Ollama** | Local AI model runner—CodeLlama, LLaMA 3, and more | Latest |
| **CodeLlama** | Specialized LLM for code generation and completion | 7b/13b/34b |
| **LLaMA 3** | General-purpose large language model for chat and explanations | 8b/70b |

### DevOps & Tooling
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Turbopack** | Lightning-fast incremental bundler (40x faster than Webpack) | Latest |
| **ESLint 8** | Code quality and consistency checks | 8.x |
| **PostCSS 8** | CSS processing with Tailwind and autoprefixer | 8.x |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Database Connection
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# NextAuth Configuration
AUTH_SECRET="your-32-character-random-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST=true

# GitHub OAuth (get from https://github.com/settings/developers)
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Google OAuth (get from https://console.cloud.google.com/)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

### Generating AUTH_SECRET
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Using npx
npx auth secret
```

### Important Notes
- **Never commit `.env.local`** to Git (already in .gitignore)
- **Keep secrets private**—use GitHub Secrets for CI/CD deployments
- **Exact URL match required** for OAuth callbacks

**📖 For detailed setup of OAuth, MongoDB, and Ollama, see [SETUP.md](SETUP.md)**

---

## 📱 Mobile Testing

### Access From Your Phone
Xynraco works great on mobile devices. Two options:

**Option 1: LAN (Local Network)**
- Great for testing on your phone without internet
- Works with GitHub OAuth
- Fastest and most reliable
- See [Mobile Testing Guide in SETUP.md](SETUP.md#mobile-testing)

**Option 2: Public Tunnel (Cloudflare)**
- Access from anywhere with internet
- Required for Google OAuth
- Public HTTPS URL
- See [Mobile Testing Guide in SETUP.md](SETUP.md#mobile-testing)

---

## �️ Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with Turbopack hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server |
| `npm run lint` | Check code quality with ESLint |
| `npx prisma studio` | Open Prisma Studio—visual database manager |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma generate` | Regenerate Prisma Client |

---

## 🔑 Key Workflows

### Creating Your First Playground

1. Sign in with GitHub or Google OAuth
2. Click **"New Playground"** on dashboard
3. Select a template (React, Next.js, Vue, Express, etc.)
4. Start editing code in Monaco Editor
5. See live execution in the preview panel
6. Save project to MongoDB

### Importing a GitHub Repository

1. Go to Dashboard
2. Click **"Import Repository"**
3. Select a public GitHub repo you have access to
4. Code is instantly loaded and ready to edit
5. Changes are synced with GitHub

### Using AI Code Suggestions

1. Ensure Ollama is running locally (`ollama serve`)
2. In the playground, open AI Chat panel
3. Ask for code suggestions, explanations, or debugging help
4. AI responses appear directly in the editor
5. All code stays local—nothing sent to external servers

---

## 📚 Documentation

### Quick References
- **[Complete Setup Guide](SETUP.md)** — OAuth (GitHub & Google), MongoDB Atlas, Ollama installation, environment variables
- **[Mobile Testing Guide](SETUP.md#mobile-testing)** — LAN access for phones, public tunnel setup
- **[Troubleshooting](SETUP.md#troubleshooting)** — Common issues and solutions
- **[Architecture](SETUP.md#architecture)** — Project structure and data models

---

## 🐛 Known Issues & Workarounds

| Issue | Status | Workaround |
|-------|--------|-----------|
| Playground runs `yarn` instead of `npm` | Pending fix | Manual yarn fix required |
| ngrok free tier breaks OAuth cookies | Documentation | Use Cloudflare Tunnel instead |
| Google OAuth rejects private IPs | By design | Use public HTTPS tunnel for testing |
| Mobile sidebar not visible on small screens | ✅ **FIXED** | Now has toggle button |

**📖 For detailed troubleshooting steps, see [SETUP.md](SETUP.md#troubleshooting)**

---

## 🎓 Learning Resources

- **Next.js** - https://nextjs.org/docs
- **React 19** - https://react.dev/
- **TypeScript** - https://www.typescriptlang.org/docs/
- **TailwindCSS** - https://tailwindcss.com/docs
- **shadcn/ui** - https://ui.shadcn.com/
- **Prisma ORM** - https://www.prisma.io/docs
- **MongoDB** - https://www.mongodb.com/docs/
- **Ollama** - https://ollama.com/docs
- **NextAuth.js** - https://authjs.dev/

---

<div align="center">
  
### 💜 Made with Love and Code by Abdullah Ariff

**If you found this project helpful, please consider giving it a ⭐ on GitHub!**

[![GitHub Stars](https://img.shields.io/github/stars/abdhullah200/Xynraco?style=social)](https://github.com/abdhullah200/Xynraco)
[![GitHub Forks](https://img.shields.io/github/forks/abdhullah200/Xynraco?style=social)](https://github.com/abdhullah200/Xynraco/fork)
[![GitHub Issues](https://img.shields.io/github/issues/abdhullah200/Xynraco)](https://github.com/abdhullah200/Xynraco/issues)

</div>


---

<div align="center">
Made with ❤️ using Next.js, React, and Ollama
</div>
