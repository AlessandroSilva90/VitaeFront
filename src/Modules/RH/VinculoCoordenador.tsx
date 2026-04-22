import "../../App.scss";
import { useState } from "react";
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

  const {
    data: setores,
    loading,
    pagination,
    setCurrentPage,
  } = usePagination<Setores>("Rh/setores", 25);

  const handleSave = async () => {
    // Salvar os setores selecionados para este usuário
    // await api.post(`Rh/vincularSetor/${userId}`, { setores: selectedSetores });
    // console.log(selectedSetores)
    // Fechar modal ou mostrar sucesso
  };

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
                {setores.map((setor) => (
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
            <button onClick={handleSave}>Salvar</button>
          </>
        )}
      </div>
    </ModalBase>
  );
}

function VinculoCoordenador() {
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
    error: errorFuncionario,
    pagination: paginationFuncionario,
    setCurrentPage: setCurrentPageFuncionario,
  } = usePagination<Coordenador>("Rh/usuarios", 25);

  // const {
  //   data: Setores,
  //   loading: loadingSetores,
  //   error: errorSetores,
  //   pagination: paginationSetores,
  //   setCurrentPage: setCurrentPageSetores,
  // } = usePagination<Setores>("Rh/setores", 25);

  const Loading = () => {
    return "Carregando Dados.....";
  };

  function handleGetDataSuccess(data: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {/* <div className="content"> */}
      <main>
        <section>
          
            <SearchComponent rota="Rh/usuarios" title="VINCULAR COORDENADOR"/>

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
                {funcionario.map((fnc) => (
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
