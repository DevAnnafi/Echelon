"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Dashboard", href: "/" },
      { label: "Analytics", href: "/analytics" },
      { label: "AI Assistant", href: "/ai-assistant" },
    ],
    Resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "GitHub", href: "https://github.com/DevAnnafi/Echelon" },
      { label: "Support", href: "/support" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/DevAnnafi/echelon",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/annafi-islam",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:islamannafi@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/Echelon.png"
                alt="Echelon logo"
                width={32}
                height={32}
                priority
              />
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Echelon
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI-powered personal productivity dashboard. Manage tasks, track
              habits, and gain insights.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Echelon Dashboard. Built to impress.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Crafted with React, Next.js, TypeScript & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
