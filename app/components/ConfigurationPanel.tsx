"use client";

import React, { useState } from "react";

interface ConfigurationProps {
  onConfigChange: (towers: number, disks: number) => void;
  currentTowers: number;
  currentDisks: number;
}

export const ConfigurationPanel = ({ onConfigChange, currentTowers, currentDisks }: ConfigurationProps) => {
  const [towers, setTowers] = useState(currentTowers);
  const [disks, setDisks] = useState(currentDisks);

  const handleSet = () => {
    const validTowers = Math.max(3, Math.min(5, towers));
    const validDisks = Math.max(3, Math.min(6, disks));
    setTowers(validTowers);
    setDisks(validDisks);
    onConfigChange(validTowers, validDisks);
  };

  const getComplexityEstimate = (t: number, d: number) => {
    if (t === 3) {
      return Math.pow(2, d) - 1;
    } else {
      // Rough estimate for multi-peg puzzle (actual calculation is more complex)
      return Math.floor(Math.pow(2, d) * 0.6);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Game Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Towers (3-5)</label>
            <div className="flex items-center space-x-3">
              <input type="range" min="3" max="5" value={towers} onChange={(e) => setTowers(parseInt(e.target.value))} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold min-w-[3rem] text-center">{towers}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Disks (3-6)</label>
            <div className="flex items-center space-x-3">
              <input type="range" min="3" max="6" value={disks} onChange={(e) => setDisks(parseInt(e.target.value))} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold min-w-[3rem] text-center">{disks}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Configuration Preview</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Towers:</strong> {towers}
              </p>
              <p>
                <strong>Disks:</strong> {disks}
              </p>
              <p>
                <strong>Estimated Moves:</strong> ~{getComplexityEstimate(towers, disks)}
              </p>
              <p>
                <strong>Difficulty:</strong> {disks <= 3 ? "Easy" : disks <= 4 ? "Medium" : disks <= 5 ? "Hard" : "Expert"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSet}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Set Configuration
          </button>
        </div>
      </div>

      {(towers !== currentTowers || disks !== currentDisks) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Configuration changed. Click &quot;Set Configuration&quot; to apply changes and reset the game.
          </p>
        </div>
      )}
    </div>
  );
};
