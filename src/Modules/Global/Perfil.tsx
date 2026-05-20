import { useEffect, useState } from "react";
import SearchComponent from "../../Components/SearchComponent";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../Components/Pagination2";
import EditModal from "../../Components/EditModal";
import DeleteModal from "../../Components/DeleteModal";
import ModalBase from "../../Components/Modal";
import { useForm } from "react-hook-form";

interface Perfil {
  id: string;
  dsPerfil: string;
  snAtivo: boolean;
}

const Perfil = () => {
  const [displayData, setDisplayData] = useState<Perfil[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  // Edição
  const [editPerfil, setEditPerfil] = useState<any>(null);

  const handleGetDataSuccess = (dados: any) => {
    setEditPerfil(dados);
  };

  const handleSuccess = () => {
    reset(); // Limpa o formulário
    atualizaDados(); // Recarrega a lista
  };

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Perfil>();

  const getFormData = () => {
    const values = getValues();
    return values;
  };

  const {
    data: Perfil,
    loading: loadingPerfil,
    refetch: atualizaDados,
    pagination: paginationPerfil,
    setCurrentPage: setCurrentPagePerfil,
  } = usePagination<Perfil>("Modules/perfil", 25);

  console.log(Perfil);

  useEffect(() => {
    if (!isSearchMode && Perfil) {
      setDisplayData(Perfil);
    }
  }, [Perfil, isSearchMode]);

  const handleSearchResult = (searchData: any) => {
    if (searchData === null) {
      setIsSearchMode(false);
      setDisplayData(Perfil);
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
    <main>
      <section>
        <SearchComponent
          rota="Modules/perfil"
          title="Perfil"
          onSearchResult={handleSearchResult}
          placeHolder="Nome"
        />

        {loadingPerfil ? (
          <Loading />
        ) : (
          <table className="tbl-components">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ativo ?</th>
                {/* <th>Setor</th> */}
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.dsPerfil}</td>
                  <td>{m.snAtivo ? "Sim" : "Não"}</td>
                  <td>
                    <EditModal
                      id={m.id}
                      buttonText="Editar"
                      buttonVariant="warning"
                      titulo="Editar Perfil"
                      rotaGet="Modules/perfil"
                      rotaUpdate="Modules/perfil"
                      onGetDataSuccess={handleGetDataSuccess}
                      dadosParaAtualizar={editPerfil}
                      onUpdateSuccess={() => handleSuccess()}
                    >
                      <form>
                        <div className="form-group-md">
                          <label>Nome</label>
                          <input
                            type="text"
                            placeholder=""
                            required
                            value={editPerfil?.dsPerfil || ""}
                            onChange={(e) =>
                              setEditPerfil({
                                ...editPerfil,
                                dsPerfil: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Ativo ?</label>
                          <input
                            type="checkbox"
                            className="inpt-check"
                            checked={editPerfil?.snAtivo || false}
                            onChange={(e) =>
                              setEditPerfil({
                                ...editPerfil,
                                snAtivo: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </form>
                    </EditModal>
                    <DeleteModal
                      id={m.id}
                      buttonText="Excluir"
                      buttonVariant="danger"
                      titulo="Excluir"
                      rota="Modules/perfil"
                      onDeleteSuccess={() => handleSuccess()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={paginationPerfil.currentPage}
          totalPages={paginationPerfil.totalPages}
          totalItems={paginationPerfil.totalItems}
          hasNextPage={paginationPerfil.hasNextPage}
          hasPreviousPage={paginationPerfil.hasPreviousPage}
          onPageChange={setCurrentPagePerfil}
          itemsLabel="Perfils"
        />
      </section>

      <ModalBase
        buttonText="Novo Perfil"
        buttonVariant="success"
        titulo="Cadastro"
        dadosParaInserir={null}
        onGetFormData={getFormData}
        onSuccess={handleSuccess}
        rota="Modules/Perfil"
      >
        <form>
          <div className="form-group-md">
            <label>Nome</label>
            <input
              {...register("dsPerfil")}
              type="text"
              placeholder=""
              required
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register("dsPerfil").onChange(e);
              }}
            />
          </div>

          <div className="form-group-md">
            <label>Ativo ?</label>
            <input
              type="checkbox"
              className="inpt-check"
              {...register("snAtivo")}
              defaultChecked={true}
            />
          </div>

          <button type="submit" style={{ display: "none" }} />
        </form>
      </ModalBase>
    </main>
  );
};

export default Perfil;
