import style from './style.module.css'

import SearchEngine from '../SearchEngine/index.jsx'
import SliderProductTypes from '../SliderProductTypes/index.jsx'
import ProductContainer from '../ProductContainer/index.jsx'


export default function Main ({cards, types}) {
    return (
        <>
            <div className={style.main}>
                <h1>Test</h1>
                <SearchEngine ></SearchEngine>
                <SliderProductTypes typesList={types}></SliderProductTypes>
                <ProductContainer cardsList={cards}></ProductContainer>
            </div>
            
        </>
    )

}