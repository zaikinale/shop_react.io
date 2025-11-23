import style from './style.module.css'
import SliderCard from '../SliderCard/index.jsx'

export default function SliderCardsContainer({ subtitle, cards}) {
    return (
        <section className={style.container}>
            <h2 className={style.subtitle}>{subtitle}</h2>
            <div className={style.sliderTypes}>
                {cards.map(card => (
                    <SliderCard key={card.id} card={card} />
                ))}
            </div>
        </section>
    );
}

