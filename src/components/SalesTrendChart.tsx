import { useState } from 'react';
import type { PuntoGraficaVenta } from '../types/database';
import { puntosTendenciaMensual, puntosTendenciaSemanal } from '../data/mockData';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SalesTrendChart: React.FC = () => {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState<'mensual' | 'semanal'>('mensual');
  const [isInteractive, setIsInteractive] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number>(4); // Default to peak point

  const data: PuntoGraficaVenta[] =
    viewMode === 'mensual' ? puntosTendenciaMensual : puntosTendenciaSemanal;

  // Chart Dimensions
  const width = 640;
  const height = 230;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const maxY = 130; // Max Y axis value

  // Compute coordinate points
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartWidth;
    const y = height - paddingY - (d.ventas / maxY) * chartHeight;
    return { x, y, data: d };
  });

  // Generate smooth SVG Bezier curve path
  const generateSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x},${
    height - paddingY
  } L ${points[0].x},${height - paddingY} Z`;

  const activePoint = points[hoverIndex] || points[4];

  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between ${
        isDark
          ? 'bg-[#101726] border border-[#1e2a3f] shadow-lg hover:border-cyan-500/40'
          : 'bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-cyan-400/50'
      }`}
    >
      {/* Header with Title and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2
            className={`text-sm font-bold tracking-wide uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            TENDENCIA DE VENTAS DIARIAS Y SEMANALES
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Comportamiento de transacciones e ingresos en tiempo real • NEGIRA S.A.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Interactive toggle pill */}
          <button
            onClick={() => setIsInteractive(!isInteractive)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isInteractive
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                : isDark
                ? 'bg-[#182338] text-slate-400 border border-[#23334e]'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <span>Interactivo</span>
          </button>

          {/* Timeframe dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-1.5 px-3 py-1 border rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#182338] hover:bg-[#202f4d] border-[#23334e] text-slate-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              <span>{viewMode === 'mensual' ? 'Mensual (Tendencias)' : 'Semanal (Últimos 7 días)'}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showDropdown && (
              <div
                className={`absolute right-0 mt-1 w-48 border rounded-xl shadow-2xl py-1 z-40 ${
                  isDark
                    ? 'bg-[#141d30] border-[#23334e]'
                    : 'bg-white border-slate-200 shadow-lg'
                }`}
              >
                <button
                  onClick={() => {
                    setViewMode('mensual');
                    setShowDropdown(false);
                    setHoverIndex(4);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    viewMode === 'mensual'
                      ? isDark
                        ? 'text-cyan-400 font-bold bg-[#1a263d]'
                        : 'text-cyan-800 font-bold bg-cyan-50'
                      : isDark
                      ? 'text-slate-300 hover:bg-[#1c2942]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Mensual (Ene - Oct)
                </button>
                <button
                  onClick={() => {
                    setViewMode('semanal');
                    setShowDropdown(false);
                    setHoverIndex(3);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    viewMode === 'semanal'
                      ? isDark
                        ? 'text-cyan-400 font-bold bg-[#1a263d]'
                        : 'text-cyan-800 font-bold bg-cyan-50'
                      : isDark
                      ? 'text-slate-300 hover:bg-[#1c2942]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Semanal (Lun - Dom)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
        >
          <defs>
            {/* Area gradient */}
            <linearGradient id="areaGlowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#06b6d4' : '#0284c7'}
                stopOpacity={isDark ? 0.45 : 0.22}
              />
              <stop
                offset="60%"
                stopColor={isDark ? '#0891b2' : '#0ea5e9'}
                stopOpacity={isDark ? 0.12 : 0.06}
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#0a0e17' : '#ffffff'}
                stopOpacity="0"
              />
            </linearGradient>

            <linearGradient id="curveNeonStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? '#22d3ee' : '#0284c7'} />
              <stop offset="50%" stopColor={isDark ? '#38bdf8' : '#0ea5e9'} />
              <stop offset="100%" stopColor={isDark ? '#22d3ee' : '#0284c7'} />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 20, 40, 60, 80, 100, 120].map((val) => {
            const y = height - paddingY - (val / maxY) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke={isDark ? '#1c283d' : '#e2e8f0'}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill={isDark ? '#64748b' : '#94a3b8'}
                  fontSize="9.5"
                  fontFamily="sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Filled Area */}
          <path d={areaPath} fill="url(#areaGlowGradient)" />

          {/* Smooth Bezier Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#curveNeonStroke)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Dashed vertical reference line for selected point */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={height - paddingY}
              stroke={isDark ? '#06b6d4' : '#0284c7'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
            />
          )}

          {/* Data Points and interactive hover circles */}
          {points.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => isInteractive && setHoverIndex(idx)}
              onClick={() => isInteractive && setHoverIndex(idx)}
            >
              {/* Hit area */}
              <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

              {/* Point dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIndex === idx ? '6' : '3.5'}
                fill={
                  hoverIndex === idx
                    ? isDark
                      ? '#38bdf8'
                      : '#0284c7'
                    : isDark
                    ? '#0e1726'
                    : '#ffffff'
                }
                stroke={isDark ? '#22d3ee' : '#0284c7'}
                strokeWidth={hoverIndex === idx ? '3' : '2'}
                className="transition-all duration-150"
              />
            </g>
          ))}

          {/* X Axis labels */}
          {points.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - paddingY + 16}
              textAnchor="middle"
              fill={
                hoverIndex === idx
                  ? isDark
                    ? '#38bdf8'
                    : '#0284c7'
                  : isDark
                  ? '#94a3b8'
                  : '#64748b'
              }
              fontSize="10"
              fontWeight={hoverIndex === idx ? 'bold' : 'normal'}
              className="transition-colors"
            >
              {pt.data.mes}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip Box */}
        {activePoint && (
          <div
            className="absolute pointer-events-none transition-all duration-150 z-20"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              transform: 'translate(-50%, -115%)',
            }}
          >
            <div
              className={`rounded-xl px-3 py-2 text-[11px] text-left min-w-[155px] ${
                isDark
                  ? 'bg-[#0b1220]/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl text-slate-200 shadow-cyan-950/60'
                  : 'bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800'
              }`}
            >
              <p
                className={`font-semibold pb-1 mb-1.5 flex items-center justify-between border-b ${
                  isDark ? 'border-slate-700/60 text-slate-200' : 'border-slate-100 text-slate-800'
                }`}
              >
                <span>{activePoint.data.fecha_label}</span>
                <span className={`text-[10px] font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  NEGIRA POS
                </span>
              </p>
              <div className="space-y-1">
                <div
                  className={`flex items-center justify-between gap-3 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    Tendencia:
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ${activePoint.data.tendencia.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between gap-3 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Transacciones:
                  </span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {activePoint.data.transacciones} ops
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTrendChart;
