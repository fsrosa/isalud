import React, { useEffect, useState } from "react";

import styles from "./SearchBar.module.scss";

const SearchBar = ({
  onSearch,
  placeholder,
  isSearching,
  setIsSearching,
  currentPage,
  setIsLoading,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [relevantOrder, setRelevantOrder] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (isSearching) {
      const timer = setTimeout(() => {
        onSearch(value, currentPage, relevantOrder);
      }, 500);

      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [value, currentPage, relevantOrder]);

  const handleChange = (event) => {
    const searchText = event.target.value;
    setValue(searchText);

    if (searchText === "") {
      setIsSearching(false);
    } else setIsSearching(true);
  };

  const handleRelevant = () => {
    setRelevantOrder("&orderby=relevance");
  };

  const handleClearFilter = () => {
    setRelevantOrder("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <input
          {...props}
          className={styles.searchInput}
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {!isSearching ? (
          ""
        ) : (
          <div className={styles.searchFilters}>
            <label>Filtros:</label>
            <button type="button" onClick={handleRelevant}>
              Mais Relevantes
            </button>
            {relevantOrder != "" && (
              <button type="button" onClick={handleClearFilter}>
                Limpar Filtro
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
