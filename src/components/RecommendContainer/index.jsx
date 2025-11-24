import style from './style.module.css';
import Card from '../Card';
import { useSelector } from 'react-redux';

export default function RecommendContainer() {
    const cardsList = useSelector(state => state.cards) || [];
    const likedItems = useSelector(state => state.likedItems) || [];
    const basketItems = useSelector(state => state.basketItems) || {};

    const recommendedCards = cardsList.filter(card => {
        const id = String(card.id);
        const isInLiked = likedItems.includes(card.id);
        const isInBasket = Object.prototype.hasOwnProperty.call(basketItems, id);
        return !isInLiked && !isInBasket;
    });

    const displayCards = recommendedCards.slice(0, 6);

    return (
        <section className={style.container}>
            <h2 className={style.sectionTitle}>Рекомендации:</h2>
            <div className={style.containerCards}>
                {displayCards.length > 0 ? (
                    displayCards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            mode="default"
                        />
                    ))
                ) : (
                    <p className={style.empty}>Нет рекомендаций</p>
                )}
            </div>
        </section>
    );
}