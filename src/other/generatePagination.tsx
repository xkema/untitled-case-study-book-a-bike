/**
 * Generates the markup for pagination
 * @param totalCount 
 * @returns 
 */
const generatePagination = (totalCount: number) => {
  const pageSize = 10;
  const numPages = Math.ceil(totalCount / pageSize)
  let pages = [];
  for (let i = 0; i < numPages; i++) {
    pages.push(i + 1);
  }
  return pages.map(page => <option key={page} value={page}>{page}</option>)
}

export { generatePagination }
