import style from './style.module.css'
import Card from '../Card';
import { useSelector } from 'react-redux';

export default function ProductContainer() {
  const cardsList = useSelector(state => state.cards) || [];
    return (
      <div className={style.containerProducts}>

        {cardsList.length > 0 ? (
          cardsList.map(card => <Card 
            key={card.id}
            card={card}
            type='default' 
              />)
        ) : (
          <p className={style.empty}>Загружаются...</p>
        )}

      </div>
    );
  }