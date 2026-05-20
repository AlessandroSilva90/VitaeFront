import "../../App.scss";
import { useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../Components/Pagination2";
import ModalBase from "../../Components/Modal";
import SearchComponent from "../../Components/SearchComponent";

interface Setores {
  codigo: number;
  nome: string;
  descricao?: string;
}

interface SetorSelectionModalProps {
  userId: string;
  buttonText: string;
  buttonVariant: string;
  titulo: string;
}

function SetorSelectionModal({
  userId,
  buttonText,
  buttonVariant,
  titulo,
}: SetorSelectionModalProps) {
  // Estado para manter os setores selecionados
  const [selectedSetores, setSelectedSetores] = useState<number[]>([]);
  const [displayData, setDisplayData] = useState<Setores[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  const {
    data: setores,
    loading,
    pagination,
    setCurrentPage,
  } = usePagination<Setores>("Rh/setores", 10);

    const handleSearchResult = (searchData: any) => {
      console.log(searchData)
    if (searchData === null) {
      setIsSearchMode(false);
      setDisplayData(setores);
    } else {
      setIsSearchMode(true);
      const results = Array.isArray(searchData.data) ? searchData.data : [searchData.data];
      setDisplayData(results);
    }
  };

    useEffect(() => {
    if (!isSearchMode && setores) {
      setDisplayData(setores);
    }
  }, [setores, isSearchMode]);

console.log(selectedSetores)
  return (
    <ModalBase
      id={userId}
      buttonText={buttonText}
      buttonVariant={buttonVariant}
      titulo={titulo}
      dadosParaInserir={selectedSetores}
      rota="Rh/VincularCoordenadorSetor"
    >
      <div>
        <SearchComponent
            rota="Rh/setores"
            // title="VINCULAR COORDENADOR"
            onSearchResult={handleSearchResult}
            placeHolder="Nome, ID"
          />
        {loading ? (
          <div>Carregando setores...</div>
        ) : (
          <>
            <table className="tbl-components">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Selecionar</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((setor) => (
                  <tr key={setor.codigo}>
                    <td>{setor.codigo}</td>
                    <td>{setor.nome}</td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSetores([
                              ...selectedSetores,
                              setor.codigo,
                            ]);
                          } else {
                            setSelectedSetores(
                              selectedSetores.filter((s) => s !== setor.codigo),
                            );
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={setCurrentPage}
              itemsLabel="setores"
            />
            {/* <button onClick={handleSave}>Salvar</button> */}
          </>
        )}
      </div>
    </ModalBase>
  );
}

function VinculoCoordenador() {
  const [displayData, setDisplayData] = useState<Coordenador[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  interface Coordenador {
    id: number;
    nome: string;
    setor?: string;
    dsUsuario: string;
    cracha: string;
  }

  const {
    data: funcionario,
    loading: loadingFuncionario,
    // error: errorFuncionario,
    pagination: paginationFuncionario,
    setCurrentPage: setCurrentPageFuncionario,
  } = usePagination<Coordenador>("Rh/usuarios", 25);

  useEffect(() => {
    console.log(paginationFuncionario);
    if (!isSearchMode && funcionario) {
      setDisplayData(funcionario);
    }
  }, [funcionario, isSearchMode]);

  const handleSearchResult = (searchData: any) => {
    if (searchData === null) {
      // Limpa a busca e volta para todos os dados
      setIsSearchMode(false);
      setDisplayData(funcionario);
    } else {
      // Exibe os resultados da busca
      setIsSearchMode(true);
      // Verifica se a API retorna array ou objeto único
      const results = Array.isArray(searchData) ? searchData : [searchData];
      setDisplayData(results);
    }
  };

  const Loading = () => {
    return "Carregando Dados.....";
  };

  return (
    <>
      {/* <div className="content"> */}
      <main>
        <section>
          <SearchComponent
            rota="Rh/usuarios"
            title="VINCULAR COORDENADOR"
            onSearchResult={handleSearchResult}
            placeHolder="Crachá,Nome,Setor"
          />

          {loadingFuncionario ? (
            <Loading />
          ) : (
            <table className="tbl-components">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Nome</th>
                  <th>Crachá</th>
                  <th>Setor</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((fnc) => (
                  <tr key={fnc.dsUsuario}>
                    <td>{fnc.dsUsuario}</td>
                    <td>{fnc.nome}</td>
                    <td>{fnc.cracha}</td>
                    <td>{fnc.setor || "Sem descrição"}</td>
                    <td>
                      <SetorSelectionModal
                        userId={fnc.dsUsuario}
                        buttonText="Vincular"
                        buttonVariant="warning"
                        titulo="Vincular Setores"
                      />
                    </td>
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
      {/* </div> */}
    </>
  );
}

export default VinculoCoordenador;
