import style from './style.module.css'
import SearchIcon from '../../../../assets/search.svg'

export default function SearchedItem ({key, text}) {
    return (
        <div key={key} className={style.searchItem}>
            <img className={style.searchImg} src={SearchIcon} alt='Искать' />
            <p className={style.searchText}>{text}</p>
        </div>
    )
}