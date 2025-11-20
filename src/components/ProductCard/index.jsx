// components/Main/ProductCard/ProductCard.jsx
import style from './style.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heartUnactive from "../../assets/heart_unactive.svg";
import heartActive from "../../assets/heart_active.svg";
// import useLikes from '../../hooks/useLikes';
// import useBasket from '../../hooks/useBasket';

export default function ProductCard({ card }) {
  const dispatch = useDispatch(); 
  // const {toggleLike, isLiked} = useLikes();
  // const {toggleBasket, isBasket} = useBasket();
  const basketItems = useSelector(state => state.basketItems);
  const likedItems = useSelector(state => state.likedItems);


  const [imgError, setImgError] = useState(false);

  const isLiked = (id) => likedItems.includes(id);
  const isBasket = (id) => basketItems.includes(id);

  const isOn = isLiked(card.id);

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

  function toggleBtnSave() {
    dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
  }

  function handleBasket() {
    dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
  }

  return (
    <div className={style.cardProduct}>
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
      
      <div className={style.descriptionContainer}>
        {generateActPrice()}
        <p className={style.description}>{card.name}</p>
      </div>

      <button className={isBasket(card.id) ? (style.btnChooseActive) : (style.btnChoose)} onClick={()=>handleBasket(card.id)}>{isBasket(card.id) ? 'Убрать' : 'Выбрать'}</button>
    </div>
  );
}