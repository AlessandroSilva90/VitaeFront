import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UsePaginationResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMetadata;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  refetch: () => Promise<void>;
}

function usePagination<T>(
  url: string,
  initialPageSize: number = 25
): UsePaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [pagination, setPagination] = useState<PaginationMetadata>({
    currentPage: 1,
    pageSize: initialPageSize,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<{ data: T[]; pagination: PaginationMetadata }>(
        `${url}?page=${currentPage}&pageSize=${pageSize}`
      );

      setData(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, url]);

  return {
    data,
    loading,
    error,
    pagination,
    setCurrentPage,
    setPageSize,
    refetch: fetchData,
  };
}

export default usePagination;