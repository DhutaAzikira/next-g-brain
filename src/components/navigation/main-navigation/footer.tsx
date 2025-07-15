"use client";

import { LogoIcon } from "@/components/shared/svg-logo";
import { FaDiscord, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const FOOTER_LINKS = {
  tautan: [
    { label: "Beranda", href: "/" },
    { label: "Fitur", href: "/fitur" },
    { label: "Harga", href: "/harga" },
    { label: "Komunitas", href: "/komunitas" },
    { label: "FAQ", href: "/faq" }
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Blog", href: "/blog" },
    { label: "Karir", href: "/karir" },
    { label: "Kontak", href: "/kontak" }
  ],
  legal: [
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { label: "Keamanan Data", href: "/keamanan-data" }
  ]
};

export function MainFooterNavigation() {
  return (
    <footer className="bg-slate-900  text-white">
      <div className="container mx-auto px-6 py-12 md:px-0">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 order-0 md:order-none">
            <div className="flex items-center gap-2">
              <LogoIcon/>
              <span className="text-xl font-bold">InterviewAI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Platform AI untuk membantu kamu berlatih interview dan 
              meningkatkan peluang mendapatkan pekerjaan impian.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Grid for Mobile */}
          <div className="md:contents">
            <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-3 order-2 md:order-none md:contents">
              {/* Tautan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Tautan</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.tautan.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perusahaan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Perusahaan</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.perusahaan.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4 col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2023 InterviewAI. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Powered by</span>
              <span className="text-white font-medium bg-[#1F2937] px-2 py-1 rounded-sm">AI Technology</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}