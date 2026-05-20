import { createBrowserRouter } from "react-router-dom";
import Funcionarios from "../Modules/RH/Funcionarios";
import { rhRoutes } from "./Routes/rhroutes";
import { globalRoutes } from "./Routes/GlobalRoutes";
import AuthLayout from "../Components/AuthLayout";
import Login from "../Modules/Auth/Login";
import TemplateContent from "../Components/Template";
import Usuarios from "../Modules/Global/Usuarios";

// import dog from "../assets/crying-dog.gif";
// import dog2 from "../assets/dog_Cry.png";
import dog3 from "../assets/dogcry.png";

const PaginaNaoEncontrada = () => (
  <main>
    <div style={{ textAlign: "center", padding: "50px" }}>
      <img src={dog3} alt="Página não encontrada" width={"250px"} />
      <h1>404 - Página não encontrada</h1>
      <a href="/">Voltar</a>
    </div>
  </main>
);

// Cria o router com TODAS as rotas
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> }, // /auth
    ],
  },
  {
    path: "/",
    element: <TemplateContent />,
    children: [
      { index: true, element: <Funcionarios /> }, // Rota: /
      ...rhRoutes, // Rotas do RH: /rh e /rh/setores
      { path: "*", element: <PaginaNaoEncontrada /> }, // Rota 404
    ],
  },
  {
    path: "/global",
    element: <TemplateContent />,
    children: [
      { index: true, element: <Usuarios /> },
      ...globalRoutes,
      { path: "*", element: <PaginaNaoEncontrada /> },
    ],
  },
]);

export default router;
