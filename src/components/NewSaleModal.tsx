import React, { useState } from 'react';
import type { Producto, Factura } from '../types/database';
import {
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShoppingCart,
  Receipt,
  User,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  productos: Producto[];
  onSaleComplete: (factura: Factura, itemsCount: number, descuento: number) => void;
}

export const NewSaleModal: React.FC<NewSaleModalProps> = ({
  isOpen,
  onClose,
  productos,
  onSaleComplete,
}) => {
  const { isDark } = useTheme();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clienteNombre, setClienteNombre] = useState('Farmacia y Droguería Negira Central');
  const [clienteDoc, setClienteDoc] = useState('J-30918234-1');
  const [metodoPago, setMetodoPago] = useState<'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA'>('TARJETA');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastInvoice, setLastInvoice] = useState<Factura | null>(null);

  if (!isOpen) return null;

  const handleAddToCart = (prod: Producto) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.producto.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.producto.id === prod.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { producto: prod, cantidad: 1 }];
    });
  };

  const handleUpdateQty = (prodId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.producto.id === prodId) {
            const newQty = item.cantidad + delta;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (prodId: string) => {
    setCart((prev) => prev.filter((item) => item.producto.id !== prodId));
  };

  // Computations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.producto.precio_venta * item.cantidad,
    0
  );

  // Automatic combo discount calculation rule
  const totalItemsCount = cart.reduce((acc, item) => acc + item.cantidad, 0);
  let descuentoAutomatico = 0;
  let comboNombre = '';

  if (totalItemsCount >= 4) {
    descuentoAutomatico = 50.0;
    comboNombre = 'Combo #2 - 2 unidendis × 1 (Ahorro -$50.00)';
  } else if (totalItemsCount >= 2) {
    descuentoAutomatico = 8.0;
    comboNombre = 'Combos KA - 1 portencio 2 (Ahorro -$8.00)';
  }

  const iva = (subtotal - descuentoAutomatico) * 0.16;
  const total = Math.max(0, subtotal - descuentoAutomatico + iva);

  const handleProcessSale = () => {
    if (cart.length === 0) return;

    const newInvoice: Factura = {
      id: `fac-${Date.now()}`,
      numero_factura: `FAC-2026-00${Math.floor(Math.random() * 900 + 100)}`,
      cliente_nombre: clienteNombre,
      cliente_documento: clienteDoc,
      fecha_emision: new Date().toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      subtotal,
      descuento_automatico: descuentoAutomatico,
      impuesto_iva: iva,
      total,
      estado: 'PAGADA',
      metodo_pago: metodoPago,
    };

    setLastInvoice(newInvoice);
    setIsSuccess(true);
    onSaleComplete(newInvoice, totalItemsCount, descuentoAutomatico);
  };

  const handleReset = () => {
    setCart([]);
    setIsSuccess(false);
    setLastInvoice(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border transition-all ${
          isDark
            ? 'bg-[#0f172a] border-[#233554] text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'bg-[#111c33] border-[#233554]' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border ${
                isDark
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3
                className={`text-base font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Terminal de Punto de Venta (POS) — NEGIRA S.A.
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess && lastInvoice ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-lg animate-bounce ${
                isDark
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-950/40'
                  : 'bg-emerald-100 text-emerald-600 border-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4
                className={`text-xl font-extrabold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                ¡Venta y Factura Procesadas con Éxito!
              </h4>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Factura{' '}
                <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  {lastInvoice.numero_factura}
                </span>{' '}
                emitida y registrada exitosamente.
              </p>
            </div>

            <div
              className={`border rounded-xl p-4 w-full max-w-md text-left text-xs space-y-2 ${
                isDark
                  ? 'bg-[#142038] border-[#233554]'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Cliente:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lastInvoice.cliente_nombre}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Subtotal:</span>
                <span className="font-mono">${lastInvoice.subtotal.toFixed(2)}</span>
              </div>
              {lastInvoice.descuento_automatico > 0 && (
                <div
                  className={`flex justify-between font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  <span>Descuento Automático Aplicado:</span>
                  <span className="font-mono">-${lastInvoice.descuento_automatico.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>IVA (16%):</span>
                <span className="font-mono">${lastInvoice.impuesto_iva.toFixed(2)}</span>
              </div>
              <div
                className={`flex justify-between text-base font-bold border-t pt-2 ${
                  isDark ? 'border-slate-700 text-white' : 'border-slate-200 text-slate-900'
                }`}
              >
                <span>Total Cobrado:</span>
                <span className={`font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  ${lastInvoice.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              Completar y Volver al Dashboard
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
            {/* Left: Product Catalog (7 cols) */}
            <div
              className={`md:col-span-7 p-4 border-r flex flex-col overflow-y-auto max-h-[60vh] md:max-h-[70vh] ${
                isDark ? 'border-[#233554]' : 'border-slate-200'
              }`}
            >
              <h4
                className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Catálogo de Productos Disponibles
              </h4>

              <div className="space-y-2">
                {productos.map((prod) => (
                  <div
                    key={prod.id}
                    className={`p-3 border rounded-xl flex items-center justify-between transition-colors ${
                      isDark
                        ? 'bg-[#131d33] border-[#1e2a3f] hover:border-cyan-500/40'
                        : 'bg-white border-slate-200 hover:border-cyan-400/80 shadow-2xs'
                    }`}
                  >
                    <div>
                      <h5
                        className={`text-sm font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {prod.nombre}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            isDark
                              ? 'bg-slate-800 text-slate-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {prod.categoria}
                        </span>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                          Stock: {prod.stock_actual}
                        </span>
                        {prod.requiere_lote && (
                          <span
                            className={`text-[10px] font-semibold ${
                              isDark ? 'text-amber-400' : 'text-amber-600'
                            }`}
                          >
                            Control Lote
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-bold font-mono ${
                          isDark ? 'text-cyan-300' : 'text-cyan-700'
                        }`}
                      >
                        ${prod.precio_venta.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border-cyan-500/40'
                            : 'bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white border-cyan-200'
                        }`}
                        title="Agregar al carrito"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Cart & Invoice Details (5 cols) */}
            <div
              className={`md:col-span-5 p-4 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[70vh] ${
                isDark ? 'bg-[#0e1628]' : 'bg-slate-50'
              }`}
            >
              <div>
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span>Detalle de Factura</span>
                  <span
                    className={`font-mono font-bold ${
                      isDark ? 'text-cyan-400' : 'text-cyan-700'
                    }`}
                  >
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                  </span>
                </h4>

                {/* Customer fields */}
                <div
                  className={`space-y-2 mb-3 p-2.5 rounded-xl border ${
                    isDark
                      ? 'bg-[#131d33] border-[#1e2a3f]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={clienteNombre}
                      onChange={(e) => setClienteNombre(e.target.value)}
                      placeholder="Nombre del cliente"
                      className={`w-full bg-transparent border-none text-xs focus:outline-none ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}
                    />
                  </div>
                  <div
                    className={`text-[11px] pl-5.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Doc:{' '}
                    <input
                      type="text"
                      value={clienteDoc}
                      onChange={(e) => setClienteDoc(e.target.value)}
                      className={`bg-transparent border-b text-[11px] focus:outline-none w-28 ${
                        isDark ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'
                      }`}
                    />
                  </div>
                </div>

                {/* Items in cart */}
                <div className="space-y-2 max-h-40 overflow-y-auto mb-3 pr-1">
                  {cart.length === 0 ? (
                    <div
                      className={`py-6 text-center text-xs border border-dashed rounded-xl ${
                        isDark ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-300'
                      }`}
                    >
                      El carrito está vacío. Haz clic en (+) para agregar productos.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.producto.id}
                        className={`p-2 rounded-lg border flex items-center justify-between text-xs ${
                          isDark
                            ? 'bg-[#142038] border-[#233554]'
                            : 'bg-white border-slate-200 shadow-2xs'
                        }`}
                      >
                        <div className="truncate max-w-[130px]">
                          <p
                            className={`font-semibold truncate ${
                              isDark ? 'text-slate-200' : 'text-slate-800'
                            }`}
                          >
                            {item.producto.nombre}
                          </p>
                          <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            ${item.producto.precio_venta.toFixed(2)} c/u
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleUpdateQty(item.producto.id, -1)}
                            className={`p-1 rounded cursor-pointer ${
                              isDark
                                ? 'bg-[#1c2942] hover:bg-[#253655] text-slate-300'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className={`w-5 text-center font-bold ${
                              isDark ? 'text-white' : 'text-slate-800'
                            }`}
                          >
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item.producto.id, 1)}
                            className={`p-1 rounded cursor-pointer ${
                              isDark
                                ? 'bg-[#1c2942] hover:bg-[#253655] text-slate-300'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.producto.id)}
                            className="p-1 rounded text-rose-500 hover:text-rose-600 ml-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Automatic Combo Alert */}
                {descuentoAutomatico > 0 && (
                  <div
                    className={`p-2.5 rounded-xl border text-[11px] mb-3 flex items-center gap-2 ${
                      isDark
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 animate-pulse'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-2xs'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold">¡Descuento Automático Aplicado!</p>
                      <p className={`text-[10px] ${isDark ? 'text-emerald-400/90' : 'text-emerald-700'}`}>
                        {comboNombre}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Totals & Payment */}
              <div
                className={`border-t pt-3 space-y-2 ${
                  isDark ? 'border-[#233554]' : 'border-slate-200'
                }`}
              >
                {/* Payment method selector */}
                <div className="flex gap-1.5 mb-2">
                  {(['TARJETA', 'EFECTIVO', 'TRANSFERENCIA'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetodoPago(m)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer ${
                        metodoPago === m
                          ? isDark
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                            : 'bg-cyan-50 text-cyan-800 border-cyan-300'
                          : isDark
                          ? 'bg-[#142038] text-slate-400 border-[#233554] hover:text-white'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div
                  className={`text-xs space-y-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {descuentoAutomatico > 0 && (
                    <div
                      className={`flex justify-between font-semibold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      <span>Descuento Automático:</span>
                      <span className="font-mono">-${descuentoAutomatico.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>IVA (16%):</span>
                    <span className="font-mono font-medium">${iva.toFixed(2)}</span>
                  </div>
                  <div
                    className={`flex justify-between text-sm font-extrabold border-t pt-1.5 ${
                      isDark
                        ? 'text-white border-slate-700/80'
                        : 'text-slate-900 border-slate-200'
                    }`}
                  >
                    <span>Total a Pagar:</span>
                    <span
                      className={`font-mono ${
                        isDark ? 'text-cyan-400' : 'text-cyan-700'
                      }`}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={handleProcessSale}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                    cart.length > 0
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-600/20 cursor-pointer'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  <span>Procesar Factura y Venta</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSaleModal;
