import { clamp, cn, formatPrice, mod, pad2 } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, last wins", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
  it("ignores falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("mod", () => {
  it("returns a positive result for negative dividends", () => {
    expect(mod(-1, 5)).toBe(4);
    expect(mod(-6, 5)).toBe(4);
    expect(mod(7, 5)).toBe(2);
  });
});

describe("clamp", () => {
  it("clamps into range", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-2, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });
});

describe("pad2", () => {
  it("zero-pads single digits", () => {
    expect(pad2(1)).toBe("01");
    expect(pad2(12)).toBe("12");
  });
});

describe("formatPrice", () => {
  it("formats whole USD amounts for en", () => {
    expect(formatPrice(129, "en")).toBe("$129");
  });
  it("formats for ar with Arabic locale digits or latin depending on ICU", () => {
    const out = formatPrice(49, "ar");
    expect(out).toMatch(/49|٤٩/);
  });
});
