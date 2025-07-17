"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <ErrorPage
        statusCode={500}
        title="Terjadi Kesalahan"
        message="Terjadi kesalahan yang tidak terduga. Silakan coba lagi."
        showRefresh={false}
      />
    </div>
  );
}

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
  showRefresh?: boolean;
  showGoBack?: boolean;
}

function ErrorPage({
  statusCode = 404,
  title,
  message,
  showRefresh = true,
  showGoBack = true,
}: ErrorPageProps) {
  const router = useRouter();

  const getErrorContent = () => {
    switch (statusCode) {
      case 404:
        return {
          title: title || "Halaman Tidak Ditemukan",
          message:
            message ||
            "Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.",
          icon: "🔍",
        };
      case 500:
        return {
          title: title || "Terjadi Kesalahan Server",
          message:
            message ||
            "Maaf, terjadi kesalahan pada server kami. Tim teknis sedang menangani masalah ini.",
          icon: "⚠️",
        };
      case 403:
        return {
          title: title || "Akses Ditolak",
          message:
            message ||
            "Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.",
          icon: "🚫",
        };
      default:
        return {
          title: title || "Terjadi Kesalahan",
          message: message || "Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.",
          icon: "❌",
        };
    }
  };

  const errorContent = getErrorContent();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-fit text-center shadow-lg">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div className="mb-2 text-6xl">{errorContent.icon}</div>
          <CardTitle className="text-2xl font-bold text-gray-900">{statusCode}</CardTitle>
          <CardDescription className="text-lg font-medium text-gray-700">
            {errorContent.title}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="leading-relaxed text-gray-600">{errorContent.message}</p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>

            {showGoBack && (
              <Button
                variant="outline"
                onClick={handleGoBack}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
            )}

            {showRefresh && (
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-transparent"
              >
                <RefreshCw className="h-4 w-4" />
                Muat Ulang
              </Button>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              Butuh bantuan?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Hubungi dukungan
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
