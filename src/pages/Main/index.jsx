// components/Main/index.jsx
import style from './style.module.css';
import SearchEngine from '../../components/SearchEngine/index.jsx';
import SliderProductTypes from '../../components/SliderProductTypes/index.jsx';
import CardsContainer from '../../components/CardsContainer/index.jsx';
import SearchedContainer from '../../components/SearchedContainer/index.jsx';
import NewReleasesSlider from '../../components/NewReleasesSlider/index.jsx';
import { useSearch } from '../../context/SearchContext'; 

export default function Main({ fastSearchStrings }) {
    const { isSearchActive, searchQuery, setSearchQuery } = useSearch();

    const handleSelectSearch = (text) => {
        setSearchQuery(text);
    };

    return (
        <div className={style.main}>
            <SearchEngine />
            {isSearchActive ? (
                searchQuery ? (
                    <div></div>
                ) : (
                    <SearchedContainer onSelect={handleSelectSearch} fastSearchStrings={fastSearchStrings} />
                )
            ) : (
                <>
                    <NewReleasesSlider />
                    <SliderProductTypes />
                    <CardsContainer mode={'default'} />
                </>
            )}
        </div>
    );
}