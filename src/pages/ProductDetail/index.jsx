import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import generateTags from '../../utils/generateTags.jsx'
import generateActPrice from '../../utils/generateActPrice.jsx'
import CardImg from '../../components/CardImg/CardImg.jsx'
import style from './style.module.css';
import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg";
import CardsContainer from '../../components/CardsContainer';

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch(); 
    const basketItems = useSelector(state => state.basketItems);
    const likedItems = useSelector(state => state.likedItems);
    const isLiked = (id) => likedItems.includes(id);
    const isBasket = (id) => !!basketItems[String(id)];
    const cards = useSelector(state => state.cards);
    const product = cards.find(card => String(card.id) === String(id));
    if (!product) {
        return <div className={style.empty}>Товар не найден</div>;
    }
    const isOn = isLiked(product.id);
    const inBasket = isBasket(product.id);

    function toggleBtnSave() {
        dispatch({ type: 'LIKE_ITEM', payload: { id: product.id } });
    }

    function handleBasket() {
        dispatch({ type: 'ADD_TO_BASKET', payload: { id: product.id } });
    }

    return (
    <>
        <div className={style.productDetail}>
            <div className={style.headerCard}>
                <div className={style.tags}>
                    {generateTags(product, style)}
                </div>
            
                <button className={style.saveButton} aria-label="Сохранить" onClick={toggleBtnSave}>
                    <img
                        className={style.save}
                        src={isOn ? heartActive : heartUnactive}
                        alt="Сохранить"
                    />
                </button>
            </div>

            <CardImg card={product} style={style}></CardImg>

            <div className={style.containerDesc}>
                <div className={style.descriptionContainer}>
                    {generateActPrice(product, style)}
                    <p className={style.description}>{product.name}</p>
                </div>
                <button className={inBasket ? style.btnChooseActive : style.btnChoose} onClick={handleBasket}>
                    {inBasket ? 'Убрать' : 'Выбрать'}
                </button>
            </div>
        </div>

        <CardsContainer mode={'recommend'}></CardsContainer>
    </>
    );
}