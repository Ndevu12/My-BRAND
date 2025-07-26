export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function usePagination<T>(
  items: T[],
  itemsPerPage: number = 6
) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginatedItems = (page: number): T[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(0, endIndex); // For "load more", we show all items up to current page
  };

  const getPaginationState = (currentPage: number): PaginationState => ({
    currentPage,
    itemsPerPage,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  });

  return {
    getPaginatedItems,
    getPaginationState,
    totalPages,
  };
}
