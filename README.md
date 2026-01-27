# NdevuSpace Portfolio

A modern, professional portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Single Page**: Smooth scrolling single-page application
- **Dark Theme**: Beautiful dark theme with accent colors
- **Animations**: Framer Motion powered animations and transitions
- **Performance**: Optimized for fast loading and great Core Web Vitals
- **SEO Ready**: Full meta tags and Open Graph support
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── loading.tsx      # Loading state
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Hero, About, Skills, Projects, etc.
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts (Theme)
│   ├── data/                # Static data (projects, skills, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and constants
│   ├── styles/              # Global CSS styles
│   └── types/               # TypeScript types
├── public/
│   ├── images/              # Static images
│   └── files/               # Downloadable files (CV, etc.)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn

### Installation

1. Navigate to the portfolio directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building for Production

```bash
yarn build
yarn start
```

## 🎨 Customization

### Personal Information

Edit `src/lib/constants.ts` to update your personal information, social links, and navigation items.

### Content

- **Projects**: Edit `src/data/index.ts` to update the `projectsData` array
- **Skills**: Edit `src/data/index.ts` to update the `skillsData` array
- **Experience**: Edit `src/data/index.ts` to update the `experienceData` array
- **Stats**: Edit `src/data/index.ts` to update the `statsData` array

### Styling

- **Colors**: Edit `tailwind.config.ts` to customize the color palette
- **Global Styles**: Edit `src/styles/globals.css` for global CSS changes

### Images

Place your images in the `public/images/` directory:
- `profile.png` - Your profile picture (recommended: 500x500px)
- `about.jpg` - About section image
- `projects/` - Project screenshots

## 🌐 Deployment

This site is designed to be deployed on:
- **Vercel** (recommended)
- **Netlify**
- **Any static hosting**

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure the root directory as `portfolio`
4. Deploy!

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contact

- **Website**: [www.ndevuspace.com](https://ndevuspace.com)
- **Blog**: [blog.ndevuspace.com](https://dev.ndevuspace.com)
- **Email**: ndevulion@gmail.com
- **LinkedIn**: [jean-paul-elisa](https://linkedin.com/in/jean-paul-elisa)
- **GitHub**: [Ndevu12](https://github.com/Ndevu12)
