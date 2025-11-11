import style from './style.module.css';

export default function TypeCard({ types }) {
    return (
        <div className={style.cardType}>
            <img
                className={style.card__img}
                src={types.Category_Image || 'https://via.placeholder.com/150'}
                alt={types.Category_Name}
            />
            <h3 className={style.card__title}>{types.Category_Name}</h3>
        </div>
    );
}