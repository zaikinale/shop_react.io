// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/Main/index.jsx'
import Header from './components/Header/index.jsx'
import Navigathion from './components/Navigathion/index.jsx'

import LogoIcon from './assets/logo_xp.jpeg'


function App() {

  const cards = [
  { 
    id: 1,
    price: 3500,
    isHit: true,
    isPremium: true,
    isNew: true,
    salary: 20,
    name: 'Футболка мужская',
    img: 'https://i.ibb.co/jvVYhy5D/2025-10-06-17-20-49.jpg',
  },
  { 
    id: 2,
    price: 4000,
    isHit: true,
    isPremium: false,
    isNew: true,
    salary: 20,
    name: 'Штаны мужская Комары',
    img: 'https://i.ibb.co/jvVYhy5D/2025-10-06-17-20-49.jpg',
  },
  { 
    id: 3,
    price: 5500,
    isHit: false,
    isPremium: true,
    isNew: false,
    salary: 20,
    name: 'Футболка мужская Комары',
    img: 'https://i.ibb.co/jvVYhy5D/2025-10-06-17-20-49.jpg',
  },
  { 
    id: 4,
    price: 3600,
    isHit: true,
    isPremium: false,
    isNew: true,
    salary: 0,
    name: 'Футболка мужская Комары',
    img: 'https://i.ibb.co/jvVYhy5D/2025-10-06-17-20-49.jpg',
  }
]

const types = [
  {
    id: 1,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Аксессуар',
  },
  {
    id: 2,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Телефон',
  },
  {
    id: 3,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Штаны',
  },
  {
    id: 4,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Кроссовки',
  },
  {
    id: 5,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Дилдаки',
  },
]

  return (
    <>
      <Header></Header>
      <Main cards={cards} types={types}></Main>
      <div className='author_block'>
        <img className='author_img' src={LogoIcon} alt="A&S" />
        <h4 className='author_text'>by A&S</h4>
      </div>
      <Navigathion></Navigathion>
    </>
  )


}

export default App
