// components/Saved/SavedContainer/index.jsx
import style from './style.module.css'
import SavedItem from '../SavedItem/index.jsx'
import { useSelector } from 'react-redux' 

export default function SavedContainer() {

    const cardsList = useSelector(state => state.cards)
    const likedItems = useSelector(state => state.likedItems) 

    const filteredCards = (cardsList || []).filter((item) => likedItems.includes(item.id));

    return (
        <div className={style.containerProducts}>
            {filteredCards.length > 0 ? (
                filteredCards.map(card => (
                    <SavedItem
                        key={card.id}
                        card={card}
                    />
                ))
            ) : (
                <p className={style.empty}>Нет сохранённых товаров</p>
            )}
        </div>
    );
}