// components/Saved/index.jsx
import style from './style.module.css';
import SavedContainer from './components/SavedContainer/index.jsx';
import useLikes from '../../hooks/useLikes.js';

export default function Saved ({ cards, setBasket, basket }) {
    const { likedItems } = useLikes();
    
    const savedCards = cards.filter(card => likedItems.includes(card.id));
    
    return (
    <div className={style.main}>
        <h1 className="">Сохраненые</h1>
        <>
        <SavedContainer 
            cardsList={savedCards} 
            setBasket={setBasket} 
            basket={basket} />
        </>
    </div>
    )
}