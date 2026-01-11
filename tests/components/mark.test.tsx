import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Mark } from "@/components/shared/mark";

describe("Mark", () => {
  it("renders an SVG element", () => {
    render(<Mark />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Mark className="custom-class" />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("custom-class");
  });

  it("has accessible title", () => {
    render(<Mark />);
    expect(screen.getByTitle("ACME")).toBeInTheDocument();
  });

  it("has screen reader text", () => {
    render(<Mark />);
    const srTexts = screen.getAllByText("ACME");
    expect(srTexts.length).toBeGreaterThan(0);
  });

  it("renders with 100% width and height", () => {
    render(<Mark />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "100%");
    expect(svg).toHaveAttribute("height", "100%");
  });

  it("has square viewBox", () => {
    render(<Mark />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("contains text element with currentColor fill", () => {
    render(<Mark />);
    const text = document.querySelector("text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveAttribute("fill", "currentColor");
  });
});
