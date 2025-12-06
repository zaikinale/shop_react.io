import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import generateTags from '../../utils/generateTags.jsx';
import generateActPrice from '../../utils/generateActPrice.jsx';
import CardImg from '../../components/CardImg/CardImg.jsx';
import SaveButton from '../../components/CardBtns/SaveButton.jsx';
import BasketButton from '../../components/CardBtns/BasketButton.jsx';
import style from './style.module.css';
import CardsContainer from '../../components/CardsContainer';
import { useCardsDatas } from '../../hooks/useCardsDatas.js';

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { cards, basketItems } = useCardsDatas();

    const product = cards.find(card => String(card.id) === String(id));

    if (!product) {
        return <div className={style.empty}>Товар не найден</div>;
    }

    const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(product.id));

    const handleBasketToggle = () => {
        if (isBasket) {
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

                    <SaveButton
                        type={'default'}
                        card={product}
                        style={style}
                        isLikePending={''}
                        setIsLikePending={''}
                    />
                </div>

                <CardImg card={product} style={style} />

                <div className={style.containerDesc}>
                    <div className={style.descriptionContainer}>
                        {generateActPrice(product, style)}
                        <p className={style.description}>{product.name}</p>
                    </div>

                    <BasketButton
                        type={'default'}
                        isBasket={isBasket}
                        isBasketPending={''}
                        currentCount={''}
                        onToggle={handleBasketToggle}
                        onAdd={''}
                        onDelete={''}
                        style={style}
                    />
                </div>
            </div>

            <CardsContainer mode={'recommend'} />
        </>
    );
}