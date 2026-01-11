import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "@/components/ui/separator";

describe("Separator", () => {
  it("renders correctly", () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Separator className="custom-class" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("custom-class");
  });

  it("has correct data-slot attribute", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-slot", "separator");
  });

  it("applies bg-border class", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("bg-border");
  });

  it("applies shrink-0 class", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("shrink-0");
  });

  it("renders as horizontal by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("can render as vertical", () => {
    render(<Separator data-testid="separator" orientation="vertical" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });
});
