import React, { useState } from 'react';
import type { Devolucion } from '../../types/database';
import { RotateCcw, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DevolucionesViewProps {
  devoluciones: Devolucion[];
  onAddDevolucion?: (dev: Devolucion) => void;
}

export const DevolucionesView: React.FC<DevolucionesViewProps> = ({ devoluciones }) => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<'TODAS' | 'APROBADA' | 'EN_REVISION'>('TODAS');

  const filtered = devoluciones.filter(
    (d) => filter === 'TODAS' || d.estado === filter
  );

  return (
    <div className="space-y-6">
      <div
        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-[#101726] border-[#1e2a3f] shadow-xl text-white'
            : 'bg-white border-slate-200 shadow-xs text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-rose-500" />
            <span>Gestión de Devoluciones y Reclamaciones — NEGIRA S.A.</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Registro de retornos, trazabilidad por batch / lote y reintegro monetario
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['TODAS', 'APROBADA', 'EN_REVISION'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                filter === f
                  ? isDark
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                  : isDark
                  ? 'bg-[#142038] text-slate-400 border-[#233554] hover:text-white'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f === 'TODAS' ? 'Todas' : f === 'APROBADA' ? 'Aprobadas' : 'En Revisión'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className={`border rounded-2xl overflow-hidden transition-all ${
          isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className={`border-b text-[11px] uppercase ${
                  isDark
                    ? 'border-[#1e2a3f] text-slate-400 bg-[#0d1320]'
                    : 'border-slate-100 text-slate-500 bg-slate-50/70'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Código Retorno</th>
                <th className="py-3 px-3 font-semibold">Producto Devuelto</th>
                <th className="py-3 px-3 font-semibold text-center">Batch / Lote</th>
                <th className="py-3 px-3 font-semibold">Fecha y Hora</th>
                <th className="py-3 px-3 font-semibold">Motivo</th>
                <th className="py-3 px-3 font-semibold text-right">Monto Reintegrado</th>
                <th className="py-3 px-4 font-semibold text-center">Estado</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDark ? 'divide-[#182338]/80 text-slate-200' : 'divide-slate-100 text-slate-800'
              }`}
            >
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-rose-500">
                    {d.codigo_retorno}
                  </td>
                  <td className="py-3 px-3 font-semibold">{d.producto_nombre}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`font-mono px-2 py-0.5 rounded border text-[11px] ${
                        isDark
                          ? 'bg-[#182338] text-slate-300 border-[#23334e]'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {d.numero_batch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{d.fecha_hora}</td>
                  <td className={`py-3 px-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {d.motivo}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-sm text-rose-500">
                    ${d.monto.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        d.estado === 'APROBADA'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/40'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 border border-amber-200 dark:border-amber-500/40'
                      }`}
                    >
                      {d.estado === 'APROBADA' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {d.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevolucionesView;
