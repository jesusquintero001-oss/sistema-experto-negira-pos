import React, { useState } from 'react';
import type { Devolucion } from '../../types/database';
import { RotateCcw, CheckCircle, Clock, Plus, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DevolucionesViewProps {
  devoluciones: Devolucion[];
  onAddDevolucion?: (dev: Devolucion) => void;
}

export const DevolucionesView: React.FC<DevolucionesViewProps> = ({
  devoluciones,
  onAddDevolucion,
}) => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<'TODAS' | 'APROBADA' | 'EN_REVISION'>('TODAS');
  const [showModal, setShowModal] = useState(false);

  // New Return form state
  const [productoNombre, setProductoNombre] = useState('');
  const [numeroBatch, setNumeroBatch] = useState('80/27');
  const [monto, setMonto] = useState(15.0);
  const [motivo, setMotivo] = useState('Producto con sello dañado');
  const [estado, setEstado] = useState<'APROBADA' | 'EN_REVISION'>('APROBADA');

  const filtered = devoluciones.filter(
    (d) => filter === 'TODAS' || d.estado === filter
  );

  const handleCreateDevolucion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productoNombre.trim()) return;

    const newDev: Devolucion = {
      id: `dev-${Date.now()}`,
      codigo_retorno: `RET-${Math.floor(Math.random() * 9000 + 1000)}`,
      producto_nombre: productoNombre,
      numero_batch: numeroBatch,
      cantidad: 1,
      monto: Number(monto),
      motivo,
      fecha_hora: new Date().toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      estado,
      autorizado_por: 'Farmacéutico Jefe',
    };

    onAddDevolucion?.(newDev);
    setProductoNombre('');
    setShowModal(false);
  };

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

        <div className="flex items-center gap-3">
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

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Devolución</span>
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

      {/* Modal: Registrar Devolución */}
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
                <RotateCcw className="w-5 h-5 text-rose-500" />
                <span>Registrar Nueva Devolución</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDevolucion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Producto Devuelto</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Marcandera Negira Plus"
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
                  <label className="block text-xs font-semibold mb-1">Batch / Lote</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. 400C"
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
                  <label className="block text-xs font-semibold mb-1">Monto a Reintegrar ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={monto}
                    onChange={(e) => setMonto(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Motivo de Devolución</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Reacción alérgica del paciente, cambio indicado por médico"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Estado de Aprobación</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as 'APROBADA' | 'EN_REVISION')}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="APROBADA">Aprobada (Reintegro Inmediato)</option>
                  <option value="EN_REVISION">En Revisión (Pendiente de Autorización)</option>
                </select>
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
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer"
                >
                  Registrar Devolución
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevolucionesView;
