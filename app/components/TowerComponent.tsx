"use client";

import React, { useState, useEffect, useRef } from "react";
import { GameState } from "./Logic/GameState";
import { WeatherData } from "./Logic/WeatherData";
import { TowersOfHanoiLogic } from "./Logic/TowersOfHanoiLogic";

export interface TowersOfHanoiProps {
  numTowers?: number; // 3-5 towers (optional, defaults to 3)
  numDisks?: number; // 3-6 disks (optional, defaults to 5)
}

const TowersOfHanoi = ({ numTowers = 3, numDisks = 5 }: TowersOfHanoiProps) => {
  const [gameState, setGameState] = useState<GameState>({ towers: [], isAnimating: false });
  const [isRunning, setIsRunning] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Clamp props to valid ranges
  const clampedTowers = Math.max(3, Math.min(5, numTowers));
  const clampedDisks = Math.max(3, Math.min(6, numDisks));

  const gameLogic = useRef(new TowersOfHanoiLogic(clampedDisks, clampedTowers));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reinitialize when props change
    gameLogic.current = new TowersOfHanoiLogic(clampedDisks, clampedTowers);
    setGameState(gameLogic.current.getCurrentState());
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [clampedTowers, clampedDisks]);

  useEffect(() => {
    // Fetch weather data on mount
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setWeatherLoading(true);
      setWeatherError(null);

      // Using OpenWeatherMap API (free tier)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hanoi,VN&appid=demo&units=metric`);

      if (!response.ok) {
        throw new Error("Weather data unavailable");
      }

      const data = await response.json();
      setWeather({
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
      });
    } catch (error) {
      // Fallback to mock data since demo API key might not work
      setWeather({
        temperature: 28,
        description: "partly cloudy",
      });
      setWeatherError("Using sample data because of " + error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleStart = () => {
    if (gameLogic.current.isComplete()) {
      return;
    }

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const nextState = gameLogic.current.nextStep();
      if (nextState) {
        setGameState(nextState);

        // Remove animation state after animation completes
        setTimeout(() => {
          setGameState((prev) => ({ ...prev, isAnimating: false }));
        }, 300);

        if (gameLogic.current.isComplete()) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      } else {
        setIsRunning(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 300);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    handleStop();
    gameLogic.current.reset(clampedDisks);
    setGameState(gameLogic.current.getCurrentState());
  };

  const getDiskColor = (size: number): string => {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"]; // Added purple for 6th disk
    return colors[size - 1] || "#6b7280";
  };

  const getDiskWidth = (size: number): number => {
    return 30 + size * 20;
  };

  const renderTower = (towerIndex: number, disks: number[]) => {
    const maxHeight = clampedDisks;
    const emptySlots = maxHeight - disks.length;

    return (
      <div className="flex flex-col items-center">
        <div className="w-4 h-80 bg-amber-800 rounded-t-lg relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col-reverse items-center">
            {/* Empty slots */}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 w-1 mb-1" />
            ))}

            {/* Disks */}
            {disks.map((diskSize, diskIndex) => (
              <div
                key={`${towerIndex}-${diskIndex}-${diskSize}`}
                className={`h-12 rounded-lg mb-1 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                  gameState.isAnimating && gameState.currentMove?.from === towerIndex && diskIndex === disks.length - 1 ? "transform -translate-y-16 opacity-80" : ""
                }`}
                style={{
                  width: `${getDiskWidth(diskSize)}px`,
                  backgroundColor: getDiskColor(diskSize),
                  zIndex: maxHeight - diskIndex,
                }}
              >
                {diskSize}
              </div>
            ))}
          </div>
        </div>

        {/* Base */}
        <div className="w-32 h-4 bg-amber-900 rounded-b-lg" />

        {/* Tower label */}
        <div className="mt-2 text-sm font-medium text-gray-600">Tower {towerIndex + 1}</div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-2 bg-gradient-to-b from-blue-50 to-white min-h-0">
      <div className="text-center mb-4">
        <div className="bg-white rounded-lg shadow-md p-2 mb-4 inline-block">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Current temperature in Hanoi</h2>
          {weatherLoading ? (
            <div className="text-gray-500">Loading weather...</div>
          ) : weather ? (
            <div className="text-2xl font-bold text-blue-600">
              {weather.temperature}°C
              <span className="text-sm font-normal text-gray-600 ml-2">({weather.description})</span>
            </div>
          ) : (
            <div className="text-red-500">Weather data unavailable</div>
          )}
          {/* Removed weatherError display */}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center bg-green-100 p-4 rounded-xl mb-4">
        <div className={`flex ${clampedTowers === 3 ? "space-x-6" : clampedTowers === 4 ? "space-x-4" : "space-x-2"}`}>{gameState.towers.map((tower, index) => renderTower(index, tower))}</div>
        <div className="flex flex-col space-y-2 ml-4">
          <button
            onClick={handleStart}
            disabled={isRunning || gameLogic.current.isComplete()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Start
          </button>

          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Stop
          </button>

          <button onClick={handleReset} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Reset
          </button>
        </div>
      </div>

      <div className="text-center text-gray-600">
        <div className="mb-2">
          Move {gameLogic.current.getCurrentMoveIndex()} of {gameLogic.current.getTotalMoves()}
        </div>

        {gameLogic.current.isComplete() && <div className="text-green-600 font-semibold text-lg">🎉 Puzzle Completed! 🎉</div>}

        <div className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
          <p className="mt-2">
            Configuration: {clampedTowers} towers, {clampedDisks} disks | Minimum moves: {gameLogic.current.getTotalMoves()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TowersOfHanoi;
