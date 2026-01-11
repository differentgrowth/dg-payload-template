import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "@/components/ui/label";

describe("Label", () => {
  it("renders children correctly", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Label className="custom-class">Name</Label>);
    const label = screen.getByText("Name");
    expect(label).toHaveClass("custom-class");
  });

  it("has correct data-slot attribute", () => {
    render(<Label>Username</Label>);
    const label = screen.getByText("Username");
    expect(label).toHaveAttribute("data-slot", "label");
  });

  it("supports htmlFor attribute", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("applies font-medium class", () => {
    render(<Label>Label Text</Label>);
    const label = screen.getByText("Label Text");
    expect(label).toHaveClass("font-medium");
  });

  it("applies text-sm class", () => {
    render(<Label>Small Text</Label>);
    const label = screen.getByText("Small Text");
    expect(label).toHaveClass("text-sm");
  });

  it("renders as a label element", () => {
    render(<Label data-testid="label">Test</Label>);
    const label = screen.getByTestId("label");
    expect(label.tagName).toBe("LABEL");
  });

  it("can contain child elements", () => {
    render(
      <Label>
        <span data-testid="icon">*</span>
        Required Field
      </Label>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Required Field")).toBeInTheDocument();
  });
});
