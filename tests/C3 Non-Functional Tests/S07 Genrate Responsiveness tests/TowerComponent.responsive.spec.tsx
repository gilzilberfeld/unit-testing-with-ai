import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import TowersOfHanoi from "../../../app/components/TowerComponent";

describe("TowersOfHanoi Responsiveness", () => {
  it("should render correctly on a large screen (desktop)", () => {
    window.innerWidth = 1200;
    window.innerHeight = 900;
    window.dispatchEvent(new Event("resize"));
    render(<TowersOfHanoi numTowers={4} numDisks={5} />);
    const main = screen.getByText(/Towers of Hanoi/).closest("div");
    expect(main).toHaveClass("max-w-4xl");
    const towers = screen.getAllByText(/Tower \d/);
    expect(towers.length).toBe(4);
  });

  it("should render correctly on a small screen (mobile)", () => {
    window.innerWidth = 375;
    window.innerHeight = 667;
    window.dispatchEvent(new Event("resize"));
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    const main = screen.getByText(/Towers of Hanoi/).closest("div");
    expect(main).toBeInTheDocument();
    const towers = screen.getAllByText(/Tower \d/);
    expect(towers.length).toBe(3);
  });

  it("should not overflow horizontally on small screens", () => {
    window.innerWidth = 320;
    window.innerHeight = 568;
    window.dispatchEvent(new Event("resize"));
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    const main = screen.getByText(/Towers of Hanoi/).closest("div");
    expect(main?.style.overflowX || getComputedStyle(main!).overflowX).not.toBe("scroll");
  });
});
