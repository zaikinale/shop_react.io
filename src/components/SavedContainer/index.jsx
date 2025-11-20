import style from './style.module.css'
import SavedItem from '../SavedItem/index.jsx'
import useLikes from '../../hooks/useLikes.js';
// import { useState, useEffect } from 'react'

export default function SavedContainer({ cardsList = [], toggleLike }) {
    const{likedItems} = useLikes()

    const filteredCards = cardsList.filter((item) => likedItems.includes(item.id));

    return (
        <div className={style.containerProducts}>
            {filteredCards.length > 0 ? (
                filteredCards.map(card => (
                    <SavedItem
                        key={card.id}
                        card={card}
                        toggleLike={toggleLike}
                    />
                ))
            ) : (
                <p className={style.empty}>Нет сохранённых товаров</p>
            )}
        </div>
    );
}