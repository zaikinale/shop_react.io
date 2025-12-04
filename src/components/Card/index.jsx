import style from './style.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import generateTags from '../../utils/generateTags.jsx'
import generateActPrice from '../../utils/generateActPrice.jsx'
import SaveButton from '../SaveButton/SaveButton.jsx'
import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg";
import CloseImg from '../../assets/media/close.svg';
import CardImg from "../CardImg/CardImg.jsx";

export default function Card({ card, type = 'default' }) {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basketItems);
    const [isLikePending, setIsLikePending] = useState(false);
    const [isBasketPending, setIsBasketPending] = useState(false);
    const basketTimeoutRef = useRef(null);

    const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(card.id));
    const currentCount = basketItems[String(card.id)] || 0;

    useEffect(() => {
        return () => {
            if (basketTimeoutRef.current) clearTimeout(basketTimeoutRef.current);
        };
    }, []);

    const handleClickBasket = () => {
        if (type === 'basket') {
            if (isBasketPending) {
                clearTimeout(basketTimeoutRef.current);
                setIsBasketPending(false);
                basketTimeoutRef.current = null;
            } else {
                setIsBasketPending(true);
                basketTimeoutRef.current = setTimeout(() => {
                    dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: 0 } });
                    setIsBasketPending(false);
                }, 3000);
            }
        } else {
            if (isBasket) {
                dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: 0 } });
            } else {
                dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
            }
        }
    };

    const handleCounter = (type) => {
        if (type !== 'basket') return;
        
        if (type === 'delete' && currentCount <= 1) {
            handleClickBasket();
        } else {
            const newCount = type === 'delete' ? currentCount - 1 : currentCount + 1;
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: newCount } });
        }
    };

    const renderBasketButton = () => {
        if (type === 'basket') {
            return (
                <div className={isBasketPending ? style.btnChoose : style.btnChooseActive}>
                    <button 
                        className={style.addOrDeleteBtn} 
                        onClick={() => handleCounter('delete')}
                    >
                        -
                    </button>
                    <span className={style.counterProduct}>{currentCount}</span>
                    <button 
                        className={style.addOrDeleteBtn} 
                        onClick={() => handleCounter('add')}
                    >
                        +
                    </button>
                </div>
            );
        }
        return (
            <button
                className={isBasket ? style.btnChooseActive : style.btnChoose}
                onClick={handleClickBasket}
            >
                {isBasket ? 'Убрать' : 'Выбрать'}
            </button>
        );
    };

    const renderRemoveButton = () => {
        if (type === 'basket') {
            return (
                <button className={style.saveButton} onClick={handleClickBasket}>
                    <img className={style.deleteBrn} src={CloseImg} alt="delete" />
                </button>
            );
        }
        return null;
    };

    return (
        <div className={`${style.cardProduct} ${(isLikePending || isBasketPending) ? style.pendingOpacity : ''}`}>
            <div className={style.headerCard}>
                <div className={style.tags}>{generateTags(card, style)}</div>
                <div className={style.controlBtns}>
                    {renderRemoveButton()}
                    <SaveButton type={type} card={card} style={style} isLikePending={isLikePending} setIsLikePending={setIsLikePending}></SaveButton>
                </div>
            </div>

            <Link to={`/product/${card.id}`} className={style.linkContainer}>
                <CardImg card={card} style={style}></CardImg>
                <div className={style.descriptionContainer}>
                    {generateActPrice(card, style)}
                    <p className={style.description}>{card.name}</p>
                </div>
            </Link>

            {renderBasketButton()}
        </div>
    );
}