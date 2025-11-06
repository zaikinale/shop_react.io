import style from './style.module.css';

export default function TypesCard({ types }) {
    return (
        <div className={style.cardType}>
            <img className={style.card__img} src={types.img} alt={types.name} />
            <h3 className={style.card__title}>{types.name}</h3>
        </div>
    );
}