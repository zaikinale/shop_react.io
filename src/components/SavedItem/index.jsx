import style from './style.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heartActive from "../../assets/heart_active.svg";
import heartUnactive from '../../assets/heart_unactive.svg' 
import { Link } from 'react-router';

// Исправить opaciti при удалении товара

export default function SavedItem({ card }) { 
  const dispatch = useDispatch();
  const basketItems = useSelector(state => state.basketItems);
  const [isPending, setIsPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const isBasket = (id) => basketItems.hasOwnProperty(String(id));
  const [imgError, setImgError] = useState(false);

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
      dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
      setIsPending(false);
      setTimeoutId(null);
    }, 3000);

    setTimeoutId(timerId);
  };

  function toggleBtnSave() {
    if (isPending) {
      cancelRemoval();
    } else {
      scheduleRemoval();
    }
  }

  function generateTags() {
    const tags = [];
    const marks = card.marks || [];

    if (marks.some(m => m.Mark_Name === 'hit')) {
      tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
    }
    if (marks.some(m => m.Mark_Name === 'premium')) {
      tags.push(<p key="premium" className={style.statusCardPremium}>ПРЕМИУМ</p>);
    }
    if (marks.some(m => m.Mark_Name === 'new')) {
      tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
    }
    if (marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount')) {
      tags.push(<p key="sale" className={style.statusCardSalary}>SALE</p>);
    }

    return tags;
  }

  function generateActPrice() {
    const marks = card.marks || [];
    const hasSale = marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount');

    if (hasSale && card.old_price) {
      return (
        <div className={style.priceContainer}>
          <h4 className={style.finalPrice}>{card.price}₽</h4>
          <div className={style.salaryContainer}>
            <span className={style.originalPrice}>{card.old_price}₽</span>
            <span className={style.salary}>-{Math.round(100 - (card.price / card.old_price) * 100)}%</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.priceContainer}>
          <h4 className={style.finalPrice}>{card.price}₽</h4>
          {card.old_price && <s style={{ color: '#999' }}>{card.old_price}₽</s>}
        </div>
      );
    }
  }

  function handleBasket() {
    dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
  }

  return (
    <div className={`${style.cardProduct} ${isPending ? style.pendingOpacity : ''}`}>
      <div className={style.headerCard}>
        <div className={style.tags}>
          {generateTags()}
        </div>

        <button
          className={style.saveButton}
          aria-label={isPending ? "Отменить удаление" : "Удалить из избранного"}
          onClick={toggleBtnSave}
        >
          <img
            className={style.save}
            src={isPending ? heartUnactive : heartActive}
            alt={isPending ? "Отменить удаление" : "Удалить из избранного"}
          />
        </button>
      </div>
      <Link to={`/product/${card.id}`} className={style.linkContainer}>
        {card.images?.[0]?.Image_URL && !imgError ? (
          <img
            className={style.imgProduct}
            src={card.images[0].Image_URL}
            alt={card.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={style.imgProductPlaceholder}></div>
        )}
      
        <div className={style.descriptionContainer}>
          {generateActPrice()}
          <p className={style.description}>{card.name}</p>
        </div>
      </Link>

      <button 
        className={isBasket(card.id) ? style.btnChooseActive : style.btnChoose} 
        onClick={() => handleBasket(card.id)}
      >
        {isBasket(card.id) ? 'Убрать' : 'Выбрать'}
      </button>
    </div>
  );
}