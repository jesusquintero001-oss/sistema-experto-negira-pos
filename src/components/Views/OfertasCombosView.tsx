import React, { useState } from 'react';
import type { OfertaActiva, ComboDescuento } from '../../types/database';
import { Percent, Sparkles, Tag, Plus, Check, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface OfertasCombosViewProps {
  ofertas: OfertaActiva[];
  combos: ComboDescuento[];
  onAddOferta?: (oferta: OfertaActiva) => void;
  onAddCombo?: (combo: ComboDescuento) => void;
}

export const OfertasCombosView: React.FC<OfertasCombosViewProps> = ({
  ofertas,
  combos,
  onAddOferta,
  onAddCombo,
}) => {
  const { isDark } = useTheme();

  // Modals state
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showComboModal, setShowComboModal] = useState(false);

  // New Promotion form state
  const [promoTitulo, setPromoTitulo] = useState('');
  const [promoDescuento, setPromoDescuento] = useState(15);
  const [promoDesc, setPromoDesc] = useState('');
  const [promoCategoria, setPromoCategoria] = useState('Farmacia');
  const [promoFin, setPromoFin] = useState('31/12/2026');
  const [promoColor, setPromoColor] = useState<'cyan' | 'green' | 'blue'>('cyan');

  // New Combo form state
  const [comboNombre, setComboNombre] = useState('');
  const [comboRegla, setComboRegla] = useState('');
  const [comboDescuento, setComboDescuento] = useState(10);
  const [comboAhorro, setComboAhorro] = useState('-$10 $');

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoTitulo.trim()) return;

    const newOferta: OfertaActiva = {
      id: `off-${Date.now()}`,
      titulo: promoTitulo,
      porcentaje_descuento: Number(promoDescuento),
      descripcion: promoDesc || `Descuento del ${promoDescuento}% aplicado en mostrador`,
      categoria_aplicable: promoCategoria,
      fecha_inicio: new Date().toLocaleDateString('es-ES'),
      fecha_fin: promoFin || '15/11/2026',
      estado: 'ACTIVA',
      color_acento: promoColor,
    };

    onAddOferta?.(newOferta);
    setPromoTitulo('');
    setPromoDesc('');
    setShowPromoModal(false);
  };

  const handleCreateCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comboNombre.trim()) return;

    const newCombo: ComboDescuento = {
      id: `cmb-${Date.now()}`,
      codigo: `CMB-${Math.floor(Math.random() * 900 + 100)}`,
      nombre: comboNombre,
      descripcion: comboRegla,
      regla: comboRegla || 'Compra combinada con ahorro automático',
      descuento_aplicado: Number(comboDescuento),
      ahorro_texto: comboAhorro.startsWith('-') ? comboAhorro : `-${comboAhorro} $`,
      total_aplicado_mes: 0,
      activo: true,
    };

    onAddCombo?.(newCombo);
    setComboNombre('');
    setComboRegla('');
    setShowComboModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div
        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-[#101726] border-[#1e2a3f] shadow-xl text-white'
            : 'bg-white border-slate-200 shadow-xs text-slate-900'
        }`}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Percent className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
            <span>Motor de Ofertas y Combos con Descuentos Automáticos</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Configuración y aplicación de reglas comerciales en tiempo real en el punto de venta
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPromoModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Promoción</span>
          </button>

          <button
            onClick={() => setShowComboModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nuevo Combo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Offers Section */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Tag className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
              <span>Ofertas Vigentes en Mostrador</span>
            </h3>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isDark
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
              }`}
            >
              {ofertas.length} Activas
            </span>
          </div>

          <div className="space-y-3">
            {ofertas.map((o) => (
              <div
                key={o.id}
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-[#141f36] border-[#223352]'
                    : 'bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold text-sm ${
                        isDark ? 'text-cyan-300' : 'text-cyan-800'
                      }`}
                    >
                      {o.titulo}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {o.porcentaje_descuento}% OFF
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {o.descripcion}
                  </p>
                  <p className={`text-[10px] mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Válido hasta: {o.fecha_fin}
                  </p>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automatic Combos Section */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-[#101726] border-[#1e2a3f] shadow-xl' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span>Combos con Descuentos Automáticos</span>
            </h3>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isDark
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {combos.length} Activos
            </span>
          </div>

          <div className="space-y-3">
            {combos.map((c) => (
              <div
                key={c.id}
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-[#141f36] border-[#223352]'
                    : 'bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <h4
                    className={`font-semibold text-sm ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {c.nombre}
                  </h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Regla: {c.regla}
                  </p>
                  <p className={`text-[10px] mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Ahorro directo en POS: -${c.descuento_aplicado.toFixed(2)}
                  </p>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-xl font-bold font-mono text-sm shadow-2xs ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {c.ahorro_texto}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Agregar Promoción */}
      {showPromoModal && (
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
                <Tag className="w-5 h-5 text-cyan-500" />
                <span>Crear Nueva Promoción</span>
              </h3>
              <button
                onClick={() => setShowPromoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Título de la Promoción</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Promoción: 25% off Especial"
                  value={promoTitulo}
                  onChange={(e) => setPromoTitulo(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Descuento (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={promoDescuento}
                    onChange={(e) => setPromoDescuento(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Categoría</label>
                  <select
                    value={promoCategoria}
                    onChange={(e) => setPromoCategoria(e.target.value)}
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
                    <option value="Todas">Todas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Descripción</label>
                <input
                  type="text"
                  placeholder="ej. Válido en compras de temporada"
                  value={promoDesc}
                  onChange={(e) => setPromoDesc(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Fecha de Fin</label>
                  <input
                    type="text"
                    value={promoFin}
                    onChange={(e) => setPromoFin(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Estilo Color</label>
                  <select
                    value={promoColor}
                    onChange={(e) => setPromoColor(e.target.value as 'cyan' | 'green' | 'blue')}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="cyan">Cyan / Azul</option>
                    <option value="green">Verde Esmeralda</option>
                    <option value="blue">Índigo</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPromoModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md cursor-pointer"
                >
                  Guardar Promoción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Agregar Combo */}
      {showComboModal && (
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
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <span>Crear Nuevo Combo con Descuento Automático</span>
              </h3>
              <button
                onClick={() => setShowComboModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCombo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nombre del Combo</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Combo Pack #3 - 2 unidades x 1"
                  value={comboNombre}
                  onChange={(e) => setComboNombre(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Regla de Aplicación</label>
                <input
                  type="text"
                  required
                  placeholder="ej. 2 unidades de solución + 1 jarabe"
                  value={comboRegla}
                  onChange={(e) => setComboRegla(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                    isDark
                      ? 'bg-[#142038] border-[#233554] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Monto de Descuento ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={comboDescuento}
                    onChange={(e) => setComboDescuento(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs border rounded-xl outline-none ${
                      isDark
                        ? 'bg-[#142038] border-[#233554] text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Etiqueta de Ahorro</label>
                  <input
                    type="text"
                    required
                    placeholder="-$50 $"
                    value={comboAhorro}
                    onChange={(e) => setComboAhorro(e.target.value)}
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
                  onClick={() => setShowComboModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer"
                >
                  Guardar Combo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertasCombosView;
