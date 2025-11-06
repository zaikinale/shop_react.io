import style from './style.module.css';


export default function SearchEngine () {
    return (
        <input className={style.search} type="search" placeholder='Найти товары' />
    )
}