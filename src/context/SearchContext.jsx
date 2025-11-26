
import { createContext, useContext, useState, useMemo } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const value = useMemo(
    () => ({
        searchQuery,
        setSearchQuery,
        isSearchActive,
        setIsSearchActive,
    }),[searchQuery, isSearchActive]
    );

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch должен использоваться внутри SearchProvider');
    }
    return context;
}