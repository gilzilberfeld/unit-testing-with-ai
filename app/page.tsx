"use client";
import { useState } from "react";
import { ConfigurationPanel } from "./components/ConfigurationPanel";
import TowersOfHanoi from "./components/TowerComponent";

export default function App() {
  const [towers, setTowers] = useState(3);
  const [disks, setDisks] = useState(5);

  const handleConfigChange = (newTowers: number, newDisks: number) => {
    setTowers(newTowers);
    setDisks(newDisks);
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-center my-8">Towers of Hanoi</h1>
      </div>
      <div
        className="w-full flex flex-col md:flex-row justify-center items-stretch bg-gradient-to-b from-blue-50 to-white min-h-screen"
        style={{ maxWidth: "1920px", margin: "0 auto", padding: "24px 0" }}
      >
        <div style={{ minWidth: 340, maxWidth: 500, flex: "0 0 500px" }} className="flex flex-col justify-center h-full md:min-h-screen">
          <div className="my-auto">
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
