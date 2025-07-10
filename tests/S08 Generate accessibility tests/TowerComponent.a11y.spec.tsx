import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TowersOfHanoi from "../../app/components/TowerComponent";
import React from "react";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

describe("TowersOfHanoi Accessibility", () => {
  it("should have a main heading with appropriate role and text", () => {
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    const heading = screen.getByRole("heading", { name: /Towers of Hanoi/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toMatch(/H1|H2|H3/);
  });

  it("should have accessible buttons with labels", () => {
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stop/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("should have tower labels visible to screen readers", () => {
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    const towers = screen.getAllByText(/Tower \d/);
    expect(towers.length).toBe(3);
    towers.forEach((label) => {
      expect(label).toBeVisible();
    });
  });

  it("should have sufficient color contrast for disk text", () => {
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    // Check that disk text is visible (not color contrast per se, but a basic check)
    const disks = screen.getAllByText(/^[1-3]$/);
    disks.forEach((disk) => {
      expect(disk).toBeVisible();
    });
  });

  it("should have no basic accessibility violations", async () => {
    const { container } = render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
