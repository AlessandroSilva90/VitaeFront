import {useState } from "react";
import DeleteModal from "../../Components/DeleteModal";
import EditModal from "../../Components/EditModal";
import ModalBase from "../../Components/Modal";
import { useForm } from "react-hook-form";
import Pagination from "../../Components/Pagination2";
import usePagination from "../../hooks/usePagination";

interface Usuarios2 {
  id:number;
  nome: string;
  email?: number;
  cracha: string;
  snFuncionario: string;
  snAtivo: boolean;
  dsUsuario: boolean;
}

type cadUsuario = {
  Nome: string;
  cracha?: number;
  Email: string;
  DsUsuario: string;
  snFuncionario?: boolean;
  snAtivo: boolean;
  Senha: string;
};

const Usuarios = () => {

    const {
    data: usuario,
    loading: loadingUsuario,
    pagination: paginationUsuario,
    setCurrentPage: setCurrentPageUsuario,
    refetch: atualizaDados
  } = usePagination<Usuarios2>("Rh/usuarios", 25);

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<cadUsuario>();

  const getFormData = () => {
    const values = getValues();
    return values;
  };

  const [editUsuario, setEditUsuario] = useState<any>(null);

  const handleGetDataSuccess = (dados: any) => {
    setEditUsuario(dados);
    console.log(dados)
  };

  const handleSuccess = () => {
    reset(); // Limpa o formulário
    atualizaDados() //atualizar a lista
  };

  return (
    <main>
      <section>
        <h2 className="titlePage">Usuários</h2>

        {loadingUsuario ? (
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
                <th style={{display:"flex", justifyContent:"center"}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuario.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nome}</td>
                  <td>{u.dsUsuario}</td>
                  <td>{u.cracha}</td>
                  <td>{u.snFuncionario ? "SIM" : "NÃO"}</td>
                  <td>{u.snAtivo ? "ATIVO " : "INATIVO"}</td>
                  <td style={{display:"flex", justifyContent:'center', gap:"10px"}}>
                    <EditModal
                      id={u.id}
                      buttonText="Editar"
                      buttonVariant="warning"
                      titulo="Editar Usuário"
                      rotaGet="Rh/usuarios"
                      rotaUpdate="Rh/updateUsuario"
                      onGetDataSuccess={handleGetDataSuccess}
                      dadosParaAtualizar={editUsuario}
                      onUpdateSuccess={() => atualizaDados()}
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
                      rota="Rh/deleteUsuario"
                      // onDeleteSuccess={() => fetchmodulosPaginados(currentPage)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
      currentPage={paginationUsuario.currentPage}
      totalPages={paginationUsuario.totalPages}
      totalItems={paginationUsuario.totalItems}
      hasNextPage={paginationUsuario.hasNextPage}
      hasPreviousPage={paginationUsuario.hasPreviousPage}
      onPageChange={setCurrentPageUsuario}
      itemsLabel="usuario"
    />
      </section>

      <ModalBase
        buttonText="Novo Usuário"
        buttonVariant="success"
        titulo="Cadastro"
        dadosParaInserir={null}
        onGetFormData={getFormData} 
        onSuccess={handleSuccess}
        rota="Rh/cadastrarUsuario"
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
              {...register("cracha", { valueAsNumber: true })} // ← Cracha (maiúsculo)
              onChange={(e) => {
                register("cracha").onChange(e);
              }}
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
              {...register("snFuncionario")} // ← SnFuncionario (maiúsculo)
              type="checkbox"
              className="inpt-check"
            />
          </div>

          <div className="form-group-md">
            <label>Ativo ?</label>
            <input
              {...register("snAtivo")} // ← SnAtivo (maiúsculo, corrigido)
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
