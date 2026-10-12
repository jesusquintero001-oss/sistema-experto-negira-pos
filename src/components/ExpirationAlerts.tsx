import React from 'react';
import type { LoteVencimiento } from '../types/database';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ExpirationAlertsProps {
  batches: LoteVencimiento[];
  onViewAll?: () => void;
}

export const ExpirationAlerts: React.FC<ExpirationAlertsProps> = ({
  batches,
  onViewAll,
}) => {
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
      <div className="flex items-center justify-between mb-2">
        <h2
          className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          <span>ALERTAS DE VENCIMIENTO INMINENTES</span>
        </h2>
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
      </div>

      {/* Red Alert Banner matching mockup */}
      <div
        className={`my-1.5 p-2 rounded-xl border flex items-center justify-between ${
          isDark
            ? 'bg-gradient-to-r from-rose-950/80 to-[#221017] border-rose-500/50 shadow-inner'
            : 'bg-rose-50 border-rose-200 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`p-1 rounded-md ${
              isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span
            className={`text-xs font-bold tracking-wide uppercase ${
              isDark ? 'text-rose-300' : 'text-rose-800'
            }`}
          >
            ALERT Alerta
          </span>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
            isDark
              ? 'text-rose-400 bg-rose-500/20 border-rose-500/30'
              : 'text-rose-700 bg-rose-100 border-rose-200'
          }`}
        >
          Inminente
        </span>
      </div>

      {/* Table matching mockup: Producto | Batch | Fecha */}
      <div className="overflow-x-auto my-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr
              className={`border-b text-[11px] ${
                isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
              }`}
            >
              <th className="pb-1.5 font-semibold">Producto</th>
              <th className="pb-1.5 font-semibold text-center">Batch</th>
              <th className="pb-1.5 font-semibold text-right">Fecha</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDark ? 'divide-[#182338]/80' : 'divide-slate-100'
            }`}
          >
            {batches.slice(0, 3).map((item) => (
              <tr
                key={item.id}
                onClick={onViewAll}
                className={`transition-colors cursor-pointer group ${
                  isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                }`}
              >
                {/* Producto */}
                <td className="py-2 pr-1">
                  <div
                    className={`font-medium transition-colors truncate max-w-[120px] sm:max-w-[140px] ${
                      isDark
                        ? 'text-slate-200 group-hover:text-rose-300'
                        : 'text-slate-800 group-hover:text-rose-600'
                    }`}
                  >
                    {item.producto_nombre}
                  </div>
                  <span
                    className={`text-[9px] font-semibold ${
                      isDark ? 'text-rose-400/80' : 'text-rose-600'
                    }`}
                  >
                    {item.dias_restantes} días restantes
                  </span>
                </td>

                {/* Batch */}
                <td className="py-2 px-1 text-center">
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                      isDark
                        ? 'bg-[#182338] text-slate-300 border-[#23334e]'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.numero_batch}
                  </span>
                </td>

                {/* Fecha */}
                <td className="py-2 pl-1 text-right">
                  <span
                    className={`font-mono text-[11px] font-semibold ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {item.fecha_vencimiento}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div
        className={`pt-2 border-t mt-1 flex items-center justify-between text-[10px] ${
          isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
        }`}
      >
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-500" />
          <span>Control Sanitario POS</span>
        </span>
        <button
          onClick={onViewAll}
          className={`font-semibold cursor-pointer ${
            isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-800'
          }`}
        >
          Gestionar Lotes
        </button>
      </div>
    </div>
  );
};

export default ExpirationAlerts;
