import style from './style.module.css';
import {getItemsText} from "../../utils/getItemsText.js";
import {useCardsDatas} from "../../hooks/useCardsDatas.js";

export default function BasketLid() {
    const { basketItems } = useCardsDatas();
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