import style from './style.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router';
import generateActPrice from '../../utils/generateActPrice.jsx'
import CardImg from '../CardImg/CardImg.jsx'
import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg"; 
// import trashIcon from '../../assets/trash.svg'
import CloseImg from '../../assets/media/close.svg'

export default function BasketItem({ card }) {

  const dispatch = useDispatch();

  const likedItems = useSelector(state => state.likedItems);
  const basketItems = useSelector(state => state.basketItems);

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
            <img className={style.deleteBtn} src={CloseImg} alt="delete" />
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
          <CardImg card={card} style={style}></CardImg>
      </ Link>
      
      <div className={style.containerDescControl}>
        <div className={style.descriptionContainer}>
          {generateActPrice(card, style)}
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