import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Usuarios from "../../Modules/Global/Usuarios";
import VinculoCoordenador from "../../Modules/RH/VinculoCoordenador";

// Componente de loading
const LoadingFallback = () => <div>Carregando...</div>;

// Layout do RH (OBRIGATÓRIO para rotas aninhadas)
const RHLayout = () => {
  return (
      <Outlet />
  );
};

// Componentes carregados sob demanda
const Funcionarios = lazy(() => import("../../Modules/RH/Funcionarios"));
const Setores = lazy(() => import("../../Modules/RH/Setores"));

export const rhRoutes = [
  {
    path: "rh", // Rota pai: /rh
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RHLayout />
      </Suspense>
    ),
    children: [
      { 
        index: true, // Rota: /rh (mostra Funcionarios por padrão)
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Funcionarios />
          </Suspense>
        )
      },
      { 
        path: "setores", // Rota: /rh/setores
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Setores />
          </Suspense>
        )
      },
       { 
        path: "usuarios", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Usuarios />
          </Suspense>
        )
      },
      { 
        path: "vinculoCoordenador", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VinculoCoordenador />
          </Suspense>
        )
      }

    ]
  }
];