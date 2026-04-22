import { createBrowserRouter } from "react-router-dom";
import Funcionarios from "../Modules/RH/Funcionarios";
import { rhRoutes } from "./Routes/rhroutes";
import { globalRoutes } from "./Routes/GlobalRoutes";
import AuthLayout from "../Components/AuthLayout";
import Login from "../Modules/Auth/Login";
import TemplateContent from "../Components/Template";
import Usuarios from "../Modules/Global/Usuarios";

import dog from "../assets/crying-dog.gif"

const PaginaNaoEncontrada = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <img src={dog} alt="Página não encontrada" />
    <h1>404 - Página não encontrada</h1>
    <a href="/">Voltar</a>
  </div>
);

// Cria o router com TODAS as rotas
const router = createBrowserRouter([
  {
    
    path: "/auth",
    element: <AuthLayout />, 
    children: [
      { index: true, element: <Login /> } // /auth
    ]
  },
  {
    path: "/",
    element: <TemplateContent />,
    children: [
      { index: true, element: <Funcionarios /> }, // Rota: /
      ...rhRoutes, // Rotas do RH: /rh e /rh/setores
      { path: "*", element: <PaginaNaoEncontrada /> } // Rota 404
    ]
  },
  {
    path: "/global",
    element: <TemplateContent />,
    children: [
      { index: true, element: <Usuarios /> }, 
      ...globalRoutes, 
      { path: "*", element: <PaginaNaoEncontrada /> } 
    ]
  }
]);

export default router;
