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

export default function BasketInvoice() {
    const cardsList = useSelector(state => state.cards);
    const basketItems = useSelector(state => state.basketItems); 
  
    const cartItems = Object.entries(basketItems)
        .map(([id, count]) => {
            const card = cardsList.find(c => String(c.id) === String(id));
            return card ? { ...card, count } : null;
        })
        .filter(Boolean);
    const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);
    const totalActualPrice = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);
    const totalOldPrice = cartItems.reduce((sum, item) => 
      sum + ((item.old_price || item.price) * item.count), 0
    );

    const totalDiscount = totalOldPrice - totalActualPrice;

    if (totalCount === 0) return null;

    return (
    <section className={style.container}>
        <div className={style.totalCountAndOldPrice}>
            <p>{getItemsText(totalCount)}</p>
            <p>{totalOldPrice}₽</p>
        </div>
        <div className={style.discounts}>
            <p>Скидки:</p>
            <p className={style.totalDiscount}>{`- ${totalDiscount}₽`}</p>
        </div>
        <div className={style.bottomLine}>
            <p className={style.totalText}>Итого:</p>
            <p className={style.total}>{totalActualPrice}₽</p>
        </div>
        <button className={style.btnSubmit}>Заказать</button>
    </section>
    );
}