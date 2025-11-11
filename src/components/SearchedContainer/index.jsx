import style from './style.module.css'
import SearchedItem  from "./components/SearchedItem"

export default function Searched() {
    const tags = [
        {id: 1, text: 'Футболка'},
        {id: 2, text: 'Женская кофта'},
        {id: 3, text: 'Сертификат'},
        {id: 4, text: 'Куртка'},
        {id: 5, text: 'Детская футболка'},
        {id: 6, text: 'Подарочный сертификат'},
        {id: 7, text: 'Штаны спортивные'},
    ]

    return (
        <div className={style.sectionContainer}>  
            <h2 className={style.searchTitle}>Часто ищут</h2>
            <div className={style.searchContainer}>
                {tags.map(tag => (
                    <SearchedItem key={tag.id} text={tag.text} />
                ))}
            </div>
        </div>
    );
}

