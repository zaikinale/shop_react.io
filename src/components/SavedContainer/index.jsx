import style from './style.module.css'
import SavedItem from '../SavedItem/index.jsx'
import useLikes from '../../hooks/useLikes.js';
// import { useState, useEffect } from 'react'

export default function SavedContainer({ cardsList = [], setBasket, basket, toggleLike }) {
    const{likedItems} = useLikes()

    const filteredCards = cardsList.filter((item) => likedItems.includes(item.id));

//   const [filteredCards, setFilteredCards] = useState([]);

//   useEffect(() => {
//     // Обновляем список карточек при изменении cardsList
//     setFilteredCards(cardsList);
//   }, [cardsList]);

//   const handleRemove = (removedCardId) => {
//     // Обновляем список карточек, чтобы удалить карточку из DOM
//     setFilteredCards(prev => prev.filter(card => card.id !== removedCardId));
//   };

    return (
        <div className={style.containerProducts}>
            {filteredCards.length > 0 ? (
                filteredCards.map(card => (
                    <SavedItem
                        key={card.id}
                        card={card}
                        setBasket={setBasket}
                        basket={basket}
            // onRemove={handleRemove}
                        toggleLike={toggleLike}
                    />
                ))
            ) : (
                <p className={style.empty}>Нет сохранённых товаров</p>
            )}
        </div>
    );
}