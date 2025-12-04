import { useState } from 'react';
import style from './style.module.css';
import CardImg from '../CardImg/CardImg.jsx'

export default function SliderCard({ card }) {
    const [imgError, setImgError] = useState(false);
    return (
        <div className={style.cardType}>
            <CardImg card={card} style={style}></CardImg>
            <h3 className={style.card__title}>{card.name}</h3>
        </div>
    );
}