import style from './style.module.css';
import SearchIcon from '../../assets/search.svg';

export default function SearchEngine() {
  return (
    <label htmlFor="searchInput" className={style.search}>
      <img src={SearchIcon} alt="Иконка для поля ввода" />
      <input
        className={style.searchInput}
        type="search"
        placeholder="Найти товары"
        id="searchInput"
        name="searchInput"
      />
    </label>
  );
}