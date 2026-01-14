import { describe, expect, it } from "vitest";

import {
  cn,
  currency,
  deepMerge,
  formatDate,
  formatLongDate,
  formatPhone,
  isObject,
  slugify,
} from "@/lib/utils";

// Test regex patterns at top level
const DATE_FORMAT_PATTERN = /\d{2}\/\d{2}\/\d{4}/;
const CURRENCY_PATTERN = /1[.,]?234[,.]56/;
const CURRENCY_ZERO_PATTERN = /0[,.]00/;

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("handles undefined and null values", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("merges Tailwind classes correctly", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
  });
});

describe("slugify", () => {
  it("converts string to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes accents", () => {
    expect(slugify("Café con leche")).toBe("cafe-con-leche");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! World?")).toBe("hello-world");
  });

  it("handles multiple spaces", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("handles leading and trailing spaces", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });

  it("handles multiple dashes", () => {
    expect(slugify("Hello---World")).toBe("hello-world");
  });
});

describe("formatDate", () => {
  it("formats date string correctly", () => {
    const result = formatDate("2024-03-15");
    expect(result).toMatch(DATE_FORMAT_PATTERN);
  });

  it("formats Date object correctly", () => {
    const date = new Date("2024-03-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toMatch(DATE_FORMAT_PATTERN);
  });
});

describe("formatLongDate", () => {
  it("formats date with month name", () => {
    const result = formatLongDate("2024-03-15");
    expect(result).toContain("marzo");
  });
});

describe("formatPhone", () => {
  it("formats 9-digit phone number", () => {
    expect(formatPhone("612345678")).toBe("612 345 678");
  });

  it("formats 12-digit phone number", () => {
    expect(formatPhone("346123456789")).toBe("346 123 456 789");
  });

  it("returns original for other lengths", () => {
    expect(formatPhone("123")).toBe("123");
  });
});

describe("currency", () => {
  it("formats number as EUR currency", () => {
    const result = currency(1234.56);
    // Currency format may vary by locale/environment
    expect(result).toContain("€");
    expect(result).toMatch(CURRENCY_PATTERN);
  });

  it("handles zero", () => {
    const result = currency(0);
    expect(result).toContain("€");
    expect(result).toMatch(CURRENCY_ZERO_PATTERN);
  });
});

describe("isObject", () => {
  it("returns true for plain objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
  });

  it("returns false for arrays", () => {
    expect(isObject([])).toBe(false);
  });

  it("returns true for null (typeof null === object)", () => {
    // Note: This is the current implementation behavior
    // JavaScript typeof null === 'object' is a known quirk
    expect(isObject(null)).toBe(true);
  });

  it("returns false for primitives", () => {
    expect(isObject("string")).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
  });
});

describe("deepMerge", () => {
  it("merges flat objects", () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("merges nested objects", () => {
    const target = { a: { x: 1, y: 2 } };
    const source = { a: { y: 3, z: 4 } };
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 3, z: 4 } });
  });

  it("preserves arrays from source", () => {
    const target = { a: [1, 2] };
    const source = { a: [3, 4] };
    expect(deepMerge(target, source)).toEqual({ a: [3, 4] });
  });

  it("adds nested object from source when key not in target", () => {
    const target = { a: 1 };
    const source = { b: { nested: "value" } };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: { nested: "value" } });
  });
});
