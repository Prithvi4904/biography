"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import MyListButton from "./MyListButton";

interface HeroProps {
  series: any;
  onOpenDetail: () => void;
}

export default function Hero({ series, onOpenDetail }: HeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen overflow-hidden group cursor-pointer"
      onClick={onOpenDetail}
    >
      {/* Background Image with slow zoom effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center transform-gpu"
        style={{ backgroundImage: `url(${series.heroImage})` }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Cinematic Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent" />
      
      {/* Subtle Red Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E50914]/5 to-transparent pointer-events-none mix-blend-screen" />

      {/* Content */}
      <div className="absolute bottom-[10%] left-4 md:left-12 lg:left-20 max-w-2xl z-10 transition-transform duration-500 group-hover:translate-y-[-10px]">
        <div className="mb-2 text-[#E50914] font-bold tracking-[0.2em] text-xs md:text-sm drop-shadow-md">
          A PRITHVI ORIGINAL
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 drop-shadow-2xl">
          {series.title}
        </h1>
        <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-300 mb-6 drop-shadow-lg">
          {series.subtitle}
        </h2>
        
        <div className="flex items-center gap-3 text-sm md:text-base font-medium text-gray-300 mb-6 drop-shadow-md">
          <span className="text-white">{series.year}</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <span>{series.seasons} Season</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <div className="flex gap-2">
            {series.genre.map((g: string, i: number) => (
              <span key={g}>
                {g}{i !== series.genre.length - 1 && " •"}
              </span>
            ))}
          </div>
        </div>

        <p className="text-base md:text-lg text-gray-200 mb-8 max-w-xl italic drop-shadow-md leading-relaxed font-serif">
          {series.shortDescription}
        </p>

        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-2 bg-white text-black px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail();
            }}
          >
            <Play className="w-6 h-6 fill-black" />
            PLAY
          </button>
          
          <MyListButton />
        </div>
      </div>
    </motion.div>
  );
}
