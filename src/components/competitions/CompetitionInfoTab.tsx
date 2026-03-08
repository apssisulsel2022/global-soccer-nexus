import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Baby } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CompetitionInfoTabProps {
  competition: any;
}

export const CompetitionInfoTab = ({ competition }: CompetitionInfoTabProps) => {
  const getFormatRules = (format: string, type: string) => {
    if (format === "round_robin") {
      return [
        "• Setiap tim bertanding 2 kali (home & away) dengan semua tim lain",
        "• Menang: 3 poin | Seri: 1 poin | Kalah: 0 poin",
        "• Jika poin sama: selisih gol, gol lebih banyak, head-to-head",
        "• Sesuai AFC League Regulations Article 10",
      ];
    } else if (format === "knockout") {
      return [
        "• Sistem gugur langsung (single atau two-leg)",
        "• Jika seri: Extra time (2x15 menit) kemudian adu penalti",
        "• Away goals rule dapat diterapkan (two-leg)",
        "• Sesuai FIFA Competition Regulations",
      ];
    } else if (format === "group_knockout") {
      return [
        "• Fase Grup: Round robin dalam grup",
        "• Juara & runner-up tiap grup lolos ke knockout",
        "• Knockout: Two-leg hingga final (single match)",
        "• Sesuai AFC Champions League Regulations",
      ];
    } else if (format === "swiss_system") {
      return [
        "• Semua tim berada dalam satu pool (tanpa grup)",
        "• Setiap ronde, tim dipasangkan berdasarkan poin yang sama/serupa",
        "• Tidak ada tim yang bertemu lawan yang sama dua kali",
        "• Jumlah ronde = ceil(log2(jumlah tim)), biasanya 5-9 ronde",
        "• Menang: 3 poin | Seri: 1 poin | Kalah: 0 poin",
        "• Klasemen akhir menentukan peringkat (tiebreak: selisih gol, gol dicetak)",
        "• Format modern digunakan UEFA Champions League sejak 2024/25",
      ];
    }
    return [];
  };

  const getPromotionRules = (type: string) => {
    if (type === "liga") {
      return {
        title: "Sistem Promosi & Degradasi (AFC Club Licensing)",
        rules: [
          "🏆 Peringkat 1-3: Lolos AFC Champions League (tergantung ranking negara)",
          "📈 Peringkat 4-6: Lolos AFC Cup",
          "⚠️ Peringkat terbawah: Degradasi ke Liga 2",
          "• Total tim terdegradasi: 3-4 tim (tergantung regulasi liga)",
          "• Promosi otomatis: Juara Liga 2",
          "• Play-off promosi: Peringkat 2-5 Liga 2",
        ],
      };
    }
    return null;
  };

  const formatRules = getFormatRules(competition.format, competition.type);
  const promotionRules = getPromotionRules(competition.type);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Deskripsi Kompetisi</h3>
        <p className="text-muted-foreground">
          {competition.description || "Tidak ada deskripsi."}
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Format & Aturan Pertandingan</h3>
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1 mt-2">
              {formatRules.map((rule, index) => (
                <p key={index} className="text-sm">{rule}</p>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      </Card>

      {competition.age_group && competition.age_group !== "none" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Baby className="h-5 w-5" /> Batasan Usia Pemain
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Kategori</p>
              <Badge className="mt-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-0 text-base">
                {competition.age_group}
              </Badge>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Usia Maksimal</p>
              <p className="font-semibold text-lg mt-1">
                {competition.age_group === "U-15" && "14 tahun"}
                {competition.age_group === "U-17" && "16 tahun"}
                {competition.age_group === "U-20" && "19 tahun"}
                {competition.age_group === "U-23" && "22 tahun"}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Tanggal Cutoff</p>
              <p className="font-semibold text-lg mt-1">
                {competition.age_cutoff_date
                  ? format(new Date(competition.age_cutoff_date), "d MMM yyyy", { locale: id })
                  : format(new Date(competition.start_date), "d MMM yyyy", { locale: id }) + " (default)"}
              </p>
            </div>
          </div>
          <Alert className="mt-4">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <p className="text-sm">Pemain yang melebihi batas usia pada tanggal cutoff tidak dapat didaftarkan ke kompetisi ini. Verifikasi usia dilakukan otomatis saat pendaftaran pemain.</p>
            </AlertDescription>
          </Alert>
        </Card>
      )}

      {promotionRules && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{promotionRules.title}</h3>
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1 mt-2">
                {promotionRules.rules.map((rule, index) => (
                  <p key={index} className="text-sm">{rule}</p>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Referensi Regulasi</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>FIFA Competition Regulations</strong>: Aturan umum kompetisi sepakbola</p>
          <p>• <strong>AFC Club Licensing</strong>: Standar klub peserta kompetisi AFC</p>
          <p>• <strong>AFC Champions League Regulations</strong>: Format grup & knockout</p>
          <p>• <strong>IFAB Laws of the Game</strong>: Aturan main sepakbola</p>
          <p>• <strong>AFC Match Regulations</strong>: Jadwal, venue, ofisial pertandingan</p>
        </div>
      </Card>
    </div>
  );
};
