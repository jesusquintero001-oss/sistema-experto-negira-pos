import React, { useState } from 'react';
import type { Producto } from '../../types/database';
import { Package, Search, Plus, AlertCircle, Barcode, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface InventarioViewProps {
  productos: Producto[];
  onAddProducto?: (producto: Producto) => void;
}

export const InventarioView: React.FC<InventarioViewProps> = ({
  productos,
  onAddProducto,
}) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('TODAS');
  const [showProductModal, setShowProductModal] = useState(false);

  // New product form
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Farmacia');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [precioCosto, setPrecioCosto] = useState<number>(10);
  const [precioVenta, setPrecioVenta] = useState<number>(18);
  const [stockActual, setStockActual] = useState<number>(50);
  const [requiereLote, setRequiereLote] = useState(true);

  const categories = ['TODAS', 'Farmacia', 'Soluciones', 'Especialidades', 'Pediátrico', 'Cuidado Personal'];

  const filtered = productos.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codigo_barras.includes(searchTerm);
    const matchesCat = filterCat === 'TODAS' || p.categoria === filterCat;
    return matchesSearch && matchesCat;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const newProd: Producto = {
      id: `prod-${Date.now()}`,
      nombre,
      categoria,
      codigo_barras: codigoBarras || `${Math.floor(Math.random() * 900000000000 + 100000000000)}`,
      precio_costo: Number(precioCosto),
      precio_venta: Number(precioVenta),
      stock_actual: Number(stockActual),
      stock_minimo: 10,
      unidad_medida: 'UNIDAD',
      requiere_lote: requiereLote,
    };

    onAddProducto?.(newProd);
    setNombre('');
    setCodigoBarras('');
    setShowProductModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all ${
          isDark
            ? 'bg-[#101726] border-[#1e2a3f] shadow-xl text-white'
            : 'bg-white border-slate-200 shadow-xs text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Package className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
            <span>Inventario de Productos — NEGIRA S.A.</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Control de existencias, precios de venta POS y seguimiento de códigos de barra
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-9 pr-3 py-2 border rounded-xl text-xs transition-colors focus:outline-none ${
                isDark
                  ? 'bg-[#142038] border-[#233554] text-slate-200 placeholder-slate-500 focus:border-cyan-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-cyan-600'
              }`}
            />
          </div>

          <button
            onClick={() => setShowProductModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              filterCat === c
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-cyan-50 text-cyan-800 border-cyan-300 font-bold'
                : isDark
                ? 'bg-[#101726] text-slate-400 border-[#1e2a3f] hover:text-slate-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Table */}
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
                <th className="py-3 px-3 font-semibold">Categoría</th>
                <th className="py-3 px-3 font-semibold">Código EAN</th>
                <th className="py-3 px-3 font-semibold text-right">Precio Costo</th>
                <th className="py-3 px-3 font-semibold text-right">Precio Venta</th>
                <th className="py-3 px-3 font-semibold text-center">Stock</th>
                <th className="py-3 px-4 font-semibold text-center">Control Sanitario</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDark ? 'divide-[#182338]/80 text-slate-200' : 'divide-slate-100 text-slate-800'
              }`}
            >
              {filtered.map((prod) => (
                <tr
                  key={prod.id}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-[#152033]/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4">
                    <span className="font-semibold text-sm">{prod.nombre}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">ID: {prod.id}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        isDark
                          ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {prod.categoria}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 flex items-center gap-1.5 pt-4">
                    <Barcode className="w-3.5 h-3.5" />
                    <span>{prod.codigo_barras}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">
                    ${prod.precio_costo.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-cyan-600 dark:text-cyan-300">
                    ${prod.precio_venta.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold font-mono text-xs ${
                        prod.stock_actual < 30
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400'
                      }`}
                    >
                      {prod.stock_actual}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {prod.requiere_lote ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-500/30">
                        <AlertCircle className="w-3 h-3" />
                        Lote Obligatorio
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Estándar</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Agregar Producto */}
      {showProductModal && (
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
                <Package className="w-5 h-5 text-cyan-500" />
                <span>Agregar Nuevo Producto</span>
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Ibuprofeno 400mg Tabletas"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Categoría</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="Farmacia">Farmacia</option>
                    <option value="Soluciones">Soluciones</option>
                    <option value="Especialidades">Especialidades</option>
                    <option value="Pediátrico">Pediátrico</option>
                    <option value="Cuidado Personal">Cuidado Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Código de Barras EAN</label>
                  <input
                    type="text"
                    placeholder="ej. 770200192806"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Precio Costo ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={precioCosto}
                    onChange={(e) => setPrecioCosto(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Precio Venta POS ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={precioVenta}
                    onChange={(e) => setPrecioVenta(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Stock Inicial</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stockActual}
                    onChange={(e) => setStockActual(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="reqLote"
                  checked={requiereLote}
                  onChange={(e) => setRequiereLote(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-600 cursor-pointer"
                />
                <label htmlFor="reqLote" className="text-xs cursor-pointer select-none">
                  Requiere control sanitario de lote y fecha de vencimiento
                </label>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md cursor-pointer"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventarioView;
