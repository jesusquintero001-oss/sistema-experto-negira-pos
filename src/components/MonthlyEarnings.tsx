import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface MonthlyEarningsProps {
  grossEarnings?: number;
  netEarnings?: number;
}

export const MonthlyEarnings: React.FC<MonthlyEarningsProps> = ({
  grossEarnings = 110399.0,
  netEarnings = 4328.0,
}) => {
  const { isDark } = useTheme();

  // SVG Donut calculation
  const size = 100;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Percentage distribution (e.g. 72% Gross, 28% Net)
  const percentGross = 0.72;
  const strokeDashGross = circumference * percentGross;
  const strokeDashNet = circumference * (1 - percentGross);

  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between ${
        isDark
          ? 'bg-[#101726] border border-[#1e2a3f] shadow-lg hover:border-cyan-500/40'
          : 'bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-cyan-400/50'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2
          className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          <span>GANANCIAS MENSUALES</span>
        </h2>
        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
      </div>

      {/* Content: Stats + Donut Chart */}
      <div className="flex items-center justify-between gap-2 py-2">
        {/* Stats Left */}
        <div className="space-y-3">
          <div>
            <div
              className={`flex items-center gap-1.5 text-xs ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0"></span>
              <span className="font-medium">Ganancias Brutas</span>
            </div>
            <div
              className={`text-lg font-extrabold tracking-tight ml-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              $ {grossEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className={`text-[10px] ml-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Total facturado acumulado
            </p>
          </div>

          <div>
            <div
              className={`flex items-center gap-1.5 text-xs ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="font-medium">Ganancias Netas</span>
            </div>
            <div
              className={`text-lg font-extrabold tracking-tight ml-4 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              $ {netEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className={`text-[10px] ml-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Margen neto consolidado
            </p>
          </div>
        </div>

        {/* SVG Donut Chart Right matching mockup */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={isDark ? '#1b253b' : '#f1f5f9'}
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Cyan Segment (Gross) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={isDark ? '#06b6d4' : '#0284c7'}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${strokeDashGross} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />

            {/* Neon Green Segment (Net) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={isDark ? '#4ade80' : '#10b981'}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${strokeDashNet} ${circumference}`}
              strokeDashoffset={-strokeDashGross - 4}
              strokeLinecap="round"
            />
          </svg>

          {/* Center inner label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ROI
            </span>
            <span
              className={`text-xs font-black ${
                isDark ? 'text-cyan-400' : 'text-cyan-700'
              }`}
            >
              +28%
            </span>
          </div>
        </div>
      </div>

      <div
        className={`pt-3 border-t mt-1 flex items-center justify-between text-[10px] ${
          isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
        }`}
      >
        <span>Rentabilidad acumulada:</span>
        <span
          className={`font-semibold font-mono ${
            isDark ? 'text-emerald-400' : 'text-emerald-700'
          }`}
        >
          +18.5% YoY
        </span>
      </div>
    </div>
  );
};

export default MonthlyEarnings;
