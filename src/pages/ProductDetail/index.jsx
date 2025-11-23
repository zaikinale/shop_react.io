// src/pages/ProductDetail/index.jsx
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import style from './style.module.css';

export default function ProductDetail() {
    const { id } = useParams();
    const cards = useSelector(state => state.cards);

    const product = cards.find(card => String(card.id) === String(id));

    if (!product) {
        return <div className={style.center}>Товар не найден</div>;
    }

    return (
        <div className={style.productDetail}>
            <h1>{product.name}</h1>
            {product.images?.[0]?.Image_URL && (
                <img 
                    src={product.images[0].Image_URL} 
                    alt={product.name} 
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            <p>Цена: {product.price} ₽</p>
            {product.description && <p>{product.description}</p>}
        </div>
    );
}