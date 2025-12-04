import { useState, useEffect } from 'react';
import style from './style.module.css';
import SearchIcon from '../../assets/media/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useSearch } from '../../context/SearchContext';
import CardImg from '../CardImg/CardImg.jsx'
import SaveButton from '../SaveButton/SaveButton.jsx'
import BasketButton from '../BasketButton/BasketButton.jsx'
import heartUnactive from '../../assets/media/heart_unactive.svg';
import heartActive from '../../assets/media/heart_active.svg';

export default function SearchEngine() {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basketItems);
    const { searchQuery, setSearchQuery, setIsSearchActive } = useSearch();
    const cards = useSelector(state => state.cards);
    const [query, setQuery] = useState('');

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleSearchClickUnactive = () => {
        setIsSearchActive(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSearchQuery(value);
    };

    const foundCard = Array.isArray(cards)
        ? cards.find(card => card.name && card.name.toLowerCase().includes(query.toLowerCase()))
        : undefined;

    const hasMatch = foundCard && query.trim() !== '';

    const isBasket = foundCard
        ? Object.prototype.hasOwnProperty.call(basketItems, String(foundCard.id))
        : false;

    const handleClickLike = () => {
        if (foundCard) {
            dispatch({ type: 'LIKE_ITEM', payload: { id: foundCard.id } });
        }
    };

    const handleClickBasket = () => {
        if (!foundCard) return;
        if (isBasket) {
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: foundCard.id, count: 0 } });
        } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: foundCard.id } });
        }
    };

    return (
        <div className={style.searchWrapper}>
            <label
                htmlFor="searchInput"
                className={`${style.search} ${hasMatch ? style.searchActive : ''}`}
            >
                <img src={SearchIcon} alt="Искать:" />
                <input
                    className={style.searchInput}
                    type="search"
                    placeholder="Найти товары"
                    id="searchInput"
                    name="searchInput"
                    value={query}
                    onClick={handleSearchClick}
                    onChange={handleChange}
                />
                {hasMatch && (
                    <Link
                        to={`/product/${foundCard.id}`}
                        className={style.goToProduct}
                        onClick={handleSearchClickUnactive}
                    >
                        Перейти
                    </Link>
                )}
            </label>

            {hasMatch && (
                <div className={`${style.foundProductContainer} ${style.overlay}`}>
                    <div className={style.miniContainerProduct}>
                        <CardImg card={foundCard} style={style}/>
                        <div className={style.miniDescProductContainer}>
                          <div className={style.miniDescProductContainerText}>
                              <p className={style.miniDescProduct}>{foundCard.name}</p>
                              <SaveButton type={'default'} card={foundCard} style={style} isLikePending={''} setIsLikePending={''}></SaveButton>
                          </div>
                            <div className={style.miniPriceContainer}>
                                <h4 className={style.miniFinalPrice}>{foundCard.price}₽</h4>
                                {foundCard.old_price && foundCard.old_price > foundCard.price && (
                                    <div className={style.miniSalaryContainer}>
                                        <span className={style.miniOriginalPrice}>
                                            {foundCard.old_price}₽
                                        </span>
                                        <span className={style.miniSalary}>
                                            -{Math.round(100 - (foundCard.price / foundCard.old_price) * 100)}%
                                        </span>
                                    </div>
                                )}
                                <BasketButton
                                    type={'default'}
                                    isBasket={isBasket}
                                    isBasketPending={''}
                                    currentCount={''}
                                    onToggle={handleClickBasket}
                                    onAdd={''}
                                    onDelete={''}
                                    style={style}
                                ></BasketButton>
                                {/*<button*/}
                                {/*    className={isBasket ? style.btnChooseActive : style.btnChoose}*/}
                                {/*    onClick={handleClickBasket}*/}
                                {/*>*/}
                                {/*    {isBasket ? 'Убрать' : 'Выбрать'}*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}