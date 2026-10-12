import React from 'react';
import type { ComboDescuento } from '../types/database';
import { useTheme } from '../context/ThemeContext';

interface AutomaticCombosProps {
  combos: ComboDescuento[];
}

export const AutomaticCombos: React.FC<AutomaticCombosProps> = ({ combos }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between ${
        isDark
          ? 'bg-[#101726] border border-[#1e2a3f] shadow-lg hover:border-cyan-500/40'
          : 'bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-cyan-400/50'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          <span>COMBOS CON DESCUENTOS AUTOMÁTICOS</span>
        </h2>
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      </div>

      {/* Combos List */}
      <div className="space-y-2.5">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className={`flex items-center justify-between py-1.5 border-b last:border-b-0 px-1 rounded-lg transition-colors ${
              isDark
                ? 'border-[#182338]/80 hover:bg-[#152033]/40'
                : 'border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div>
              <p
                className={`text-xs font-semibold truncate max-w-[170px] sm:max-w-[200px] ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {combo.nombre}
              </p>
              <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Descuentos: -${combo.descuento_aplicado.toFixed(2)}
              </p>
            </div>

            {/* Savings pill matching mockup */}
            <div
              className={`px-2.5 py-1 rounded-lg font-bold text-xs tracking-tight shadow-2xs ${
                isDark
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-emerald-950/40'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              }`}
            >
              {combo.ahorro_texto}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`pt-3 border-t mt-3 flex items-center justify-between text-[10px] ${
          isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
        }`}
      >
        <span>Ahorro generado este mes:</span>
        <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          $1,340.00
        </span>
      </div>
    </div>
  );
};

export default AutomaticCombos;
