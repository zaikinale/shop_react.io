import style from './style.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router';
import generateActPrice from '../../utils/generateActPrice.jsx'
import CardImg from '../CardImg/CardImg.jsx'
import DeleteButton from '../CardBtns/DeleteButton.jsx'
import BasketButton from '../CardBtns/BasketButton.jsx'
import SaveButton from '../CardBtns/SaveButton.jsx'
import { useCardsDatas } from "../../hooks/useCardsDatas.js";

export default function BasketItem({ card }) {
    const { basketItems } = useCardsDatas()
  const dispatch = useDispatch();
  const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(card.id));

  const [isPending, setIsPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const cancelRemoval = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsPending(false);
  };

  const scheduleRemoval = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    setIsPending(true);
  
    const timerId = setTimeout(() => {
      dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
      setIsPending(false);
      setTimeoutId(null);
    }, 3000);
  
    setTimeoutId(timerId);
  };

  function handleBasket() {
    if (isPending) {
      cancelRemoval();
    } else if (isBasket) {
      scheduleRemoval();
    } else {
      dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
    }
  }

  const currentCount = basketItems[card.id] || 0;

  function handleCounter(type) {
    const currentCount = basketItems[String(card.id)] || 0;
  
    if (type === 'delete') {
      if (currentCount > 1) {
        dispatch({
          type: 'SET_BASKET_ITEM_COUNT',
          payload: { id: card.id, count: currentCount - 1 }
        });
      }
    } else if (type === 'add') {
      dispatch({
        type: 'SET_BASKET_ITEM_COUNT',
        payload: { id: card.id, count: currentCount + 1 }
      });
    }
  }

  return (
    <div className={`${style.cardProduct} ${isPending ? style.pendingOpacity : ''}`}>
      <div className={style.headerCard}>
        <div className={style.tags}>
          {/* {generateTags()} */}
        </div>

        <div className={style.controlBtns}>
            <DeleteButton onClick={handleBasket} style={style} />
            <SaveButton type={"default"} card={card} style={style} isLikePending={''} setIsLikePending={''}></SaveButton>
        </div>
      </div>

      <Link to={`/product/${card.id}`} className={style.linkContainer}>
          <CardImg card={card} style={style}></CardImg>
      </ Link>
      
      <div className={style.containerDescControl}>
        <div className={style.descriptionContainer}>
          {generateActPrice(card, style)}
          <p className={style.description}>{card.name}</p>
        </div>
          <BasketButton
              type="basket"
              isBasket={isBasket}
              isBasketPending={isPending}
              currentCount={currentCount}
              onAdd={() => handleCounter('add')}
              onDelete={() => handleCounter('delete')}
              onToggle={handleBasket}
              style={style}
          />
      </div>
    </div>
  );
}