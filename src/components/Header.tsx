import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Bell,
  PlusCircle,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenNewSale: () => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewSale,
  dateRange,
  onDateRangeChange,
  searchQuery,
  onSearchChange,
  unreadCount,
}) => {
  const { toggleTheme, isDark } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const dateOptions = [
    'Hoy, 15 de Oct',
    'Últimos 7 Días',
    'Este Mes (Octubre)',
    'Tercer Trimestre',
    'Año 2026',
  ];

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Lote A90033 por vencer',
      desc: 'Producto Cervana vence en menos de 4 días',
      time: 'Hace 10 min',
    },
    {
      id: 2,
      type: 'return',
      title: 'Devolución RET-8904 en revisión',
      desc: 'Jarabe Pediátrico Forte pendiente de aprobación',
      time: 'Hace 45 min',
    },
    {
      id: 3,
      type: 'sale',
      title: 'Combo C02-02 aplicado',
      desc: 'Descuento automático de -$50.00 generado con éxito',
      time: 'Hace 1 hora',
    },
  ];

  return (
    <header
      className={`h-16 px-6 border-b flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 ${
        isDark
          ? 'bg-[#0b0f19] border-[#1e2738] text-slate-100'
          : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800 shadow-xs'
      }`}
    >
      {/* Search Bar */}
      <div className="relative w-72 md:w-96">
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`}
        >
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar productos, facturas, clientes..."
          className={`w-full pl-9 pr-4 py-2 border rounded-xl text-sm transition-all outline-none ${
            isDark
              ? 'bg-[#121929] border-[#22314d] text-slate-200 placeholder-slate-500 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30'
              : 'bg-slate-100/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/20'
          }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd
            className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded border ${
              isDark
                ? 'bg-[#1b263b] text-slate-400 border-slate-700'
                : 'bg-slate-200 text-slate-500 border-slate-300'
            }`}
          >
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs md:text-sm font-medium transition-colors ${
              isDark
                ? 'bg-[#121929] hover:bg-[#18233a] border-[#22314d] text-slate-300'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs'
            }`}
          >
            <Calendar className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <span>{dateRange}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            />
          </button>

          {showDatePicker && (
            <div
              className={`absolute right-0 mt-2 w-48 border rounded-xl shadow-2xl py-1 z-50 ${
                isDark
                  ? 'bg-[#121929] border-[#22314d]'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onDateRangeChange(opt);
                    setShowDatePicker(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                    dateRange === opt
                      ? isDark
                        ? 'text-cyan-400 font-semibold bg-[#17233c]'
                        : 'text-cyan-700 font-bold bg-cyan-50'
                      : isDark
                      ? 'text-slate-300 hover:bg-[#1c2944]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs md:text-sm font-medium transition-all ${
            isDark
              ? 'bg-[#121929] hover:bg-[#18233a] border-[#22314d] text-amber-300'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs'
          }`}
          title={isDark ? 'Cambiar a Tema Claro Elegante' : 'Cambiar a Tema Oscuro'}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline text-xs font-semibold">Tema Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline text-xs font-semibold">Tema Oscuro</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 border rounded-xl transition-colors ${
              isDark
                ? 'bg-[#121929] hover:bg-[#18233a] border-[#22314d] text-slate-300'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs'
            }`}
            title="Notificaciones y Alertas"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 border rounded-xl shadow-2xl p-3 z-50 ${
                isDark
                  ? 'bg-[#121929] border-[#22314d]'
                  : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              <div
                className={`flex items-center justify-between pb-2 border-b ${
                  isDark ? 'border-[#22314d]' : 'border-slate-100'
                }`}
              >
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  Notificaciones del Sistema
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`}
                >
                  3 Nuevas
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      isDark
                        ? 'bg-[#0e1422] hover:bg-[#162035] border-[#1e293b]'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {n.type === 'alert' && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      {n.type === 'return' && (
                        <RotateCcw className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      {n.type === 'sale' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                      <p
                        className={`text-xs font-semibold truncate ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {n.title}
                      </p>
                    </div>
                    <p
                      className={`text-[11px] leading-tight ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {n.desc}
                    </p>
                    <span
                      className={`text-[9px] mt-1 block ${
                        isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Initials Badge (NR) */}
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs font-bold shadow-xs select-none ${
            isDark
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600/60 text-slate-200'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
          title="Administrador Negira: NR"
        >
          NR
        </div>

        {/* Highlighted Button: Nueva Venta */}
        <button
          onClick={onOpenNewSale}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs md:text-sm font-semibold rounded-xl shadow-md shadow-cyan-600/20 border border-cyan-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nueva Venta</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
