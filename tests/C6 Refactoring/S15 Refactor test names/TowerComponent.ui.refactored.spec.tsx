import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import TowersOfHanoi from "../../../app/components/TowerComponent";

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
    expect(getDiskElements(/^[1-5]$/)).toHaveLength(5);
  });

  it("when given minimum values, then renders 1 tower and 1 disk", () => {
    setup({ numTowers: 1, numDisks: 1 });
    expect(getTowerLabels()).toHaveLength(1);
    expect(getDiskElements(/^1$/)).toHaveLength(1);
  });

  it("when given maximum values, then renders 10 towers and 10 disks", () => {
    setup({ numTowers: 10, numDisks: 10 });
    expect(getTowerLabels()).toHaveLength(10);
    expect(getDiskElements(/^[1-9]$|^10$/)).toHaveLength(10);
  });

  it("when given out-of-bounds props, then renders no towers or disks", () => {
    setup({ numTowers: 0, numDisks: 0 });
    expect(getTowerLabels()).toHaveLength(0);
    expect(getDiskElements(/\d+/)).toHaveLength(0);
  });

  it("when given negative props, then renders no towers or disks", () => {
    setup({ numTowers: -2, numDisks: -3 });
    expect(getTowerLabels()).toHaveLength(0);
    expect(getDiskElements(/\d+/)).toHaveLength(0);
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
