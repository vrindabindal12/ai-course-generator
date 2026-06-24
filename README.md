# AI Course Generator & Prisma Creative Studio

An advanced, full-stack Next.js application that integrates an AI-powered course creation platform with a gorgeous, dark, and cinematic landing page for a creative studio named **Prisma**.

---

## 🎨 Prisma Landing Page features
A dark, moody, and highly cinematic landing page that showcases visual arts and creative studio aesthetics.

### 🌟 Sections:
1. **Hero Section**:
   - Inset responsive layout with container rounding (`rounded-2xl` to `md:rounded-[2rem]`).
   - Autoplay, looped, and muted background video overlayed with a custom fractal noise SVG texture (`.noise-overlay`) and smooth bottom gradients.
   - Glassmorphic floating pill navbar with smooth hover transitions.
   - Giant header "Prisma" utilizing a custom `WordsPullUp` component with a superscript asterisk (`*`) on the final letter.
   - Call to Action ("Join the lab") with responsive spacing and scaling animation on hover.

2. **About Section**:
   - Embedded inner card with a `#101010` backdrop.
   - Rich multi-styled header statement using `WordsPullUpMultiStyle` combining normal typography with elegant italic serif font accenting ("a self-taught director").
   - Scroll-linked character opacity reveal effect that gradually lights up text as you scroll past the paragraph.

3. **Features Section**:
   - 4-column responsive grid structure (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
   - Staggered entry animation for all cards triggered once they enter the viewport.
   - Interactive feature cards:
     - **Card 1**: Autoplay background loop video illustrating the visual canvas.
     - **Cards 2-4**: Smart Project Storyboards, AI Critiques, and Immersion Focus Capsule setups. Includes specific workflow checklist details, premium icons, and -45° rotated arrow details.

---

## 🧠 AI Course Generator Core Features
An automated course builder that leverages generative AI to dynamically curate complete courses including text, structure, and videos.

### ⚡ Key Capabilities:
* **Interactive Course Wizard**: Select Category, add topics, describe goals, select course duration, difficulty levels, number of chapters, and toggle video integration.
* **Google Gemini AI Integration**: Generates structured JSON outputs defining course outlines, chapter goals, and comprehensive texts.
* **YouTube Video Syncing**: Integrates automated YouTube API lookups to embed contextually accurate, relevant videos for each chapter.
* **Database Persistence**: Powered by **Drizzle ORM** with schema definitions for `courseList` and `chapters` storing structural JSON nodes.
* **Secure Authentication**: Integrated with **Clerk Auth** for user login, custom profiles, and secure metadata synchronization.
* **Publishing & Sharing**: Dashboard tracking for created courses, course banner templates, and toggleable public sharing routes.

---

## 🛠️ Tech Stack
* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS, Vanilla CSS (fractal noise SVG overlays)
* **Database & ORM**: Supabase, Drizzle ORM, Neon PostgreSQL serverless
* **AI Provider**: `@google/generative-ai` (Gemini API)
* **Auth**: Clerk
* **Animations**: Framer Motion
* **Icons**: Lucide React, React Icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` or `.env.local` file at the root of the project with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key

DATABASE_URL=your_database_url
```

### 3. Spin Up the Database
Sync your PostgreSQL database with the Drizzle schema:
```bash
npm run db:push
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the active dev application.
