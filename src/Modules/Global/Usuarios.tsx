import { useEffect, useState } from "react";
import { api } from "../../services/api";
import DeleteModal from "../../Components/DeleteModal";
import EditModal from "../../Components/EditModal";
import ModalBase from "../../Components/Modal";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface Usuarios {
  nome: string;
  email?: number;
  cracha: string;
  snfuncionario: string;
  snativo: boolean;
  dsUsuario: boolean;
}

interface PaginationResponse {
  data: Usuarios[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

type cadUsuario = {
  Nome: string;
  Cracha?: number;
  Email: string;
  DsUsuario: string;
  SnFuncionario?: boolean;
  SnAtivo: boolean;
  Senha: string;
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(25);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<cadUsuario>();

  const onSubmit: SubmitHandler<cadUsuario> = async (data) => {
    console.log(data);
    try {
      const response = await api.post("Rh/cadastrarUsuario", data);
      console.log(response);
      alert("Usuário cadastrado com sucesso!");
      fetchmodulosPaginados(currentPage);
    } catch (err: any) {
      // console.error("Erro:", err);

      const errorData = err.response.data;
      console.log(err.response);
      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat();
        alert(`Erro de validação:\n${messages.join("\n")}`);
      }

      alert("Erro ao cadastrar usuário");
      throw err;
    }
  };

  //   const [nmModulo, setnmModulo] = useState<string>("");
  //   const [snAtivo, setSnAtivo] = useState<boolean>(true);
  const [editUsuario, setEditUsuario] = useState<any>(null);

  const handleGetDataSuccess = (dados: any) => {
    setEditUsuario(dados);
    console.log(dados);
  };

  const fetchmodulosPaginados = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get<PaginationResponse>(
        `Rh/usuarios?page=${page}&pageSize=${pageSize}`,
      );

      setUsuarios(response.data.data);
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

  useEffect(() => {
    fetchmodulosPaginados(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <section>
        <h2 className="titlePage">Usuários</h2>

        {loading ? (
          "Carregando Dados..."
        ) : (
          <table className="tbl-components">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Usuário</th>
                <th>Cracha</th>
                <th>Funcionário ?</th>
                <th>Ativo ?</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nome}</td>
                  <td>{u.dsUsuario}</td>
                  <td>{u.cracha}</td>
                  <td>{u.snFuncionario ? "SIM" : "NÃO"}</td>
                  <td>{u.snFuncionario ? "ATIVO " : "INATIVO"}</td>
                  <td>
                    <EditModal
                      id={u.id}
                      buttonText="Editar"
                      buttonVariant="warning"
                      titulo="Editar Usuário"
                      rotaGet="Rh/usuarios"
                      rotaUpdate="Rh/updateUsuario"
                      onGetDataSuccess={handleGetDataSuccess}
                      dadosParaAtualizar={editUsuario}
                      onUpdateSuccess={() => fetchmodulosPaginados(currentPage)}
                    >
                      <form>
                        <div className="form-group-md">
                          <label>Nome</label>
                          <input
                            type="text"
                            placeholder=""
                            required
                            value={editUsuario?.nome || ""}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                nome: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Cracha</label>
                          <input
                            type="text"
                            value={editUsuario?.cracha || ""}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                cracha: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Email</label>
                          <input
                            type="email"
                            required
                            value={editUsuario?.email || ""}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                email: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Usuário</label>
                          <input
                            type="text"
                            value={editUsuario?.dsUsuario || ""}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                dsUsuario: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Funcionário ?</label>
                          <input
                            type="checkbox"
                            className="inpt-check"
                            checked={editUsuario?.snFuncionario || false}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                snFuncionario: e.target.checked,
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Ativo ?</label>
                          <input
                            type="checkbox"
                            className="inpt-check"
                            checked={editUsuario?.snAtivo || false}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                snAtivo: e.target.checked,
                              })
                            }
                          />
                        </div>
                        <div className="form-group-md">
                          <label>Senha</label>
                          <input
                            type="text"
                            value={editUsuario?.senha || ""}
                            onChange={(e) =>
                              setEditUsuario({
                                ...editUsuario,
                                senha: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                      </form>
                    </EditModal>
                    <DeleteModal
                      id={u.id}
                      buttonText="Excluir"
                      buttonVariant="danger"
                      titulo="Excluir"
                      rota="Rh/deleUsuario"
                      onDeleteSuccess={() => fetchmodulosPaginados(currentPage)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <ModalBase
        buttonText="Novo Usuário"
        buttonVariant="success"
        titulo="Cadastro"
        onConfirm={handleSubmit(onSubmit)}
      >
        <form>
          <div className="form-group-md">
            <label>Nome</label>
            <input
              {...register("Nome")} // ← Nome (maiúsculo)
              type="text"
              placeholder=""
              required
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register("Nome").onChange(e);
              }}
            />
          </div>

          <div className="form-group-md">
            <label>Cracha</label>
            <input
              type="number" // ← type number para números
              {...register("Cracha", { valueAsNumber: true })} // ← Cracha (maiúsculo)
            />
          </div>

          <div className="form-group-md">
            <label>Email</label>
            <input
              type="email"
              required
              {...register("Email", { required: "Email é obrigatório" })} // ← Email (maiúsculo)
            />
            {errors.Email && (
              <span style={{ color: "red" }}>{errors.Email.message}</span>
            )}
          </div>

          <div className="form-group-md">
            <label>Usuário</label>
            <input
              type="text"
              {...register("DsUsuario")} // ← DsUsuario (maiúsculo)
            />
          </div>

          <div className="form-group-md">
            <label>Funcionário ?</label>
            <input
              {...register("SnFuncionario")} // ← SnFuncionario (maiúsculo)
              type="checkbox"
              className="inpt-check"
            />
          </div>

          <div className="form-group-md">
            <label>Ativo ?</label>
            <input
              {...register("SnAtivo")} // ← SnAtivo (maiúsculo, corrigido)
              type="checkbox"
              className="inpt-check"
              defaultChecked={true} // Valor padrão
            />
          </div>

          <div className="form-group-md">
            <label>Senha</label>
            <input
              type="password" // ← type password para senha
              {...register("Senha")} // ← Senha (maiúsculo)
            />
          </div>

          <button type="submit" style={{ display: "none" }} />
        </form>
      </ModalBase>
    </main>
  );
};

export default Usuarios;
