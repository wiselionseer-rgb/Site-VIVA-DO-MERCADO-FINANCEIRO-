import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const playlist = [
  '/music-1.mp3',
  '/music-2.mp3'
];

export default function BackgroundAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio with the first track
    const audio = new Audio(playlist[currentTrack]);
    audio.volume = volume;
    audio.loop = false;
    audio.muted = true;
    audioRef.current = audio;

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener('ended', handleEnded);

    // Initial play attempt (muted)
    audio.play().catch(() => {
      console.log("Initial muted autoplay blocked");
    });

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack];
      audioRef.current.muted = !hasInteracted ? true : isMuted;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !hasInteracted ? true : isMuted;
      if (hasInteracted && !isMuted && isPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, hasInteracted, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.muted = isMuted;
          if (isPlaying && audioRef.current.paused) {
            audioRef.current.play().catch(() => {});
          }
        }
      }
    };

    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'wheel', 'scroll', 'pointerdown'];
    events.forEach(event => window.addEventListener(event, handleInteraction, { once: true }));
    
    return () => {
      events.forEach(event => window.removeEventListener(event, handleInteraction));
    };
  }, [hasInteracted, isMuted, isPlaying]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsMuted(!isMuted);
    
    // If we were paused due to autoplay, resume now
    if (audioRef.current && isPlaying && audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] group flex items-center">
      <div className="flex items-center bg-brand-bg/90 backdrop-blur-md border border-[rgba(57,255,20,0.3)] rounded-full shadow-[0_0_20px_rgba(57,255,20,0.2)] overflow-hidden transition-all duration-500 ease-in-out">
        <button
          onClick={toggleMute}
          className="p-4 text-brand-green hover:bg-brand-green/10 transition-colors flex items-center justify-center shrink-0"
          aria-label={isMuted ? 'Ativar som' : 'Mudo'}
        >
          <div className="relative">
            {isMuted ? (
              <VolumeX size={24} />
            ) : (
              <>
                <Volume2 size={24} />
                {isPlaying && (
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
    </div>
  );
}
