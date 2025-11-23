import style from './style.module.css';
import SliderCard from '../SliderCard/index.jsx';
import { Link } from 'react-router'; 

export default function SliderCardsContainer({ type, cards }) {
    const subtitle = type === 'basket' ? 'Ждут в корзине:' : 'Ваше избранное:';

    return (
    <section className={style.container}>
        <h2 className={style.subtitle}>{subtitle}</h2>
        <div className={style.sliderTypes}>
            {cards.length > 0 ? (
                cards.map(card => (
                    <Link
                        key={card.id}
                        to={`/product/${card.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <SliderCard card={card} />
                    </Link>
                ))
                ) : (
                <p className={style.empty}>Пока что пусто</p>
            )}
        </div>
    </section>
    );
}