import style from './style.module.css'
import SearchEngine from './components/SearchEngine/index.jsx'
import SliderProductTypes from './components/SliderProductTypes/index.jsx'
import ProductContainer from './components/ProductContainer/index.jsx'
import SearchedContainer from './components/SearchedContainer/index.jsx'

export default function Main ({cards, types, setIsSearchActive, isSearchActive, searchQuery, setSearchQuery, fastSearchStrings, setBasket}) {

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
                        <ProductContainer cardsList={cards} setBasket={setBasket}/>
                    </>
                )}

            </div>
        </>

    )
}