# 🛠️ Common Instructions for MY-BRAND Portfolio Refactor

This document defines the common guidelines and conventions to follow while working on the **MY-BRAND** portfolio project refactor to **Next.js (App Router)**.

This Website will be serving my vision so, it is not only about the website as the portfolio but Personal branding from Enterprenuerial, Software Engineering, AI, ML, Cloud Native, and IoT Enthusiast, and Pan-Africanism.
---

## 🚀 Project Goal

Refactor the existing HTML/JS/Tailwind portfolio project into a modern, scalable, and maintainable **Next.js App Router** project. The project must retain the current **brand identity and color scheme**, while improving layout, structure, and content representation for a more modern user experience.

---

## 📁 Structure & Organization

- Use **Next.js App Router** (inside `/app/` directory).
- Follow a **feature-based** and **atomic design system** approach:

my-brand-nextjs/
├── src/
│   ├── app/
│   │   ├── 
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── skills/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Typography/
│   │   │   └── Icon/
│   │   ├── molecules/
│   │   │   ├── Card/
│   │   │   ├── FormGroup/
│   │   │   └── SocialLinks/
│   │   └── organisms/
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Hero/
│   │       └── ContactForm/
│   ├── features/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── blog/
│   │   └── contact/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── styles/
│   └── types/
├── public/
│   └── images/
├── tailwind.config.ts
└── next.config.js

- Each **feature** should be encapsulated in its own folder under `/features/`.
- Keep components reusable, readable, and isolated.

---

## 🎨 Design System Guidelines

- **Tailwind CSS** is the primary styling method.
- Use **existing design tokens (colors, fonts, spacing)** from the legacy project.
- You may enhance the visual appearance while preserving the original identity.
- Apply **modern layout principles**:
- Responsive by default
- Consistent spacing and alignment
- Fluid typography and clean hierarchy
- All UI elements should be built using **atomic design** principles:
- `atoms/`: small, reusable pieces (buttons, inputs, labels)
- `molecules/`: groups of atoms (form groups, cards)
- `organisms/`: full sections (navbars, footers, hero blocks)

---

## 📦 Component & Code Guidelines

- Use **TypeScript** for all files.
- Follow **Next.js best practices** (e.g., `loading.tsx`, `page.tsx`, `layout.tsx`).
- Use **React Server Components** where applicable (static and non-interactive).
- Use **Client Components** only when interactivity is required (`"use client"`).
- All pages must define **`metadata`** using the new `metadata` API for SEO.
- Always use `Typography` components for text elements.
- Every component has to support both theme: `dark` and `light`. The default theme is `dark`. Theme witching will be performed by Tailwind css automatically so, `dark:` class has to be used for `dark` theme styling.

---

## 🔐 Accessibility & Performance

- Use semantic HTML elements (`<main>`, `<section>`, `<header>`, etc.).
- Ensure all interactive elements are accessible (e.g., buttons, links).
- Avoid excessive animations or DOM-heavy layouts.
- Prefer **optimized images** and lazy loading where needed.

---

## 🌐 Routing & Navigation

- Implement modern and mobile-friendly **navigation with responsive menu**.
- Use **file-based routing** inside the `app/` directory.
- Ensure proper linking between all sections and pages using `next/link`.

---

## ✅ Commit & PR Guidelines

- Use clear and concise commit messages (e.g., `feat: migrate about section`, `refactor: update hero layout`).
- Keep PRs small, focused, and scoped to a specific section or feature.
- Always run and test locally before committing.

---

## 📍 Important Notes

- The goal is **not to change the identity**, but to **modernize and improve structure, maintainability, and usability**.
- Avoid overengineering — stick to what’s necessary and elegant.
- Keep scalability in mind for future expansion (e.g., adding a blog or CMS).

---

🔄 Please refer to this file consistently throughout development.

