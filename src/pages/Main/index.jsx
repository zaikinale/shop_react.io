// components/Main/index.jsx
import style from './style.module.css'
import SearchEngine from '../../components/SearchEngine/index.jsx'
import SliderProductTypes from '../../components/SliderProductTypes/index.jsx'
import ProductContainer from '../../components/ProductContainer/index.jsx'
import SearchedContainer from '../../components/SearchedContainer/index.jsx'

export default function Main ({ setIsSearchActive, isSearchActive, searchQuery, setSearchQuery, fastSearchStrings}) { 

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
                />

                {isSearchActive ? (
                    searchQuery ? (
                        <div></div> 
                    ) : (
                        <SearchedContainer onSelect={handleSelectSearch} fastSearchStrings={fastSearchStrings} />
                    )
                ) : (
                    <>
                        <SliderProductTypes />
                        <ProductContainer />
                    </>
                )}

            </div>
        </>

    )
}