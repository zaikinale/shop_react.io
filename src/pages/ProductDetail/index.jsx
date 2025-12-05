import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import generateTags from '../../utils/generateTags.jsx'
import generateActPrice from '../../utils/generateActPrice.jsx'
import CardImg from '../../components/CardImg/CardImg.jsx'
import SaveButton from '../../components/CardBtns/SaveButton.jsx'
import BasketButton from '../../components/CardBtns/BasketButton.jsx'
import style from './style.module.css';
import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg";
import CardsContainer from '../../components/CardsContainer';
import { useCardsDatas } from '../../hooks/useCardsDatas.js'

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { cards, likedCards, basketCards } = useCardsDatas()
    const isBasket = (id) => !!basketCards[String(id)];
    const product = cards.find(card => String(card.id) === String(id));
    if (!product) {
        return <div className={style.empty}>Товар не найден</div>;
    }
    const inBasket = isBasket(product.id);

    const handleBasketToggle = () => {
        if (inBasket) {
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: product.id, count: 0 } });
        } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: product.id } });
        }
    };

    return (
    <>
        <div className={style.productDetail}>
            <div className={style.headerCard}>
                <div className={style.tags}>
                    {generateTags(product, style)}
                </div>

                <SaveButton type={'default'} card={product} style={style} isLikePending={''} setIsLikePending={''}></SaveButton>
            </div>

            <CardImg card={product} style={style}></CardImg>

            <div className={style.containerDesc}>
                <div className={style.descriptionContainer}>
                    {generateActPrice(product, style)}
                    <p className={style.description}>{product.name}</p>
                </div>

                <BasketButton
                    type={'default'}
                    isBasket={inBasket}
                    isBasketPending={''}
                    currentCount={''}
                    onToggle={handleBasketToggle}
                    onAdd={''}
                    onDelete={''}
                    style={style}
                ></BasketButton>
            </div>
        </div>

        <CardsContainer mode={'recommend'}></CardsContainer>
    </>
    );
}