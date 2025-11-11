import style from './style.module.css'
import SearchIcon from '../../../../assets/search.svg'

export default function SearchedItem ({id, text}) {
    return (
        <div key={id} className={style.searchItem}>
            <img className={style.searchImg} src={SearchIcon} alt='Искать' />
            <p className={style.searchText}>{text}</p>
        </div>
    )
}