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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  if (isDarkTheme) {
    console.log(isDarkTheme)
  } 

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
      <Header setIsSearchActive={setIsSearchActive} isSearchActive={isSearchActive} isSettingsActive={isSettingsActive} setIsSettingsActive={setIsSettingsActive} setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme}></Header>
      <div className={isSettingsActive ? 'contentBlur' : ''}>
        <Main cards={cards} types={types} setIsSearchActive={setIsSearchActive} isSearchActive={isSearchActive} searchQuery={searchQuery} setSearchQuery={setSearchQuery}></Main>
        {/* <div className='author_block'>
          <img className='author_img' src={LogoIcon} alt="A&S" />
          <h4 className='author_text'>by A&S</h4>
        </div> */}
        {/* <div></div> */}
        {!isSearchActive && <Navigation></Navigation>}  
      </div>
      
    </>
  )


}

export default App
