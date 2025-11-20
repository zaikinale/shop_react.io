// components/Basket/BasketContainer/index.jsx
import style from './style.module.css'
import BasketItem from '../BasketItem/index.jsx'
import { useSelector } from 'react-redux' 

export default function BasketContainer() {
  const cardsList = useSelector(state => state.cards)
  const basketItems = useSelector(state => state.basketItems)
  const filteredCards = (cardsList || []).filter((item) => basketItems.includes(item.id));

  return (
    <div className={style.containerProducts}>
      {filteredCards.length > 0 ? (
        filteredCards.map(card => (
          <BasketItem
            key={card.id}
            card={card} 
          />
        ))
      ) : (
        <p className={style.empty}>Нет товаров в корзине</p>
      )}
    </div>
  );
}