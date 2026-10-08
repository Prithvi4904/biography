"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Episode3() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Optional cinematic delay before playing
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        setIsPlaying(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-full h-full"
      >
        <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-gray-300 transition group drop-shadow-lg">
          <ArrowLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-lg drop-shadow-md">Back to Home</span>
        </Link>
        
        <video
          ref={videoRef}
          src="/questioner.mp4"
          controls
          className="w-full h-full object-contain bg-black"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-24 left-12 z-50 pointer-events-none"
            >
              <p className="text-gray-400 font-bold text-sm md:text-base tracking-widest uppercase mb-1">Episode 3</p>
              <h1 className="text-5xl md:text-7xl font-bebas text-white tracking-wider drop-shadow-2xl">The Questioner</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
