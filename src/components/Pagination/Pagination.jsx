import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  findedPosts,
}) => {
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerButtons}>
        <button
          className={styles.button}
          type="button"
          onClick={handleFirstPage}
        >
          Início
        </button>

        <button type="button" onClick={handlePreviousPage}>{`<`}</button>
        <button type="button" onClick={handleNextPage}>{`>`}</button>
        <button type="button" onClick={handleLastPage}>
          Fim
        </button>
      </div>
      <div className={styles.containerFindedPosts}>
        {findedPosts} Publicações encontradas!
      </div>
    </div>
  );
};

export default Pagination;
