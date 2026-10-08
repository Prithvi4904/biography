"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  onClose: () => void;
  seriesName: string;
}

export default function VideoPlayer({ onClose, seriesName }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cinematic Intro Sequence
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1500));
      setIntroStep(1); // "A PRITHVI ORIGINAL"
      await new Promise(r => setTimeout(r, 2000));
      setIntroStep(2); // "SHAMBHAVI"
      await new Promise(r => setTimeout(r, 2000));
      setIntroStep(3); // "THE SERIES"
      await new Promise(r => setTimeout(r, 2000));
      setShowIntro(false);
    };
    sequence();
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black"
          >
            <AnimatePresence mode="wait">
              {introStep === 1 && (
                <motion.div 
                  key="1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="text-[#E50914] tracking-[0.3em] font-bold text-sm md:text-xl"
                >
                  A PRITHVI ORIGINAL
                </motion.div>
              )}
              {introStep === 2 && (
                <motion.div 
                  key="2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="text-white tracking-widest font-bold text-4xl md:text-6xl"
                >
                  SHAMBHAVI
                </motion.div>
              )}
              {introStep === 3 && (
                <motion.div 
                  key="3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="text-gray-400 tracking-[0.5em] font-light text-2xl md:text-4xl"
                >
                  THE SERIES
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder for actual video element */}
      <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-600 italic">Video Content Plays Here</p>
      </div>

      <AnimatePresence>
        {showControls && !showIntro && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center w-full">
              <button onClick={onClose} className="text-white hover:text-gray-300">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full h-1 bg-gray-600 rounded cursor-pointer relative">
                <div className="absolute left-0 top-0 h-full bg-[#E50914] w-1/3 rounded"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
                  </button>
                  <button>
                    <Volume2 className="w-6 h-6 text-white" />
                  </button>
                  <span className="text-white text-xl font-medium ml-4">{seriesName}</span>
                </div>
                
                <div className="flex gap-6 items-center">
                  <span className="text-white cursor-pointer hover:text-gray-300">Episodes</span>
                  <button>
                    <Maximize className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
