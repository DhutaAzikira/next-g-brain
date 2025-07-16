import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUpload, FaRobot, FaList } from "react-icons/fa";

export function CVTutorialView() {
  const tutorial = [
    {
      title: "Unggah CV Anda",
      icon: <FaUpload className="size-4 md:size-6" />,
      description: "Unggah CV Anda dalam format PDF",
    },
    {
      title: "Analisis AI",
      icon: <FaRobot className="size-4 md:size-6" />,
      description: "AI kami akan menganalisis CV Anda secara menyeluruh",
    },
    {
      title: "Dapatkan laporan",
      icon: <FaList className="size-4 md:size-6" />,
      description: "Terima laporan komprehensif dengan skor dan saran perbaikan",
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="font-bold clamp-[text,lg,xl]">Bagaimana Cara Kerjanya</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {tutorial.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-5 py-4">
              <div className="text-primary bg-primary/10 flex items-center justify-center rounded-full p-4 md:p-6">
                {item.icon}
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="clamp-[text,base,xl] font-semibold text-gray-900">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
