import style from './style.module.css'
import SavedItem from './components/SavedItem/index.jsx'


export default function SavedContainer({ cardsList = [], setBasket, setSavedProduct, basket, savedProduct }) {
  const savedCards = cardsList.filter(card => savedProduct.includes(card.id));

  return (
    <div className={style.containerProducts}>
      {savedCards.length > 0 ? (
        savedCards.map(card => (
          <SavedItem
            key={card.id}
            card={card}
            setBasket={setBasket}
            setSavedProduct={setSavedProduct}
            basket={basket}
            savedProduct={savedProduct}
          />
        ))
      ) : (
        <p className={style.empty}>Нет сохранённых товаров</p>
      )}
    </div>
  );
}