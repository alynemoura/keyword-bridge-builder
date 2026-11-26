import { describe, it, expect } from "vitest";
import { analyze } from "./ats";

describe("analyze", () => {
  const job = "Buscamos dev com React, Python e SQL.";
  it("calcula score como encontradas/total", () => {
    const r = analyze(job, "Experiência com React e Python.");
    expect(r.found).toEqual(expect.arrayContaining(["React", "Python"]));
    expect(r.missing).toContain("Sql");
    expect(r.score).toBe(Math.round((r.found.length / (r.found.length + r.missing.length)) * 100));
  });
  it("preserva o currículo original e só adiciona bloco no final", () => {
    const resume = "Ana\nDev React";
    const r = analyze(job, resume);
    expect(r.adjustedResume.startsWith(resume)).toBe(true);
    expect(r.adjustedResume).toContain("Familiaridade com:");
  });
  it("comparação ignora maiúsculas", () => {
    expect(analyze("Vaga React", "react").missing).toHaveLength(0);
  });
});
