import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialMediaIcon } from "@/components/ui/social-media-icon";

const VALID_PLATFORMS = [
  "discord",
  "facebook",
  "github",
  "instagram",
  "linkedin",
  "telegram",
  "threads",
  "tiktok",
  "whatsapp",
  "x",
  "youtube",
] as const;

describe("SocialMediaIcon", () => {
  for (const platform of VALID_PLATFORMS) {
    it(`renders icon for ${platform}`, () => {
      render(
        <SocialMediaIcon data-testid={`icon-${platform}`} platform={platform} />
      );
      const icon = screen.getByTestId(`icon-${platform}`);
      expect(icon).toBeInTheDocument();
    });
  }

  it("returns null for unknown platform", () => {
    const { container } = render(
      // @ts-expect-error - testing invalid platform
      <SocialMediaIcon platform="unknown" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("applies custom className", () => {
    render(
      <SocialMediaIcon
        className="custom-icon-class"
        data-testid="icon"
        platform="github"
      />
    );
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("custom-icon-class");
  });

  it("passes additional props to HugeiconsIcon", () => {
    render(
      <SocialMediaIcon
        aria-label="GitHub"
        data-testid="icon"
        platform="github"
      />
    );
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("aria-label", "GitHub");
  });

  it("renders SVG element", () => {
    render(<SocialMediaIcon data-testid="icon" platform="instagram" />);
    const icon = screen.getByTestId("icon");
    expect(icon.tagName.toLowerCase()).toBe("svg");
  });
});
