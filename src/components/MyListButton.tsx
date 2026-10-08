"use client";

import { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";

export default function MyListButton() {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shambhavi-series-saved");
    if (saved === "true") {
      setInList(true);
    }
  }, []);

  const toggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inList) {
      localStorage.setItem("shambhavi-series-saved", "false");
      setInList(false);
    } else {
      localStorage.setItem("shambhavi-series-saved", "true");
      setInList(true);
    }
  };

  return (
    <button
      onClick={toggleList}
      className="flex items-center gap-2 bg-transparent border border-gray-400 hover:border-white text-white px-6 py-2 rounded font-medium transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10"
    >
      {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      {inList ? "MY LIST" : "MY LIST"}
    </button>
  );
}
