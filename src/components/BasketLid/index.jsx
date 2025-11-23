import style from './style.module.css';
import { useSelector } from 'react-redux';

function getItemsText(count) {
    const titles = ['товар', 'товара', 'товаров'];
    const cases = [2, 0, 1, 1, 1, 2];
    const idx = (count % 100 > 4 && count % 100 < 20)
        ? 2
        : cases[(count % 10 < 5) ? count % 10 : 5];
    return `${count} ${titles[idx]}`;
}

export default function BasketLid() {
    const basketItems = useSelector(state => state.basketItems); 
    const totalCount = Object.values(basketItems).reduce((sum, count) => sum + count, 0);

    if (totalCount === 0) {
        return null; 
    }

    return (
        <section className={style.container}>
            <h2 className={style.sectionTitle}>Корзина:</h2>
            <span className={style.quantity}>{getItemsText(totalCount)}</span>
        </section>
    );
}