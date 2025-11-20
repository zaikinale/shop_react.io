// components/Basket/index.jsx
import style from './style.module.css';
import BasketContainer from '../../components/BasketContainer/index.jsx';

export default function Basket({ cards, setBasket, basket, likedItems, toggleLike, isLiked }) {
    return (
    <div className={style.main}>
        <h1 className="">Корзина</h1>
        <>
        <BasketContainer 
            cardsList={cards} 
            setBasket={setBasket} 
            basket={basket}
            likedItems={likedItems}
            toggleLike={toggleLike}
            isLiked={isLiked}
            />
        </>
    </div>
    )
}