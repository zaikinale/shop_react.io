import { useSelector } from 'react-redux';

export function useCardsDatas() {
    const cards = useSelector(state => state.cards) || [];
    const likedItems = useSelector(state => state.likedItems) || [];
    const basketItems = useSelector(state => state.basketItems) || {};
    const typesItems = useSelector(state => state.types) || [];

    const likedCards = (cards || []).filter(item => likedItems.includes(item.id));
    const basketCards = (cards || []).filter(item => basketItems[String(item.id)] > 0);

    return {
        cards,
        likedItems,
        basketItems,
        typesItems,
        likedCards,
        basketCards
    };
}