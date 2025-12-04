import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import generateTags from '../../utils/generateTags.jsx'
import generateActPrice from '../../utils/generateActPrice.jsx'
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
    const [imgError, setImgError] = useState(false);
    const cards = useSelector(state => state.cards);
    const product = cards.find(card => String(card.id) === String(id));
    if (!product) {
        return <div className={style.empty}>Товар не найден</div>;
    }
    const isOn = isLiked(product.id);
    const inBasket = isBasket(product.id);
    //
    // function generateActPrice() {
    //     const marks = product.marks || [];
    //     const hasSale = marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount');
    //
    //     if (hasSale && product.old_price) {
    //       return (
    //         <div className={style.priceContainer}>
    //           <h4 className={style.finalPrice}>{product.price}₽</h4>
    //           <div className={style.salaryContainer}>
    //             <span className={style.originalPrice}>{product.old_price}₽</span>
    //             <span className={style.salary}>-{Math.round(100 - (product.price / product.old_price) * 100)}%</span>
    //           </div>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div className={style.priceContainer}>
    //           <h4 className={style.finalPrice}>{product.price}₽</h4>
    //           {product.old_price && <s style={{ color: '#999' }}>{product.old_price}₽</s>}
    //         </div>
    //       );
    //     }
    // }

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

            {product.images?.[0]?.Image_URL && !imgError ? 
                (
                    <img
                        className={style.imgProduct}
                        src={product.images[0].Image_URL}
                        alt={product.name}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className={style.imgProductPlaceholder}></div>
                )
            }
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