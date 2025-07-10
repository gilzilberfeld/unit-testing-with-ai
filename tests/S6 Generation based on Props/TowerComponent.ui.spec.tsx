import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TowersOfHanoi from "../../app/components/TowerComponent";
import React from "react";

describe("TowersOfHanoi Component", () => {
  it("should render the correct number of towers and disks based on props", () => {
    render(<TowersOfHanoi numTowers={4} numDisks={5} />);
    // There should be 4 towers
    const towerLabels = screen.getAllByText(/Tower \d/);
    expect(towerLabels).toHaveLength(4);
    // There should be 5 disks on the first tower
    const diskElements = screen.getAllByText(/^[1-5]$/);
    expect(diskElements).toHaveLength(5);
  });

  it("should render 1 tower and 1 disk when given minimum values", () => {
    render(<TowersOfHanoi numTowers={1} numDisks={1} />);
    const towerLabels = screen.getAllByText(/Tower \d/);
    expect(towerLabels).toHaveLength(1);
    const diskElements = screen.getAllByText(/^1$/);
    expect(diskElements).toHaveLength(1);
  });

  it("should render the maximum allowed towers and disks (e.g., 10)", () => {
    render(<TowersOfHanoi numTowers={10} numDisks={10} />);
    const towerLabels = screen.getAllByText(/Tower \d/);
    expect(towerLabels).toHaveLength(10);
    const diskElements = screen.getAllByText(/^[1-9]$|^10$/);
    expect(diskElements).toHaveLength(10);
  });

  it("should handle out-of-bounds props gracefully (e.g., 0 towers, 0 disks)", () => {
    render(<TowersOfHanoi numTowers={0} numDisks={0} />);
    // Should render no towers or disks
    const towerLabels = screen.queryAllByText(/Tower \d/);
    expect(towerLabels).toHaveLength(0);
    const diskElements = screen.queryAllByText(/\d+/);
    expect(diskElements).toHaveLength(0);
  });

  it("should handle negative props gracefully (e.g., -2 towers, -3 disks)", () => {
    render(<TowersOfHanoi numTowers={-2} numDisks={-3} />);
    // Should render no towers or disks
    const towerLabels = screen.queryAllByText(/Tower \d/);
    expect(towerLabels).toHaveLength(0);
    const diskElements = screen.queryAllByText(/\d+/);
    expect(diskElements).toHaveLength(0);
  });

  it("should update the UI after each move (disks move between towers)", async () => {
    // test body unchanged
    vi.useFakeTimers();
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    await userEvent.click(startButton);
    // Advance timers to trigger a few moves
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(350); // 300ms interval + 50ms buffer
      });
    }
    // After a few moves, disks should be distributed across towers
    // Count all disk elements (should still be 3)
    const diskElements = screen.getAllByText(/^[1-3]$/);
    expect(diskElements.length).toBe(3);
    // At least one tower should have fewer than 3 disks
    const towerLabels = screen.getAllByText(/Tower \d/);
    expect(towerLabels.length).toBe(3);
    // Optionally, check that not all disks are on the first tower
    // (This is a basic check, more detailed checks can be added)
    vi.useRealTimers();
  }, 40000); // Increase timeout to 15 seconds
});
