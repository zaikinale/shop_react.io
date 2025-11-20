// // hooks/useLikes.js
// import { useState, useEffect } from 'react';

// export default function useLikes() {
//     const [likedItems, setLikedItems] = useState(() => {
//         const saved = localStorage.getItem('likedItems');
//         return saved ? JSON.parse(saved) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem('likedItems', JSON.stringify(likedItems));
//     }, [likedItems]);

//     function toggleLike(id) {
//         setLikedItems(prevLikedItems => {
//             if (prevLikedItems.includes(id)) {
//                 return prevLikedItems.filter(itemId => itemId !== id);
//             } else {
//                 return [...prevLikedItems, id];
//             }
//         });
//     }

//     function isLiked(id) {
//         return likedItems.includes(id);
//     }

//     return { likedItems, toggleLike, isLiked };
// }

// hooks/useLikes.js
import { useState, useEffect, useCallback } from 'react';

export default function useLikes() {
    const [likedItems, setLikedItems] = useState(() => {
        const saved = localStorage.getItem('likedItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
    }, [likedItems]);

    const toggleLike = useCallback((id) => {
        setLikedItems(prevLikedItems => {
            if (prevLikedItems.includes(id)) {
                return [...prevLikedItems.filter(itemId => itemId !== id)];
            } else {
                return [...prevLikedItems, id];
            }
        });
    }, []);

    const isLiked = useCallback((id) => {
        return likedItems.includes(id);
    }, [likedItems]);

    return { likedItems, toggleLike, isLiked };
}