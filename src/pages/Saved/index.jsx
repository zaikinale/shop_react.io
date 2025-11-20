// components/Saved/index.jsx
import style from './style.module.css';
import SavedContainer from '../../components/SavedContainer'

export default function Saved ({ cards, toggleLike }) {
    
    return (
    <div className={style.main}>
        <h1 className="">Сохраненые</h1>
        <>
        <SavedContainer 
            cardsList={cards}
            toggleLike={toggleLike}
            />
        </>
    </div>
    )
}