import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { CuteRibbonBow, BearMascot } from './AestheticDecorations';
import { playTimerFinishSound, playSoftPop } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';
import { useJournal } from '../context/JournalContext';

export default function PomodoroWidget() {
  const { pushNotification } = useJournal();
  const [mode, setMode] = useState('pomodoro'); // pomodoro (25), short (5), long (15)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playTimerFinishSound();
      firePastelConfetti();
      pushNotification({
        id: 'pomodoro_done_' + Date.now(),
        title: 'Focus Session Completed! 🌸',
        message: 'Wonderful work! You completed your focus session. Time to stretch and take a cozy break.',
        type: 'timer',
        actionSection: 'dashboard',
        actionLabel: 'Great job! ♡',
      });
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, pushNotification]);

  const switchMode = (newMode) => {
    playSoftPop();
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'pomodoro') setTimeLeft(25 * 60);
    else if (newMode === 'short') setTimeLeft(5 * 60);
    else if (newMode === 'long') setTimeLeft(15 * 60);
  };

  const toggleTimer = () => {
    playSoftPop();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    playSoftPop();
    setIsRunning(false);
    if (mode === 'pomodoro') setTimeLeft(25 * 60);
    else if (mode === 'short') setTimeLeft(5 * 60);
    else if (mode === 'long') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-xs rounded-3xl p-4 md:p-5 border border-[#ECE0F2] shadow-soft-card flex flex-col justify-between overflow-hidden">
      {/* Decorative Bow */}
      <div className="absolute top-2 right-4 pointer-events-none">
        <CuteRibbonBow className="w-8 h-8" color="#F472B6" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#86569B] tracking-wider uppercase">
        <span className="text-pink-400">♡</span>
        <span>Pomodoro Timer</span>
        <span className="text-pink-400">♡</span>
      </div>

      {/* Timer Display */}
      <div className="my-2 flex flex-col items-center justify-center">
        <div className="font-title text-4xl md:text-5xl font-extrabold text-[#473450] tracking-wider select-none">
          {formatTime(timeLeft)}
        </div>

        {/* Start / Pause & Reset buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={toggleTimer}
            className={`
              px-6 py-1.5 rounded-full text-xs font-bold text-white transition-all transform active:scale-95 shadow-sm
              ${isRunning 
                ? 'bg-[#E175A5] hover:bg-[#D45F92]' 
                : 'bg-[#B185DB] hover:bg-[#A070CC] shadow-purple-200'}
            `}
          >
            {isRunning ? (
              <span className="flex items-center gap-1">
                <Pause className="w-3.5 h-3.5" /> Pause
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Play className="w-3.5 h-3.5 fill-white" /> Start
              </span>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-1.5 rounded-full text-[#9986A5] hover:text-[#5F466E] hover:bg-[#F3EAF8] transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom controls & Mascot */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F2E8F8]">
        <select
          value={mode}
          onChange={(e) => switchMode(e.target.value)}
          className="text-[11px] font-semibold text-[#6E557A] bg-[#F7F2FA] border border-[#E5D7EE] rounded-full px-2.5 py-1 focus:outline-hidden"
        >
          <option value="pomodoro">Pomodoro (25m)</option>
          <option value="short">Short Break (5m)</option>
          <option value="long">Long Break (15m)</option>
        </select>

        {/* Little Mascot */}
        <div className="w-12 h-12 -mb-2">
          <BearMascot className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
}
