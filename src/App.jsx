import { useState, useEffect } from 'react';
import './App.css';
import Main from './pages/Main/index.jsx';
import Profile from './pages/Profile/index.jsx';
import Saved from './pages/Saved/index.jsx';
import Basket from './pages/Basket/index.jsx';
import Catalog from './pages/Catalog/index.jsx';
import ProductDetail from './pages/ProductDetail/index.jsx';

import Header from './components/Header/index.jsx';
import Navigation from './components/Navigation/index.jsx';
import Login from './components/Login/index.jsx';

import { BrowserRouter, Route, Routes } from 'react-router';
import { useDispatch } from 'react-redux';

import LogoIcon from './assets/logo_xp.jpeg';

function App() {
  const dispatch = useDispatch();
  
  const [fastSearchStrings, setFastSearchStrings] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [person, setPerson] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    fetch('https://noxer-test.ru/webapp/api/products/on_main')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'SET_CARDS', payload: data.products || [] });
        dispatch({ type: 'SET_TYPES', payload: data.categories || [] });

        if (data.special_project_parameters_json && data.special_project_parameters_json.fast_search_strings) {
          setFastSearchStrings(data.special_project_parameters_json.fast_search_strings.parameters_list || []);
        } else {
          setFastSearchStrings([]);
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_CARDS', payload: [] });
        dispatch({ type: 'SET_TYPES', payload: [] });
      });
  }, [dispatch]);

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
                setIsSearchActive={setIsSearchActive} 
                isSearchActive={isSearchActive} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                fastSearchStrings={fastSearchStrings}
              />
            </div>
          )}>
          </Route>

          <Route path="product/:id" element={
            <div className={isSettingsActive ? 'contentBlur' : ''}>
              <ProductDetail />
            </div>
          } />

          <Route path='catalog' element={
            <div className={isSettingsActive ? 'contentBlur' : ''}>
              <Catalog />
            </div>
          }>
          </Route>

          <Route path='saved' element={
            isLogin ? 
              <div className={isSettingsActive ? 'contentBlur' : ''}>
                <Saved />
              </div> :
                <Login onSaveUser={handleSaveUser} />
          }></Route>

          <Route path='basket' element={
            isLogin ? 
            <div className={isSettingsActive ? 'contentBlur' : ''}>
              <Basket />
            </div> : 
              <Login onSaveUser={handleSaveUser} />
          }></Route>

          <Route path='profile' element={
            isLogin ? 
              <div className={isSettingsActive ? 'contentBlur' : ''}>
                <Profile 
                  person={person} 
                  setPerson={setPerson} 
                />
              </div> : 
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