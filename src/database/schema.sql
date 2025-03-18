CREATE DATABASE gestao;

\c gestao;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ('Guns n Roses', 'Reino Unido', '18-03-2025', 'Pista VIP', 200, 47),
('AC/DC', 'Phoenix', '19-03-2025', 'Camarote', 300, 32);