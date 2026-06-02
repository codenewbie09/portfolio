# Portfolio

Terminal-themed personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS 4.

## Overview

This is a personal portfolio site for Prateek Agrawal, a backend engineering intern and CS undergraduate at Shiv Nadar University. The site uses a terminal emulator aesthetic to present projects, experience, and contact information in a compact, scannable format.

## Features

- **Terminal interface** with full-bleed layout, command input, and contextual project navigation
- **Three projects** including CourseFlow (distributed allocation engine), GhostNote (encrypted messaging), and PitchPerfect (AI sales roleplay training) with live demo links
- **Live badge indicator** on deployed projects
- **Command dock** for one-tap navigation with mobile adaptation
- **Responsive design** with line-clamp descriptions and compact headers on mobile
- **Dark theme** with cyan accent colors and monospace typography

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with CSS custom properties
- **Animation:** Framer Motion (typewriter, reduced motion support)
- **Deployment:** Vercel

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

## Deployment

Deployed via Vercel CLI. The production alias is https://prateek-agrawal.vercel.app.

```bash
vercel --prod --yes
```
