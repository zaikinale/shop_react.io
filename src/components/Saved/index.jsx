// components/Saved/index.jsx
import style from './style.module.css';
import SavedContainer from './components/SavedContainer/index.jsx';
// import useLikes from '../../hooks/useLikes.js';
// components/Saved/index.jsx
export default function Saved ({ cards, setBasket, basket, likedItems, toggleLike }) {
    // Проверяем, что likedItems определен
    if (!likedItems) {
        console.error('likedItems is undefined in Saved component');
        return <div>Ошибка загрузки избранного</div>;
    }
    
    const savedCards = cards.filter(card => likedItems.includes(card.id));
    
    return (
    <div className={style.main}>
        <h1 className="">Сохраненые</h1>
        <>
        <SavedContainer 
            cardsList={savedCards} // Передаем отфильтрованные карточки
            setBasket={setBasket} 
            basket={basket}
            toggleLike={toggleLike}
            />
        </>
    </div>
    )
}