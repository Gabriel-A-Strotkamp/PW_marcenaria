import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from './componentes/menu'
import Home from './componentes/telas/home'
import Sobre from "./componentes/telas/sobre";

// IMPORTAÇÃO DAS TELAS DO PROJETO
import Cliente from "./componentes/telas/clientes/Cliente";
import Pedido from "./componentes/telas/pedidos/Pedido";
import Funcionario from "./componentes/telas/funcionarios/Funcionario";
import Material from "./componentes/telas/materiais/Material";
import ItemPedido from "./componentes/telas/itenspedido/ItemPedido";
import MenuPublico from './componentes/MenuPublico';
import MenuPrivado from './componentes/MenuPrivado';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MeMenuPublico />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      },
      {
        path : "login",
        element :  <Login/>
      }]},
      // Rotas do projeto
       {path: "/privado",
        element: <MenuPrivado />,
        children: [
      {
        path: "/clientes",
        element: <Cliente />,
      },
      {
        path: "/pedidos",
        element: <Pedido />,
      },
      {
        path: "/funcionarios",
        element: <Funcionario />,
      },
      {
        path: "/materiais",
        element: <Material />,
      },
      {
        path: "/itenspedido",
        element: <ItemPedido />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
