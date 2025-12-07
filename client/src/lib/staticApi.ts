// client/src/lib/staticApi.ts
// GitHub Pages용 정적 JSON 파일 로더

const BASE_PATH = import.meta.env.BASE_URL || '/';

export async function fetchJson<T>(path: string): Promise<T> {
  const url = `${BASE_PATH}data/${path}`.replace(/\/+/g, '/');
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return res.json();
}

// Publications
export async function getPublications() {
  return fetchJson<any[]>('publications.json');
}

export async function getRecentPublications(limit: number = 5) {
  const pubs = await getPublications();
  // 연도별 정렬 후 최근 것 반환
  return pubs
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, limit);
}

// Members
export async function getMembers() {
  return fetchJson<{
    masters: any[];
    bachelors: any[];
    phd: any[];
    other: any[];
  }>('members.json');
}

// News
export async function getNews() {
  const news = await fetchJson<any[]>('news.json');
  // publishedAt 기준 정렬
  return news.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getNewsById(id: string) {
  const news = await getNews();
  return news.find(n => n.id === id) || null;
}

// Research Areas
export async function getResearchAreas() {
  return fetchJson<any[]>('research-areas.json');
}

// Lab Info
export async function getLabInfo() {
  return fetchJson<any>('lab-info.json');
}
