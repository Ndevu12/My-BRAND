# NdevuSpace - Full Stack Developer Portfolio

<div align="center">
  <img src="my-brand-nextjs/public/images/logo1.png" alt="NdevuSpace Logo" width="120" height="120">
  <h3>Modern Portfolio & Blog Platform</h3>
  <p>A comprehensive personal portfolio and blog website showcasing full-stack development expertise</p>
</div>

---

## 🚀 Overview

NdevuSpace is a dual-architecture portfolio project featuring both a traditional HTML/CSS/JavaScript implementation and a modern Next.js application. This project demonstrates proficiency in multiple web development approaches, from vanilla JavaScript to modern React frameworks.

## 🏗️ Architecture

This repository contains two distinct implementations:

### 1. **Traditional Web App** (`/src`)
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Architecture**: Component-based modular structure
- **Styling**: Tailwind CSS with custom components
- **Build System**: Tailwind CLI with watch mode

### 2. **Next.js Application** (`/my-brand-nextjs`)
- **Framework**: Next.js 15.1.5 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API
- **UI Components**: Custom component library with Framer Motion
- **Icons**: Lucide React
- **Performance**: Built-in Next.js optimizations

## ✨ Features

### Core Features
- 📱 Responsive design (mobile-first approach)
- 🌙 Dark/Light theme support
- 📝 Blog management system
- 💼 Project portfolio showcase
- 📊 Admin dashboard
- 📧 Contact form integration
- 🔍 Search functionality
- 📄 Rich text editor for content creation

### Technical Features
- ⚡ Server-side rendering (SSR) with Next.js
- 🎨 Component-based architecture
- 🔒 Type safety with TypeScript
- 📐 Modular CSS with Tailwind
- 🚀 Performance optimized
- 🔄 Hot module replacement
- 📱 Progressive Web App ready

## 🛠️ Tech Stack

### Frontend Technologies
- **Frameworks**: Next.js 15, React 19
- **Languages**: TypeScript, JavaScript ES6+
- **Styling**: Tailwind CSS, CSS3
- **UI Libraries**: Framer Motion, Lucide React
- **Build Tools**: Next.js built-in bundler, Tailwind CLI

### Development Tools
- **Package Manager**: Yarn, npm
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript
- **Git Hooks**: Husky (if configured)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **Yarn** (v1.22.0 or higher)
- **Git** for version control

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ndevu12/My-BRAND.git
   cd My-BRAND
   ```

2. **Choose your implementation:**

   #### For Traditional Web App:
   ```bash
   # Install dependencies
   npm install
   
   # Build Tailwind CSS
   npm run build
   
   # Start development server
   npm run dev
   
   # Open index.html in your browser
   open index.html
   ```

   #### For Next.js Application:
   ```bash
   # Navigate to Next.js app
   cd my-brand-nextjs
   
   # Install dependencies
   npm install
   # or
   yarn install
   
   # Start development server
   npm run dev
   # or
   yarn dev
   
   # Open http://localhost:3000 in your browser
   ```

### Environment Variables

For the Next.js application, create a `.env.local` file in the `my-brand-nextjs` directory:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url_here
# DATABASE_URL=your_database_url_here
```

**Note**: Never commit sensitive credentials to version control.

## 📁 Project Structure

```
My-BRAND/
├── README.md                          # Project documentation
├── package.json                       # Traditional app dependencies
├── tailwind.config.js                 # Tailwind configuration
├── index.html                         # Main landing page
├── src/                               # Traditional web app source
│   ├── components/                    # Reusable components
│   ├── pages/                        # HTML pages
│   ├── scripts/                      # JavaScript modules
│   ├── styles/                       # CSS and Tailwind files
│   ├── images/                       # Image assets
│   └── utils/                        # Utility functions
└── my-brand-nextjs/                   # Next.js application
    ├── next.config.js                 # Next.js configuration
    ├── tailwind.config.ts            # Tailwind configuration
    ├── tsconfig.json                 # TypeScript configuration
    ├── src/
    │   ├── app/                      # App Router pages
    │   ├── components/               # React components
    │   ├── contexts/                 # React contexts
    │   ├── features/                 # Feature modules
    │   ├── lib/                      # Utility libraries
    │   ├── styles/                   # Global styles
    │   └── types/                    # TypeScript definitions
    └── public/                       # Static assets
```

## 📝 Usage Examples

### Component Usage (Traditional)
```javascript
// Using the pagination component
insertPagination('#blog-container', {
  currentPage: 1,
  totalPages: 10,
  onPageChange: function(page) {
    loadBlogPosts(page);
  }
});
```

### Component Usage (Next.js)
```tsx
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DashboardLayout } from '@/features/dashboard';

export default function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        {/* Your content */}
      </DashboardLayout>
    </ThemeProvider>
  );
}
```

## 🔧 Available Scripts

### Traditional App
- `npm run dev` - Start development with Tailwind watch mode
- `npm run build` - Build production CSS

### Next.js App
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Jean Paul Elisa Ndevu**
- Portfolio: [ndevuspace.com](https://ndevuspace.com)
- LinkedIn: [jean-paul-elisa](https://www.linkedin.com/in/jean-paul-elisa)
- GitHub: [@Ndevu12](https://github.com/Ndevu12)

---

<div align="center">
  <p>⭐ If you like this project, please give it a star on GitHub! ⭐</p>
  <p>Built with ❤️ by Ndevu</p>
</div>

