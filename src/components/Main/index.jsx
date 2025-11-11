import style from './style.module.css'
import SearchEngine from '../SearchEngine/index.jsx'
import SliderProductTypes from '../SliderProductTypes/index.jsx'
import ProductContainer from '../ProductContainer/index.jsx'
import SearchedContainer from '../SearchedContainer'

export default function Main ({cards, types, setIsSearchActive, isSearchActive, searchQuery, setSearchQuery}) {

    return (
        <>
            <div className={style.main}>
                <SearchEngine setIsSearchActive={setIsSearchActive} setSearchQuery={setSearchQuery} />
                {isSearchActive ? (
                    searchQuery ? (
                        <div></div> 
                    ) : (
                        <SearchedContainer />
                    )
                ) : (
                    <>
                        <SliderProductTypes typesList={types} />
                        <ProductContainer cardsList={cards} />
                    </>
                )}
            </div>
        </>
    )
}