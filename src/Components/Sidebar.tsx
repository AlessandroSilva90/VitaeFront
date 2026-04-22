import React, { useState, useEffect } from "react";

import sandwich from "../assets/hamburger.svg"

// Interface para definir o tipo dos itens do menu
interface MenuItem {
  id: string;
  texto: string;
  conteudo: string;
}

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

  // Dados dos itens do menu
  const menuItems: MenuItem[] = [
    { id: "inicio", texto: "Início", conteudo: "inicio" },
    {
      id: "dashboard",
      texto: "Dashboard",
      conteudo: "dashboard",
    },
    { id: "perfil", texto: "Perfil", conteudo: "perfil" },
    {
      id: "configuracoes",
      texto: "Configurações",
      conteudo: "configuracoes",
    },
    {
      id: "mensagens",
      texto: "Mensagens",
      conteudo: "mensagens",
    },
    {
      id: "arquivos",
      texto: "Arquivos",
      conteudo: "arquivos",
    },
  ];

  // Efeito para monitorar a largura da tela
  useEffect(() => {
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
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Função para lidar com o clique em um item do menu
  const handleMenuItemClick = (item: MenuItem) => {
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
          <img src={sandwich} width='30px' className="sandwich"/>
        </button>
      </div>

      <nav>
        <ul className="menu-lista">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${itemAtivo === item.id ? "ativo" : ""}`}
              data-conteudo={item.conteudo}
              onClick={() => handleMenuItemClick(item)}
            >
              <i className=""></i>
              <span className={`menu-texto ${menuRetraido ? "hidden" : ""}`}>
                {item.texto}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
