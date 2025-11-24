import style from './style.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router';;
import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg"; 
// import trashIcon from '../../assets/trash.svg'
import CloseImg from '../../assets/media/close.svg'

export default function BasketItem({ card }) {

  const dispatch = useDispatch();

  const likedItems = useSelector(state => state.likedItems);
  const basketItems = useSelector(state => state.basketItems);

  const [imgError, setImgError] = useState(false);

  const isLiked = (id) => likedItems.includes(id);
  const isBasket = (id) => Object.prototype.hasOwnProperty.call(basketItems, String(id));

  const isOn = isLiked(card.id);

  const [isPending, setIsPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // function generateTags() {
  //   const tags = [];
  //   const marks = card.marks || [];

  //   if (marks.some(m => m.Mark_Name === 'hit')) {
  //     tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
  //   }
  //   if (marks.some(m => m.Mark_Name === 'premium')) {
  //     tags.push(<p key="premium" className={style.statusCardPremium}>ПРЕМИУМ</p>);
  //   }
  //   if (marks.some(m => m.Mark_Name === 'new')) {
  //     tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
  //   }
  //   if (marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount')) {
  //     tags.push(<p key="sale" className={style.statusCardSalary}>SALE</p>);
  //   }

  //   return tags;
  // }

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
      dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
      setIsPending(false);
      setTimeoutId(null);
    }, 3000);
  
    setTimeoutId(timerId);
  };

  function toggleBtnSave() {
    dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
  }

  function handleBasket(id) {
    if (isPending) {
      cancelRemoval();
    } else if (isBasket(id)) {
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
          <button className={style.saveButton} onClick={() => handleBasket(card.id)}>
            <img className={style.deleteBrn} src={CloseImg} alt="delete" />
          </button>
          <button className={style.saveButton} aria-label="Сохранить" onClick={toggleBtnSave}>
            <img
              className={style.save}
              src={isOn ? heartActive : heartUnactive}
              alt="Сохранить"
            />
          </button>
        </div>
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
      </ Link>
      
      <div className={style.containerDescControl}>
        <div className={style.descriptionContainer}>
          {generateActPrice()}
          <p className={style.description}>{card.name}</p>
        </div>

        <div
          // className={isPending ? style.btnChoose : (isBasket(card.id) ? style.btnChooseActive : style.btnChoose)}>
          className={style.btnChooseActive}>
          <button className={style.addOrDeleteBtn} onClick={() => handleCounter('delete')}>-</button>
          <span className={style.counterProduct}>{currentCount}</span>
          <button className={style.addOrDeleteBtn} onClick={() => handleCounter('add')}>+</button>
        </div>
      </div>
    </div>
  );
}