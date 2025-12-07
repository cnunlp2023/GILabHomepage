// client/src/pages/research.tsx
import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPublications, getResearchAreas } from "@/lib/staticApi";
import PublicationCard from "@/components/publication-card";

type Publication = {
  id: string;
  title: string;
  journal?: string;
  conference?: string;
  year: number;
  type: string;
  abstract?: string;
  pdfUrl?: string;
  imageUrl?: string;
  displayOrder?: number;
  authors?: { name: string; homepage?: string }[];
};

type ResearchArea = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  order?: number;
  isActive?: boolean;
};

const normalizeType = (t: string | null | undefined): "journal" | "conference" =>
  (t ?? "").toLowerCase() === "journal" ? "journal" : "conference";

function normalizeAuthors(src: any): { name: string; homepage?: string | null }[] {
  const raw = src?.authors ?? src?.authors_data ?? [];
  return (Array.isArray(raw) ? raw : []).map((a: any) => ({
    name: a?.nameHtml ?? a?.name ?? "",
    homepage: a?.homepage ?? "",
  }));
}

export default function ResearchPage() {
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [areas, pubs] = await Promise.all([
          getResearchAreas(),
          getPublications()
        ]);
        setResearchAreas(areas);
        setPublications(pubs);
      } catch (e) {
        console.error("Failed to load data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const groupedPubs = useMemo(() => {
    const m = new Map<number, Publication[]>();
    publications.forEach((p) => {
      const y = Number(p.year);
      if (!m.has(y)) m.set(y, []);
      m.get(y)!.push(p);
    });
    return Array.from(m.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, list]) => ({
        year,
        list: list.sort((a, b) => {
          const orderA = a.displayOrder ?? 0;
          const orderB = b.displayOrder ?? 0;
          if (orderA !== orderB) return orderA - orderB;
          return (a.title || "").localeCompare(b.title || "");
        }),
      }));
  }, [publications]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Research & Publications</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Research Areas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">연구분야</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 bg-gray-200 rounded-md" />
              ))}
            </div>
          ) : researchAreas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchAreas.map((area) => (
                <Card key={area.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{area.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {area.description ? (
                      <p className="text-sm text-muted-foreground line-clamp-3">{area.description}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">설명이 없습니다.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">등록된 연구분야가 없습니다.</p>
          )}
        </section>

        {/* Publications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">논문</h2>
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          ) : publications.length > 0 ? (
            <div className="space-y-10">
              {groupedPubs.map(({ year, list }) => (
                <div key={year}>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">{year}</h3>
                  <div className="space-y-6">
                    {list.map((p) => (
                      <PublicationCard
                        key={p.id}
                        data={{
                          id: p.id,
                          year: p.year,
                          type: normalizeType(p.type),
                          title: p.title,
                          journal: p.journal ?? null,
                          conference: p.conference ?? null,
                          abstract: p.abstract ?? "",
                          imageUrl: p.imageUrl ?? undefined,
                          pdfUrl: p.pdfUrl ?? undefined,
                          authors: normalizeAuthors(p),
                        }}
                        isAdmin={false}
                        onEdit={() => {}}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">등록된 논문이 없습니다.</p>
          )}
        </section>
      </div>
    </div>
  );
}
