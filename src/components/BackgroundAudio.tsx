import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const playlist = [
  '/music-1.mp3',
  '/music-2.mp3'
];

export default function BackgroundAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.25);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Comprehensive interaction handler to unblock audio
  useEffect(() => {
    if (hasInteracted) return;

    const unblockEvents = [
      'mousedown', 'touchstart', 'keydown', 
      'scroll', 'wheel', 'touchmove', 'pointerdown'
    ];

    const handleInteraction = async (e: Event) => {
      if (!audioRef.current || hasInteracted) return;

      const audio = audioRef.current;
      
      // Try unmuted first (standard click/tap)
      audio.muted = false;
      try {
        await audio.play();
        setHasInteracted(true);
        setIsMuted(false);
        cleanup();
        console.log(`Áudio iniciado com som via ${e.type}`);
      } catch (err) {
        // Fallback to muted (often allowed on scroll)
        audio.muted = true;
        try {
          await audio.play();
          setHasInteracted(true);
          setIsMuted(true); // Reflect truth: we are "active" but browser forced mute
          cleanup();
          console.log(`Áudio iniciado mudo via ${e.type} (aguardando clique para som)`);
        } catch (mutedErr) {
          // Even muted failed (e.g. scroll on some mobile browsers)
          // Keep listeners active
        }
      }
    };

    const cleanup = () => {
      unblockEvents.forEach(event => {
        window.removeEventListener(event, handleInteraction, true);
        document.removeEventListener(event, handleInteraction, true);
      });
    };

    unblockEvents.forEach(event => {
      window.addEventListener(event, handleInteraction, { capture: true, passive: true });
      document.addEventListener(event, handleInteraction, { capture: true, passive: true });
    });

    // Best-effort auto-play on mount
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    return cleanup;
  }, [hasInteracted]);

  // Sync state changes
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    
    audio.volume = volume;
    audio.muted = !hasInteracted ? true : isMuted;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted, volume, hasInteracted]);

  // Track change sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack];
      // When track changes, we try to play it (respecting current session unblock state)
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleEnded = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentTrack]}
        onEnded={handleEnded}
        onCanPlay={() => setIsAudioReady(true)}
        autoPlay
        muted
        playsInline
        loop={false}
      />

      <div className="fixed bottom-6 right-6 z-[100] group flex items-center">
        <div className="flex items-center bg-brand-bg/90 backdrop-blur-md border border-[rgba(57,255,20,0.3)] rounded-full shadow-[0_0_20px_rgba(57,255,20,0.2)] overflow-hidden transition-all duration-500 ease-in-out">
          <button
            onClick={toggleMute}
            className={`p-4 text-brand-green hover:bg-brand-green/10 transition-colors flex items-center justify-center shrink-0 ${!hasInteracted ? 'animate-pulse' : ''}`}
            aria-label={isMuted ? 'Ativar som' : 'Mudo'}
          >
            <div className="relative">
              {isMuted ? (
                <VolumeX size={24} />
              ) : (
                <>
                  <Volume2 size={24} />
                  {isPlaying && hasInteracted && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                    </span>
                  )}
                </>
              )}
            </div>
          </button>

          <div className="max-w-0 group-hover:max-w-[120px] transition-all duration-500 ease-in-out flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1.5 bg-brand-green/20 rounded-lg appearance-none cursor-pointer accent-brand-green mr-4"
            />
          </div>
        </div>

        {/* Floating Tooltip Hint */}
        {!hasInteracted && (
          <div className="absolute bottom-full right-0 mb-4 bg-brand-green text-black px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap animate-bounce shadow-[0_0_20px_rgba(57,255,20,0.4)] pointer-events-none">
            Role a página ou clique para ativar o som 🎵
            <div className="absolute top-full right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-brand-green"></div>
          </div>
        )}
      </div>
    </>
  );
}
