import { useState, useEffect } from 'react';
import style from './style.module.css';
import SearchIcon from '../../assets/search.svg';

export default function SearchEngine({ setIsSearchActive, setSearchQuery, searchQuery, cards }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value);
  };

  const foundCard = Array.isArray(cards) ? cards.find(card =>
    card.name && card.name.toLowerCase().includes(query.toLowerCase())
  ) : undefined;

  const hasMatch = foundCard && query.trim() !== '';

  return (
    <div className={style.searchWrapper}>

      <label htmlFor="searchInput" className={`${style.search} ${hasMatch ? style.searchActive : ''}`}>
        
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
        
        {hasMatch && <button type="button" className={style.goToProduct}>Перейти</button>}
      
      </label>

      {hasMatch && (
        
        <div className={`${style.foundProductContainer} ${style.overlay}`}>
          
          <div className={style.miniContainerProduct}>
            
            {foundCard.images?.[0]?.Image_URL ? (
              <img
                className={style.miniProductImg}
                src={foundCard.images[0].Image_URL}
                alt={foundCard.name}
              />
            ) : (
              <div className={style.miniProductImgPlaceholder}></div>
            )}
            <div className={style.miniDescProductContainer}>
              
              <p className={style.miniDescProduct}>{foundCard.name}</p>
              
              <div className={style.miniPriceContainer}>
                
                <h4 className={style.miniFinalPrice}>{foundCard.price}₽</h4>
                
                {foundCard.old_price && foundCard.old_price > foundCard.price && (
                  <div className={style.miniSalaryContainer}>
                    <span className={style.miniOriginalPrice}>{foundCard.old_price}₽</span>
                    <span className={style.miniSalary}>-{Math.round(100 - (foundCard.price / foundCard.old_price) * 100)}%</span>
                  </div>
                )}
              
              </div>
            
            </div>
          
          </div>
        
        </div>
      
      )}
    
    </div>
  );
}