Sistema de Gerenciamento para Marcenaria
Este projeto é um sistema de gerenciamento desenvolvido para uma marcenaria, composto por API em Node.js, interface em React e banco de dados PostgreSQL. Ele permite controlar clientes, pedidos, materiais, itens de pedido e funcionários, incluindo autenticação e controle de acesso.

Tecnologias
Back-End: Node.js, Express, PostgreSQL, JWT
Front-End: React, React Router, React-Bootstrap
Autenticação: JWT com verificação de token e controle de cargo (gerente e funcionário)
Funcionalidades
Login com CPF e senha
Emissão de token JWT

CRUD completo para:
Clientes
Pedidos
Itens de Pedido

Materiais
Funcionários (somente gerente pode gerenciar)
Menu dinâmico e consumo da API pelo front-end

Endpoints Principais
POST /login – Autenticação
/clientes – CRUD de clientes
/pedidos – CRUD de pedidos
/itenspedido – CRUD de itens de pedido
/materiais – CRUD de materiais
/funcionarios – CRUD restrito ao cargo “G”

Estrutura
Back-End: controllers, usecases, repositories, entities e rotas
Front-End: componentes, páginas e serviços API separados

Como Executar
Configure o .env com dados do banco e SECRET do JWT
Instale as dependências (npm install)
Inicie o back-end (npm run start:dev)
Inicie o front-end (npm start)

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/488ced88-b4fa-47ff-8cab-b58390e13e40" />
