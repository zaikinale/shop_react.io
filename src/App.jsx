import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Main from './components/Main/index.jsx'
import Header from './components/Header/index.jsx'
import Navigation from './components/Navigation/index.jsx'
import Profile from './components/Profile/ProfileContainer/index.jsx'

import {BrowserRouter, Route, Routes } from 'react-router'

import LogoIcon from './assets/logo_xp.jpeg'


function App() {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [fastSearchStrings, setFastSearchStrings] = useState([]);
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
        if (data.special_project_parameters_json && data.special_project_parameters_json.fast_search_strings) {
          setFastSearchStrings(data.special_project_parameters_json.fast_search_strings.parameters_list || []);
        } else {
          setFastSearchStrings([]);
        }
      })
      .catch(() => {
        setCards([]); 
        setTypes([]);
      });
  }, []);

  // return (

  //   <>

  //     <Header 
  //       setIsSearchActive={setIsSearchActive} 
  //       isSearchActive={isSearchActive} 
  //       isSettingsActive={isSettingsActive} 
  //       setIsSettingsActive={setIsSettingsActive} 
  //       setIsDarkTheme={setIsDarkTheme} 
  //       isDarkTheme={isDarkTheme}>
  //     </Header>
      
  //     <div className={isSettingsActive ? 'contentBlur' : ''}>

  //       <Main 
  //         cards={cards} 
  //         types={types} 
  //         setIsSearchActive={setIsSearchActive} 
  //         isSearchActive={isSearchActive} 
  //         searchQuery={searchQuery} 
  //         setSearchQuery={setSearchQuery} 
  //         fastSearchStrings={fastSearchStrings}>
  //       </Main>

  //       {/* <div className='author_block'>
  //         <img className='author_img' src={LogoIcon} alt="A&S" />
  //         <h4 className='author_text'>by A&S</h4>
  //       </div> */}

  //       {!isSearchActive && <Navigation></Navigation>}  

  //     </div>
      
  //   </>
  // )



  return (
    <>
    <BrowserRouter>
      <Header 
        setIsSearchActive={setIsSearchActive} 
        isSearchActive={isSearchActive} 
        isSettingsActive={isSettingsActive} 
        setIsSettingsActive={setIsSettingsActive} 
        setIsDarkTheme={setIsDarkTheme} 
        isDarkTheme={isDarkTheme}>
      </Header>

      <Routes>
        <Route index element={(
        <div className={isSettingsActive ? 'contentBlur' : ''}>

          <Main 
            cards={cards} 
            types={types} 
            setIsSearchActive={setIsSearchActive} 
            isSearchActive={isSearchActive} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            fastSearchStrings={fastSearchStrings}>
          </Main>

          {/* <div className='author_block'>
            <img className='author_img' src={LogoIcon} alt="A&S" />
            <h4 className='author_text'>by A&S</h4>
          </div> */}

        </div>
          )}>
        </Route>
        <Route path='profile' element={<Profile></Profile>}>

        </Route>
        
      </Routes>
      {!isSearchActive && <Navigation></Navigation>}  
    </BrowserRouter>

      
      
      
      
    </>
  )


}

export default App
