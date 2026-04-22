// import { useState } from 'react'
import axios from "axios";

import "../../App.scss";
import { useEffect, useState } from "react";

interface Cargo {
  codigo: number;
  nome: string;
  descricao?: string;
}

interface PaginationResponse {
  data: Cargo[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

function Funcionarios() {
  const [cargos, setCargos] = useState<any[]>([]);
  //   const [pagiantion, setPagination] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(25);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const fetchCargosPaginados = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<PaginationResponse>(
        `http://localhost:5192/api/Rh/funcionarios?page=${page}&pageSize=${pageSize}`,
      );

      // Atualizar dados e paginação
      setCargos(response.data.data);
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

  const Loading = () => {
    return "Carregando Dados.....";
  };

  useEffect(() => {
    fetchCargosPaginados(currentPage);
  }, [currentPage]);

  const handleNextPage = () =>
    hasNextPage && setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    hasPreviousPage && setCurrentPage((prev) => prev - 1);
  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      {/* <div className="content"> */}
      <main>
        <section>
          <h2 className="titlePage">Funcionários</h2>

          {loading ? (
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
                {cargos.map((cargo) => (
                  <tr key={cargo.id}>
                    <td>{cargo.id}</td>
                    <td>{cargo.nome}</td>
                    <td>{cargo.setor || "Sem descrição"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="pagination">
            <div className="pagination-info">
              Página {currentPage} de {totalPages} • Total: {totalItems} cargos
            </div>

            <div className="pagination-controls">
              <button
                className="btn-pagination"
                onClick={handlePreviousPage}
                disabled={!hasPreviousPage}
              >
                Anterior
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={
                    currentPage === page
                      ? "active btn-pagination"
                      : "btn-pagination"
                  }
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="btn-pagination"
              >
                Próximo
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* </div> */}
    </>
  );
}

export default Funcionarios;
