import style from './style.module.css';
import SavedContainer from './components/SavedContainer/index.jsx';

export default function Saved ({ cards, setBasket, basket, setSavedProduct, savedProduct }) {
    return (
    <div className={style.main}>
        <h1 className="">Сохраненые</h1>
        <>
        <SavedContainer 
            cardsList={cards} 
            setBasket={setBasket} 
            setSavedProduct={setSavedProduct} 
            savedProduct={savedProduct} 
            basket={basket} />
        </>
    </div>
    )
}