import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getClientSideURL, getMediaUrl, getServerSideURL } from "@/lib/get-url";

describe("getServerSideURL", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns production URL when VERCEL_PROJECT_PRODUCTION_URL is set", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "example.com";
    expect(getServerSideURL()).toBe("https://example.com");
  });

  it("returns localhost when no production URL is set", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = undefined;
    expect(getServerSideURL()).toBe("http://localhost:3000");
  });
});

describe("getClientSideURL", () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it("returns empty string when window is undefined (SSR)", () => {
    // @ts-expect-error - simulating SSR environment
    global.window = undefined;
    expect(getClientSideURL()).toBe("");
  });

  it("returns URL with protocol and domain when in browser", () => {
    global.window = {
      ...originalWindow,
      document: {
        createElement: () => ({}),
      },
      location: {
        protocol: "https:",
        hostname: "example.com",
        port: "",
      },
    } as unknown as Window & typeof globalThis;

    expect(getClientSideURL()).toBe("https://example.com");
  });

  it("includes port when specified", () => {
    global.window = {
      ...originalWindow,
      document: {
        createElement: () => ({}),
      },
      location: {
        protocol: "http:",
        hostname: "localhost",
        port: "3000",
      },
    } as unknown as Window & typeof globalThis;

    expect(getClientSideURL()).toBe("http://localhost:3000");
  });
});

describe("getMediaUrl", () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it("returns empty string for null url", () => {
    expect(getMediaUrl(null)).toBe("");
  });

  it("returns empty string for undefined url", () => {
    expect(getMediaUrl(undefined)).toBe("");
  });

  it("returns URL as-is when it already has http protocol", () => {
    expect(getMediaUrl("http://example.com/image.jpg")).toBe(
      "http://example.com/image.jpg"
    );
  });

  it("returns URL as-is when it already has https protocol", () => {
    expect(getMediaUrl("https://example.com/image.jpg")).toBe(
      "https://example.com/image.jpg"
    );
  });

  it("appends cache tag to URL with protocol", () => {
    expect(getMediaUrl("https://example.com/image.jpg", "v123")).toBe(
      "https://example.com/image.jpg?v123"
    );
  });

  it("prepends base URL to relative paths", () => {
    // Simulate SSR environment
    // @ts-expect-error - simulating SSR environment
    global.window = undefined;

    expect(getMediaUrl("/uploads/image.jpg")).toBe(
      "http://localhost:3000/uploads/image.jpg"
    );
  });

  it("prepends base URL and appends cache tag to relative paths", () => {
    // Simulate SSR environment
    // @ts-expect-error - simulating SSR environment
    global.window = undefined;

    expect(getMediaUrl("/uploads/image.jpg", "v456")).toBe(
      "http://localhost:3000/uploads/image.jpg?v456"
    );
  });
});
