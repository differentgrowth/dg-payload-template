import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom-class");
  });

  it("handles text input", async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");

    await user.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });

  it("can be disabled", () => {
    render(<Input data-testid="input" disabled />);
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
  });

  it("supports different input types", () => {
    render(<Input data-testid="input" type="email" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "email");
  });

  it("supports password type", () => {
    render(<Input data-testid="input" type="password" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("supports number type", () => {
    render(<Input data-testid="input" type="number" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "number");
  });

  it("handles onChange events", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input data-testid="input" onChange={handleChange} />);
    const input = screen.getByTestId("input");

    await user.type(input, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("has correct data-slot attribute", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("supports readonly attribute", () => {
    render(<Input data-testid="input" readOnly value="Read only" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("readonly");
  });

  it("supports required attribute", () => {
    render(<Input data-testid="input" required />);
    const input = screen.getByTestId("input");
    expect(input).toBeRequired();
  });
});
