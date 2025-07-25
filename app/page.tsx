"use client";
import { useEffect, useState } from "react";
import { ConfigurationPanel } from "./components/ConfigurationPanel";
import TowersOfHanoi from "./components/TowerComponent";

export default function App() {
  const [towers, setTowers] = useState(3);
  const [disks, setDisks] = useState(5);

  useEffect(() => {
    // Hide Next.js error overlay
    const style = document.createElement("style");
    style.innerHTML = `
        [data-nextjs-dialog-overlay] { display: none !important; }
        [data-nextjs-toast] { display: none !important; }
      `;
    document.head.appendChild(style);
  }, []);

  const handleConfigChange = (newTowers: number, newDisks: number) => {
    setTowers(newTowers);
    setDisks(newDisks);
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-center my-4">Towers of Hanoi</h1>
      </div>
      <div
        className="w-full flex flex-col md:flex-row justify-center items-stretch bg-gradient-to-b from-blue-50 to-white min-h-screen"
        style={{ maxWidth: "1920px", margin: "0 auto", padding: "4px 0" }}
      >
        <div style={{ minWidth: 340, maxWidth: 500, flex: "0 0 500px" }} className="flex flex-col h-full md:min-h-screen">
          <div className="w-full mt-4 mb-6 text-sm text-gray-700 bg-white bg-opacity-80 rounded-lg shadow border border-blue-100 p-4">
            <p>
              Move all disks from the first tower to the last tower.
              <br />
              <br />
              Only one disk can be moved at a time, and a larger disk cannot be placed on top of a smaller disk.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-between items-center w-full">
            <ConfigurationPanel onConfigChange={handleConfigChange} currentTowers={towers} currentDisks={disks} />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center" style={{ minWidth: 0, maxWidth: 1400 }}>
          <TowersOfHanoi numTowers={towers} numDisks={disks} />
        </div>
      </div>
    </div>
  );
}
