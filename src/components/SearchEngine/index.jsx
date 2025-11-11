import { useState, useEffect } from 'react';
import style from './style.module.css';
import SearchIcon from '../../assets/search.svg';

export default function SearchEngine({ setIsSearchActive, setSearchQuery, searchQuery }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value);
  };

  return (
    <label htmlFor="searchInput" className={style.search}>
      <img src={SearchIcon} alt="Искать:" />
      <input
        className={style.searchInput}
        type="search"
        placeholder="Найти товары"
        id="searchInput"
        name="searchInput"
        value={query}
        onClick={handleSearchClick}
        onChange={handleChange}
      />
    </label>
  );
}

