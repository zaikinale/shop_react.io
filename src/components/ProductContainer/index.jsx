// components/Main/ProductContainer/index.jsx
import style from './style.module.css'
import ProductCard from '../ProductCard'

export default function ProductContainer({ cardsList = [], setBasket, basket, likedItems, toggleLike, isLiked }) { // Принимаем пропсы для лайков
    return (
      <div className={style.containerProducts}>

        {cardsList.length > 0 ? (
          cardsList.map(card => <ProductCard 
            key={card.id}
            card={card} 
            setBasket={setBasket} 
            basket={basket}
            likedItems={likedItems} // Передаем пропсы для лайков
            toggleLike={toggleLike}
            isLiked={isLiked}
              />)
        ) : (
          <p className={style.empty}>Загружаются...</p>
        )}

      </div>
    );
  }