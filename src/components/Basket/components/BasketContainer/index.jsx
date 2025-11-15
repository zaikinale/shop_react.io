import style from './style.module.css'
import BasketItem from './components/BasketItem/index.jsx'


export default function BasketContainer({ cardsList = [], setBasket, setSavedProduct, basket, savedProduct }) {
  const BasketCards = cardsList.filter(card => basket.includes(card.id));

  return (
    <div className={style.containerProducts}>
      {BasketCards.length > 0 ? (
        BasketCards.map(card => (
          <BasketItem
            key={card.id}
            card={card}
            setBasket={setBasket}
            setSavedProduct={setSavedProduct}
            basket={basket}
            savedProduct={savedProduct}
          />
        ))
      ) : (
        <p className={style.empty}>Нет товаров в корзине</p>
      )}
    </div>
  );
}