import { useState } from 'react';
import style from './style.module.css';

export default function TypeCard({ types }) {
    const [imgError, setImgError] = useState(false);
    return (
        <div className={style.cardType}>

            {types.Category_Image && !imgError ? <img className={style.card__img} src={types.Category_Image} alt={types.Category_Name} onError={() => setImgError(true)} /> : <div className={style.card__img}></div> }
            
            {/* <img
                className={style.card__img}
                src={types.Category_Image || 'https://via.placeholder.com/150'}
                alt={types.Category_Name}
            /> */}
            
            <h3 className={style.card__title}>{types.Category_Name}</h3>
        
        </div>
    );
}