import { useState, useEffect, useRef } from 'react';
import alarmSound from '../assets/notification.mp3'; // Ajuste para o nome do seu arquivo de som

export function useTimer(initialMinutes = 25) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus');
  
  // Referência para armazenar o bloqueio de tela (Wake Lock)
  const wakeLockRef = useRef(null);

  // --- Função para IMPEDIR que a tela desligue ---
  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      } catch (err) {
        console.warn('Não foi possível ativar o bloqueio de suspensão de tela:', err);
      }
    }
  };

  // --- Função para LIBERAR a tela (permitir que desligue normalmente) ---
  const releaseWakeLock = async () => {
    if (wakeLockRef.current !== null) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      } catch (err) {
        console.warn('Erro ao liberar bloqueio de tela:', err);
      }
    }
  };

  // Lógica principal do Timer e Controle de Tela
  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      // 1. Ativa o bloqueio para a tela não apagar enquanto o timer roda
      requestWakeLock();

      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      // 2. Quando o tempo esgota:
      setIsActive(false);
      releaseWakeLock(); // Libera a tela

      // Toca o som de notificação
      const audio = new Audio(alarmSound);
      audio.play().catch((err) => {
        console.warn('O navegador bloqueou a reprodução do áudio:', err);
      });
    } else {
      // Se estiver pausado ou parado, libera a tela
      releaseWakeLock();
    }

    return () => {
      clearInterval(interval);
      releaseWakeLock(); // Libera o bloqueio se o componente for desmontado
    };
  }, [isActive, secondsLeft]);

  // Se o usuário alternar de aba e voltar, o navegador pode perder o Wake Lock. 
  // Esta função garante que o bloqueio continue ativo se o timer ainda estiver rodando:
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (minutes) => {
    setIsActive(false);
    releaseWakeLock();
    setSecondsLeft((minutes || initialMinutes) * 60);
  };

  const changeMode = (newMode, minutes) => {
    setMode(newMode);
    setIsActive(false);
    releaseWakeLock();
    setSecondsLeft(minutes * 60);
  };

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    formatTime,
    isActive,
    toggleTimer,
    resetTimer,
    changeMode,
    mode,
    setSecondsLeft,
  };
}