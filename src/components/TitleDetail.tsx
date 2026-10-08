"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";
import MyListButton from "./MyListButton";
import MusicPlayer from "./MusicPlayer";
import RecommendationRow from "./RecommendationRow";
import VideoPlayer from "./VideoPlayer";

interface TitleDetailProps {
  series: any;
  onClose: () => void;
}

export default function TitleDetail({ series, onClose }: TitleDetailProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isPlayingVideo && (
          <VideoPlayer onClose={() => setIsPlayingVideo(false)} seriesName={series.title} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-40 bg-[#0B0B0B] overflow-y-auto overflow-x-hidden"
      >
        {/* Dynamic Background with Red Glow & Music Sync */}
        <motion.div 
          className="fixed inset-0 pointer-events-none opacity-30"
          animate={{
            scale: isMusicPlaying ? 1.05 : 1,
            opacity: isMusicPlaying ? 0.5 : 0.3,
          }}
          transition={{ duration: 4, repeat: isMusicPlaying ? Infinity : 0, repeatType: "reverse" }}
        >
          <div className="absolute inset-0 bg-[#E50914] mix-blend-screen blur-[100px] opacity-20 transform -translate-x-1/4 -translate-y-1/4" />
        </motion.div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="min-h-screen relative flex flex-col md:flex-row pt-24 px-6 md:px-16 pb-16">
          {/* Left Area - Cinematic Poster Reveal */}
          <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start pt-12 md:pt-0">
            <motion.div 
              initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              className="relative w-[80%] md:w-[90%] max-w-lg aspect-[2/3] rounded-sm overflow-hidden shadow-2xl shadow-[#E50914]/10"
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${series.posterImage})` }}
                animate={{
                  scale: isMusicPlaying ? 1.02 : 1,
                }}
                transition={{ duration: 3, repeat: isMusicPlaying ? Infinity : 0, repeatType: "reverse" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>

          {/* Right Area - Metadata and Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center mt-12 md:mt-0 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="mb-2 text-[#E50914] font-bold tracking-[0.2em] text-xs drop-shadow-md">
                A PRITHVI ORIGINAL
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 drop-shadow-lg">
                {series.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-light tracking-widest text-gray-400 mb-4">
                {series.subtitle}
              </h2>

              <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-gray-400 mb-6">
                <span className="text-white border border-gray-600 px-1 rounded-sm">{series.year}</span>
                <span>{series.seasons} Season</span>
                <span className="text-white border border-gray-600 px-1 rounded-sm">HD</span>
                <span className="text-[#E50914]">Emotion</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setIsPlayingVideo(true)}
                  className="flex items-center justify-center gap-2 bg-white text-black px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-200 transition-colors w-full md:w-auto"
                >
                  <Play className="w-6 h-6 fill-black" />
                  PLAY
                </button>
                <MyListButton />
              </div>

              <p className="text-base md:text-lg text-gray-200 mb-6 max-w-xl font-serif italic leading-relaxed">
                {series.description}
              </p>

              <div className="text-sm text-gray-400 space-y-2 mb-8">
                <p><span className="text-gray-500">Starring:</span> <span className="text-gray-200">{series.cast.starring.join(", ")}</span></p>
                <p><span className="text-gray-500">Featuring:</span> <span className="text-gray-200">{series.cast.featuring.join(", ")}</span></p>
                <p><span className="text-gray-500">Created by:</span> <span className="text-gray-200">{series.cast.createdBy.join(", ")}</span></p>
                <p><span className="text-gray-500">Genre:</span> <span className="text-gray-200">{series.genre.join(" • ")}</span></p>
              </div>

              <MusicPlayer 
                music={series.music} 
                onPlayStateChange={setIsMusicPlaying} 
              />
              
            </motion.div>
          </div>
        </div>

        {/* More Like This Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="px-6 md:px-16"
        >
          <RecommendationRow />
        </motion.div>
      </motion.div>
    </>
  );
}
