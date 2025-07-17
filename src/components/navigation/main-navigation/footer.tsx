"use client";

import Image from "next/image";
import { FaDiscord, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const FOOTER_LINKS = {
  tautan: [
    { label: "Beranda", href: "/" },
    { label: "Fitur", href: "/fitur" },
    { label: "Harga", href: "/harga" },
    { label: "Komunitas", href: "/komunitas" },
    { label: "FAQ", href: "/faq" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Blog", href: "/blog" },
    { label: "Karir", href: "/karir" },
    { label: "Kontak", href: "/kontak" },
  ],
  legal: [
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { label: "Keamanan Data", href: "/keamanan-data" },
  ],
};

export function MainFooterNavigation() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12 md:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="order-0 space-y-4 md:order-none">
            <Image src="/images/LOGO.png" alt="Logo" width={100} height={60} />

            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Platform AI untuk membantu kamu berlatih interview dan meningkatkan peluang
              mendapatkan pekerjaan impian.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaTiktok className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaDiscord className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Grid for Mobile */}
          <div className="md:contents">
            <div className="order-2 col-span-1 grid grid-cols-2 gap-8 md:order-none md:col-span-3 md:contents">
              {/* Tautan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Tautan</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.tautan.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
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
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="col-span-2 space-y-4 md:col-span-1">
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
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
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">© 2023 InterviewAI. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Powered by</span>
              <span className="rounded-sm bg-[#1F2937] px-2 py-1 font-medium text-white">
                AI Technology
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
