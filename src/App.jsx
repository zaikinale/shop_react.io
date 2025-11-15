import { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main/index.jsx';
import Header from './components/Header/index.jsx';
import Navigation from './components/Navigation/index.jsx';
import Profile from './components/Profile/ProfileContainer/index.jsx';
import Login from './components/Login/index.jsx';

import { BrowserRouter, Route, Routes } from 'react-router';

import LogoIcon from './assets/logo_xp.jpeg';

function App() {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [fastSearchStrings, setFastSearchStrings] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [basket, setBasket] = useState(() => {
    const saved = localStorage.getItem('basket');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedProduct, setSavedProduct] = useState(() => {
    const savedProd = localStorage.getItem('saved');
    return savedProd ? JSON.parse(savedProd) : [];
  });

  const [person, setPerson] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(savedProduct));
  }, [savedProduct]);


  useEffect(() => {
    const savedPerson = localStorage.getItem('person');
    if (savedPerson) {
      try {
        const parsedPerson = JSON.parse(savedPerson);
        setPerson(parsedPerson);
        if (parsedPerson.length > 0) {
          setIsLogin(true);
        }
      } catch (e) {
        console.error('Ошибка при загрузке данных из localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (person.length > 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [person]);

  const handleSaveUser = (email, password) => {
    const updatedPerson = [{ email, password }];
    setPerson(updatedPerson);
    localStorage.setItem('person', JSON.stringify(updatedPerson));
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

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
                fastSearchStrings={fastSearchStrings}
                setBasket={setBasket}
                basket={basket}
                setSavedProduct={setSavedProduct}
                savedProduct={savedProduct}
              />
            </div>
          )}>
          </Route>
          <Route path='profile' element={
            isLogin ? 
              <Profile 
                person={person} 
                setPerson={setPerson}
                setBasket={setBasket}
              /> : 
              <Login onSaveUser={handleSaveUser} />
          }>
          </Route>
        </Routes>
        {!isSearchActive && <Navigation></Navigation>}  
      </BrowserRouter>
    </>
  );
}

export default App;