import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const PRICING_PLANS = [
  {
    name: "Free Plan",
    description: "Untuk kamu yang ingin mencoba",
    price: "Rp 0",
    period: "selamanya",
    features: [
      { text: "1x sesi interview", included: true },
      { text: "Feedback dasar", included: true },
      { text: "Akses ke komunitas", included: true },
      { text: "Rekaman video", included: false },
      { text: "Analisis mendalam", included: false },
    ],
    buttonText: "Mulai Gratis",
    buttonVariant: "outline" as const,
    isPopular: false,
  },
  {
    name: "Pro Plan",
    description: "Untuk persiapan interview maksimal",
    price: "Rp 99.000",
    period: "bulan",
    features: [
      { text: "Unlimited interview", included: true },
      { text: "Feedback lengkap & mendalam", included: true },
      { text: "Akses premium ke komunitas", included: true },
      { text: "Rekaman video & transkrip", included: true },
      { text: "Analisis mendalam & saran perbaikan", included: true },
    ],
    buttonText: "Coba Gratis Sekarang",
    buttonVariant: "default" as const,
    isPopular: true,
  },
];

interface Feature {
  text: string;
  included: boolean;
}

const FeatureItem = ({ feature }: { feature: Feature }) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex flex-shrink-0 items-center justify-center ${
        feature.included ? "text-green-400" : "text-red-400"
      }`}
    >
      {feature.included ? (
        <Check className="h-5 w-5" />
      ) : (
        <X className="h-5 w-5" />
      )}
    </div>
    <span
      className={`text-sm ${
        feature.included
          ? "text-gray-900 dark:text-white"
          : "text-gray-400 dark:text-gray-500"
      }`}
    >
      {feature.text}
    </span>
  </div>
);

export function HomePricingView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-white font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:px-0 md:py-30">
        <div className="max-w-3xl space-y-4 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Pilihan Paket
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Pilih paket yang sesuai dengan kebutuhan kamu
          </p>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {PRICING_PLANS.map((plan, index) => (
            <Card
              key={index}
              className={`relative border p-6 shadow-sm transition-shadow hover:shadow-md md:p-8 dark:bg-gray-800 ${
                plan.isPopular
                  ? "border-purple-200 bg-gradient-to-br from-[#F5F3FF] to-[#FDF2F8] dark:border-purple-700 dark:from-purple-700 dark:to-purple-400"
                  : "border-gray-200 bg-white dark:border-gray-700"
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute top-0 right-0 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-lg bg-purple-600 px-2 py-1 text-xs font-extrabold text-white hover:bg-purple-700">
                  POPULER
                </Badge>
              )}

              <div className="flex flex-col gap-6">
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      / {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex} feature={feature} />
                  ))}
                </div>

                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  className={`mt-4 w-full ${
                    plan.buttonVariant === "default"
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
