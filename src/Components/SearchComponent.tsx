import { useState } from "react";
import searchIcon from ".././assets/search.svg";
import { api } from "../services/api";

interface SearchBase {
  rota: string;
  title?: string;
  placeHolder: string;
  onSearchResult?: (data: any) => void;
}

const SearchComponent = ({ rota, title, onSearchResult,placeHolder }: SearchBase) => {

  const [value, setValue] = useState<string>("");
  const [, setIsSearching] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!value.trim()) {
      // Se a busca estiver vazia, recarrega todos os dados
      if (onSearchResult) {
        onSearchResult(null); // null indica para carregar todos
      }
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get(`${rota}/${value}`);
      if (onSearchResult) {
        onSearchResult(response.data); // Envia os resultados para o pai
      }
      // console.log(response.data);
    } catch (err: any) {
      console.error("Erro detalhado:", err);

      if (err.response) {
        const errorData = err.response.data;

        console.log("Status:", err.response.status);
        console.log("Dados completos:", errorData);

        let mensagem = "Erro desconhecido";

        if (typeof errorData === "string") {
          mensagem = errorData; // Se for string direta
        } else if (errorData?.message) {
          mensagem = errorData.message; // Se for objeto com message
        } else if (errorData?.title) {
          mensagem = errorData.title; // Se for ProblemDetails do .NET
        }

        console.log("Mensagem:", mensagem);

        // Exibir para o usuário
        alert(mensagem);
      }
    }
  };

  return (
    <div className="title-query">
      <h2 className="titlePage">{title}</h2>
      <div className="form-group ">
        <div className="icon-search-group">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name=""
              id="srcInputData"
              placeholder={placeHolder}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </form>
          <img
            src={searchIcon}
            alt="Ícone de pesquisa"
            style={{ width: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
