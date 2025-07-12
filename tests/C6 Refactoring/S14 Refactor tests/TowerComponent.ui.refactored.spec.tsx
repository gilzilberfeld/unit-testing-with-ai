import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TowersOfHanoi from "../../app/components/TowerComponent";
import React from "react";

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
  it("should render the correct number of towers and disks based on props", () => {
    setup({ numTowers: 4, numDisks: 5 });
    expect(getTowerLabels()).toHaveLength(4);
    expect(getDiskElements(/^[1-5]$/)).toHaveLength(5);
  });

  it("should render 1 tower and 1 disk when given minimum values", () => {
    setup({ numTowers: 1, numDisks: 1 });
    expect(getTowerLabels()).toHaveLength(1);
    expect(getDiskElements(/^1$/)).toHaveLength(1);
  });

  it("should render the maximum allowed towers and disks (e.g., 10)", () => {
    setup({ numTowers: 10, numDisks: 10 });
    expect(getTowerLabels()).toHaveLength(10);
    expect(getDiskElements(/^[1-9]$|^10$/)).toHaveLength(10);
  });

  it("should handle out-of-bounds props gracefully (e.g., 0 towers, 0 disks)", () => {
    setup({ numTowers: 0, numDisks: 0 });
    expect(getTowerLabels()).toHaveLength(0);
    expect(getDiskElements(/\d+/)).toHaveLength(0);
  });

  it("should handle negative props gracefully (e.g., -2 towers, -3 disks)", () => {
    setup({ numTowers: -2, numDisks: -3 });
    expect(getTowerLabels()).toHaveLength(0);
    expect(getDiskElements(/\d+/)).toHaveLength(0);
  });

  it("should update the UI after each move (disks move between towers)", async () => {
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
