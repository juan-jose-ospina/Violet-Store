CREATE DATABASE violetstore;
USE violetstore;

-- Tabla de Usuarios (PRIMERO, porque blog la necesita)
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    codigo_referido VARCHAR(20),
    es_autor BOOLEAN DEFAULT FALSE
);

-- Tabla de Categorías
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de Categorías de Blog
CREATE TABLE categorias_blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de Productos
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_id INT,
    imagen_url VARCHAR(500),
    stock INT DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla de Blog (AHORA CON CONEXIONES)
CREATE TABLE blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(300) NOT NULL,
    contenido TEXT NOT NULL,
    autor_id INT,
    categoria_blog_id INT,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_blog_id) REFERENCES categorias_blog(id)
);

-- Tabla de relación Blog-Producto (posts relacionados con productos)
CREATE TABLE blog_productos (
    blog_id INT,
    producto_id INT,
    PRIMARY KEY (blog_id, producto_id),
    FOREIGN KEY (blog_id) REFERENCES blog(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de Ingredientes
CREATE TABLE ingredientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de relación Producto-Ingrediente
CREATE TABLE producto_ingredientes (
    producto_id INT,
    ingrediente_id INT,
    PRIMARY KEY (producto_id, ingrediente_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id)
);

-- Tabla de Certificaciones
CREATE TABLE certificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de relación Producto-Certificación
CREATE TABLE producto_certificaciones (
    producto_id INT,
    certificacion_id INT,
    PRIMARY KEY (producto_id, certificacion_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id)
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Items del Pedido
CREATE TABLE pedido_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Insertar Usuarios (incluyendo autores del blog)
INSERT INTO usuarios (nombre, email, contrasena, codigo_referido, es_autor) VALUES
('Usuario Demo', 'demo@violetstore.com', 'password123', 'REFDEMO', FALSE),
('María García', 'maria@violetstore.com', 'password123', 'REFMARIA', TRUE),
('Carlos López', 'carlos@violetstore.com', 'password123', 'REFCARLOS', TRUE);

-- Insertar Categorías de Blog
INSERT INTO categorias_blog (nombre) VALUES
('Ingredientes'),
('Rutinas de Belleza'),
('Sustentabilidad'),
('Consejos');

-- Insertar Categorías de Productos
INSERT INTO categorias (nombre) VALUES
('Cuidado Facial'),
('Limpieza'),
('Tratamientos'),
('Protección Solar'),
('Cuidado Labial');

-- Insertar Certificaciones
INSERT INTO certificaciones (nombre) VALUES
('Vegano'),
('Cruelty-Free'),
('Sin Químicos'),
('Ingredientes Puros'),
('Sin Sulfatos');

-- Insertar Ingredientes
INSERT INTO ingredientes (nombre) VALUES
('Vitamina C'),
('Ácido Hialurónico'),
('Aloe Vera'),
('Extracto de Naranja'),
('Manteca de Karité'),
('Aceite de Jojoba'),
('Extracto de Té Verde'),
('Vitamina E'),
('Agua de Rosas'),
('Manzanilla'),
('Glicerina Vegetal'),
('Extracto de Pepino'),
('Arcilla Verde'),
('Carbón Activado'),
('Aceite de Lavanda'),
('Extracto de Árbol de Té');

-- Insertar Productos
INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_url, stock) VALUES
('Sérum Facial Vitamina C', 'Sérum iluminador con vitamina C pura', 45000.00, 1, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', 15),
('Crema Hidratante Natural', 'Hidratación profunda 24 horas', 38000.00, 1, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', 20),
('Limpiador Facial Suave', 'Limpieza suave sin irritación', 28000.00, 2, 'https://images.unsplash.com/photo-1556229010-aa1e1ca11b7c?w=400', 30),
('Mascarilla de Arcilla', 'Purifica y desintoxica la piel', 32000.00, 3, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', 12),
('Tónico Facial Equilibrante', 'Equilibra el pH de la piel', 25000.00, 2, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400', 25),
('Exfoliante Enzimático', 'Exfoliación suave que renueva la piel', 35000.00, 3, 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400', 18),
('Contorno de Ojos Antiedad', 'Reduce ojeras y líneas finas', 42000.00, 1, 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400', 14),
('Aceite Facial Nutritivo', 'Nutrición profunda para la piel', 48000.00, 1, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', 10),
('Protector Solar Natural SPF 50', 'Protección solar de amplio espectro', 55000.00, 4, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', 22),
('Bálsamo Labial Nutritivo', 'Hidratación intensa para labios', 15000.00, 5, 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400', 40),
('Agua Micelar Desmaquillante', 'Limpieza profunda sin resecar', 30000.00, 2, 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400', 28),
('Sérum de Ácido Hialurónico', 'Hidratación profunda', 50000.00, 1, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', 16);

-- Insertar Posts del Blog (AHORA CON AUTOR Y CATEGORÍA)
INSERT INTO blog (titulo, contenido, autor_id, categoria_blog_id) VALUES
('¿Qué es Clean Beauty?', 'Clean Beauty es un movimiento que busca transparencia en los ingredientes de productos cosméticos. Aprende sobre ingredientes naturales y por qué son mejores para tu piel.', 2, 4),
('Ingredientes a Evitar', 'Los sulfatos, parabenos y siliconas son ingredientes que debes evitar en tus productos de belleza. Descubre qué alternativas naturales existen.', 2, 1),
('Rutina de Skincare Natural', 'Una rutina efectiva incluye limpieza, tonificación, tratamiento e hidratación. Te mostramos cómo hacerlo con productos naturales.', 3, 2),
('Belleza Sustentable', 'Elegir productos naturales ayuda a proteger el medio ambiente. Conoce el impacto de la industria cosmética y cómo puedes contribuir.', 3, 3);

-- Relacionar Posts de Blog con Productos
-- El post sobre ingredientes menciona estos productos:
INSERT INTO blog_productos (blog_id, producto_id) VALUES
(1, 1), -- ¿Qué es Clean Beauty? menciona el Sérum Vitamina C
(1, 2), -- También menciona la Crema Hidratante
(2, 1), -- Ingredientes a Evitar habla del Sérum
(2, 3), -- Y del Limpiador
(3, 1), -- Rutina menciona Sérum
(3, 2), -- Crema
(3, 3), -- Limpiador
(3, 5), -- Tónico
(4, 9); -- Belleza Sustentable menciona el Protector Solar

-- Relacionar Productos con Ingredientes
INSERT INTO producto_ingredientes (producto_id, ingrediente_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 5), (2, 6), (2, 7), (2, 8),
(3, 9), (3, 10), (3, 11), (3, 12),
(4, 13), (4, 14), (4, 15), (4, 16),
(5, 9), (5, 10),
(6, 3), (6, 7),
(7, 2), (7, 8),
(8, 6), (8, 8),
(9, 3), (9, 7), (9, 8),
(10, 5), (10, 8),
(11, 9), (11, 11), (11, 12),
(12, 2), (12, 3), (12, 7);

-- Relacionar Productos con Certificaciones
INSERT INTO producto_certificaciones (producto_id, certificacion_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2), (2, 4),
(3, 1), (3, 2), (3, 5),
(4, 1), (4, 2), (4, 4),
(5, 1), (5, 2), (5, 3), (5, 4),
(6, 1), (6, 2), (6, 3),
(7, 1), (7, 2), (7, 4),
(8, 1), (8, 2), (8, 3), (8, 4),
(9, 1), (9, 2), (9, 3),
(10, 1), (10, 2), (10, 4),
(11, 1), (11, 2), (11, 4), (11, 5),
(12, 1), (12, 2), (12, 3);


-- Ver todas las tablas creadas
SHOW TABLES;

-- Contar registros en cada tabla
SELECT 'Productos' as tabla, COUNT(*) as total FROM productos
UNION ALL
SELECT 'Categorías', COUNT(*) FROM categorias
UNION ALL
SELECT 'Ingredientes', COUNT(*) FROM ingredientes
UNION ALL
SELECT 'Certificaciones', COUNT(*) FROM certificaciones
UNION ALL
SELECT 'Blog', COUNT(*) FROM blog
UNION ALL
SELECT 'Usuarios', COUNT(*) FROM usuarios
UNION ALL
SELECT 'Categorías Blog', COUNT(*) FROM categorias_blog;

-- Ver posts de blog con sus autores
SELECT 
    b.titulo,
    u.nombre as autor,
    cb.nombre as categoria,
    b.fecha_publicacion
FROM blog b
JOIN usuarios u ON b.autor_id = u.id
JOIN categorias_blog cb ON b.categoria_blog_id = cb.id;

-- Ver productos mencionados en cada post de blog
SELECT 
    b.titulo as post,
    GROUP_CONCAT(p.nombre SEPARATOR ', ') as productos_mencionados
FROM blog b
LEFT JOIN blog_productos bp ON b.id = bp.blog_id
LEFT JOIN productos p ON bp.producto_id = p.id
GROUP BY b.id, b.titulo;
