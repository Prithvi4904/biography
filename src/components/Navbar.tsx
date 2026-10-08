"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, ChevronDown, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 px-6 md:px-16 py-5 flex items-center justify-between ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'}`}
    >
      {/* Left Section: Logo & Links */}
      <div className="flex items-center gap-10 md:gap-14">
        <Link href="/" className="font-bebas text-[#E50914] text-4xl md:text-5xl tracking-wider cursor-pointer transition-transform hover:scale-105 duration-300">
          SHAMBHAVI
        </Link>
        
        {/* Main Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-[14px] text-[#e5e5e5] font-medium tracking-wide">
          {['Home', 'Series', 'Movies', 'New & Popular', 'My List'].map((item) => (
            <Link key={item} href="/" className="hover:text-white hover:opacity-80 transition-all duration-300">
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section: Episodes Dropdown, Icons & Profile */}
      <div className="flex items-center gap-5 md:gap-6 text-white">
        
        {/* Episodes Dropdown */}
        <div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center gap-2 text-[14px] text-[#e5e5e5] hover:text-white transition-colors">
            Episodes
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          
          {/* Elegant Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-6 w-64 bg-[rgba(0,0,0,0.95)] border border-[#333] shadow-2xl flex flex-col z-50 rounded-sm"
              >
                {/* Tooltip Arrow */}
                <div className="absolute -top-[7px] right-6 w-3 h-3 bg-[rgba(0,0,0,0.95)] border-t border-l border-[#333] rotate-45"></div>
                
                <Link href="/episode-1" className="px-5 py-4 text-sm text-[#e5e5e5] hover:text-white hover:bg-[#222] transition-colors flex items-center justify-between group/item">
                  <span className="font-semibold transform group-hover/item:translate-x-1 transition-transform duration-300">Cry Baby</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ep 1</span>
                </Link>
                
                <div className="w-full h-px bg-gray-800/80 my-0.5"></div>
                
                {/* Episode 2 */}
                <Link href="/episode-2" className="px-5 py-4 text-sm text-[#e5e5e5] hover:text-white hover:bg-[#222] transition-colors flex items-center justify-between group/item">
                  <span className="font-semibold transform group-hover/item:translate-x-1 transition-transform duration-300">The Yapper</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ep 2</span>
                </Link>

                {/* Episode 3 */}
                <Link href="/episode-3" className="px-5 py-4 text-sm text-[#e5e5e5] hover:text-white hover:bg-[#222] transition-colors flex items-center justify-between group/item border-t border-[#333]/80">
                  <span className="font-semibold transform group-hover/item:translate-x-1 transition-transform duration-300">The Questioner</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ep 3</span>
                </Link>

                {/* Episode 4 */}
                <Link href="/episode-4" className="px-5 py-4 text-sm text-[#e5e5e5] hover:text-white hover:bg-[#222] transition-colors flex items-center justify-between group/item border-t border-[#333]/80">
                  <span className="font-semibold transform group-hover/item:translate-x-1 transition-transform duration-300">My Fav Child</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ep 4</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expandable Netflix Search Bar */}
        <div className="flex items-center">
          <motion.div 
            initial={false}
            animate={{ 
              width: isSearchExpanded ? (window.innerWidth < 640 ? 150 : 260) : 32,
              backgroundColor: isSearchExpanded ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
              borderColor: isSearchExpanded ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)'
            }}
            className="flex items-center overflow-hidden border transition-colors duration-300 h-[36px]"
            style={{ borderRadius: isSearchExpanded ? '4px' : '0px' }}
          >
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className="hover:text-gray-300 transition-colors flex-shrink-0 w-8 h-full flex items-center justify-center pl-1 z-10"
            >
              <Search className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            </button>
            <input 
              type="text" 
              placeholder="Titles, people, genres"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`bg-transparent text-white text-sm outline-none px-2 w-full transition-opacity duration-300 ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`}
              onBlur={() => {
                if (searchValue === "") setIsSearchExpanded(false);
              }}
            />
            {searchValue && (
              <button 
                onClick={() => setSearchValue("")}
                className="text-gray-400 hover:text-white transition-colors pr-2 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
        <span className="text-[13px] font-medium hidden lg:block cursor-pointer hover:text-gray-300 transition-colors">
          Kids
        </span>
        <button className="hover:text-gray-300 transition-colors hidden sm:block">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        {/* Profile Dropdown Trigger */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border border-gray-700">
            {/* Generic placeholder avatar styling */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a solid color block if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-300" />
        </div>
      </div>
    </motion.nav>
  );
}
