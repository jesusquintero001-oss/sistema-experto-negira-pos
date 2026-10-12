import React from 'react';
import type { LoteVencimiento } from '../../types/database';
import { CalendarClock, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface VencimientosViewProps {
  lotes: LoteVencimiento[];
}

export const VencimientosView: React.FC<VencimientosViewProps> = ({ lotes }) => {
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
            <CalendarClock className="w-5 h-5 text-amber-500" />
            <span>Monitoreo de Lotes y Próximos Vencimientos — NEGIRA S.A.</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Control sanitario riguroso para medicamentos y productos con fecha de caducidad
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 dark:bg-rose-950/80 dark:text-rose-400 border border-rose-200 dark:border-rose-500/40 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>3 Lotes Críticos</span>
          </span>
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
                <th className="py-3 px-4 font-semibold">Producto</th>
                <th className="py-3 px-3 font-semibold text-center">Batch / N° Lote</th>
                <th className="py-3 px-3 font-semibold">Fecha Fabricación</th>
                <th className="py-3 px-3 font-semibold">Fecha Vencimiento</th>
                <th className="py-3 px-3 font-semibold text-center">Cantidad Restante</th>
                <th className="py-3 px-3 font-semibold">Ubicación Estante</th>
                <th className="py-3 px-4 font-semibold text-center">Estado Sanitario</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDark ? 'divide-[#182338]/80 text-slate-200' : 'divide-slate-100 text-slate-800'
              }`}
            >
              {lotes.map((l) => (
                <tr
                  key={l.id}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4">
                    <span className="font-semibold block">{l.producto_nombre}</span>
                    <span className="text-[10px] text-slate-400">ID Lote: {l.id}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`font-mono px-2 py-0.5 rounded border text-[11px] ${
                        isDark
                          ? 'bg-[#182338] text-slate-300 border-[#23334e]'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {l.numero_batch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{l.fecha_fabricacion}</td>
                  <td className="py-3 px-3 font-mono font-bold text-rose-500">
                    {l.fecha_vencimiento}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-semibold">
                    {l.cantidad_restante} uds
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {l.ubicacion_estante}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {l.dias_restantes <= 7 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 dark:bg-rose-950/80 dark:text-rose-400 border border-rose-200 dark:border-rose-500/40 animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        Vence en {l.dias_restantes} días
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/40">
                        <ShieldCheck className="w-3 h-3" />
                        Vigente ({l.dias_restantes} días)
                      </span>
                    )}
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

export default VencimientosView;
