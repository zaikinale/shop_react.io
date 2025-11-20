import style from './style.module.css';
import { useState, useEffect } from 'react';
import heartUnactive from "../../assets/heart_unactive.svg";
import heartActive from "../../assets/heart_active.svg";

export default function BasketItem({ card, toggleBasket, toggleLike, isLiked, isBasket}) {
  const [imgError, setImgError] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const isOn = isLiked(card.id);

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

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
      toggleBasket(card.id); // Используем переданную функцию
      setIsPending(false);
      setTimeoutId(null);
    }, 3000);
  
    setTimeoutId(timerId);
  };

  function toggleBtnSave() {
    toggleLike(card.id);
  }

  function handleBasket(id) {
    if (isPending) {
      // Если таймер активен, отменяем удаление
      cancelRemoval();
    } else if (isBasket(id)) {
      // Если в корзине, запускаем таймер на удаление
      scheduleRemoval();
    } else {
      // Если не в корзине, добавляем
      toggleBasket(id);
    }
  }

  return (
    <div className={`${style.cardProduct} ${isPending ? style.pendingOpacity : ''}`}>
      <div className={style.headerCard}>
        <div className={style.tags}>
          {generateTags()}
        </div>

        <button className={style.saveButton} aria-label="Сохранить" onClick={toggleBtnSave}>
          <img
            className={style.save}
            src={isOn ? heartActive : heartUnactive}
            alt="Сохранить"
          />
        </button>
      </div>

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
      
      <div className={style.containerDescControl}>
        <div className={style.descriptionContainer}>
          {generateActPrice()}
          <p className={style.description}>{card.name}</p>
        </div>

        <button
          className={isPending ? style.btnChoose : (isBasket(card.id) ? style.btnChooseActive : style.btnChoose)}
          onClick={() => handleBasket(card.id)}
        >
          {isPending ? 'Отменить' : (isBasket(card.id) ? 'Убрать' : 'Выбрать')}
        </button>
      </div>
    </div>
  );
}