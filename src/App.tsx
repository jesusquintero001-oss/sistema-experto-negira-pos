import { useState } from 'react';
import { Sidebar, type TabKey } from './components/Sidebar';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { SalesTrendChart } from './components/SalesTrendChart';
import { RecentReturnsTable } from './components/RecentReturnsTable';
import { ActiveOffers } from './components/ActiveOffers';
import { AutomaticCombos } from './components/AutomaticCombos';
import { MonthlyEarnings } from './components/MonthlyEarnings';
import { ExpirationAlerts } from './components/ExpirationAlerts';
import { NewSaleModal } from './components/NewSaleModal';
import { InventarioView } from './components/Views/InventarioView';
import { FacturacionView } from './components/Views/FacturacionView';
import { OfertasCombosView } from './components/Views/OfertasCombosView';
import { GananciasView } from './components/Views/GananciasView';
import { DevolucionesView } from './components/Views/DevolucionesView';
import { VencimientosView } from './components/Views/VencimientosView';
import { PostgresView } from './components/Views/PostgresView';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import {
  metricasIniciales,
  devolucionesMock,
  ofertasActivasMock,
  combosDescuentosMock,
  lotesVencimientosMock,
  catalogoProductosMock,
  facturasMock,
} from './data/mockData';
import type { Factura } from './types/database';

function DashboardApp() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [dateRange, setDateRange] = useState('Hoy, 15 de Oct');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  // Dynamic state for live updates
  const [metrics, setMetrics] = useState(metricasIniciales);
  const [facturas, setFacturas] = useState(facturasMock);
  const [productos] = useState(catalogoProductosMock);
  const [devoluciones] = useState(devolucionesMock);
  const [ofertas] = useState(ofertasActivasMock);
  const [combos] = useState(combosDescuentosMock);
  const [lotes] = useState(lotesVencimientosMock);

  // Handle successful sale from POS modal
  const handleSaleComplete = (newFactura: Factura, itemsCount: number, descuento: number) => {
    setFacturas((prev) => [newFactura, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      total_productos_vendidos: prev.total_productos_vendidos + itemsCount,
      total_facturas: prev.total_facturas + 1,
      facturas_pagadas: prev.facturas_pagadas + 1,
      total_transacciones: prev.total_transacciones + 1,
      volumen_transacciones: prev.volumen_transacciones + newFactura.total,
      descuentos_automaticos_mes: prev.descuentos_automaticos_mes + descuento,
      ganancias_mensuales_brutas: prev.ganancias_mensuales_brutas + newFactura.total,
      ganancias_mensuales_netas: prev.ganancias_mensuales_netas + newFactura.total * 0.28,
    }));
  };

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-200 ${
        isDark
          ? 'bg-[#0b0f19] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'bg-slate-50 text-slate-900 selection:bg-cyan-100 selection:text-cyan-900'
      }`}
    >
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header
          onOpenNewSale={() => setIsSaleModalOpen(true)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadCount={1}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-5">
              {/* Top Dashboard Title & Status */}
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className={`text-2xl font-black tracking-tight flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    <span>Dashboard</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        isDark
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                      }`}
                    >
                      NEGIRA S.A.
                    </span>
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Visión consolidada del Sistema Experto POS • En línea y sincronizado
                  </p>
                </div>
              </div>

              {/* Row 1: KPI Stats Cards (Total Productos Vendidos, Total Facturas, Ganancias, Descuentos Automáticos, Total Transacciones) */}
              <KpiCards metrics={metrics} />

              {/* Row 2: Sales Trend Chart & Recent Returns Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8">
                  <SalesTrendChart />
                </div>
                <div className="lg:col-span-4">
                  <RecentReturnsTable
                    returns={devoluciones}
                    onViewAllReturns={() => setActiveTab('devoluciones')}
                  />
                </div>
              </div>

              {/* Row 3: 4 Panels matching prompt & mockup:
                  1. Ofertas Activas
                  2. Combos con Descuentos Automáticos
                  3. Ganancias Mensuales (Donut chart)
                  4. Alertas de Vencimiento Inminentes (Red alert table)
              */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <ActiveOffers
                  offers={ofertas}
                  onSelectOffer={() => setActiveTab('ofertas')}
                />
                <AutomaticCombos combos={combos} />
                <MonthlyEarnings
                  grossEarnings={metrics.ganancias_mensuales_brutas}
                  netEarnings={metrics.ganancias_mensuales_netas}
                />
                <ExpirationAlerts
                  batches={lotes}
                  onViewAll={() => setActiveTab('vencimientos')}
                />
              </div>
            </div>
          )}

          {activeTab === 'inventario' && <InventarioView productos={productos} />}

          {activeTab === 'facturacion' && <FacturacionView facturas={facturas} />}

          {activeTab === 'ofertas' && (
            <OfertasCombosView ofertas={ofertas} combos={combos} />
          )}

          {activeTab === 'ganancias' && <GananciasView metrics={metrics} />}

          {activeTab === 'devoluciones' && (
            <DevolucionesView devoluciones={devoluciones} />
          )}

          {activeTab === 'vencimientos' && <VencimientosView lotes={lotes} />}

          {activeTab === 'postgresql' && <PostgresView />}
        </main>
      </div>

      {/* POS Quick Sale Modal */}
      <NewSaleModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        productos={productos}
        onSaleComplete={handleSaleComplete}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <DashboardApp />
    </ThemeProvider>
  );
}

export default App;
