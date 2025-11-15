import style from './style.module.css'
import ProductCard from './components/ProductCard'

export default function ProductContainer({ cardsList = [], setBasket }) {
    return (
      <div className={style.containerProducts}>

        {cardsList.length > 0 ? (
          cardsList.map(card => <ProductCard key={card.id} card={card} setBasket={setBasket} />)
        ) : (
          <p className={style.empty}>Загружаются...</p>
        )}

      </div>
    );
  }  