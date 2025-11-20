// components/Basket/BasketContainer/index.jsx
import style from './style.module.css'
import BasketItem from '../BasketItem/index.jsx'
import useBasket from '../../hooks/useBasket.js';

export default function BasketContainer({ cardsList = [], toggleLike, isLiked }) {
  const {basketItems, toggleBasket, isBasket} = useBasket()
  // const BasketCards = cardsList.filter(card => basket.includes(card.id));


  const filteredCards = cardsList.filter((item) => basketItems.includes(item.id));

  return (
    <div className={style.containerProducts}>
      {filteredCards.length > 0 ? (
        filteredCards.map(card => (
          <BasketItem
            key={card.id}
            card={card}
            // setBasket={setBasket}
            // basket={basket}
            // likedItems={likedItems}
            toggleBasket={toggleBasket}
            toggleLike={toggleLike}
            isBasket={isBasket}
            isLiked={isLiked}
          />
        ))
      ) : (
        <p className={style.empty}>Нет товаров в корзине</p>
      )}
    </div>
  );
}