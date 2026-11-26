const STOPWORDS = new Set(
  "a o as os um uma uns umas de da do das dos para por com sem sobre entre em no na nos nas e ou que se como mais menos ser estar ter seu sua seus suas nosso nossa nossas nossos voce você vaga empresa sera será serão todos todas cada muito muita onde quando também tambem area área anos experiencia experiência conhecimento conhecimentos the and for with from this that your our are will have has you they their about into what which who when where must should would could also more than other some such very job role team work years experience knowledge".split(
    " ",
  ),
);

export const COMMON_SKILLS = [
  "react", "typescript", "javascript", "python", "java", "excel", "sql", "node", "nodejs", "aws", "azure", "docker",
  "kubernetes", "git", "figma", "html", "css", "tailwind", "angular", "vue", "django", "flask", "spring", "linux",
  "scrum", "kanban", "agile", "jira", "power bi", "tableau", "salesforce", "sap", "photoshop", "illustrator",
  "marketing", "seo", "analytics", "graphql", "rest", "api", "mongodb", "postgresql", "mysql", "redis", "terraform",
  "golang", "rust", "php", "laravel", "ruby", "rails", "swift", "kotlin", "flutter", "pandas", "liderança", "inglês",
  "comunicação", "negociação", "vendas", "gestão", "devops", "testes", "jest", "cypress", "next.js", "nextjs",
];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function extractKeywords(job: string): string[] {
  const found = new Map<string, string>();
  const jobNorm = norm(job);
  for (const skill of COMMON_SKILLS) {
    const re = new RegExp(`(^|[^a-z0-9])${norm(skill).replace(/[.+]/g, "\\$&")}([^a-z0-9]|$)`);
    if (re.test(jobNorm)) found.set(norm(skill), skill.replace(/\b\w/g, (c) => c.toUpperCase()));
  }
  const words = job.match(/[\p{L}][\p{L}\p{N}+#.\-]*[\p{L}\p{N}+#]/gu) ?? [];
  for (const w of words) {
    const key = norm(w);
    if (w.length <= 3 || STOPWORDS.has(key) || found.has(key)) continue;
    if (/^\p{Lu}/u.test(w)) found.set(key, w);
  }
  // remove first-word-of-sentence noise: keep capitalized words that are not stopwords
  return [...found.values()];
}

export interface AtsResult {
  score: number;
  found: string[];
  missing: string[];
  adjustedResume: string;
}

export function analyze(job: string, resume: string): AtsResult {
  const keywords = extractKeywords(job);
  const resumeNorm = norm(resume);
  const found: string[] = [];
  const missing: string[] = [];
  for (const k of keywords) (resumeNorm.includes(norm(k)) ? found : missing).push(k);
  const score = keywords.length ? Math.round((found.length / keywords.length) * 100) : 0;
  const adjustedResume = missing.length
    ? `${resume.trimEnd()}\n\nCOMPETÊNCIAS RELEVANTES\nFamiliaridade com: ${missing.join(", ")}`
    : resume;
  return { score, found, missing, adjustedResume };
}
