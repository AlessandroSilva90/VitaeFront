import { useState } from "react";
import searchIcon from ".././assets/search.svg";
import { api } from "../services/api";

interface SearchBase {
  rota: string;
  title: string;
}

const SearchComponent = ({ rota, title }: SearchBase) => {
  const [value, setValue] = useState<string>("");

  const handleSearch = async (e: any) => {
    e.preventDefault();
    try{

        const response = await api.get(`${rota}/${value}`);
        console.log(response);
    }catch(err:any){
        console.error("Erro detalhado:", err);
  
        
        if (err.response) {
        
          const errorData = err.response.data;
  
          console.log("Status:", err.response.status);
          console.log("Dados completos:", errorData);

          let mensagem = "Erro desconhecido";
        
        if (typeof errorData === 'string') {
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
              placeholder="Usuário,Crachá ou Nome"
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
