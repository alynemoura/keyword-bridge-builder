import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, ScanSearch, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { analyze, type AtsResult } from "@/lib/ats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATS Resume Match — Compare currículo e vaga" },
      { name: "description", content: "Veja seu percentual de match com a vaga e gere um currículo ATS-friendly sem inventar experiência." },
      { property: "og:title", content: "ATS Resume Match" },
      { property: "og:description", content: "Compare seu currículo com a vaga e gere uma versão ATS-friendly honesta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [job, setJob] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<AtsResult | null>(null);

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.adjustedResume);
    toast.success("Currículo ajustado copiado");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:py-14">
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <ScanSearch className="h-5 w-5" />
            <span className="text-xs font-medium uppercase tracking-widest">ATS Resume Match</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Compare seu currículo com a vaga</h1>
          <div className="flex items-start gap-2 rounded-md border border-border bg-muted px-4 py-3 text-sm">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>Esta ferramenta melhora como você se apresenta. Ela nunca inventa experiência que você não tem.</p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="job">Descrição da Vaga</Label>
            <Textarea id="job" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Cole aqui a descrição completa da vaga..." className="min-h-72 bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Seu Currículo</Label>
            <Textarea id="resume" value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Cole aqui o conteúdo do seu currículo atual..." className="min-h-72 bg-muted" />
          </div>
        </section>

        <Button size="lg" disabled={!job.trim() || !resume.trim()} onClick={() => setResult(analyze(job, resume))}>
          Analisar Compatibilidade
        </Button>

        {result && (
          <Card className="border-border bg-card">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-xl font-semibold tracking-tight">Resultado</CardTitle>
                <Badge className="px-4 py-1.5 text-lg font-semibold">{result.score}% de Match</Badge>
              </div>
              <Progress value={result.score} />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <KeywordList title={`Encontradas (${result.found.length})`} items={result.found} variant="default" />
                <KeywordList title={`Faltantes (${result.missing.length})`} items={result.missing} variant="destructive" />
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold tracking-tight">Currículo Ajustado</h3>
                  <Button variant="outline" size="sm" onClick={copy}>
                    <Copy className="h-4 w-4" /> Copiar Currículo Ajustado
                  </Button>
                </div>
                <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-muted p-4 font-sans text-sm">
                  {result.adjustedResume}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

function KeywordList({ title, items, variant }: { title: string; items: string[]; variant: "default" | "destructive" }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.length ? items.map((k) => <Badge key={k} variant={variant}>{k}</Badge>) : <span className="text-sm text-muted-foreground">Nenhuma</span>}
      </div>
    </div>
  );
}
