"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  music: {
    title: string;
    url: string;
  };
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function MusicPlayer({ music, onPlayStateChange }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(music.url);
    audioRef.current.loop = true;

    const setAudioData = () => {
      setDuration(audioRef.current?.duration || 0);
    };

    const setAudioTime = () => {
      setProgress(audioRef.current?.currentTime || 0);
    };

    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", setAudioTime);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadeddata", setAudioData);
        audioRef.current.removeEventListener("timeupdate", setAudioTime);
      }
    };
  }, [music.url]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setProgress(value);
  };

  return (
    <div className="mt-8 mb-12 max-w-md">
      <div className="text-xs font-bold tracking-widest text-gray-400 mb-2 flex items-center gap-2">
        ORIGINAL SCORE <span className="text-[#E50914]">🎵</span>
      </div>
      <div className="text-sm text-gray-200 mb-4">{music.title}</div>
      
      <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
        <button onClick={togglePlay} className="hover:text-white text-gray-300 transition-colors">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
        </button>

        <div className="flex-1 flex items-center gap-3">
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={progress} 
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
          />
        </div>

        <div className="text-xs text-gray-400 font-mono w-24 text-right">
          {formatTime(progress)} / {formatTime(duration)}
        </div>

        <button onClick={toggleMute} className="hover:text-white text-gray-300 transition-colors">
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Animated Waveform indicator */}
      {isPlaying && (
        <div className="flex items-end gap-1 h-6 mt-4 opacity-50 px-2">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#E50914] rounded-t-sm"
              animate={{ height: ["4px", `${Math.random() * 20 + 4}px`, "4px"] }}
              transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
