import style from './style.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg";
import CloseImg from '../../assets/media/close.svg';

export default function Card({ card, type = 'default' }) {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basketItems);
    const likedItems = useSelector(state => state.likedItems);

    const [imgError, setImgError] = useState(false);
    const [isLikePending, setIsLikePending] = useState(false);
    const [isBasketPending, setIsBasketPending] = useState(false);
    const likeTimeoutRef = useRef(null);
    const basketTimeoutRef = useRef(null);

    const isLiked = likedItems.includes(card.id);
    const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(card.id));
    const currentCount = basketItems[String(card.id)] || 0;

    useEffect(() => {
        return () => {
            if (likeTimeoutRef.current) clearTimeout(likeTimeoutRef.current);
            if (basketTimeoutRef.current) clearTimeout(basketTimeoutRef.current);
        };
    }, []);

    const handleClickLike = () => {
        if (type === 'saved') {
            if (isLikePending) {
                clearTimeout(likeTimeoutRef.current);
                setIsLikePending(false);
                likeTimeoutRef.current = null;
            } else {
                setIsLikePending(true);
                likeTimeoutRef.current = setTimeout(() => {
                    dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
                    setIsLikePending(false);
                }, 3000);
            }
        } else {
            dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
        }
    };

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

    const renderLikeButton = () => {
        if (type === 'saved') {
            return (
                <button
                    className={style.saveButton}
                    aria-label={isLikePending ? "Отменить удаление" : "Удалить из избранного"}
                    onClick={handleClickLike}
                >
                    <img
                        className={style.save}
                        src={isLikePending ? heartUnactive : heartActive}
                        alt=""
                    />
                </button>
            );
        }
        return (
            <button className={style.saveButton} onClick={handleClickLike}>
                <img
                    className={style.save}
                    src={isLiked ? heartActive : heartUnactive}
                    alt=""
                />
            </button>
        );
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

    function generateTags() {
        const tags = [];
        const marks = card.marks || [];
        if (marks.some(m => m.Mark_Name === 'hit')) tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
        if (marks.some(m => m.Mark_Name === 'premium')) tags.push(<p key="premium" className={style.statusCardPremium}>ПРЕМИУМ</p>);
        if (marks.some(m => m.Mark_Name === 'new')) tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
        if (marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount')) tags.push(<p key="sale" className={style.statusCardSalary}>SALE</p>);
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

    return (
        <div className={`${style.cardProduct} ${(isLikePending || isBasketPending) ? style.pendingOpacity : ''}`}>
            <div className={style.headerCard}>
                <div className={style.tags}>{generateTags()}</div>
                <div className={style.controlBtns}>
                    {renderRemoveButton()}
                    {renderLikeButton()}
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
                <div className={style.descriptionContainer}>
                    {generateActPrice()}
                    <p className={style.description}>{card.name}</p>
                </div>
            </Link>

            {renderBasketButton()}
        </div>
    );
}