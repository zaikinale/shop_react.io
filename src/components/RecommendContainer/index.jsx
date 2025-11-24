import style from './style.module.css'
// import ProductCard from '../ProductCard'
import Card from '../Card';
import { useSelector } from 'react-redux'

export default function RecommendContainer() {
    const cardsList = useSelector(state => state.cards) || [];
    return (
        <section className={style.container}>
            <h2 className={style.sectionTitle}>Рекомендации:</h2>
            <div className={style.containerCards}>
                {cardsList.length > 0 ? (
                    cardsList.map(card => 
                        <Card 
                            key={card.id}
                            card={card} 
                            type='default'
                        />)
                    ) : (
                        <p className={style.empty}>Ошибка загрузки</p>
                )}
            </div>
        </section>
    )
}