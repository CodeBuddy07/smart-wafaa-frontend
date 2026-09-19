import ar from "../../messages/ar.json";
import en from "../../messages/en.json";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/** Flatten a nested object into dot-path → leaf value. Arrays become `path.0`, `path.1`… */
function flatten(
  value: Json,
  prefix = "",
  out: Record<string, string> = {},
): Record<string, string> {
  if (typeof value === "string") {
    out[prefix] = value;
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe("message catalogues", () => {
  const flatEn = flatten(en);
  const flatAr = flatten(ar);

  it("ar.json has exactly the same keys as en.json", () => {
    const enKeys = Object.keys(flatEn).sort();
    const arKeys = Object.keys(flatAr).sort();
    expect(arKeys).toEqual(enKeys);
  });

  it("has no empty strings", () => {
    for (const [key, value] of [...Object.entries(flatEn), ...Object.entries(flatAr)]) {
      expect(value.trim(), `empty value at ${key}`).not.toBe("");
    }
  });

  it("keeps ICU placeholders in sync between locales", () => {
    for (const [key, value] of Object.entries(flatEn)) {
      expect(placeholders(flatAr[key] ?? ""), `placeholders differ at ${key}`).toEqual(
        placeholders(value),
      );
    }
  });

  it("ships five how-it-works steps with matching phone screens", () => {
    expect(en.howItWorks.steps).toHaveLength(5);
    expect(en.howItWorks.phone.screens).toHaveLength(en.howItWorks.steps.length);
    expect(ar.howItWorks.steps).toHaveLength(5);
  });
});
