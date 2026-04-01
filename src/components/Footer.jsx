import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-16 overflow-hidden">
      {/* Top gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative bg-gray-950 pt-16 pb-8 px-6 md:px-12 lg:px-16">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-teal-900/15 rounded-full blur-[80px]" />

        {/* Main grid */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand section */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src={assets.docMeet}
                alt="DocMeet Logo"
                className="w-30 h-10 rounded-xl shadow-lg"
              />

            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              We simplify doctor appointment booking with an easy-to-use interface,
              quick scheduling, and telemedicine access. Manage health records, get
              reminders, and enjoy hassle-free healthcare anytime.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Privacy Policy', to: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-0 h-px bg-emerald-400 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+977980000000000" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  +977-980000000000
                </a>
              </li>
              <li>
                <a href="mailto:docmeet@gmail.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  docmeet@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 max-w-6xl mx-auto mt-14 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              © {currentYear}{" "}
              <span className="font-semibold text-gray-300">
                doc<span className="text-emerald-400">Meet</span>
              </span>{" "}
              — All Rights Reserved
            </p>
            <p>
              Made with{" "}
              <span className="text-red-400">♥</span>{" "}
              by{" "}
              <span className="font-semibold text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                Manoj Shrestha
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
