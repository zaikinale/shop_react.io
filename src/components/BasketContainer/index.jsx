// components/Basket/BasketContainer/index.jsx
import style from './style.module.css'
import BasketItem from '../BasketItem/index.jsx'

export default function BasketContainer({ cardsList = [], setBasket, basket, likedItems, toggleLike, isLiked }) {
  const BasketCards = cardsList.filter(card => basket.includes(card.id));

  return (
    <div className={style.containerProducts}>
      {BasketCards.length > 0 ? (
        BasketCards.map(card => (
          <BasketItem
            key={card.id}
            card={card}
            setBasket={setBasket}
            basket={basket}
            likedItems={likedItems}
            toggleLike={toggleLike}
            isLiked={isLiked}
          />
        ))
      ) : (
        <p className={style.empty}>Нет товаров в корзине</p>
      )}
    </div>
  );
}