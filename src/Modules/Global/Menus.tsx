import { useEffect, useState } from "react";
import SearchComponent from "../../Components/SearchComponent";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../Components/Pagination2";
import EditModal from "../../Components/EditModal";
import DeleteModal from "../../Components/DeleteModal";
import ModalBase from "../../Components/Modal";
import { useForm } from "react-hook-form";

interface Menu {
  id: string;
  nmMenu: string;
  snAtivo: boolean;
}

const Menus = () => {
  const [displayData, setDisplayData] = useState<Menu[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  // Edição
  const [editMenu, setEditMenu] = useState<any>(null);

  const handleGetDataSuccess = (dados: any) => {
    setEditMenu(dados);
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
  } = useForm<Menu>();

  const getFormData = () => {
    const values = getValues();
    return values;
  };

  const {
    data: menu,
    loading: loadingMenu,
    refetch: atualizaDados,
    pagination: paginationMenu,
    setCurrentPage: setCurrentPageMenu,
  } = usePagination<Menu>("Modules/menus", 25);

  useEffect(() => {
    if (!isSearchMode && menu) {
      setDisplayData(menu);
    }
  }, [menu, isSearchMode]);

  const handleSearchResult = (searchData: any) => {
    if (searchData === null) {
      setIsSearchMode(false);
      setDisplayData(menu);
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
          rota="Rh/usuarios"
          title="Menus"
          onSearchResult={handleSearchResult}
          placeHolder="Nome"
        />

        {loadingMenu ? (
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
                  <td>{m.nmMenu}</td>
                  <td>{m.snAtivo ? "Sim" : "Não"}</td>
                  <td>
                    <EditModal
                      id={m.id}
                      buttonText="Editar"
                      buttonVariant="warning"
                      titulo="Editar Menu"
                      rotaGet="Modules/menus"
                      rotaUpdate="Modules/menus"
                      onGetDataSuccess={handleGetDataSuccess}
                      dadosParaAtualizar={editMenu}
                      onUpdateSuccess={() => handleSuccess()}
                    >
                      <form>
                        <div className="form-group-md">
                          <label>Nome</label>
                          <input
                            type="text"
                            placeholder=""
                            required
                            value={editMenu?.nmMenu || ""}
                            onChange={(e) =>
                              setEditMenu({
                                ...editMenu,
                                nmMenu: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Ativo ?</label>
                          <input
                            type="checkbox"
                            className="inpt-check"
                            checked={editMenu?.snAtivo || false}
                            onChange={(e) =>
                              setEditMenu({
                                ...editMenu,
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
                      rota="Rh/deleUsuario"
                      //   onDeleteSuccess={() => fetchmodulosPaginados(currentPage)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={paginationMenu.currentPage}
          totalPages={paginationMenu.totalPages}
          totalItems={paginationMenu.totalItems}
          hasNextPage={paginationMenu.hasNextPage}
          hasPreviousPage={paginationMenu.hasPreviousPage}
          onPageChange={setCurrentPageMenu}
          itemsLabel="menus"
        />
      </section>

      <ModalBase
        buttonText="Novo Menu"
        buttonVariant="success"
        titulo="Cadastro"
        dadosParaInserir={null}
        onGetFormData={getFormData}
        onSuccess={handleSuccess}
        rota="Modules/menus"
      >
        <form>
          <div className="form-group-md">
            <label>Nome</label>
            <input
              {...register("nmMenu")}
              type="text"
              placeholder=""
              required
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register("nmMenu").onChange(e);
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

export default Menus;
