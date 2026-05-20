// components/Paginador.tsx
// import { Button } from "react-bootstrap";

interface PaginadorProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Paginador({
  currentPage,
  totalPages,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginadorProps) {
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

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Página {currentPage} de {totalPages} • Total: {totalItems} itens
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
  );
}