import { useState, useEffect } from 'react';

// URL do som (pode ser o arquivo em public/notification.mp3 ou uma URL remota)
import ALARM_SOUND_URL from '../assets/notification.mp3';

export function useTimer(initialMinutes = 25) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus');

  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      // 1. Desativa o temporizador
      setIsActive(false);

      // 2. Toca o som de notificação
      const audio = new Audio(ALARM_SOUND_URL);
      audio.play().catch((err) => {
        console.warn('O navegador bloqueou a reprodução do áudio:', err);
      });
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (minutes) => {
    setIsActive(false);
    setSecondsLeft((minutes || initialMinutes) * 60);
  };

  const changeMode = (newMode, minutes) => {
    setMode(newMode);
    setIsActive(false);
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
    setSecondsLeft, // Opcional: útil para testes rápidos
  };
}