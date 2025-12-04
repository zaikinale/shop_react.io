import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export default function SaveButton({type, card, style, isLikePending, setIsLikePending}) {
    const dispatch = useDispatch();
    const likedItems = useSelector(state => state.likedItems);
    // const [isLikePending, setIsLikePending] = useState(false);
    const [isBasketPending, setIsBasketPending] = useState(false);
    const likeTimeoutRef = useRef(null);

    const isLiked = likedItems.includes(card.id);

    useEffect(() => {
        return () => {
            if (likeTimeoutRef.current) clearTimeout(likeTimeoutRef.current);
        };
    }, []);

    const handleClickLike = () => {
        if (type === 'saved') {
            if (isLikePending) {
                clearTimeout(likeTimeoutRef.current);
                setIsLikePending(false);
                likeTimeoutRef.current = null;
            } else {
                setIsLikePending(true);
                likeTimeoutRef.current = setTimeout(() => {
                    dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
                    setIsLikePending(false);
                }, 3000);
            }
        } else {
            dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
        }
    };

    if (type === 'saved') {
        return (
            <button
                className={style.saveButton}
                aria-label={isLikePending ? "Отменить удаление" : "Удалить из избранного"}
                onClick={handleClickLike}
            >
                <img
                    className={style.save}
                    src={isLikePending ? heartUnactive : heartActive}
                    alt=""
                />
            </button>
        );
    }
    return (
        <button className={style.saveButton} onClick={handleClickLike}>
            <img
                className={style.save}
                src={isLiked ? heartActive : heartUnactive}
                alt=""
            />
        </button>
    );
}