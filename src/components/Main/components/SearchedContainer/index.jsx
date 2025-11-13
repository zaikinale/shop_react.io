import style from './style.module.css'
import SearchedItem  from "./components/SearchedItem" 

export default function SearchedContainer({onSelect, fastSearchStrings}) { 

    return (
        <div className={style.sectionContainer}>  

            <h2 className={style.searchTitle}>Часто ищут</h2>
            
            <div className={style.searchContainer}>
                
                {fastSearchStrings.map((tag, index) => ( 
                    <SearchedItem
                        key={index}
                        text={tag}
                        onSelect={onSelect}
                    />
                
                ))}
            
            </div>
        
        </div>
        
    );
}