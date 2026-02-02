-- Crear base de datos
-- CREATE DATABASE concesionaria_db;

-- Tabla de Personas
CREATE TABLE IF NOT EXISTS personas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    direccion VARCHAR(255),
    rol VARCHAR(20) DEFAULT 'CLIENTE',
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Autos
CREATE TABLE IF NOT EXISTS autos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INTEGER NOT NULL,
    precio DECIMAL(12, 2) NOT NULL,
    kilometraje INTEGER DEFAULT 0,
    color VARCHAR(30),
    transmision VARCHAR(20) CHECK (transmision IN ('Manual', 'Automática', 'CVT')),
    combustible VARCHAR(20) CHECK (combustible IN ('Gasolina', 'Diésel', 'Eléctrico', 'Híbrido')),
    descripcion TEXT,
    imagen_url VARCHAR(500),
    estado VARCHAR(20) CHECK (estado IN ('Disponible', 'Reservado', 'Vendido')) DEFAULT 'Disponible',
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL,
    auto_id INTEGER NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Confirmada', 'Completada', 'Cancelada')) DEFAULT 'Pendiente',
    notas TEXT,
    CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE,
    CONSTRAINT fk_auto FOREIGN KEY (auto_id) REFERENCES autos(id) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_personas_email ON personas(email);
CREATE INDEX idx_autos_estado ON autos(estado);
CREATE INDEX idx_reservas_cliente ON reservas(persona_id);
CREATE INDEX idx_reservas_auto ON reservas(auto_id);
CREATE INDEX idx_reservas_estado ON reservas(estado);

-- Comentarios en las tablas
COMMENT ON TABLE personas IS 'Tabla para almacenar información de personas';
COMMENT ON TABLE autos IS 'Tabla para almacenar inventario de vehículos';
COMMENT ON TABLE reservas IS 'Tabla para gestionar reservas de vehículos';
