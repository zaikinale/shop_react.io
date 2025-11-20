// components/Saved/index.jsx
import style from './style.module.css';
import SavedContainer from '../../components/SavedContainer'

export default function Saved ({ cards, setBasket, basket, toggleLike }) {
    // Проверяем, что likedItems определен
    // if (!likedItems) {
    //     console.error('likedItems is undefined in Saved component');
    //     return <div>Ошибка загрузки избранного</div>;
    // }
    // const savedCards = cards.filter(card => likedItems.includes(card.id));
    
    return (
    <div className={style.main}>
        <h1 className="">Сохраненые</h1>
        <>
        <SavedContainer 
            cardsList={cards}
            setBasket={setBasket} 
            basket={basket}
            toggleLike={toggleLike}
            />
        </>
    </div>
    )
}