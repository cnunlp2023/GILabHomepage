// src/pages/partials/PublicationsSection.tsx
import { useEffect, useState } from "react";
import PublicationSlider from "@/components/publication-slider";
import { getRecentPublications } from "@/lib/staticApi";

type Author = {
  name: string;
  homepage?: string | null;
};

type Publication = {
  id: string | number;
  year: number;
  type: "journal" | "conference";
  journal?: string | null;
  conference?: string | null;
  title: string;
  abstract?: string | null;
  pdfUrl?: string | null;
  url?: string | null;
  imageUrl?: string | null;
  authors?: Author[];
};

export default function PublicationsSection() {
  const [data, setData] = useState<Publication[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      getRecentPublications(8)
        .then((json) => {
          if (!cancelled) {
            setData(Array.isArray(json) ? json : []);
            setLoading(false);
          }
        })
        .catch((e: any) => {
          if (!cancelled) {
            setErr(e?.message ?? "Failed to load");
            setLoading(false);
          }
        });
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(run);
    } else {
      setTimeout(run, 0);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className={[
        "relative z-20 isolate overflow-visible",
      ].join(" ")}
      data-testid="publications-section"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Publications</h2>
        <p className="text-gray-600 mt-2">Recent Work in Top-Teir conferences.</p>
      </div>

      {loading && (
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200/70 rounded-2xl" />
        </div>
      )}

      {!loading && err && (
        <div className="rounded-xl border bg-red-50 text-red-700 p-4 text-sm">
          Failed to load publications: {err}
        </div>
      )}

      {!loading && !err && (
        <PublicationSlider publications={data ?? []} />
      )}
    </section>
  );
}
