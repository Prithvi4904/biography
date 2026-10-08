"use client";

import { motion } from "framer-motion";
import { Play, Plus, Info } from "lucide-react";

export default function RecommendationRow() {
  const cards = [
    { id: 1, title: "Memory 01", type: "Episode", image: "/placeholder-1.jpg" },
    { id: 2, title: "The Beginning", type: "Behind The Scenes", image: "/placeholder-2.jpg" },
    { id: 3, title: "Chaos & Dreams", type: "Special", image: "/placeholder-3.jpg" },
    { id: 4, title: "Little Things", type: "Gallery", image: "/placeholder-4.jpg" },
  ];

  return (
    <div className="mt-16 pb-24">
      <h3 className="text-xl font-bold mb-6 text-gray-200">MORE LIKE THIS</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div 
            key={card.id}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-video bg-[#1a1a1a] rounded-md overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#E50914]/20 border border-transparent hover:border-[#333]"
          >
            {/* Fallback gradient if no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black group-hover:opacity-50 transition-opacity" />
            
            <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-40 transition-opacity" 
                 style={{ backgroundImage: `url(${card.image})` }} />

            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 mb-2">
                <button className="bg-white rounded-full p-1.5 hover:bg-gray-300">
                  <Play className="w-4 h-4 fill-black text-black" />
                </button>
                <button className="bg-transparent border border-gray-400 rounded-full p-1.5 hover:border-white">
                  <Plus className="w-4 h-4 text-white" />
                </button>
                <button className="bg-transparent border border-gray-400 rounded-full p-1.5 hover:border-white ml-auto">
                  <Info className="w-4 h-4 text-white" />
                </button>
              </div>
              <h4 className="font-bold text-sm text-white">{card.title}</h4>
              <p className="text-xs text-[#E50914]">{card.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
