import style from './style.module.css';
import BasketContainer from '../../components/BasketContainer/index.jsx';
import BasketLid from '../../components/BasketLid/index.jsx';
import BasketInvoice from '../../components/BasketInvoice/index.jsx';

export default function Basket() {
    return (
    <div className={style.main}>
        {/* <h1 className="">Корзина</h1> */}
        <BasketLid />
        <BasketContainer />
        <BasketInvoice />
    </div>
    )
}