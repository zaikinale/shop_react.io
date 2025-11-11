// import style from './style.module.css';
// import SearchIcon from '../../assets/search.svg';

// export default function SearchEngine({setIsSearchActive}) {
//   const handleSearchClick = () => {
//     setIsSearchActive(true);
//   };


//   return (
//     <label htmlFor="searchInput" className={style.search}>
//       <img src={SearchIcon} alt="Иконка для поля ввода" />
//       <input
//         className={style.searchInput}
//         type="search"
//         placeholder="Найти товары"
//         id="searchInput"
//         name="searchInput"
//         onClick={handleSearchClick}
//       />
//     </label>
//   );
// }
import { useState } from 'react';
import style from './style.module.css';
import SearchIcon from '../../assets/search.svg';

export default function SearchEngine({ setIsSearchActive, setSearchQuery }) {
  const [query, setQuery] = useState('');

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