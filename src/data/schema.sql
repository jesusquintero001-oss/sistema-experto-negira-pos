-- =========================================================================
-- SISTEMA EXPERTO POS DE VENTAS NEGIRA S.A.
-- Esquema de Base de Datos PostgreSQL
-- Especificado en Pizarra: HTML | CSS | TypeScript | React | PostgreSQL
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_barras VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio_costo NUMERIC(12, 2) NOT NULL,
    precio_venta NUMERIC(12, 2) NOT NULL,
    stock_actual INTEGER NOT NULL DEFAULT 0,
    stock_minimo INTEGER NOT NULL DEFAULT 5,
    unidad_medida VARCHAR(20) DEFAULT 'UNIDAD',
    requiere_lote BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Lotes y Control de Vencimientos (Alertas de vencimiento)
CREATE TABLE IF NOT EXISTS lotes_vencimiento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    numero_batch VARCHAR(50) NOT NULL,
    fecha_fabricacion DATE,
    fecha_vencimiento DATE NOT NULL,
    cantidad_inicial INTEGER NOT NULL,
    cantidad_restante INTEGER NOT NULL,
    ubicacion_estante VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'ACTIVO', -- ACTIVO, AGOTADO, VENCIDO, RETIRADO
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Ofertas Activas y Descuentos
CREATE TABLE IF NOT EXISTS ofertas_activas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(150) NOT NULL,
    porcentaje_descuento NUMERIC(5, 2) NOT NULL,
    categoria_aplicable VARCHAR(100),
    descripcion TEXT,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    activa BOOLEAN DEFAULT TRUE
);

-- 4. Tabla de Combos con Descuentos Automáticos
CREATE TABLE IF NOT EXISTS combos_descuentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_combo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    regla_aplicacion VARCHAR(150) NOT NULL, -- Ej: '2 x 1', 'Combo Familiar', '1 porcendio 2'
    descuento_monto NUMERIC(10, 2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    veces_aplicado_mes INTEGER DEFAULT 0
);

-- 5. Tabla de Facturas y Ventas
CREATE TABLE IF NOT EXISTS facturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_factura VARCHAR(50) UNIQUE NOT NULL,
    cliente_nombre VARCHAR(150) NOT NULL,
    cliente_documento VARCHAR(50) NOT NULL,
    fecha_emision TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    subtotal NUMERIC(12, 2) NOT NULL,
    descuento_automatico NUMERIC(12, 2) DEFAULT 0.00,
    impuesto_iva NUMERIC(12, 2) NOT NULL,
    total NUMERIC(12, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'PAGADA', -- PAGADA, PENDIENTE, ANULADA
    metodo_pago VARCHAR(50) DEFAULT 'EFECTIVO'
);

-- 6. Tabla de Devoluciones
CREATE TABLE IF NOT EXISTS devoluciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_retorno VARCHAR(50) UNIQUE NOT NULL,
    factura_id UUID REFERENCES facturas(id),
    producto_id UUID REFERENCES productos(id),
    numero_batch VARCHAR(50) NOT NULL,
    cantidad INTEGER NOT NULL,
    monto_reembolsado NUMERIC(12, 2) NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    estado VARCHAR(20) DEFAULT 'APROBADA', -- APROBADA, EN_REVISION, RECHAZADA
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimización de alto rendimiento
CREATE INDEX IF NOT EXISTS idx_lotes_fecha_vencimiento ON lotes_vencimiento(fecha_vencimiento);
CREATE INDEX IF NOT EXISTS idx_facturas_fecha_emision ON facturas(fecha_emision);
CREATE INDEX IF NOT EXISTS idx_devoluciones_batch ON devoluciones(numero_batch);
