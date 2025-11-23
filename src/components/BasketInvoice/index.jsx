import style from './style.module.css'
import { useSelector } from 'react-redux'

function getItemsText(count) {
    const titles = ['товар', 'товара', 'товаров'];
    const cases = [2, 0, 1, 1, 1, 2];
    const idx = (count % 100 > 4 && count % 100 < 20)
        ? 2
        : cases[(count % 10 < 5) ? count % 10 : 5];
    return `${count} ${titles[idx]}`;
}

function getOldTotalPrice(arr) {
    return arr.reduce((sum, item) => sum + (item.price || 0), 0);
}

function getActualTotalPrice(arr) {
    return arr.reduce((sum, item) => sum + (item.old_price || 0), 0);
}

export default function BasketInvoice() {
    const cardsList = useSelector(state => state.cards)
    const basketItems = useSelector(state => state.basketItems)
    const count = basketItems.length;
    const filteredCards = (cardsList || []).filter((item) => basketItems.includes(item.id));

    if (count === 0) {
        return null; 
    }

    return (
        <section className={style.container}>
            <div className={style.totalCountAndOldPrice}>
                <p>{getItemsText(count)}</p>
                <p>{getOldTotalPrice(filteredCards)}₽</p>
            </div>
            <div className={style.discounts}>
                <p>Скидки:</p>
                <p className={style.totalDiscount}>{`- ${getActualTotalPrice(filteredCards)}₽`}</p>
            </div>
            <div className={style.bottomLine}>
                <p className={style.totalText}>Итого:</p>
                <p className={style.total}>{`${getOldTotalPrice(filteredCards) - getActualTotalPrice(filteredCards)}₽`}</p>
            </div>
            <button className={style.btnSubmit}>Заказать</button>
        </section>
    )
}

