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

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
('Guns n Roses', 'Reino Unido', '18-03-2025', 'Pista VIP', 200, 47),
('AC/DC', 'Phoenix', '19-03-2025', 'Camarote', 300, 32),
('Coldplay', 'São Paulo', '25-04-2025', 'Pista', 150, 100),
('Metallica', 'Los Angeles', '30-04-2025', 'Camarote', 350, 20),
('Beyoncé', 'Nova York', '05-05-2025', 'Pista VIP', 400, 50),
('Ed Sheeran', 'Londres', '10-05-2025', 'Pista', 120, 80),
('Imagine Dragons', 'Berlim', '15-05-2025', 'Camarote', 250, 40),
('The Weeknd', 'Toronto', '20-05-2025', 'Pista VIP', 300, 60),
('Adele', 'Paris', '25-05-2025', 'Camarote', 500, 15),
('Foo Fighters', 'Chicago', '30-05-2025', 'Pista', 180, 70),
('Taylor Swift', 'Tóquio', '05-06-2025', 'Pista VIP', 450, 30),
('Red Hot Chili Peppers', 'Sydney', '10-06-2025', 'Camarote', 320, 25);