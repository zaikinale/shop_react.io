import style from './style.module.css'
import ProductCard from '../ProductCard'
import { useSelector } from 'react-redux';

export default function ProductContainer() {
  const cardsList = useSelector(state => state.cards) || [];
    return (
      <div className={style.containerProducts}>

        {cardsList.length > 0 ? (
          cardsList.map(card => <ProductCard 
            key={card.id}
            card={card} 
              />)
        ) : (
          <p className={style.empty}>Загружаются...</p>
        )}

      </div>
    );
  }