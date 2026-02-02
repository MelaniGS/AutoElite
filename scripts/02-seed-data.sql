-- Insertar personas de ejemplo
INSERT INTO personas (nombre, apellido, email, telefono, dni, direccion, password, rol) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '+34 612 345 678', '12345678A', 'Calle Mayor 123, Madrid', 'password123', 'CLIENTE'),
('María', 'García', 'maria.garcia@email.com', '+34 623 456 789', '87654321B', 'Avenida Libertad 45, Barcelona', 'password123', 'CLIENTE'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '+34 634 567 890', '11223344C', 'Plaza España 7, Valencia', 'password123', 'CLIENTE'),
('Ana', 'Martínez', 'ana.martinez@email.com', '+34 645 678 901', '44332211D', 'Calle Sol 89, Sevilla', 'password123', 'ADMIN'),
('Luis', 'López', 'luis.lopez@email.com', '+34 656 789 012', '99887766E', 'Avenida Constitución 12, Bilbao', 'password123', 'EMPLEADO');

-- Insertar autos de ejemplo
INSERT INTO autos (marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagen_url, estado) VALUES
('Toyota', 'Corolla', 2023, 25999.00, 15000, 'Blanco', 'Automática', 'Híbrido', 'Sedán compacto con excelente eficiencia de combustible y tecnología avanzada', '/toyota-corolla-blanco-2023.jpg', 'Disponible'),
('BMW', 'Serie 3', 2024, 45999.00, 5000, 'Negro', 'Automática', 'Gasolina', 'Sedán deportivo de lujo con rendimiento excepcional', '/bmw-serie-3-negro-2024.jpg', 'Disponible'),
('Tesla', 'Model 3', 2024, 49999.00, 8000, 'Azul', 'Automática', 'Eléctrico', 'Vehículo eléctrico con tecnología de conducción autónoma', '/tesla-model-3-azul-2024.jpg', 'Disponible'),
('Honda', 'CR-V', 2023, 32999.00, 25000, 'Gris', 'CVT', 'Gasolina', 'SUV familiar espacioso y confiable', '/honda-crv-gris-2023.jpg', 'Reservado'),
('Audi', 'A4', 2023, 42999.00, 12000, 'Plateado', 'Automática', 'Diésel', 'Sedán premium con interior refinado', '/audi-a4-plateado-2023.jpg', 'Disponible'),
('Ford', 'Mustang', 2024, 55999.00, 3000, 'Rojo', 'Manual', 'Gasolina', 'Deportivo icónico americano con potencia impresionante', '/ford-mustang-rojo-2024.jpg', 'Disponible');

-- Insertar reservas de ejemplo
INSERT INTO reservas (persona_id, auto_id, fecha_inicio, fecha_fin, estado, notas) VALUES
(1, 4, '2024-01-15', '2024-01-20', 'Confirmada', 'Persona requiere seguro completo'),
(2, 2, '2024-01-20', '2024-01-25', 'Pendiente', 'Interesado en prueba de manejo extendida'),
(3, 1, '2024-01-10', '2024-01-18', 'Completada', 'Reserva completada sin problemas'),
(4, 6, '2024-02-01', '2024-02-05', 'Confirmada', 'Persona solicita entrega a domicilio');
