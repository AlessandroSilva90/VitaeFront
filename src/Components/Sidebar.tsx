import React, { useState, useEffect } from "react";

// import sandwich from "../assets/hamburger.svg"
import star from "../assets/star.svg";

// Interface para definir o tipo dos itens do menu
// interface MenuItem {
//   id: string;
// }
// aaaaaaaaaaaaa
import { api } from "../services/api";

import cadastro from "../assets/lista.svg";
import relatorio from "../assets/arquivo-pdf.svg";
import tarefas from "../assets/chave-simples.svg";
import consulta from "../assets/procurar.svg";

const Sidebar: React.FC = () => {
  // Estado para controlar se o menu está retraído
  const [menuRetraido, setMenuRetraido] = useState<boolean>(false);

  // Estado para controlar se o menu está expandido (apenas mobile)
  const [menuExpandido, setMenuExpandido] = useState<boolean>(false);

  // Estado para controlar o item ativo do menu
  const [itemAtivo, setItemAtivo] = useState<string>("inicio");

  // Estado para controlar o título da página
  //   const [tituloPagina, setTituloPagina] = useState<string>("Página Inicial");

  // Estado para controlar a largura da tela (responsividade)
  const [larguraTela, setLarguraTela] = useState<number>(window.innerWidth);

  const [menus, setMenus] = useState<any>([]);

  const icones: any = { 0: cadastro, 3: relatorio, 1: tarefas, 2: consulta };

  // Efeito para monitorar a largura da tela
  useEffect(() => {
    const getMenusPerfil = async () => {
      const response = await api.get("Modules/menus");
      setMenus(response.data.data);
    };
    getMenusPerfil();

    const handleResize = () => {
      setLarguraTela(window.innerWidth);

      // Em telas menores, garantir que o menu não fique retraído por padrão
      if (window.innerWidth <= 768 && menuRetraido) {
        setMenuRetraido(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpeza do event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuRetraido]);

  // Função para alternar o estado retraído do menu
  const toggleMenu = () => {
    setMenuRetraido(!menuRetraido);
  };

  // Função para capitalizar a primeira letra de uma string
  // const capitalizeFirstLetter = (string: string): string => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };

  // Função para lidar com o clique em um item do menu
  const handleMenuItemClick = (item: any) => {
    setItemAtivo(item.id);
    // setTituloPagina(item.texto);

    // Em dispositivos móveis, fechar o menu após selecionar um item
    if (larguraTela <= 768) {
      setMenuExpandido(false);
    }
  };

  // Função para lidar com o clique no cabeçalho do menu (mobile)
  const handleMenuHeaderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (larguraTela <= 768 && e.target === e.currentTarget) {
      setMenuExpandido(!menuExpandido);
    }
  };

  // Determinar classes do menu lateral com base nos estados
  const menuLateralClasses = `
    ${menuRetraido ? "retraido" : ""} 
    ${larguraTela <= 768 ? (menuExpandido ? "expandido" : "") : ""}
  `.trim();

  return (
    <aside id="menuLateral" className={menuLateralClasses}>
      <div className="menu-header" onClick={handleMenuHeaderClick}>
        <div className="logo">
          <i className="fas fa-code"></i>
          <span className={`logo-texto ${menuRetraido ? "hidden" : ""}`}>
            Vitae
          </span>
        </div>
        <button className="menu-toggle" id="toggleMenu" onClick={toggleMenu}>
          {/* <i
            className={menuRetraido ? "fas fa-chevron-right" : "fas fa-bars"}
          ></i> */}
          <img src={star} width="25px" className="sandwich" />
        </button>
      </div>

      <nav>
        <ul className="menu-lista">
          {menus.map((item: any, indice: number) => (
            <li
              key={item.id}
              className={`menu-item ${itemAtivo === item.id ? "ativo" : ""}`}
              data-conteudo={item.nmMenu}
              onClick={() => handleMenuItemClick(item)}
            >
              <div className="menu-list-item">
                <img src={icones[indice]} width={24} />

                <span className={`menu-texto ${menuRetraido ? "hidden" : ""}`}>
                  {item.nmMenu}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
