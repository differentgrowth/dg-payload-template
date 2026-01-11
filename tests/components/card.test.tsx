import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Card className="custom-class">Content</Card>);
    const card = screen.getByText("Content").closest("[data-slot='card']");
    expect(card).toHaveClass("custom-class");
  });

  it("has correct data-slot attribute", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("data-slot", "card");
  });

  it("applies default card styles", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("rounded-xl");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("bg-card");
  });
});

describe("CardHeader", () => {
  it("renders children correctly", () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<CardHeader data-testid="header">Content</CardHeader>);
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("applies custom className", () => {
    render(<CardHeader className="custom-class">Content</CardHeader>);
    const header = screen.getByText("Content");
    expect(header).toHaveClass("custom-class");
  });
});

describe("CardTitle", () => {
  it("renders children correctly", () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<CardTitle data-testid="title">Content</CardTitle>);
    const title = screen.getByTestId("title");
    expect(title).toHaveAttribute("data-slot", "card-title");
  });

  it("applies font-semibold class", () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText("Title");
    expect(title).toHaveClass("font-semibold");
  });
});

describe("CardDescription", () => {
  it("renders children correctly", () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<CardDescription data-testid="desc">Content</CardDescription>);
    const desc = screen.getByTestId("desc");
    expect(desc).toHaveAttribute("data-slot", "card-description");
  });

  it("applies text-muted-foreground class", () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText("Description");
    expect(desc).toHaveClass("text-muted-foreground");
  });
});

describe("CardAction", () => {
  it("renders children correctly", () => {
    render(<CardAction>Action</CardAction>);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<CardAction data-testid="action">Content</CardAction>);
    const action = screen.getByTestId("action");
    expect(action).toHaveAttribute("data-slot", "card-action");
  });
});

describe("CardContent", () => {
  it("renders children correctly", () => {
    render(<CardContent>Main content</CardContent>);
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-slot", "card-content");
  });

  it("applies px-6 padding class", () => {
    render(<CardContent>Content</CardContent>);
    const content = screen.getByText("Content");
    expect(content).toHaveClass("px-6");
  });
});

describe("CardFooter", () => {
  it("renders children correctly", () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("has correct data-slot attribute", () => {
    render(<CardFooter data-testid="footer">Content</CardFooter>);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });

  it("applies flex class", () => {
    render(<CardFooter>Footer</CardFooter>);
    const footer = screen.getByText("Footer");
    expect(footer).toHaveClass("flex");
  });
});

describe("Card composition", () => {
  it("renders a complete card with all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
          <CardAction>
            <button type="button">Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card body content</p>
        </CardContent>
        <CardFooter>
          <button type="button">Submit</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description goes here")).toBeInTheDocument();
    expect(screen.getByText("Card body content")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
