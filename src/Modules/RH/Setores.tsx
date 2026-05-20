import usePagination from '../../hooks/usePagination';
import Pagination from '../../Components/Pagination2';
import "../../App.scss";

interface setor {
  codigo: number;
  nome: string;
  descricao?: string;
  setor?: string;
}

function Setores() {
  const {
    data: setores,
    loading,
    error,
    pagination,
    setCurrentPage,
  } = usePagination<setor>("Rh/setores", 25);

  if (loading) {
    return (
      <main>
        <section>
          <h2 className="titlePage">Setores</h2>
          <div className="loading">Carregando...</div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <section>
          <h2 className="titlePage">Setores</h2>
          <div className="error">Erro: {error}</div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h2 className="titlePage">Setores</h2>

        <table className="tbl-components">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Setor</th>
            </tr>
          </thead>
          <tbody>
            {setores.map((setor) => (
              <tr key={setor.codigo}>
                <td>{setor.codigo}</td>
                <td>{setor.nome}</td>
                <td>{setor.setor || "Sem descrição"}</td>
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
      </section>
    </main>
  );
}

export default Setores;