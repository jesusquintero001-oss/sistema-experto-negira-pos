import React from 'react';
import type { OfertaActiva } from '../types/database';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ActiveOffersProps {
  offers: OfertaActiva[];
  onSelectOffer?: (offer: OfertaActiva) => void;
}

export const ActiveOffers: React.FC<ActiveOffersProps> = ({ offers, onSelectOffer }) => {
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
        <h2
          className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          <span>OFERTAS ACTIVAS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
        </h2>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
            isDark
              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
              : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
          }`}
        >
          {offers.length} Vigentes
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-2.5">
        {offers.map((offer) => {
          const isCyan = offer.color_acento === 'cyan';
          const isGreen = offer.color_acento === 'green';

          const cardStyle = isDark
            ? isCyan
              ? 'border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 to-[#121b2d] hover:border-cyan-400'
              : isGreen
              ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 to-[#121b2d] hover:border-emerald-400'
              : 'border-blue-500/40 bg-gradient-to-r from-blue-950/40 to-[#121b2d] hover:border-blue-400'
            : isCyan
            ? 'border-sky-200 bg-gradient-to-r from-sky-50 to-white hover:border-sky-300 shadow-2xs'
            : isGreen
            ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-white hover:border-emerald-300 shadow-2xs'
            : 'border-blue-200 bg-gradient-to-r from-blue-50 to-white hover:border-blue-300 shadow-2xs';

          const titleColor = isDark
            ? isCyan
              ? 'text-cyan-300'
              : isGreen
              ? 'text-emerald-300'
              : 'text-blue-300'
            : isCyan
            ? 'text-sky-900'
            : isGreen
            ? 'text-emerald-900'
            : 'text-blue-900';

          return (
            <div
              key={offer.id}
              onClick={() => onSelectOffer?.(offer)}
              className={`p-3 rounded-xl border ${cardStyle} flex items-center justify-between transition-all duration-200 cursor-pointer group shadow-xs`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles
                    className={`w-3.5 h-3.5 ${
                      isCyan
                        ? isDark ? 'text-cyan-400' : 'text-sky-600'
                        : isGreen
                        ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                        : isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                  <h3 className={`text-xs font-bold ${titleColor}`}>{offer.titulo}</h3>
                </div>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {offer.descripcion}
                </p>
              </div>

              <div
                className={`flex items-center gap-1 transition-colors ${
                  isDark
                    ? 'text-slate-400 group-hover:text-white'
                    : 'text-slate-400 group-hover:text-slate-800'
                }`}
              >
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`pt-3 border-t mt-3 flex items-center justify-between text-[10px] ${
          isDark ? 'border-[#1e2a3f] text-slate-400' : 'border-slate-100 text-slate-500'
        }`}
      >
        <span>Aplica en TPV</span>
        <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
          Motor de Descuentos Negira
        </span>
      </div>
    </div>
  );
};

export default ActiveOffers;
