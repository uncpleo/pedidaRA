import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Disc3, 
  Sliders, 
  ChevronUp, 
  ChevronDown
} from 'lucide-react';

// Direct audio asset imports processed by Vite
import houseOfCardsAudio from '../assets/audio/house_of_cards.mp3';
import ambientAudio from '../assets/audio/ambient.mp3';

const SPOTIFY_URL = 'https://open.spotify.com/intl-es/track/48X4D1FYOShPz2VF3YdfCF?si=57d2ee2a984c45bc';
const SPOTIFY_CDN_PREVIEW = 'https://p.scdn.co/mp3-preview/327f4de399cb68a852a312462c4849cee881ebc6';

interface MusicPlayerProps {
  onPlayStateChange?: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(10); // Default volume 10% per user request
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<'house_of_cards' | 'ambient'>('house_of_cards');
  const [hasError, setHasError] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Track sources with imported Vite asset + fallbacks
  const tracks = {
    house_of_cards: {
      title: 'House of Cards',
      artist: 'Radiohead',
      src: houseOfCardsAudio || '/audio/house_of_cards.mp3',
      fallback: SPOTIFY_CDN_PREVIEW,
    },
    ambient: {
      title: 'Melodía Romántica',
      artist: 'Piano Acústico',
      src: ambientAudio || '/audio/ambient.mp3',
      fallback: 'https://cdn.jsdelivr.net/gh/rafaelreis-hotmart/Audio-Sample-files@master/sample.mp3',
    },
  };

  const currentTrack = tracks[selectedTrack];

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Autoplay by default at 10% volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.10;

