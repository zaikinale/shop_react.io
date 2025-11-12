import style from './style.module.css'
import ProductCard from '../ProductCard'

export default function ProductContainer({ cardsList = [] }) {
    return (
      <div className={style.containerProducts}>

        {cardsList.length > 0 ? (
          cardsList.map(card => <ProductCard key={card.id} card={card} />)
        ) : (
          <p className={style.empty}>Товары не найдены</p>
        )}
        
      </div>
    );
  }  