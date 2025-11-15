import style from './style.module.css';
import BasketContainer from './components/BasketContainer/index.jsx';

export default function Basket({ cards, setBasket, basket, setSavedProduct, savedProduct }) {
    return (
    <div className={style.main}>
        <h1 className="">Корзина</h1>
        <>
        <BasketContainer 
            cardsList={cards} 
            setBasket={setBasket} 
            setSavedProduct={setSavedProduct} 
            savedProduct={savedProduct} 
            basket={basket} />
        </>
    </div>
    )
}