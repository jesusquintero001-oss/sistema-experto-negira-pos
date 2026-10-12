import React from 'react';
import type { Devolucion } from '../types/database';
import { RotateCcw, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RecentReturnsTableProps {
  returns: Devolucion[];
  onViewAllReturns: () => void;
}

export const RecentReturnsTable: React.FC<RecentReturnsTableProps> = ({
  returns,
  onViewAllReturns,
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
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span>DEVOLUCIONES RECIENTES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Registros y reembolsos procesados en caja
          </p>
        </div>

        <button
          onClick={onViewAllReturns}
          className={`text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
            isDark
              ? 'text-cyan-400 hover:text-cyan-300'
              : 'text-cyan-700 hover:text-cyan-800'
          }`}
        >
          <span>Ver todas</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr
              className={`border-b text-[11px] ${
                isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
              }`}
            >
              <th className="pb-2 font-semibold">Producto</th>
              <th className="pb-2 font-semibold text-center">Batch</th>
              <th className="pb-2 font-semibold text-right">Detalles / Monto</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDark ? 'divide-[#182338]/80' : 'divide-slate-100'
            }`}
          >
            {returns.slice(0, 4).map((item) => (
              <tr
                key={item.id}
                className={`transition-colors group cursor-pointer ${
                  isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                }`}
                onClick={onViewAllReturns}
              >
                {/* Producto */}
                <td className="py-2.5 pr-2">
                  <div
                    className={`font-medium transition-colors truncate max-w-[150px] ${
                      isDark
                        ? 'text-slate-200 group-hover:text-cyan-300'
                        : 'text-slate-800 group-hover:text-cyan-700'
                    }`}
                  >
                    {item.producto_nombre}
                  </div>
                  <div
                    className={`text-[10px] flex items-center gap-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <span>{item.codigo_retorno}</span>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{item.motivo}</span>
                  </div>
                </td>

                {/* Batch */}
                <td className="py-2.5 px-2 text-center">
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                      isDark
                        ? 'bg-[#182338] text-slate-300 border-[#23334e]'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.numero_batch}
                  </span>
                </td>

                {/* Detalles / Monto */}
                <td className="py-2.5 pl-2 text-right">
                  <div
                    className={`font-bold font-mono ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    ${item.monto.toFixed(2)}
                  </div>
                  <div
                    className={`text-[10px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {item.fecha_hora}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div
        className={`pt-3 border-t mt-3 flex items-center justify-between text-[11px] ${
          isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-600'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
          <span>Total reintegrado hoy:</span>
        </span>
        <span
          className={`font-bold font-mono ${
            isDark ? 'text-rose-400' : 'text-rose-600'
          }`}
        >
          ${returns.reduce((acc, curr) => acc + curr.monto, 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default RecentReturnsTable;
