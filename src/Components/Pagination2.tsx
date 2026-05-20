// components/Pagination.tsx
// import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  itemsLabel?: string; // ex: "setores", "usuários", etc.
}

function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  hasNextPage, 
  hasPreviousPage, 
  onPageChange,
  itemsLabel = "itens"
}: PaginationProps) {
  
  const handleNextPage = () => hasNextPage && onPageChange(currentPage + 1);
  const handlePreviousPage = () => hasPreviousPage && onPageChange(currentPage - 1);
  const handlePageClick = (pageNumber: number) => onPageChange(pageNumber);

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
    <div className="pagination">
      <div className="pagination-info">
        Página {currentPage} de {totalPages} • Total: {totalItems} {itemsLabel}
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
            className={currentPage === page ? "active btn-pagination" : "btn-pagination"}
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

export default Pagination;