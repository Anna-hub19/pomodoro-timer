import React, { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Target, Coffee, Moon, Maximize2, Minimize2 } from 'lucide-react';

export function TimerCard({ character, timer }) {
    const { formatTime, isActive, toggleTimer, resetTimer, changeMode, mode } = timer;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const cardRef = useRef(null); // Referência para o elemento que ficará em tela cheia

    const getModeTime = (m) => character.times[m];

    // Função para alternar o modo Tela Cheia
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (cardRef.current.requestFullscreen) {
                cardRef.current.requestFullscreen();
            } else if (cardRef.current.mozRequestFullScreen) { /* Firefox */
                cardRef.current.mozRequestFullScreen();
            } else if (cardRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                cardRef.current.webkitRequestFullscreen();
            } else if (cardRef.current.msRequestFullscreen) { /* IE/Edge */
                cardRef.current.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    // Monitora se o usuário sai do fullscreen usando ESC ou controles do navegador
    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <div
            ref={cardRef} // Atribui a referência
            className={`relative overflow-hidden rounded-3xl border border-purple-900/30 p-6 md:p-8 backdrop-blur-xl transition-all duration-500 group
        ${isFullscreen ? 'w-screen h-screen rounded-none' : 'shadow-[0_0_50px_rgba(112,26,220,0.15)]'}
      `}
            style={{
                background: `linear-gradient(to right, rgba(9, 10, 16, 0.7) 0%, rgba(9, 10, 16, 0.3) 50%, rgba(9, 10, 16, 0.0) 100%), 
               url(${character.image}) no-repeat center right / cover`
            }}
        >
            {/* NOVO: Botão de Tela Cheia (substituindo o de Configuração) */}
            <button
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 p-2.5 z-50 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
                title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            {/* Conteúdo do Timer (posicionado à esquerda para não cobrir a imagem do personagem) */}
            <div className={`flex flex-col md:flex-row items-center gap-8 ${isFullscreen ? 'h-full gap-15' : ''}`}>

                {/* A DIV que continha a imagem foi removida, a imagem agora está no background */}

                {/* Lógica do Timer (agora empurrada para a esquerda pelo background-position) */}
                <div className="w-full md:w-3/5 flex flex-col items-center md:items-start relative z-10">

                    {/* Seletor de Modos */}
                    <div className="flex bg-[#090a10] p-1.5 rounded-2xl border border-slate-800/80 mb-8 gap-1 shadow-inner">
                        <button
                            onClick={() => changeMode('focus', getModeTime('focus'))}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'focus'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <Target size={25} /> Foco
                        </button>
                        <button
                            onClick={() => changeMode('shortBreak', getModeTime('shortBreak'))}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'shortBreak'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <Coffee size={25} /> Pausa curta
                        </button>
                        <button
                            onClick={() => changeMode('longBreak', getModeTime('longBreak'))}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === 'longBreak'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <Moon size={25} /> Pausa longa
                        </button>
                    </div>

                    {/* Display Digital (alinhado à esquerda) */}
                    <div className="text-center md:text-left mb-8">
                        <span className={`${isFullscreen ? 'text-[12rem]' : 'text-7xl md:text-8xl'} font-black text-white tracking-widest font-mono drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all duration-300`}>
                            {formatTime()}
                        </span>
                        <p className="text-slate-400 text-lg font-medium tracking-wide uppercase mt-3 md:pl-2">
                            {mode === 'focus' ? 'Tempo de foco' : 'Pausa para descanso'}
                        </p>
                    </div>

                    {/* Botões de Ação (alinhados à esquerda) */}
                    <div className="flex items-center gap-3 mb-8">
                        <button
                            onClick={toggleTimer}
                            className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] active:scale-95"
                        >
                            {isActive ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                            {isActive ? 'Pausar' : 'Iniciar'}
                        </button>
                        <button
                            onClick={() => resetTimer(getModeTime(mode))}
                            className="flex items-center gap-2 px-6 py-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-2xl transition-all active:scale-95"
                        >
                            <RotateCcw size={20} /> Reiniciar
                        </button>
                    </div>

                    {/* Citação Motivacional (alinhada à esquerda) */}
                    <div className="text-center md:text-left max-w-lg md:pl-2">
                        <p className="text-purple-200 font-bold text-lg md:text-xl italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            {character.quote}
                        </p>
                        <span className="text-purple-300 font-medium text-sm mt-1.5 block drop-shadow-md">
                            – {character.author}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}