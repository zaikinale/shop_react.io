import style from './style.module.css';
import Card from '../Card';
import { useSelector } from 'react-redux';

export default function CardsContainer({ mode }) {
  const cardsList = useSelector(state => state.cards) || [];
  const likedItems = useSelector(state => state.likedItems) || [];
  const basketItems = useSelector(state => state.basketItems) || {};

  const savedCards = cardsList.filter(item => likedItems.includes(item.id));

  const recommendedCards = cardsList.filter(card => {
    const id = String(card.id);
    const isInLiked = likedItems.includes(card.id);
    const isInBasket = Object.prototype.hasOwnProperty.call(basketItems, id);
    return !isInLiked && !isInBasket;
  });
  
  let cardsToShow = [];
  let emptyMessage = 'Товары отсутствуют';

  if (mode === 'saved') {
    cardsToShow = savedCards;
    emptyMessage = 'Нет сохранённых товаров';
  } else if (mode === 'recommend') {
    cardsToShow = recommendedCards;
    emptyMessage = 'Нет рекомендаций';
  } else {
    cardsToShow = cardsList;
    emptyMessage = 'Товары отсутствуют';
  }

  return (
    <>
    {mode === 'recommend' && <h2 className={style.sectionTitle}>Рекомендации:</h2>}
    <div className={style.containerProducts}>
      {cardsToShow.length > 0 ? (
        cardsToShow.map(card => (
          <Card key={card.id} card={card} type={mode === 'saved' ? 'saved' : 'default'} />
        ))
      ) : (
        <p className={style.empty}>{emptyMessage}</p>
      )}
    </div>
    </>
  );
}