import React from 'react';
import type { MetricaDashboard } from '../types/database';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface KpiCardsProps {
  metrics: MetricaDashboard;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  const { isDark } = useTheme();

  const cardBaseClass = `rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
    isDark
      ? 'bg-[#101726] border border-[#1e2a3f] shadow-lg hover:border-cyan-500/40'
      : 'bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-cyan-400/50'
  }`;

  const labelClass = `text-[11px] font-bold tracking-wider uppercase ${
    isDark ? 'text-slate-400' : 'text-slate-500'
  }`;

  const valueClass = `text-2xl sm:text-3xl font-extrabold tracking-tight ${
    isDark ? 'text-white' : 'text-slate-900'
  }`;

  const subTextClass = `text-xs mt-0.5 ${
    isDark ? 'text-slate-400' : 'text-slate-500'
  }`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {/* 1. TOTAL DE PRODUCTOS VENDIDOS */}
      <div className={cardBaseClass}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>TOTAL DE PRODUCTOS VENDIDOS</span>
        </div>

        <div className="my-2 flex items-baseline justify-between">
          <div>
            <div className={valueClass}>
              {metrics.total_productos_vendidos.toLocaleString()}
            </div>
            <p className={subTextClass}>Total vendidos</p>
          </div>

          {/* SVG Sparkline curve matching the mockup */}
          <div className="w-20 h-10">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="sparkGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isDark ? '#06b6d4' : '#0284c7'} />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <path
                d="M 0,30 Q 15,35 30,22 T 60,18 T 80,12 T 100,5"
                fill="none"
                stroke="url(#sparkGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="5" r="3" fill="#10b981" className="animate-ping" />
              <circle cx="100" cy="5" r="3" fill="#10b981" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. TOTAL DE FACTURAS */}
      <div className={cardBaseClass}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>TOTAL DE FACTURAS</span>
        </div>

        <div className="my-2 flex items-center justify-between">
          <div>
            <div className={valueClass}>{metrics.total_facturas}</div>
            <p className={subTextClass}>Facturas</p>
          </div>

          {/* Status Breakdown with colored dots */}
          <div
            className={`flex flex-col gap-1 text-[11px] font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Totalia</span>
              <span className={`font-semibold ml-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {metrics.facturas_anuladas}
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Pagado</span>
              <span className={`font-semibold ml-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {metrics.facturas_pagadas}
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Status</span>
              <span className={`font-semibold ml-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GANANCIAS */}
      <div className={cardBaseClass}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>GANANCIAS DEL MES</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-0.5 ${
              isDark
                ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40'
                : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
            }`}
          >
            <ArrowUpRight className="w-3 h-3" />
            +14.8%
          </span>
        </div>

        <div className="my-2">
          <div className={valueClass}>
            ${metrics.ganancias_mensuales_brutas.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <p className={subTextClass}>
              Neto: <span className="font-semibold text-emerald-600 dark:text-emerald-400">${metrics.ganancias_mensuales_netas.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </p>
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          </div>
        </div>
      </div>

      {/* 4. DESCUENTOS AUTOMÁTICOS */}
      <div className={cardBaseClass}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>DESCUENTOS AUTOMÁTICOS</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
              isDark
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            +{metrics.combos_aplicados_count}
          </span>
        </div>

        <div className="my-2">
          <div className={valueClass}>
            ${metrics.descuentos_automaticos_mes.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className={subTextClass}>Total del mes.</p>
        </div>
      </div>

      {/* 5. TOTAL DE TRANSACCIONES */}
      <div className={cardBaseClass}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>TOTAL DE TRANSACCIONES</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
              isDark
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            +9
          </span>
        </div>

        <div className="my-2 flex items-baseline justify-between">
          <div>
            <div className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {metrics.total_transacciones} operaciones
            </div>
            <div
              className={`text-2xl font-extrabold tracking-tight ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              ${metrics.volumen_transacciones.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
