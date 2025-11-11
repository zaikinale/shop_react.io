import style from './style.module.css'
// import { useState } from 'react'

import SearchEngine from '../SearchEngine/index.jsx'
import SliderProductTypes from '../SliderProductTypes/index.jsx'
import ProductContainer from '../ProductContainer/index.jsx'


export default function Main ({cards, types, setIsSearchActive}) {

    return (
        <>
            <div className={style.main}>
                <SearchEngine setIsSearchActive={setIsSearchActive}></SearchEngine>
                <SliderProductTypes typesList={types}></SliderProductTypes>
                <ProductContainer cardsList={cards}></ProductContainer>
            </div>
            
        </>
    )

}