import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, afterAll, afterEach, describe, it, expect } from "vitest";
import React from "react";
import TowersOfHanoi from "@/app/components/TowerComponent";

describe("TowersOfHanoi Weather API (MSW)", () => {
  const server = setupServer(
    http.get("https://api.openweathermap.org/data/2.5/weather", () => {
      return HttpResponse.json(
        {
          main: { temp: 25.2 },
          weather: [{ description: "clear sky" }],
        },
        { status: 200 }
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should display 25°C when the API returns 25.2 degrees in Hanoi", async () => {
    render(<TowersOfHanoi numTowers={3} numDisks={3} />);
    await waitFor(() => {
      expect(screen.getByText(/25°C/)).toBeInTheDocument();
    });
  });
});
