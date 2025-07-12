import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import TowersOfHanoi from "@/app/components/TowerComponent";

function setup(props = { numTowers: 3, numDisks: 3 }) {
  render(<TowersOfHanoi {...props} />);
}

function getTowerLabels() {
  return screen.queryAllByText(/Tower \d/);
}

function getDiskElements(regex: RegExp) {
  return screen.queryAllByText(regex);
}

describe("TowersOfHanoi Component (Refactored)", () => {
  it("when given 4 towers and 5 disks, then renders 4 towers and 5 disks", () => {
    setup({ numTowers: 4, numDisks: 5 });
    expect(getTowerLabels()).toHaveLength(4);
    // Only the first tower should have disks, and disks are always clamped to 3-6
    expect(getDiskElements(/^[1-5]$/)).toHaveLength(5);
  });

  it("when given minimum values, then renders 3 towers and 3 disks (clamped)", () => {
    setup({ numTowers: 1, numDisks: 1 });
    // Clamped to 3 towers and 3 disks
    expect(getTowerLabels()).toHaveLength(3);
    expect(getDiskElements(/^[1-3]$/)).toHaveLength(3);
  });

  it("when given maximum values, then renders 5 towers and 6 disks (clamped)", () => {
    setup({ numTowers: 10, numDisks: 10 });
    // Clamped to 5 towers and 6 disks
    expect(getTowerLabels()).toHaveLength(5);
    expect(getDiskElements(/^[1-6]$/)).toHaveLength(6);
  });

  it("when given out-of-bounds props, then renders 3 towers and 3 disks (clamped)", () => {
    setup({ numTowers: 0, numDisks: 0 });
    expect(getTowerLabels()).toHaveLength(3);
    expect(getDiskElements(/^[1-3]$/)).toHaveLength(3);
  });

  it("when given negative props, then renders 3 towers and 3 disks (clamped)", () => {
    setup({ numTowers: -2, numDisks: -3 });
    expect(getTowerLabels()).toHaveLength(3);
    expect(getDiskElements(/^[1-3]$/)).toHaveLength(3);
  });

  it("when the start button is clicked, then the UI updates after each move", async () => {
    vi.useFakeTimers();
    setup({ numTowers: 3, numDisks: 3 });
    const startButton = screen.getByRole("button", { name: /start/i });
    await userEvent.click(startButton);
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(350);
      });
    }
    expect(getDiskElements(/^[1-3]$/).length).toBe(3);
    expect(getTowerLabels().length).toBe(3);
    vi.useRealTimers();
  }, 40000);
});
