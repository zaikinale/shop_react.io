import style from './style.module.css';
import { useCardsDatas } from '../../hooks/useCardsDatas.js'
import BasketItem from '../BasketItem/index.jsx';
import Card from '../Card';

export default function BasketContainer() {
    const { basketCards } = useCardsDatas();
  return (
    <div className={style.containerProducts}>
      {basketCards.length > 0 ? (
          basketCards.map(card => (
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