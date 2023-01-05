export const getOffset = (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * listPerPage;
};

export const emptyOrRow = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};
