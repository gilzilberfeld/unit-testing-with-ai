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
    <div className="max-w-6xl mx-auto p-6">
      <ConfigurationPanel onConfigChange={handleConfigChange} currentTowers={towers} currentDisks={disks} />
      <TowersOfHanoi numTowers={towers} numDisks={disks} />
    </div>
  );
}
