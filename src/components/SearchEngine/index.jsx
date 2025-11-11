import style from './style.module.css';
import SearchIcon from '../../assets/search.svg';

export default function SearchEngine({setIsSearchActive}) {
  const handleSearchClick = () => {
    setIsSearchActive(true);
  };


  return (
    <label htmlFor="searchInput" className={style.search}>
      <img src={SearchIcon} alt="Иконка для поля ввода" />
      <input
        className={style.searchInput}
        type="search"
        placeholder="Найти товары"
        id="searchInput"
        name="searchInput"
        onClick={handleSearchClick}
      />
    </label>
  );
}