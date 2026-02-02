-- Tabla Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Tabla FooterData
CREATE TABLE IF NOT EXISTS footer_data (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(255) NOT NULL UNIQUE,
    value VARCHAR(500) NOT NULL
);

-- Comentarios
COMMENT ON TABLE usuarios IS 'Tabla para gestionar usuarios del sistema';
COMMENT ON TABLE footer_data IS 'Tabla para configuración dinámica del pie de página';
