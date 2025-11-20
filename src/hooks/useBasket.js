import { useState, useEffect, useCallback } from 'react';

export default function useBasket() {
    const [basketItems, setBasketItems] = useState(() => {
        const basket = localStorage.getItem('basketItems');
        return basket ? JSON.parse(basket) : [];
    });

    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);

    const toggleBasket = useCallback((id) => {
        setBasketItems(prevBasketItems => {
            if (prevBasketItems.includes(id)) {
                return [...prevBasketItems.filter(itemId => itemId !== id)];
            } else {
                return [...prevBasketItems, id];
            }
        });
    }, []);

    const isBasket = useCallback((id) => {
        return basketItems.includes(id);
    }, [basketItems]);

    return { basketItems, toggleBasket, isBasket };
}