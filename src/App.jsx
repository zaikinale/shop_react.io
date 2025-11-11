import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Main from './components/Main/index.jsx'
import Header from './components/Header/index.jsx'
import Navigation from './components/Navigation/index.jsx'

import LogoIcon from './assets/logo_xp.jpeg'


function App() {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);;
  const [isSearchActive, setIsSearchActive] = useState(false);


  useEffect(() => {
    fetch('https://noxer-test.ru/webapp/api/products/on_main')
      .then(res => res.json())
      .then(data => {
        setCards(data.products || []);
        setTypes(data.categories || []);
      })
      .catch(() => {
        setCards([]); 
        setTypes([]);
      });
  }, []);

  return (
    <>
      <Header setIsSearchActive={setIsSearchActive} isSearchActive={isSearchActive}></Header>
      <Main cards={cards} types={types} setIsSearchActive={setIsSearchActive} isSearchActive={isSearchActive}></Main>
      <div className='author_block'>
        <img className='author_img' src={LogoIcon} alt="A&S" />
        <h4 className='author_text'>by A&S</h4>
      </div>
      {!isSearchActive && <Navigation></Navigation>}  
    </>
  )


}

export default App
