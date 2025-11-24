// components/Card/Card.jsx
import style from './style.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import heartUnactive from "../../assets/heart_unactive.svg";
import heartActive from "../../assets/heart_active.svg";
import CloseImg from '../../assets/close.svg'; 

export default function Card({
        card,
        mode = 'default', 
        onCountChange, 
    }) {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basketItems);
    const likedItems = useSelector(state => state.likedItems);

    const [imgError, setImgError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const isLiked = likedItems.includes(card.id);
    const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(card.id));
    const currentCount = basketItems[String(card.id)] || 0;

    useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

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

    const handleLike = () => {
        if (mode === 'saved' && !isPending) {
            scheduleRemovalLike();
        } else {
            dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
        }
    };

    const scheduleRemovalLike = () => {
        setIsPending(true);
        const id = setTimeout(() => {
            dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
            setIsPending(false);
            setTimeoutId(null);
        }, 3000);
        setTimeoutId(id);
    };

    const cancelRemovalLike = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsPending(false);
        setTimeoutId(null);
    };

    const handleBasket = () => {
        if (mode === 'basket' && isBasket && !isPending) {
            scheduleRemovalBasket();
        } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
        }
    };

    const scheduleRemovalBasket = () => {
        setIsPending(true);
        const id = setTimeout(() => {
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: 0 } });
            setIsPending(false);
            setTimeoutId(null);
        }, 3000);
        setTimeoutId(id);
    };

    const cancelRemovalBasket = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsPending(false);
        setTimeoutId(null);
    };

    const handleCounter = (type) => {
        if (mode !== 'basket') return;
        if (type === 'delete' && currentCount <= 1) return;
        const newCount = type === 'delete' ? currentCount - 1 : currentCount + 1;
        dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: newCount } });
    };

    const handleClickLike = () => {
        if (mode === 'saved' && isPending) {
            cancelRemovalLike();
        } else {
            handleLike();
        }
    };

    const handleClickBasket = () => {
        if (mode === 'basket' && isPending) {
            cancelRemovalBasket();
        } else {
            handleBasket();
        }
    };

    const renderLikeButton = () => {
        if (mode === 'saved') {
            return (
                <button
                    className={style.saveButton}
                    aria-label={isPending ? "Отменить удаление" : "Удалить из избранного"}
                    onClick={handleClickLike}
                >
                    <img
                        className={style.save}
                        src={isPending ? heartUnactive : heartActive}
                        alt={isPending ? 'Отменить сохранение' : 'Сохранить'}
                    />
                </button>
            );
        }
        return (
            <button className={style.saveButton} aria-label="Сохранить" onClick={handleClickLike}>
                <img
                    className={style.save}
                    src={isLiked ? heartActive : heartUnactive}
                    alt={isLiked ? 'Отменить сохранение' : 'Сохранить'}
                />
            </button>
        );
    };

    const renderBasketButton = () => {
        if (mode === 'basket') {
            return (
                <div className={isPending ? style.btnChoose : style.btnChooseActive}>
                    <button className={style.addOrDeleteBtn} onClick={() => handleCounter('delete')}>-</button>
                    <span className={style.counterProduct}>{currentCount}</span>
                    <button className={style.addOrDeleteBtn} onClick={() => handleCounter('add')}>+</button>
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
        if (mode === 'basket') {
            return (
                <button className={style.saveButton} onClick={handleClickBasket}>
                    <img className={style.deleteBrn} src={CloseImg} alt="delete" />
                </button>
            );
        }
        return null;
    };

    return (
        <div className={`${style.cardProduct} ${isPending ? style.pendingOpacity : ''}`}>
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