import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICVScreeningReportResponse } from "@/types/response.type";

export function CVRevisionView({ data }: { data: ICVScreeningReportResponse }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="md:text-lg">
          <h3 className="border-l-4 border-primary pl-1.5">Rekomendasi Perbaikan</h3>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {data.revisions.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-2.5 rounded-xl border p-4 text-sm md:text-base"
            >
              <h4 className="block leading-none">{item.label}</h4>
              <p className="text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
