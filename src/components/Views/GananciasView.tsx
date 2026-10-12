import React from 'react';
import type { MetricaDashboard } from '../../types/database';
import { TrendingUp, DollarSign, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface GananciasViewProps {
  metrics: MetricaDashboard;
}

export const GananciasView: React.FC<GananciasViewProps> = ({ metrics }) => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      <div
        className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
          isDark
            ? 'bg-[#101726] border-[#1e2a3f] shadow-xl text-white'
            : 'bg-white border-slate-200 shadow-xs text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
            <span>Rendimiento Financiero y Ganancias — NEGIRA S.A.</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Métricas de rentabilidad bruta, margen neto y volumen de facturación
          </p>
        </div>
      </div>

      {/* Top 3 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          className={`rounded-2xl p-5 border transition-all ${
            isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div
            className={`flex items-center justify-between text-xs font-semibold uppercase ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <span>Ganancias Brutas Mes</span>
            <DollarSign className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          </div>
          <div
            className={`text-3xl font-extrabold mt-3 font-mono ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            ${metrics.ganancias_mensuales_brutas.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
            <ArrowUpRight className="w-4 h-4" />
            <span>+14.8% vs mes anterior</span>
          </div>
        </div>

        <div
          className={`rounded-2xl p-5 border transition-all ${
            isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div
            className={`flex items-center justify-between text-xs font-semibold uppercase ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <span>Ganancias Netas Consolidadas</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-3 font-mono">
            ${metrics.ganancias_mensuales_netas.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
            <ArrowUpRight className="w-4 h-4" />
            <span>Margen neto: 28.4%</span>
          </div>
        </div>

        <div
          className={`rounded-2xl p-5 border transition-all ${
            isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div
            className={`flex items-center justify-between text-xs font-semibold uppercase ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <span>Ahorro en Descuentos</span>
            <PieChart className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-3 font-mono">
            ${metrics.descuentos_automaticos_mes.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Fidelización directa en punto de venta
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h3
          className={`text-sm font-bold mb-4 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          <BarChart3 className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <span>Estructura de Ingresos y Costos Operativos</span>
        </h3>

        <div className="space-y-4">
          <div>
            <div
              className={`flex justify-between text-xs mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <span>Costo de Mercancía Vendida (COGS)</span>
              <span className="font-mono font-semibold">$78,240.00 (70.8%)</span>
            </div>
            <div
              className={`w-full h-3 rounded-full overflow-hidden ${
                isDark ? 'bg-[#1b263b]' : 'bg-slate-100'
              }`}
            >
              <div className="bg-cyan-600 h-full rounded-full" style={{ width: '70.8%' }}></div>
            </div>
          </div>

          <div>
            <div
              className={`flex justify-between text-xs mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <span>Margen Bruto de Operación</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                $32,159.00 (29.2%)
              </span>
            </div>
            <div
              className={`w-full h-3 rounded-full overflow-hidden ${
                isDark ? 'bg-[#1b263b]' : 'bg-slate-100'
              }`}
            >
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '29.2%' }}></div>
            </div>
          </div>

          <div>
            <div
              className={`flex justify-between text-xs mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <span>Descuentos y Combos Otorgados</span>
              <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                $1,328.00 (1.2%)
              </span>
            </div>
            <div
              className={`w-full h-3 rounded-full overflow-hidden ${
                isDark ? 'bg-[#1b263b]' : 'bg-slate-100'
              }`}
            >
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '8%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GananciasView;
