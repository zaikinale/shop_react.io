// components/Main/index.jsx
import style from './style.module.css'
import SearchEngine from '../../components/SearchEngine/index.jsx'
import SliderProductTypes from '../../components/SliderProductTypes/index.jsx'
import ProductContainer from '../../components/ProductContainer/index.jsx'
import SearchedContainer from '../../components/SearchedContainer/index.jsx'

export default function Main ({cards, types, setIsSearchActive, isSearchActive, searchQuery, setSearchQuery, fastSearchStrings, setBasket, basket, likedItems, toggleLike, isLiked}) { // Добавлены пропсы для лайков

    const handleSelectSearch = (text) => {
        setSearchQuery(text); 
    };

    return (
        <>

            <div className={style.main}>

                <SearchEngine
                    setIsSearchActive={setIsSearchActive}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery} 
                    cards={cards}
                />

                {isSearchActive ? (
                    searchQuery ? (
                        <div></div> 
                    ) : (
                        <SearchedContainer onSelect={handleSelectSearch} fastSearchStrings={fastSearchStrings} />
                    )
                ) : (
                    <>
                        <SliderProductTypes typesList={types} />
                        <ProductContainer 
                            cardsList={cards} 
                            setBasket={setBasket} 
                            basket={basket}
                            likedItems={likedItems} // Передаем пропсы для лайков
                            toggleLike={toggleLike}
                            isLiked={isLiked}
                        />
                    </>
                )}

            </div>
        </>

    )
}