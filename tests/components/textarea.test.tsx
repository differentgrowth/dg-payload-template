import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  it("renders correctly", () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveClass("custom-class");
  });

  it("handles text input", async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");

    await user.type(textarea, "Hello World\nNew Line");
    expect(textarea).toHaveValue("Hello World\nNew Line");
  });

  it("can be disabled", () => {
    render(<Textarea data-testid="textarea" disabled />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toBeDisabled();
  });

  it("handles onChange events", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea data-testid="textarea" onChange={handleChange} />);
    const textarea = screen.getByTestId("textarea");

    await user.type(textarea, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("has correct data-slot attribute", () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });

  it("supports readonly attribute", () => {
    render(<Textarea data-testid="textarea" readOnly value="Read only" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("readonly");
  });

  it("supports required attribute", () => {
    render(<Textarea data-testid="textarea" required />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toBeRequired();
  });

  it("supports rows attribute", () => {
    render(<Textarea data-testid="textarea" rows={5} />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("supports maxLength attribute", () => {
    render(<Textarea data-testid="textarea" maxLength={100} />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("maxlength", "100");
  });

  it("renders as a textarea element", () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("supports name attribute", () => {
    render(<Textarea data-testid="textarea" name="message" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("name", "message");
  });

  it("supports controlled value", () => {
    const { rerender } = render(
      <Textarea data-testid="textarea" onChange={() => {}} value="Initial" />
    );
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveValue("Initial");

    rerender(
      <Textarea data-testid="textarea" onChange={() => {}} value="Updated" />
    );
    expect(textarea).toHaveValue("Updated");
  });
});
