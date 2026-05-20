import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Modulos from "../../Modules/Global/Modulos";
import Menus from "../../Modules/Global/Menus";
// import path from "path";
import Perfil from "../../Modules/Global/Perfil";

// Componente de loading
const LoadingFallback = () => <div>Carregando...</div>;
const GlobalLayout = () => {
  return <Outlet />;
};

// Componentes carregados sob demanda
const Usuarios = lazy(() => import("../../Modules/Global/Usuarios"));
export const globalRoutes = [
  {
    path: "/global",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GlobalLayout />
      </Suspense>
    ),
    children: [
      {
        index: true, // Rota padrão
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Usuarios />
          </Suspense>
        ),
      },
      {
        path: "setores",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Usuarios />
          </Suspense>
        ),
      },
      {
        path: "modulos",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Modulos />
          </Suspense>
        ),
      },
      {
        path: "menus",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Menus />
          </Suspense>
        ),
      },
      {
        path: "perfil",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Perfil />
          </Suspense>
        ),
      },
      // {
      //   path: "setores2", // Rota: /rh/setores
      //   element: (
      //     <Suspense fallback={<LoadingFallback />}>
      //       <Usuarios />
      //     </Suspense>
      //   )
      // },
    ],
  },
];
