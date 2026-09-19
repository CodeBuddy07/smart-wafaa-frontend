import { render, screen } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  it("renders a real <button> with type=button by default", () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn.className).toContain("rounded-full");
  });

  it("styles a child anchor when asChild is set (no nested interactive elements)", () => {
    render(
      <Button asChild variant="gold">
        <a href="https://example.com">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("rounded-full");
    expect(screen.queryByRole("button")).toBeNull();
  });
});
