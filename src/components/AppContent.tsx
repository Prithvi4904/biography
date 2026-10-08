"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Play, X, ChevronDown, ChevronUp } from "lucide-react";
import { series } from "@/data/series";
import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";

export default function AppContent() {
  const [sequence, setSequence] = useState(0); 
  // 0 = Greeting ("hey shambhavi")
  // 1 = Netflix Intro ("SHAMBHAVI" glow)
  // 2 = Main Single Screen

  const [showVideo, setShowVideo] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the hover song and set it to 2 minutes 56 seconds
    hoverAudioRef.current = new Audio("/pretty-woman.mp3");
    hoverAudioRef.current.loop = true;
    hoverAudioRef.current.volume = 0.5;
    hoverAudioRef.current.currentTime = 176;

    // Sequence 0 to 1
    const greetingTimer = setTimeout(() => {
      setSequence(1);
    }, 4000);

    // Sequence 1 to 2
    const introTimer = setTimeout(() => {
      setSequence(2);
    }, 8000);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(introTimer);
      
      // Stop all audio when navigating away from this page
      if (hoverAudioRef.current) hoverAudioRef.current.pause();
    };
  }, []);

  // Handle Hover Video Audio
  useEffect(() => {
    if (isVideoHovered && !showVideo) {
      hoverAudioRef.current?.play().catch(() => {
        // Silently catch browser autoplay restrictions so it doesn't throw console errors
      });
    } else {
      hoverAudioRef.current?.pause();
    }
  }, [isVideoHovered, showVideo]);

  const handlePictureClick = () => {
    setShowVideo(true);
    if (hoverAudioRef.current) {
      hoverAudioRef.current.pause();
    }
  };

  const handleVideoClose = () => {
    setShowVideo(false);
    if (bgmAudioRef.current) {
      bgmAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen bg-[#141414] text-white overflow-hidden font-sans">
      
      {/* Sequence 0: Greeting */}
      {sequence === 0 && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[100] bg-[#141414] flex flex-col items-center justify-center">
          <div className="animate-greeting flex flex-col items-center justify-center w-full text-center">
            <h2 className="text-sm md:text-lg font-light tracking-[0.3em] text-gray-400 uppercase mb-4">
              hey shambhavi...
            </h2>
            <h1 className="text-xl md:text-3xl font-light tracking-[0.4em] text-white uppercase drop-shadow-md">
              excited to be lost ??
            </h1>
          </div>
        </div>
      )}

      {/* Sequence 1: Netflix "Tudum" Intro Animation */}
      {sequence === 1 && (
        <div className="fixed inset-0 z-50 bg-[#141414] flex items-center justify-center overflow-hidden w-screen h-screen">
          {/* Proper Text Logo matching portfolio */}
          <div className="animate-netflix-logo flex flex-col items-center justify-center">
            <h1 className="text-[#E50914] text-8xl md:text-[14rem] tracking-tight font-bebas m-0 p-0 leading-none" style={{ textShadow: "0 0 60px rgba(229,9,20,0.9)" }}>
              SHAMBHAVI
            </h1>
            <div className="w-full max-w-[24rem] h-[3px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent mt-4 md:mt-8"></div>
          </div>
          
          {/* Cinematic Red Flash (Tudum Hit) */}
          <div className="animate-netflix-flash absolute inset-0 bg-[#E50914] mix-blend-overlay pointer-events-none" />
        </div>
      )}

      {/* Sequence 2: Main Single Screen Experience */}
      <AnimatePresence>
        {sequence === 2 && !showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 z-10 w-full h-screen bg-[#141414] overflow-hidden"
          >
            <Navbar />
            
            {/* Full Screen Background Image & Video */}
            <div 
              className="absolute top-0 left-0 w-full h-full cursor-default"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              {/* Background Picture */}
              <img 
                src={`${series.posterImage}?v=3`}
                alt="Poster Background"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${isVideoHovered ? 'opacity-0' : 'opacity-80'}`}
              />
              {/* Background Video */}
              <video
                src="/hero-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${isVideoHovered ? 'opacity-80' : 'opacity-0'}`}
              />
              
              {/* Netflix Gradients - Darker on left to support text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent w-full md:w-3/4 pointer-events-none" />
            </div>

            {/* Content Container - pointer-events-none allows mouse to pass through to the image behind it */}
            <div className="relative z-20 w-full h-full flex flex-col justify-end px-6 pb-16 md:px-16 md:pb-24 max-w-7xl mx-auto pointer-events-none">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                className="max-w-lg md:max-w-2xl flex flex-col justify-end pointer-events-auto"
              >
                {/* Netflix Original Tag */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="flex items-center gap-2 mb-4 md:mb-6"
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[#E50914] rounded-sm flex items-center justify-center font-bold text-[10px] md:text-xs tracking-widest text-white shadow-lg drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]">
                    N
                  </div>
                  <span className="text-gray-300 tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase drop-shadow-md">
                    Series
                  </span>
                </motion.div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-normal md:tracking-wide drop-shadow-2xl font-bebas text-white mb-6 md:mb-8 leading-none" style={{ textShadow: "2px 4px 15px rgba(0,0,0,0.9)" }}>
                  {series.title}
                </h1>

                {/* Match Info & Year */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                  className="flex items-center gap-3 md:gap-4 text-sm md:text-lg font-semibold mb-6 md:mb-8 drop-shadow-md"
                >
                  <span className="text-[#46d369] font-bold">99% Match</span>
                  <span className="text-gray-200 border border-gray-400 px-2 py-0.5 rounded-sm bg-black/40 text-xs md:text-sm">18+</span>
                  <span className="text-gray-200">1 Season</span>
                  <span className="text-gray-200 border border-gray-400 px-1 rounded-sm text-[10px] md:text-xs bg-black/40">HD</span>
                </motion.div>

                {/* Description - Wider so it doesn't squish */}
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                  className="text-white/95 text-base md:text-xl leading-[1.8] md:leading-[2] mb-10 md:mb-12 font-serif italic drop-shadow-xl"
                  style={{ textShadow: "1px 2px 4px rgba(0,0,0,0.9)" }}
                >
                  {series.description}
                </motion.p>


              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sequence 3: Video Player Overlay */}
      <AnimatePresence>
        {showVideo && (
          <VideoPlayer onClose={handleVideoClose} seriesName={series.title} />
        )}
      </AnimatePresence>

    </div>
  );
}
