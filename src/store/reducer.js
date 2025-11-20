const initialState = {
    likedItems: [],
    basketItems: [],
    cards: [],
    types: []
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'SET_CARDS':
            return {
                ...state,
                cards: action.payload
            }
        case 'LIKE_ITEM':
            if (state.likedItems.includes(action.payload.id)) {
                return {
                    ...state,
                    likedItems: state.likedItems.filter(id => id !== action.payload.id)
                };
            } else {
                return {
                    ...state,
                    likedItems: [...state.likedItems, action.payload.id]
            };
        }
        case 'ADD_TO_BASKET':
            if (state.basketItems.includes(action.payload.id)) {
                return {
                    ...state,
                    basketItems: state.basketItems.filter(id => id !== action.payload.id)
                };
            } else {
                return {
                    ...state,
                    basketItems: [...state.basketItems, action.payload.id]
                };
            }
        default:
            return state;
    }
}

export default appReducer;