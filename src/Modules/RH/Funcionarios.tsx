import "../../App.scss";
import { useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import SearchComponent from "../../Components/SearchComponent";
import Pagination from "../../Components/Pagination2";

interface Funcionario {
  id: number;
  nome: string;
  setor?: string;
}

function Funcionarios() {
  const [displayData, setDisplayData] = useState<Funcionario[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  const {
    data: funcionario,
    loading: loadingFuncionario,
    // error: errorFuncionario,
    pagination: paginationFuncionario,
    setCurrentPage: setCurrentPageFuncionario,
  } = usePagination<Funcionario>("Rh/funcionarios", 25);

  useEffect(() => {
    if (!isSearchMode && funcionario) {
      setDisplayData(funcionario);
    }
  }, [funcionario, isSearchMode]);

  const handleSearchResult = (searchData: any) => {
    if (searchData === null) {
      setIsSearchMode(false);
      setDisplayData(funcionario);
    } else {
      setIsSearchMode(true);
      const results = Array.isArray(searchData) ? searchData : [searchData];
      setDisplayData(results);
    }
  };

  const Loading = () => {
    return "Carregando Dados.....";
  };

  return (
    <>
      <main>
        <section>
          <SearchComponent rota="Rh/funcionarios" title="Funcionários"  onSearchResult={handleSearchResult} placeHolder="Crachá" />
          {loadingFuncionario ? (
            <Loading />
          ) : (
            <table className="tbl-components">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Setor</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((fnc) => (
                  <tr key={fnc.id}>
                    <td>{fnc.id}</td>
                    <td>{fnc.nome}</td>
                    <td>{fnc.setor || "Sem descrição"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            currentPage={paginationFuncionario.currentPage}
            totalPages={paginationFuncionario.totalPages}
            totalItems={paginationFuncionario.totalItems}
            hasNextPage={paginationFuncionario.hasNextPage}
            hasPreviousPage={paginationFuncionario.hasPreviousPage}
            onPageChange={setCurrentPageFuncionario}
            itemsLabel="usuario"
          />
        </section>
      </main>
    </>
  );
}

export default Funcionarios;
