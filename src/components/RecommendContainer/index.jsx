import style from './style.module.css'
import ProductCard from '../ProductCard'
import { useSelector } from 'react-redux'

export default function RecommendContainer() {
    const cardsList = useSelector(state => state.cards) || [];
    return (
        <section className={style.container}>
            <h2 className={style.sectionTitle}>Рекомендации:</h2>
            <div className={style.containerCards}>
                {cardsList.length > 0 ? (
                    cardsList.map(card => 
                        <ProductCard 
                            key={card.id}
                            card={card} 
                        />)
                    ) : (
                        <p className={style.empty}>Ошибка загрузки</p>
                )}
            </div>
        </section>
    )
}