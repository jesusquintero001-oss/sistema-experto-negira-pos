import React, { useState } from 'react';
import { Database, Table, Key, Check, Copy, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PostgresView: React.FC = () => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState('productos');

  const tables = [
    {
      name: 'productos',
      desc: 'Catálogo de productos, precios de costo/venta y control de stock',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Identificador único' },
        { name: 'codigo_barras', type: 'VARCHAR(50)', key: 'UNIQUE', note: 'Código EAN/UPC' },
        { name: 'nombre', type: 'VARCHAR(255)', key: '', note: 'Nombre del producto' },
        { name: 'categoria', type: 'VARCHAR(100)', key: '', note: 'Rubro / Familia' },
        { name: 'precio_costo', type: 'NUMERIC(12,2)', key: '', note: 'Costo base' },
        { name: 'precio_venta', type: 'NUMERIC(12,2)', key: '', note: 'Precio POS' },
        { name: 'stock_actual', type: 'INTEGER', key: '', note: 'Existencias actuales' },
        { name: 'requiere_lote', type: 'BOOLEAN', key: '', note: 'Control de caducidad' },
      ],
    },
    {
      name: 'lotes_vencimiento',
      desc: 'Control de lotes (batch) y fechas de vencimiento con alertas inminentes',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Identificador único' },
        { name: 'producto_id', type: 'UUID', key: 'FK', note: 'Ref -> productos(id)' },
        { name: 'numero_batch', type: 'VARCHAR(50)', key: '', note: 'Código de lote sanitario' },
        { name: 'fecha_fabricacion', type: 'DATE', key: '', note: 'Elaboración' },
        { name: 'fecha_vencimiento', type: 'DATE', key: '', note: 'Límite de caducidad' },
        { name: 'cantidad_restante', type: 'INTEGER', key: '', note: 'Unidades en lote' },
        { name: 'ubicacion_estante', type: 'VARCHAR(50)', key: '', note: 'Almacén / Nevera' },
      ],
    },
    {
      name: 'combos_descuentos',
      desc: 'Motor de combos con descuentos automáticos en punto de venta',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Identificador' },
        { name: 'codigo_combo', type: 'VARCHAR(50)', key: 'UNIQUE', note: 'Identificador regla' },
        { name: 'nombre', type: 'VARCHAR(150)', key: '', note: 'Nombre comercial' },
        { name: 'regla_aplicacion', type: 'VARCHAR(150)', key: '', note: 'Fórmula de combo' },
        { name: 'descuento_monto', type: 'NUMERIC(10,2)', key: '', note: 'Ahorro al cliente' },
        { name: 'activo', type: 'BOOLEAN', key: '', note: 'Estado de regla' },
      ],
    },
    {
      name: 'facturas',
      desc: 'Facturación POS, subtotales, IVA y registro de pagos',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Identificador' },
        { name: 'numero_factura', type: 'VARCHAR(50)', key: 'UNIQUE', note: 'Folio correlativo' },
        { name: 'cliente_nombre', type: 'VARCHAR(150)', key: '', note: 'Razón social / Cliente' },
        { name: 'subtotal', type: 'NUMERIC(12,2)', key: '', note: 'Base imponible' },
        { name: 'descuento_automatico', type: 'NUMERIC(12,2)', key: '', note: 'Descuento combos' },
        { name: 'impuesto_iva', type: 'NUMERIC(12,2)', key: '', note: 'IVA calculado' },
        { name: 'total', type: 'NUMERIC(12,2)', key: '', note: 'Total liquidado' },
        { name: 'estado', type: 'VARCHAR(20)', key: '', note: 'PAGADA / PENDIENTE' },
      ],
    },
    {
      name: 'devoluciones',
      desc: 'Registro de devoluciones, motivos, autorización y reintegro',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Identificador' },
        { name: 'codigo_retorno', type: 'VARCHAR(50)', key: 'UNIQUE', note: 'Folio de devolución' },
        { name: 'factura_id', type: 'UUID', key: 'FK', note: 'Ref -> facturas(id)' },
        { name: 'producto_id', type: 'UUID', key: 'FK', note: 'Ref -> productos(id)' },
        { name: 'numero_batch', type: 'VARCHAR(50)', key: '', note: 'Lote de origen' },
        { name: 'monto_reembolsado', type: 'NUMERIC(12,2)', key: '', note: 'Total reintegrado' },
        { name: 'motivo', type: 'VARCHAR(255)', key: '', note: 'Causa de devolución' },
        { name: 'estado', type: 'VARCHAR(20)', key: '', note: 'APROBADA / EN_REVISION' },
      ],
    },
  ];

  const currentTable = tables.find((t) => t.name === selectedTable) || tables[0];

  const sqlSample = `-- Esquema PostgreSQL para Sistema Experto POS Negira S.A.
CREATE TABLE ${currentTable.name} (
${currentTable.columns
  .map(
    (c) =>
      `  ${c.name.padEnd(22)} ${c.type}${c.key === 'PK' ? ' PRIMARY KEY' : ''}${
        c.key === 'UNIQUE' ? ' UNIQUE' : ''
      }`
  )
  .join(',\n')}
);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div
        className={`rounded-2xl p-6 border relative overflow-hidden transition-all ${
          isDark
            ? 'bg-[#101726] border-[#1e2a3f] shadow-xl text-white'
            : 'bg-white border-slate-200 shadow-xs text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-2xl border ${
                isDark
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
              }`}
            >
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold">
                  Arquitectura PostgreSQL — NEGIRA S.A.
                </h2>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isDark
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                  }`}
                >
                  Especificación de Pizarra
                </span>
              </div>
              <p className={`text-xs mt-1 max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Estructura relacional en PostgreSQL optimizada para el Sistema Experto POS:
                gestiona catálogos, control sanitario de lotes por vencimiento, combos con descuentos automáticos,
                facturación e historial de devoluciones.
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono ${
              isDark
                ? 'bg-[#0c1322] border-[#1d273b] text-cyan-300'
                : 'bg-slate-50 border-slate-200 text-cyan-800'
            }`}
          >
            <span className="font-semibold">Stack:</span>
            <span>HTML + CSS + TS + React + PostgreSQL</span>
          </div>
        </div>
      </div>

      {/* Table Selector & Schema Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Table List */}
        <div className="lg:col-span-4 space-y-2">
          <h3
            className={`text-xs font-bold uppercase tracking-wider px-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Tablas del Sistema Experto POS
          </h3>
          {tables.map((t) => (
            <button
              key={t.name}
              onClick={() => setSelectedTable(t.name)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTable === t.name
                  ? isDark
                    ? 'bg-[#15233c] border-cyan-500/50 text-white shadow-lg shadow-cyan-950/40'
                    : 'bg-cyan-50 border-cyan-300 text-cyan-900 shadow-xs font-semibold'
                  : isDark
                  ? 'bg-[#101726] border-[#1e2a3f] text-slate-400 hover:text-slate-200 hover:bg-[#131b2e]'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold flex items-center gap-2 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-700'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  {t.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {t.columns.length} campos
                </span>
              </div>
              <p className={`text-[11px] mt-1 line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Table Columns & SQL DDL */}
        <div
          className={`lg:col-span-8 rounded-2xl p-5 border flex flex-col justify-between transition-all ${
            isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <div
              className={`flex items-center justify-between pb-3 border-b mb-4 ${
                isDark ? 'border-[#1e2a3f]' : 'border-slate-100'
              }`}
            >
              <div>
                <h3
                  className={`text-sm font-bold font-mono flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span>public.{currentTable.name}</span>
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentTable.desc}
                </p>
              </div>

              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#182338] hover:bg-[#202f4d] border-[#23334e] text-slate-300'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar DDL SQL</span>
                  </>
                )}
              </button>
            </div>

            {/* Column Schema Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr
                    className={`border-b text-[11px] uppercase ${
                      isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    <th className="pb-2 font-semibold">Columna</th>
                    <th className="pb-2 font-semibold">Tipo PostgreSQL</th>
                    <th className="pb-2 font-semibold">Clave / Restricción</th>
                    <th className="pb-2 font-semibold">Descripción</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y font-mono text-[11px] ${
                    isDark ? 'divide-[#182338]/80 text-slate-200' : 'divide-slate-100 text-slate-800'
                  }`}
                >
                  {currentTable.columns.map((col) => (
                    <tr
                      key={col.name}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 font-bold flex items-center gap-1.5">
                        {col.key === 'PK' && <Key className="w-3 h-3 text-amber-500" />}
                        {col.name}
                      </td>
                      <td className={`py-2.5 ${isDark ? 'text-cyan-300' : 'text-cyan-700 font-bold'}`}>
                        {col.type}
                      </td>
                      <td className="py-2.5">
                        {col.key ? (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                              isDark
                                ? 'bg-[#1b263b] text-amber-300 border-amber-500/30'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {col.key}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className={`py-2.5 font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {col.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SQL Code Block */}
          <div
            className={`mt-5 pt-4 border-t ${
              isDark ? 'border-[#1e2a3f]' : 'border-slate-100'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 text-xs mb-2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <Code2 className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
              <span>Declaración DDL PostgreSQL</span>
            </div>
            <pre
              className={`p-3 rounded-xl text-xs font-mono border overflow-x-auto ${
                isDark
                  ? 'bg-[#0a0f1a] text-cyan-200 border-[#1b253b]'
                  : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <code>{sqlSample}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostgresView;
