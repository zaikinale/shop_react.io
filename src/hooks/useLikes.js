// hooks/useLikes.js
import { useState, useEffect } from 'react';

export default function useLikes() {
    const [likedItems, setLikedItems] = useState(() => {
        const saved = localStorage.getItem('likedItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
    }, [likedItems]);

    function toggleLike(id) {
        setLikedItems(prevLikedItems => {
            if (prevLikedItems.includes(id)) {
                return prevLikedItems.filter(itemId => itemId !== id);
            } else {
                return [...prevLikedItems, id];
            }
        });
    }

    function isLiked(id) {
        return likedItems.includes(id);
    }

    return { likedItems, toggleLike, isLiked };
}