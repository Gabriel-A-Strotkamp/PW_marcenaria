create table Clientes(
clienteId integer not null primary key,
nome varchar(50) not null,
telefone varchar(11),
endereco varchar(100),
cpf varchar(11)not null
);

create table Pedidos(
pedidoId integer not null primary key,
descricao varchar(100) not null,
orcamento decimal(10,2) not null,
data_inicio varchar(10) not null,
data_entrega varchar(10) not null,
cliente integer not null,
foreign key (cliente) references Clientes(clienteID)
);

Create Table Materiais(
materialID integer not null primary key,
valor decimal(10,2),
descricao varchar(100)
);

create table ItensPedido(
itemID integer not null primary key,
pedido int not null,
material int not null,
quantidade int not null,
valor decimal(10,2) not null,
foreign key (pedido) references Pedidos(pedidoID),
foreign key (material) references Materiais(materialID)
);

Create table Funcionários(
id integer not null,
nome varchar(50) not null,
cpf varchar(11) not null,
senha varchar(8) not null,
cargo varchar(1) not null, --G(gerente),F(funcionario),S(supervisor)
telefone varchar(11)
);

INSERT INTO Clientes (clienteId, nome, telefone, endereco, cpf) VALUES
(1, 'João Pereira', '53999123456', 'Rua das Flores, 120', '12345678901'),
(2, 'Maria Silva', '53999234567', 'Av. Brasil, 450', '98765432100'),
(3, 'Carlos Eduardo', '53999345678', 'Rua das Acácias, 75', '11122233344');

INSERT INTO Pedidos (pedidoId, descricao, orcamento, data_inicio, data_entrega, cliente) VALUES
(1, 'Armário planejado para cozinha', 3500.00, '2025-01-10', '2025-02-05', 1),
(2, 'Mesa de jantar de madeira maciça', 1800.00, '2025-01-15', '2025-01-30', 2),
(3, 'Guarda-roupa 6 portas', 4200.00, '2025-02-02', '2025-03-10', 3);

INSERT INTO Materiais (materialID, valor, descricao) VALUES
(1, 150.00, 'Placa MDF 18mm'),
(2, 75.50, 'Cola de madeira 1L'),
(3, 220.00, 'Verniz fosco 5L');

INSERT INTO ItensPedido (itemID, pedido, material, quantidade, valor) VALUES
(1, 1, 1, 4, 600.00),
(2, 1, 3, 1, 220.00),
(3, 2, 1, 2, 300.00);

INSERT INTO Funcionarios (id, nome, cpf, senha, cargo, telefone) VALUES
(1, 'Fernanda Lopes', '22233344455', 'abcd1234', 'G', '53999456789'),
(2, 'Ricardo Moura', '33344455566', 'mnpq5678', 'F', '53999567890'),
(3, 'Ana Costa', '44455566677', 'zxyw4321', 'S', '53999678901');

SELECT * FROM Materiais ORDER BY descricao