    const startPlayback = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.volume = 0.10;
        await audioRef.current.play();
        setIsPlaying(true);
        onPlayStateChange?.(true);
      } catch {
        // If modern browser autoplay policy prevents immediate sound without user gesture,
        // start playback smoothly on the user's first click, scroll or touch anywhere
        const playOnFirstInteraction = async () => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.volume = 0.10;
            try {
              await audioRef.current.play();
              setIsPlaying(true);
              onPlayStateChange?.(true);
            } catch {
              // ignore
            }
          }
          window.removeEventListener('click', playOnFirstInteraction);
          window.removeEventListener('touchstart', playOnFirstInteraction);
          window.removeEventListener('scroll', playOnFirstInteraction);
        };

        window.addEventListener('click', playOnFirstInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', playOnFirstInteraction, { once: true, passive: true });
        window.addEventListener('scroll', playOnFirstInteraction, { once: true, passive: true });
      }
    };

    startPlayback();
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPlayStateChange?.(false);
      } else {
        setHasError(false);
        // Ensure volume is set prior to play
        audioRef.current.volume = isMuted ? 0 : volume / 100;
        await audioRef.current.play();
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }
    } catch (err) {
      console.warn('First playback attempt failed, trying fallback source:', err);
      // Try fallback source if primary failed
      if (audioRef.current && currentTrack.fallback) {
        try {
          audioRef.current.src = currentTrack.fallback;
          audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
          setHasError(false);
          return;
        } catch (fallbackErr) {
          console.error('Playback fallback error:', fallbackErr);
        }
      }
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = val / 100;
      if (val > 0) {
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
    if (!nextMuted && volume === 0) {
      setVolume(50);
      audioRef.current.volume = 0.5;
    }
  };

  const handleTrackChange = (trackKey: 'house_of_cards' | 'ambient') => {
    setSelectedTrack(trackKey);
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.src = tracks[trackKey].src;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Auto resume after track switch failed:', err);
        });
      }
    }
  };

  return (
    <>
      {/* HTML5 Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          if (audioRef.current && currentTrack.fallback && audioRef.current.src !== currentTrack.fallback) {
            audioRef.current.src = currentTrack.fallback;
            audioRef.current.load();
          } else {
            setHasError(true);
          }
        }}
      />

      {/* Floating Bottom Bar (Mobile & Desktop) */}
      <aside 
        aria-label="Reproductor de música con control de volumen" 
        className="fixed bottom-3 right-3 sm:bottom-5 sm:right-6 z-50 max-w-[calc(100vw-24px)]"
      >
        <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#C5A246]/70 rounded-2xl shadow-[0_8px_30px_rgba(197,162,70,0.18)] p-2.5 sm:p-3 transition-all duration-300 w-full sm:w-80">
          
          {/* Main Controls Row */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-11 h-11 rounded-full gold-btn-gradient text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md transition-transform active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A246]"
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música de fondo'}
              title={isPlaying ? 'Pausar música' : 'Reproducir ' + currentTrack.title}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Track Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <Disc3 
                  className={`w-3.5 h-3.5 text-[#C5A246] shrink-0 ${isPlaying ? 'animate-spin' : ''}`} 
                  style={{ animationDuration: '3s' }} 
                />
                <span className="font-montserrat text-xs font-semibold text-[#3A3533] truncate">
                  {currentTrack.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#8C7335]">
                <span className="font-cormorant italic truncate">
                  {currentTrack.artist}
                </span>
                {isPlaying && (
                  <span className="text-[9px] bg-[#C5A246]/15 text-[#8C7335] px-1 py-0.2 rounded font-montserrat font-medium">
                    Sonando
                  </span>
                )}
              </div>
            </div>

            {/* Expand / Collapse Volume Controls */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg text-[#8C7335] hover:text-[#5E4C20] hover:bg-[#F4EBD0]/50 transition-colors cursor-pointer flex items-center gap-1 ${isExpanded ? 'bg-[#F4EBD0]/60' : ''}`}
              aria-label="Ajustar volumen"
              title="Ajustar volumen y opciones"
            >
              <Sliders className="w-4 h-4" />
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </button>

            {/* Spotify Direct Link */}
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#1DB954] hover:bg-[#1DB954]/10 transition-colors shrink-0"
              aria-label="Abrir en Spotify"
              title="Escuchar en Spotify"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.216.353-.672.467-1.026.25-2.812-1.718-6.35-2.108-10.52-1.155-.403.092-.807-.156-.899-.558-.093-.403.156-.807.558-.899 4.568-1.043 8.483-.604 11.637 1.336.353.216.467.672.25 1.026zm1.468-3.262c-.272.443-.852.585-1.295.312-3.218-1.978-8.125-2.55-11.932-1.394-.499.151-1.027-.134-1.178-.633-.151-.499.134-1.027.633-1.178 4.354-1.321 9.775-.683 13.46 1.583.443.272.585.852.312 1.31zm.126-3.41c-3.859-2.292-10.228-2.503-13.908-1.386-.59.18-1.218-.16-1.397-.751-.179-.59.16-1.218.751-1.397 4.234-1.286 11.268-1.036 15.698 1.595.532.315.706 1.002.39 1.534-.315.531-1.002.705-1.534.39v.015z" />
              </svg>
            </a>
          </div>

          {/* Status hint when collapsed */}
          {!isExpanded && (
            <div className="flex items-center justify-between text-[11px] font-montserrat text-[#8C7335] mt-1.5 pt-1 border-t border-[#C5A246]/20 px-0.5">
              <span className="font-cormorant italic text-[12px] truncate">
                {isPlaying ? '🎵 Sonando suavemente' : '✨ Pausado'}
              </span>
              <span className="text-[10px] tabular-nums font-medium text-[#64605E]">
                Volumen: {isMuted ? '0%' : `${volume}%`}
              </span>
            </div>
          )}

          {/* Expanded Panel: REAL Volume Slider & Track Switcher */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-[#C5A246]/30 space-y-3">
              {/* Volume Slider */}
              <div className="bg-[#FAF6EC] p-2 rounded-lg border border-[#C5A246]/25">
                <div className="flex items-center justify-between text-[11px] font-montserrat text-[#64605E] mb-1.5">
                  <span className="font-medium text-[#3A3533]">Regulador de Volumen:</span>
                  <span className="font-semibold text-[#8C7335] tabular-nums">
                    {isMuted ? 'Silenciado' : `${volume}%`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-[#8C7335] hover:text-[#5E4C20] p-1 cursor-pointer transition-colors"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : volume < 50 ? (
                      <Volume1 className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-[#E8DCB8] rounded-lg appearance-none cursor-pointer accent-[#C5A246]"
                    aria-label="Control deslizante de volumen"
                  />
                </div>
              </div>

              {/* Track Selector */}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleTrackChange('house_of_cards')}
                  className={`flex-1 py-1.5 px-2 rounded text-[10px] font-montserrat font-medium transition-colors cursor-pointer border ${
                    selectedTrack === 'house_of_cards'
                      ? 'bg-[#C5A246] text-white border-[#C5A246]'
                      : 'bg-[#FFFDF9] text-[#64605E] border-[#C5A246]/30 hover:border-[#C5A246]'
                  }`}
                >
                  House of Cards
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackChange('ambient')}
                  className={`flex-1 py-1.5 px-2 rounded text-[10px] font-montserrat font-medium transition-colors cursor-pointer border ${
                    selectedTrack === 'ambient'
                      ? 'bg-[#C5A246] text-white border-[#C5A246]'
                      : 'bg-[#FFFDF9] text-[#64605E] border-[#C5A246]/30 hover:border-[#C5A246]'
                  }`}
                >
                  Piano Romántico
                </button>
              </div>

              {/* Official Spotify Player Embed inside drawer */}
              <div className="pt-1">
                <p className="font-cormorant italic text-[11px] text-[#8C7335] mb-1.5 text-center">
                  O escucha directamente desde Spotify oficial:
                </p>
                <iframe 
                  title="Spotify Player"
                  style={{ borderRadius: '10px' }} 
                  src="https://open.spotify.com/embed/track/48X4D1FYOShPz2VF3YdfCF?utm_source=generator&theme=0" 
                  width="100%" 
                  height="80" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>

              {hasError && (
                <p className="text-[10px] text-red-500 font-montserrat text-center">
                  Presiona el botón de Spotify o vuelve a intentar tocar Play.
                </p>
              )}
            </div>
          )}

        </div>
      </aside>
    </>
  );
};
