import Link from "next/link";
import Image from "next/image";
import { SocialLink, FooterProps } from "@/types/navigation";

interface QuickLink {
  name: string;
  href: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jean-paul-elisa",
      ariaLabel: "LinkedIn Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/Ndevu12",
      ariaLabel: "GitHub Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:contact@ndevuspace.com",
      ariaLabel: "Email Contact",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
        </svg>
      ),
    },
  ];

  const quickLinks: QuickLink[] = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/#aboutme" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contactme" },
    { name: "Portfolio", href: "/projects" },
    { name: "Experience", href: "/experience" },
  ];

  const technologies: string[] = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Python",
    "PostgreSQL",
    "MongoDB",
  ];

  return (
    <footer
      className={`bg-footer-bg pt-16 pb-8 border-t border-gray-800/50 relative mt-20 ${className}`}
    >
      {/* Wave SVG for top decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform translate-y-[-85%] rotate-180">
        <svg
          className="relative block w-full h-[50px] md:h-[70px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-footer-bg"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          {/* Column 1: Logo and About */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link
              href="/"
              className="flex items-center group mb-4 transition-all duration-300"
              aria-label="NdevuSpace Home"
            >
              <div className="overflow-hidden rounded-lg mr-3 transform transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo1.png"
                  alt="NdevuSpace Logo"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-500 transition-all duration-300">
                NdevuSpace
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-center md:text-left">
              Transforming ideas into elegant code and creating digital
              experiences that inspire and engage.
            </p>
            <div className="flex gap-5 mt-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="bg-secondary/50 p-3 rounded-full border border-gray-700 hover:border-yellow-500 text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:bg-yellow-500/10"
                  aria-label={item.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-5 relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Quick Links
              </span>
              <span className="absolute left-0 bottom-0 w-2/3 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:translate-x-1 block py-1 hover:pl-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Technologies */}
          <div>
            <h3 className="text-xl font-bold mb-5 relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Technologies
              </span>
              <span className="absolute left-0 bottom-0 w-2/3 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500"></span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-secondary/50 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-700 hover:border-yellow-500 hover:text-yellow-400 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} NdevuSpace. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Crafted with ❤️ using Next.js, TypeScript & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-secondary/50 p-3 rounded-full border border-gray-700 hover:border-yellow-500 text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:bg-yellow-500/10"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
