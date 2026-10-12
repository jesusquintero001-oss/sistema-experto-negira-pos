// Tipos de datos para el Sistema Experto POS Negira S.A.
// Diseñados estrictamente en TypeScript mapeados a tablas PostgreSQL

export interface Producto {
  id: string;
  codigo_barras: string;
  nombre: string;
  categoria: string;
  precio_costo: number;
  precio_venta: number;
  stock_actual: number;
  stock_minimo: number;
  unidad_medida: string;
  requiere_lote: boolean;
}

export interface LoteVencimiento {
  id: string;
  producto_id: string;
  producto_nombre: string;
  numero_batch: string;
  fecha_fabricacion: string;
  fecha_vencimiento: string;
  cantidad_restante: number;
  dias_restantes: number;
  estado_alerta: 'CRITICO' | 'ALTO' | 'MODERADO' | 'OPTIMO';
  ubicacion_estante: string;
}

export interface Factura {
  id: string;
  numero_factura: string;
  cliente_nombre: string;
  cliente_documento: string;
  fecha_emision: string;
  subtotal: number;
  descuento_automatico: number;
  impuesto_iva: number;
  total: number;
  estado: 'PAGADA' | 'PENDIENTE' | 'ANULADA';
  metodo_pago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';
}

export interface OfertaActiva {
  id: string;
  titulo: string;
  porcentaje_descuento: number;
  descripcion: string;
  categoria_aplicable: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'ACTIVA' | 'PROGRAMADA' | 'EXPIRADA';
  color_acento: 'cyan' | 'green' | 'blue' | 'purple';
}

export interface ComboDescuento {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  regla: string; // ej. "2 unidendis x 1" o "1 portencio 2"
  descuento_aplicado: number;
  ahorro_texto: string;
  total_aplicado_mes: number;
  activo: boolean;
}

export interface Devolucion {
  id: string;
  codigo_retorno: string;
  producto_nombre: string;
  numero_batch: string;
  cantidad: number;
  monto: number;
  motivo: string;
  fecha_hora: string;
  estado: 'APROBADA' | 'EN_REVISION' | 'RECHAZADA';
  autorizado_por: string;
}

export interface MetricaDashboard {
  total_productos_vendidos: number;
  total_facturas: number;
  facturas_pagadas: number;
  facturas_pendientes: number;
  facturas_anuladas: number;
  descuentos_automaticos_mes: number;
  combos_aplicados_count: number;
  total_transacciones: number;
  volumen_transacciones: number;
  ganancias_mensuales_brutas: number;
  ganancias_mensuales_netas: number;
  margen_operativo: number;
}

export interface PuntoGraficaVenta {
  mes: string;
  dia?: string;
  fecha_label: string;
  ventas: number;
  tendencia: number;
  transacciones: number;
}
