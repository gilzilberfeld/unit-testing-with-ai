import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import TowersOfHanoi from "../../../app/components/TowerComponent";

describe("TowersOfHanoi Weather API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should display 25°C when the API returns 25.2 degrees in Hanoi", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              main: { temp: 25.2 },
              weather: [{ description: "clear sky" }],
            }),
        })
      ) as unknown as typeof globalThis.fetch
    );

    render(<TowersOfHanoi numTowers={3} numDisks={3} />);

    // Wait for the temperature to appear
    await waitFor(() => {
      expect(screen.getByText(/25°C/)).toBeInTheDocument();
    });
  });
});
