import "../../App.scss";
import { useEffect, useState } from "react";
import ModalBase from "../../Components/Modal";
import DeleteModal from "../../Components/DeleteModal";
import EditModal from "../../Components/EditModal";
import Paginador from "../../Components/Paginador";
import { api } from "../../services/api";

interface modulo {
  codigo: number;
  nome: string;
  descricao?: string;
}

interface PaginationResponse {
  data: modulo[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

function Modulos() {
  const [modulos, setModulos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(25);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [nmModulo, setnmModulo] = useState<string>("");
  const [snAtivo, setSnAtivo] = useState<boolean>(true);
  const [editandoModulo, setEditandoModulo] = useState<any>(null);

  const handleGetDataSuccess = (dados: any) => {
    setEditandoModulo(dados);
  };

  const fetchmodulosPaginados = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get<PaginationResponse>(
        `Modules/getModulos?page=${page}&pageSize=${pageSize}`,
      );

      setModulos(response.data.data);
      setCurrentPage(response.data.pagination.currentPage);
      setTotalItems(response.data.pagination.totalItems);
      setTotalPages(response.data.pagination.totalPages);
      setHasNextPage(response.data.pagination.hasNextPage);
      setHasPreviousPage(response.data.pagination.hasPreviousPage);
    } catch (err: any) {
      console.error("Erro:", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const salvarModulo = async () => {
    if (!nmModulo.trim()) {
      alert("Nome do módulo é obrigatório!");
      return;
    }

    setLoading(true);
    try {
      await api.post(`Modules/cadastrarModulos`, {
        nmModulos: nmModulo,
        snAtivo: snAtivo,
      });

      alert("Módulo cadastrado com sucesso!");
      setnmModulo("");
      setSnAtivo(true);
      fetchmodulosPaginados(currentPage);
    } catch (err: any) {
      console.error("Erro detalhado:", err);
      alert(err.response?.data?.message || "Erro ao cadastrar módulo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmodulosPaginados(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <section>
        <h2 className="titlePage">Módulos</h2>

        {loading ? (
          "Carregando Dados....."
        ) : (
          <table className="tbl-components">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ativo ?</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {modulos.map((modulo) => (
                <tr key={modulo.id}>
                  <td>{modulo.id}</td>
                  <td>{modulo.nmModulos}</td>
                  <td>{modulo.snAtivo ? "ATIVO" : "INATIVO"}</td>
                  <td>
                    <EditModal
                      id={modulo.id}
                      buttonText="Editar"
                      buttonVariant="warning"
                      titulo="Editar Módulo"
                      rotaGet="Modules/getModulos"
                      rotaUpdate="Modules/updateModulos"
                      onGetDataSuccess={handleGetDataSuccess}
                      dadosParaAtualizar={editandoModulo}
                      onUpdateSuccess={() => fetchmodulosPaginados(currentPage)}
                    >
                      <form>
                        <div className="form-group-md">
                          <label>Nome</label>
                          <input
                            type="text"
                            value={editandoModulo?.nmModulos || ""}
                            onChange={(e) =>
                              setEditandoModulo({
                                ...editandoModulo,
                                nmModulos: e.target.value,
                              })
                            }
                            placeholder="Nome do módulo"
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Ativo ?</label>
                          <input
                            type="checkbox"
                            checked={editandoModulo?.snAtivo || false}
                            onChange={(e) =>
                              setEditandoModulo({
                                ...editandoModulo,
                                snAtivo: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </form>
                    </EditModal>
                    <DeleteModal
                      id={modulo.id}
                      buttonText="Excluir"
                      buttonVariant="danger"
                      titulo="Excluir"
                      rota="Modules/deletarModulos"
                      onDeleteSuccess={() => fetchmodulosPaginados(currentPage)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Paginador
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={handlePageChange}
        />
      </section>

      <ModalBase
        buttonText="Novo Módulo"
        buttonVariant="success"
        titulo="Cadastro"
        onConfirm={salvarModulo}
      >
        <form>
          <div className="form-group-md">
            <label>Nome</label>
            <input
              type="text"
              value={nmModulo}
              onChange={(e) => setnmModulo(e.target.value)}
              placeholder="Ex: Recursos Humanos"
              required
            />
          </div>
          <div className="form-group-md">
            <label>Ativo ?</label>
            <input
              type="checkbox"
              checked={snAtivo}
              className="inpt-check"
              onChange={(e) => setSnAtivo(e.target.checked)}
            />
          </div>
        </form>
      </ModalBase>
    </main>
  );
}

export default Modulos;
