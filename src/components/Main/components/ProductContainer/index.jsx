import style from './style.module.css'
import ProductCard from './components/ProductCard'

export default function ProductContainer({ cardsList = [], setBasket, setSavedProduct, basket, savedProduct }) {
    return (
      <div className={style.containerProducts}>

        {cardsList.length > 0 ? (
          cardsList.map(card => <ProductCard 
            key={card.id}
            card={card} 
            setBasket={setBasket} 
            setSavedProduct={setSavedProduct} 
            basket={basket} 
            savedProduct={savedProduct}  />)
        ) : (
          <p className={style.empty}>Загружаются...</p>
        )}

      </div>
    );
  }  