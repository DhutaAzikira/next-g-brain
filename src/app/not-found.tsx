"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto w-full max-w-md px-6 text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Halaman Tidak Ditemukan
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan
            atau dihapus.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>

          <Button variant="outline" onClick={() => router.back()} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Halaman Sebelumnya
          </Button>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.</p>
        </div>
      </div>
    </div>
  );
}
