import React from 'react';
import type { OfertaActiva, ComboDescuento } from '../../types/database';
import { Percent, Sparkles, Tag, Plus, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface OfertasCombosViewProps {
  ofertas: OfertaActiva[];
  combos: ComboDescuento[];
}

export const OfertasCombosView: React.FC<OfertasCombosViewProps> = ({ ofertas, combos }) => {
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
            <Percent className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
            <span>Motor de Ofertas y Combos con Descuentos Automáticos</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Reglas comerciales aplicadas en tiempo real en el punto de venta (TPV) — NEGIRA S.A.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Nueva Promoción</span>
        </button>
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
              Motor Activo
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
    </div>
  );
};

export default OfertasCombosView;
