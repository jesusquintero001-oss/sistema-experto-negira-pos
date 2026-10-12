import React from 'react';
import {
  LayoutDashboard,
  Package,
  Receipt,
  Percent,
  TrendingUp,
  RotateCcw,
  CalendarClock,
  Database,
  Building2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type TabKey =
  | 'dashboard'
  | 'inventario'
  | 'facturacion'
  | 'ofertas'
  | 'ganancias'
  | 'devoluciones'
  | 'vencimientos'
  | 'postgresql';

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { isDark } = useTheme();

  const navItems = [
    { key: 'dashboard' as TabKey, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'inventario' as TabKey, label: 'Inventario', icon: Package },
    { key: 'facturacion' as TabKey, label: 'Facturación', icon: Receipt },
    { key: 'ofertas' as TabKey, label: 'Ofertas y Combos', icon: Percent },
    { key: 'ganancias' as TabKey, label: 'Ganancias', icon: TrendingUp },
    { key: 'devoluciones' as TabKey, label: 'Devoluciones', icon: RotateCcw },
    { key: 'vencimientos' as TabKey, label: 'Vencimientos', icon: CalendarClock },
    { key: 'postgresql' as TabKey, label: 'Esquema PostgreSQL', icon: Database },
  ];

  return (
    <aside
      className={`w-64 border-r flex flex-col shrink-0 min-h-screen select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#0d121f] border-[#1e2738] text-slate-300'
          : 'bg-white border-slate-200 text-slate-700'
      }`}
    >
      {/* Brand Header */}
      <div
        className={`p-5 flex items-center gap-3 border-b ${
          isDark ? 'border-[#1e2738]/60' : 'border-slate-100'
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-600/20 overflow-hidden ring-2 ring-cyan-500/30">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1
            className={`font-extrabold text-base tracking-wide flex items-center gap-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span>Negira POS</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h1>
          <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            NEGIRA S.A.
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer ${
                isActive
                  ? isDark
                    ? 'bg-[#1b263b] text-cyan-400 shadow-md shadow-cyan-950/40 border border-cyan-500/30 font-semibold'
                    : 'bg-cyan-50 text-cyan-800 shadow-xs border border-cyan-200 font-semibold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-[#131b2c]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors shrink-0 ${
                  isActive
                    ? isDark
                      ? 'text-cyan-400'
                      : 'text-cyan-700'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              />
              <span className="truncate">{item.label}</span>
              {item.key === 'vencimientos' && (
                <span
                  className={`ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    isDark
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-rose-100 text-rose-700 border border-rose-200'
                  }`}
                >
                  3
                </span>
              )}
              {item.key === 'ofertas' && (
                <span
                  className={`ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  Activas
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Tech Stack Badge (from whiteboard & mockup) */}
      <div
        className={`p-4 m-3 rounded-xl border text-[11px] leading-relaxed select-none ${
          isDark
            ? 'bg-[#080d17]/80 border-[#1e2738]/80 text-slate-400 shadow-inner'
            : 'bg-slate-50 border-slate-200 text-slate-600 shadow-2xs'
        }`}
      >
        <p
          className={`font-semibold tracking-wider text-[10px] uppercase mb-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          DESARROLLADO CON:
        </p>
        <p
          className={`font-mono font-medium tracking-tight ${
            isDark ? 'text-cyan-300' : 'text-cyan-700'
          }`}
        >
          HTML | CSS | TYPESCRIPT | REACT | POSTGRESQL
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
