import { useState } from 'react';

const pageSizes = [10, 50, 100];
interface Paginator {
  first: number;
  pageSize: number;

  onPageChange: (event: { first: number; rows: number }) => void;
}

const usePaginator = (): Paginator => {
  const [first, setFirst] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setPageSize(event.rows);
  };

  return {
    first,
    pageSize,
    onPageChange,
  };
};

export default usePaginator;
