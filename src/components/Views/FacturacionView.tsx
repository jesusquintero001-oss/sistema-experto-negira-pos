import React, { useState } from 'react';
import type { Factura } from '../../types/database';
import { Receipt, Search, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FacturacionViewProps {
  facturas: Factura[];
}

export const FacturacionView: React.FC<FacturacionViewProps> = ({ facturas }) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = facturas.filter(
    (f) =>
      f.numero_factura.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all ${
          isDark
            ? 'bg-[#101726] border-[#1e2a3f] shadow-xl text-white'
            : 'bg-white border-slate-200 shadow-xs text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Receipt className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
            <span>Módulo de Facturación POS — NEGIRA S.A.</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Registro fiscal, facturas emitidas, desglose de IVA y descuentos automáticos aplicados
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por factura o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-9 pr-3 py-2 border rounded-xl text-xs transition-colors focus:outline-none ${
              isDark
                ? 'bg-[#142038] border-[#233554] text-slate-200 placeholder-slate-500 focus:border-cyan-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-cyan-600'
            }`}
          />
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
                <th className="py-3 px-4 font-semibold">N° Factura</th>
                <th className="py-3 px-3 font-semibold">Cliente / Razón Social</th>
                <th className="py-3 px-3 font-semibold">Fecha y Hora</th>
                <th className="py-3 px-3 font-semibold">Método Pago</th>
                <th className="py-3 px-3 font-semibold text-right">Subtotal</th>
                <th className="py-3 px-3 font-semibold text-right">Descuento Combos</th>
                <th className="py-3 px-3 font-semibold text-right">IVA</th>
                <th className="py-3 px-3 font-semibold text-right">Total</th>
                <th className="py-3 px-4 font-semibold text-center">Estado</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDark ? 'divide-[#182338]/80 text-slate-200' : 'divide-slate-100 text-slate-800'
              }`}
            >
              {filtered.map((f) => (
                <tr
                  key={f.id}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-300">
                    {f.numero_factura}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold block">{f.cliente_nombre}</span>
                    <span className="text-[10px] text-slate-400">{f.cliente_documento}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{f.fecha_emision}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {f.metodo_pago}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">
                    ${f.subtotal.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {f.descuento_automatico > 0 ? `-$${f.descuento_automatico.toFixed(2)}` : '—'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">
                    ${f.impuesto_iva.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-sm text-cyan-700 dark:text-white">
                    ${f.total.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        f.estado === 'PAGADA'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/40'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 border border-amber-200 dark:border-amber-500/40'
                      }`}
                    >
                      {f.estado === 'PAGADA' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {f.estado}
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

export default FacturacionView;
