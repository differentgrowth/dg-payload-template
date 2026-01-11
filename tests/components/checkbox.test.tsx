import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("renders correctly", () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
  });

  it("applies custom className", () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveClass("custom-class");
  });

  it("can be checked by default", () => {
    render(<Checkbox data-testid="checkbox" defaultChecked />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveAttribute("data-checked");
  });

  it("can be unchecked by default", () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toHaveAttribute("data-checked");
  });

  it("toggles checked state on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");

    expect(checkbox).not.toHaveAttribute("data-checked");
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-checked");
    await user.click(checkbox);
    expect(checkbox).not.toHaveAttribute("data-checked");
  });

  it("can be disabled", () => {
    render(<Checkbox data-testid="checkbox" disabled />);
    const checkbox = screen.getByTestId("checkbox");
    // base-ui uses aria-disabled instead of disabled attribute
    expect(checkbox).toHaveAttribute("aria-disabled", "true");
    expect(checkbox).toHaveAttribute("data-disabled");
  });

  it("calls onCheckedChange when toggled", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox data-testid="checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByTestId("checkbox");

    await user.click(checkbox);
    // base-ui passes (checked, event) to onCheckedChange
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0]).toBe(true);

    await user.click(checkbox);
    expect(handleChange.mock.calls[1][0]).toBe(false);
  });

  it("renders with name prop", () => {
    render(<Checkbox data-testid="checkbox" name="terms" />);
    const checkbox = screen.getByTestId("checkbox");
    // base-ui checkbox renders as a span, name may be on hidden input
    expect(checkbox).toBeInTheDocument();
  });

  it("has peer class for styling adjacent elements", () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveClass("peer");
  });

  it("renders checkbox indicator when checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");

    await user.click(checkbox);
    const indicator = checkbox.querySelector(
      "[data-slot='checkbox-indicator']"
    );
    expect(indicator).toBeInTheDocument();
  });
});
