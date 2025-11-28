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

Create Table Produtos(
produtoID integer not null primary key,
valor decimal(10,2),
descricao varchar(100)
);

create table ItensPedido(
itemID integer not null primary key,
pedido int not null,
produto int not null,
quantidade int not null,
valor decimal(10,2) not null,
foreign key (pedido) references Pedidos(pedidoID),
foreign key (produto) references Produtos(produtoID)
);

Create table Funcionários(
id integer not null,
nome varchar(50) not null,
cpf varchar(11) not null,
senha varchar(8) not null,
cargo varchar(1) not null, --G(gerente),F(funcionario),S(supervisor)
telefone varchar(11)
);
