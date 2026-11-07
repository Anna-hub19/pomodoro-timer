
import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Target,
  Coffee,
  Moon,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export function TimerCard({ character, timer }) {
  const {
    formatTime,
    isActive,
    toggleTimer,
    resetTimer,
    changeMode,
    mode,
  } = timer;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const cardRef = useRef(null);

  const getModeTime = (m) => character.times[m];

  // Alternar entre tela normal e tela cheia
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (cardRef.current?.requestFullscreen) {
          await cardRef.current.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Não foi possível alternar a tela cheia:', error);
    }
  };

  // Atualizar o estado quando o usuário sair da tela cheia
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === cardRef.current
      );
    };

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  const modeButtonClass = (selected) =>
    `flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2
    min-w-0 px-2 sm:px-4 md:px-5 py-3 rounded-xl text-xs sm:text-sm
    font-semibold transition-all duration-200 ${
      selected
        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <div
      ref={cardRef}
      className={`relative isolate w-full min-w-0 overflow-hidden
        border border-purple-900/30 p-4 sm:p-6 md:p-8
        backdrop-blur-xl transition-all duration-500 group
        ${
          isFullscreen
            ? 'h-[100dvh] w-full overflow-y-auto rounded-none'
            : 'rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(112,26,220,0.15)]'
        }`}
      style={{
        background: 
         `linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0) 60%),
          url("${character.image}") center center / cover no-repeat
        `,
      }}
    >
      {/* Botão de tela cheia */}
      <button
        type="button"
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 sm:top-5 sm:right-5
          z-50 flex items-center justify-center
          w-10 h-10 sm:w-11 sm:h-11 rounded-full
          bg-slate-950/80 border border-slate-700
          text-slate-300 hover:text-white hover:border-purple-500
          transition-all focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-purple-500"
        title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
        aria-label={
          isFullscreen ? 'Sair da tela cheia' : 'Ativar tela cheia'
        }
      >
        {isFullscreen ? (
          <Minimize2 size={20} />
        ) : (
          <Maximize2 size={20} />
        )}
      </button>

      {/* Conteúdo principal */}
      <div
        className={`relative z-10 flex w-full min-w-0 flex-col
          items-center md:items-start
          gap-6 sm:gap-8
          ${
            isFullscreen
              ? 'min-h-full justify-center py-12 sm:py-8'
              : ''
          }`}
      >
        <div className="flex w-full min-w-0 flex-col items-center md:items-start">
          {/* Seletor de modos */}
          <div
            className="flex w-full max-w-full flex-wrap
              items-stretch justify-center
              bg-[#090a10]/95 p-1.5 sm:p-2
              rounded-2xl border border-slate-800/80
              mb-6 sm:mb-8 gap-1 shadow-inner
              sm:w-auto sm:flex-nowrap"
          >
            <button
              type="button"
              onClick={() =>
                changeMode('focus', getModeTime('focus'))
              }
              aria-pressed={mode === 'focus'}
              className={modeButtonClass(mode === 'focus')}
            >
              <Target size={18} className="shrink-0 sm:w-5 sm:h-5" />
              <span>Foco</span>
            </button>

            <button
              type="button"
              onClick={() =>
                changeMode('shortBreak', getModeTime('shortBreak'))
              }
              aria-pressed={mode === 'shortBreak'}
              className={modeButtonClass(mode === 'shortBreak')}
            >
              <Coffee size={18} className="shrink-0 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">Pausa curta</span>
            </button>

            <button
              type="button"
              onClick={() =>
                changeMode('longBreak', getModeTime('longBreak'))
              }
              aria-pressed={mode === 'longBreak'}
              className={modeButtonClass(mode === 'longBreak')}
            >
              <Moon size={18} className="shrink-0 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">Pausa longa</span>
            </button>
          </div>

          {/* Relógio digital */}
          <div className="w-full min-w-0 text-center md:text-left mb-6 sm:mb-8">
            <span
              className={`block max-w-full font-black text-white
                font-mono tabular-nums tracking-wider sm:tracking-widest
                break-words drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]
                transition-all duration-300
                ${
                  isFullscreen
                    ? 'text-6xl min-[400px]:text-7xl sm:text-8xl lg:text-[10rem] xl:text-[12rem]'
                    : 'text-5xl min-[400px]:text-6xl sm:text-7xl md:text-8xl'
                }`}
            >
              {formatTime()}
            </span>

            <p
              className="text-slate-300 text-sm sm:text-base md:text-lg
                font-medium tracking-wide uppercase mt-3
                md:pl-2"
            >
              {mode === 'focus'
                ? 'Tempo de foco'
                : 'Pausa para descanso'}
            </p>
          </div>

          {/* Botões de ação */}
          <div
            className="flex w-full flex-wrap items-center
              justify-center md:justify-start
              gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <button
              type="button"
              onClick={toggleTimer}
              className="flex flex-1 sm:flex-none
                min-w-0 items-center justify-center gap-2
                px-4 sm:px-8 md:px-10 py-3 sm:py-4
                bg-gradient-to-r from-purple-600 to-indigo-600
                hover:from-purple-500 hover:to-indigo-500
                text-white text-sm sm:text-base font-bold
                rounded-xl sm:rounded-2xl transition-all
                shadow-[0_0_20px_rgba(147,51,234,0.4)]
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              {isActive ? (
                <Pause size={20} fill="white" className="shrink-0" />
              ) : (
                <Play size={20} fill="white" className="shrink-0" />
              )}

              <span>{isActive ? 'Pausar' : 'Iniciar'}</span>
            </button>

            <button
              type="button"
              onClick={() => resetTimer(getModeTime(mode))}
              className="flex flex-1 sm:flex-none
                min-w-0 items-center justify-center gap-2
                px-3 sm:px-5 md:px-6 py-3 sm:py-4
                bg-slate-900/90 hover:bg-slate-800
                border border-slate-700 text-slate-200
                text-sm sm:text-base font-semibold
                rounded-xl sm:rounded-2xl transition-all
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <RotateCcw size={19} className="shrink-0" />
              <span>Reiniciar</span>
            </button>
          </div>

          {/* Citação motivacional */}
          <div className="w-full min-w-0 max-w-lg text-center md:text-left md:pl-2">
            <p
              className="text-purple-200 font-bold
                text-base sm:text-lg md:text-xl italic
                leading-relaxed break-words
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              {character.quote}
            </p>

            <span
              className="text-purple-300 font-medium text-sm
                mt-2 block break-words drop-shadow-md"
            >
              – {character.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
