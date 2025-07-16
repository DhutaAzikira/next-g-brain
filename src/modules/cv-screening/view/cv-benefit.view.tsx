import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Check, ListChecks, Search } from "lucide-react";

export function CVBenefitView() {
  const benefit = [
    {
      title: "Skor Keseluruhan CV",
      description: "Dapatkan skor numerik untuk CV Anda berdasarkan berbagai parameter",
      icon: (
        <div className="text-green-500 bg-green-500/10 flex size-fit items-center justify-center rounded-full p-4">
          <Check className="size-4" strokeWidth={3} />
        </div>
      ),
    },
    {
      title: "Analisis Kata Kunci",
      description: "Lihat apakah CV Anda mengandung kata kunci yang relevan dengan industri",
      icon: (
        <div className="text-blue-500 bg-blue-500/10 flex size-fit items-center justify-center rounded-full p-4">
          <Search className="size-4" strokeWidth={3} />
        </div>
      ),
    },
    {
      title: "Rekomendasi Perbaikan",
      description: "Dapatkan saran spesifik untuk meningkatkan CV Anda",
      icon: (
        <div className="text-primary bg-primary/10 flex size-fit items-center justify-center rounded-full p-4">
          <ListChecks className="size-4" strokeWidth={3} />
        </div>
      ),
    },
    {
      title: "Kesesuaian Pekerjaan",
      description: "Lihat seberapa baik CV Anda cocok dengan posisi yang Anda incar",
      icon: (
        <div className="text-yellow-500 bg-yellow-500/10 flex size-fit items-center justify-center rounded-full p-4">
          <Briefcase className="size-4" strokeWidth={3} />
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader className="clamp-[text,lg,xl] font-bold">
        <CardTitle>Apa yang Akan Anda Dapatkan</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {benefit.map((item, index) => (
            <div key={index} className="flex gap-4 py-4">
              {item.icon}

              <div className="space-y-1">
                <h3 className="clamp-[text,base,lg] font-semibold text-gray-900">{item.title}</h3>
                <p className="text-muted-foreground max-w-[50ch] text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
