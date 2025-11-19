import style from './style.module.css'
import SavedItem from './components/SavedItem/index.jsx'
import useLikes from '../../../../hooks/useLikes.js'
import { useState, useEffect } from 'react'

export default function SavedContainer({ cardsList = [], setBasket, basket }) {
  const { likedItems } = useLikes();
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    // Обновляем список карточек при изменении likedItems
    const newFilteredCards = cardsList.filter(card => likedItems.includes(card.id));
    setFilteredCards(newFilteredCards);
  }, [likedItems, cardsList]);

  const handleRemove = (removedCardId) => {
    // Обновляем список карточек, чтобы удалить карточку из DOM
    setFilteredCards(prev => prev.filter(card => card.id !== removedCardId));
  };

  return (
    <div className={style.containerProducts}>
      {filteredCards.length > 0 ? (
        filteredCards.map(card => (
          <SavedItem
            key={card.id}
            card={card}
            setBasket={setBasket}
            basket={basket}
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p className={style.empty}>Нет сохранённых товаров</p>
      )}
    </div>
  );
}