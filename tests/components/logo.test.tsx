import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo, VerticalLogo } from "@/components/shared/logo";

describe("Logo", () => {
  it("renders an SVG element", () => {
    render(<Logo />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Logo className="custom-class" />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("custom-class");
  });

  it("has accessible title", () => {
    render(<Logo />);
    expect(screen.getByTitle("ACME")).toBeInTheDocument();
  });

  it("has screen reader text", () => {
    render(<Logo />);
    const srTexts = screen.getAllByText("ACME");
    expect(srTexts.length).toBeGreaterThan(0);
  });

  it("renders with 100% width and height", () => {
    render(<Logo />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "100%");
    expect(svg).toHaveAttribute("height", "100%");
  });

  it("has currentColor fill on text", () => {
    render(<Logo />);
    const text = document.querySelector("text");
    expect(text).toHaveAttribute("fill", "currentColor");
  });
});

describe("VerticalLogo", () => {
  it("renders an SVG element", () => {
    render(<VerticalLogo />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<VerticalLogo className="vertical-class" />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("vertical-class");
  });

  it("has accessible title", () => {
    render(<VerticalLogo />);
    expect(screen.getByTitle("ACME")).toBeInTheDocument();
  });

  it("has screen reader text", () => {
    render(<VerticalLogo />);
    const srTexts = screen.getAllByText("ACME");
    expect(srTexts.length).toBeGreaterThan(0);
  });

  it("has currentColor fill on text", () => {
    render(<VerticalLogo />);
    const text = document.querySelector("text");
    expect(text).toHaveAttribute("fill", "currentColor");
  });
});
