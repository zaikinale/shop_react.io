import style from './style.module.css'
import SearchIcon from '../../../../../../assets/search.svg'

export default function SearchedItem ({text, onSelect}) {
    const handleClick = () => {
        onSelect(text);
    };

    return (
        <div className={style.searchItem} onClick={handleClick} >
            <img className={style.searchImg} src={SearchIcon} alt='Искать' />
            <p className={style.searchText}>{text}</p>
        </div>
    )
}