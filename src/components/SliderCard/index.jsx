import { useState } from 'react';
import style from './style.module.css';

export default function SliderCard({ card }) {
    const [imgError, setImgError] = useState(false);
    return (
        <div className={style.cardType}>
            {card.images?.[0]?.Image_URL && !imgError  ? 
                <img className={style.card__img} src={card.images[0].Image_URL} alt={card.name} onError={() => setImgError(true)} /> 
                : <div className={style.card__img}></div> }
            <h3 className={style.card__title}>{card.name}</h3>
        </div>
    );
}