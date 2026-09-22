import { useState, useEffect, useRef } from "react";
import { Play, Square, Plus, RotateCcw } from "lucide-react";

const TIME_OPTIONS = [
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function playAlarm() {
  try {
    const AudioCtx =
      window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Tres beeps cortos
    [0, 0.35, 0.7].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.2, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.3);
    });
  } catch {
    // Si el navegador bloquea el audio, se ignora silenciosamente
  }
}

export default function Entrenar() {
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[1].seconds);
  const [remainingTime, setRemainingTime] = useState(TIME_OPTIONS[1].seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [series, setSeries] = useState(0);
  const [lastResult, setLastResult] = useState<{
    series: number;
    duration: number;
  } | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          playAlarm();
          setLastResult({ series, duration: selectedTime });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleSelectTime = (seconds: number) => {
    if (isRunning) return;
    setSelectedTime(seconds);
    setRemainingTime(seconds);
    setLastResult(null);
  };

  const handleStart = () => {
    setRemainingTime(selectedTime);
    setSeries(0);
    setLastResult(null);
    setIsRunning(true);
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setLastResult({ series, duration: selectedTime - remainingTime });
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setRemainingTime(selectedTime);
    setSeries(0);
    setLastResult(null);
  };

  const handleAddSeries = () => {
    if (!isRunning) return;
    setSeries((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-md mx-auto px-4 py-10 text-white">
      {/* Temporizador */}
      <div className="text-6xl font-bold tabular-nums">
        {formatTime(remainingTime)}
      </div>

      {/* Botón Iniciar / Detener */}
      {!isRunning ? (
        <button
          onClick={handleStart}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg"
        >
          <Play size={24} />
          Iniciar
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg"
        >
          <Square size={24} />
          Detener
        </button>
      )}

      {/* Opciones de tiempo */}
      <div className="flex gap-3 flex-wrap justify-center">
        {TIME_OPTIONS.map(({ label, seconds }) => (
          <button
            key={seconds}
            onClick={() => handleSelectTime(seconds)}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors
              ${
                selectedTime === seconds
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contador de series */}
      <button
        onClick={handleAddSeries}
        disabled={!isRunning}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold border-2 transition-colors
          ${
            isRunning
              ? "border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white"
              : "border-gray-700 text-gray-500 cursor-not-allowed"
          }`}
      >
        <Plus size={22} />
        Serie ({series})
      </button>

      {/* Resultado al finalizar */}
      {lastResult && (
        <div className="flex flex-col items-center gap-3 bg-gray-800 rounded-xl px-6 py-4 text-center">
          <p className="text-lg">
            Completaste{" "}
            <span className="font-bold text-emerald-400">
              {lastResult.series} series
            </span>{" "}
            en {formatTime(lastResult.duration)}
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <RotateCcw size={16} />
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}
