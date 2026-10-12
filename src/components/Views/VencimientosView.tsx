import React, { useState } from 'react';
import type { LoteVencimiento } from '../../types/database';
import { CalendarClock, AlertTriangle, ShieldCheck, MapPin, Plus, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface VencimientosViewProps {
  lotes: LoteVencimiento[];
  onAddLote?: (lote: LoteVencimiento) => void;
}

export const VencimientosView: React.FC<VencimientosViewProps> = ({
  lotes,
  onAddLote,
}) => {
  const { isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);

  // New batch form state
  const [productoNombre, setProductoNombre] = useState('');
  const [numeroBatch, setNumeroBatch] = useState('A90045');
  const [fechaFab, setFechaFab] = useState('01/09/2026');
  const [fechaVenc, setFechaVenc] = useState('25/10/2026');
  const [diasRestantes, setDiasRestantes] = useState(14);
  const [cantidadRestante, setCantidadRestante] = useState(40);
  const [ubicacionEstante, setUbicacionEstante] = useState('Estante A-1 (Principal)');

  const handleCreateLote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productoNombre.trim()) return;

    const newLote: LoteVencimiento = {
      id: `lot-${Date.now()}`,
      producto_id: `prod-${Date.now()}`,
      producto_nombre: productoNombre,
      numero_batch: numeroBatch,
      fecha_fabricacion: fechaFab,
      fecha_vencimiento: fechaVenc,
      dias_restantes: Number(diasRestantes),
      cantidad_restante: Number(cantidadRestante),
      estado_alerta: Number(diasRestantes) <= 7 ? 'CRITICO' : 'OPTIMO',
      ubicacion_estante: ubicacionEstante,
    };

    onAddLote?.(newLote);
    setProductoNombre('');
    setShowModal(false);
  };

  const criticalCount = lotes.filter((l) => l.dias_restantes <= 7).length;

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
            <CalendarClock className="w-5 h-5 text-amber-500" />
            <span>Monitoreo de Lotes y Próximos Vencimientos — NEGIRA S.A.</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Control sanitario riguroso para medicamentos y productos con fecha de caducidad
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 dark:bg-rose-950/80 dark:text-rose-400 border border-rose-200 dark:border-rose-500/40 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>{criticalCount} Lotes Críticos</span>
          </span>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Lote</span>
          </button>
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

      {/* Modal: Registrar Lote */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-all ${
              isDark
                ? 'bg-[#0f172a] border-[#233554] text-slate-100'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-amber-500" />
                <span>Registrar Lote Sanitario y Vencimiento</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Paracetamol 500mg"
                  value={productoNombre}
                  onChange={(e) => setProductoNombre(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Número de Batch / Lote</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. B-2026-90"
                    value={numeroBatch}
                    onChange={(e) => setNumeroBatch(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Días Restantes para Vencer</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={diasRestantes}
                    onChange={(e) => setDiasRestantes(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Fecha de Fabricación</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/AAAA"
                    value={fechaFab}
                    onChange={(e) => setFechaFab(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Fecha de Vencimiento</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/AAAA"
                    value={fechaVenc}
                    onChange={(e) => setFechaVenc(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Cantidad de Unidades</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={cantidadRestante}
                    onChange={(e) => setCantidadRestante(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Ubicación / Estante</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Estante B-3 (Nevera)"
                    value={ubicacionEstante}
                    onChange={(e) => setUbicacionEstante(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md cursor-pointer"
                >
                  Guardar Lote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VencimientosView;
