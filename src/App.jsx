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
  },
  { 
    id: 5,
    price: 1000,
    isHit: true,
    isPremium: false,
    isNew: false,
    salary: 90,
    name: 'Футболка мужская Комары Комары Комары Комары Комары Комары Комары Комары Комары',
    img: 'https://i.ibb.co/jvVYhy5D/2025-10-06-17-20-49.jpg',
  },
  { 
    id: 6,
    price: 1000000,
    isHit: true,
    isPremium: false,
    isNew: false,
    salary: 10,
    name: 'Футболка женская Комары',
    img: 'https://i.ibb.co/jvVYhy5D/2025-10-06-17-20-49.jpg',
  },
  { 
    id: 7,
    price: 10,
    isHit: false,
    isPremium: false,
    isNew: false,
    salary: 10,
    name: 'Футболка женская Комары',
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
  {
    id: 6,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Дамиры',
  },
  {
    id: 7,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Дениски',
  },
  {
    id: 8,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Сосиски',
  },
  {
    id: 9,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Картинки',
  },
  {
    id: 10,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Вадимки',
  },
  {
    id: 11,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Пипирки',
  },
  {
    id: 12,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Сардельки',
  },
  {
    id: 13,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Палки',
  },
  {
    id: 14,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Кружки',
  },
  {
    id: 15,
    img: 'https://i.ibb.co/4nZ2KSWW/logo-black-on-black.jpg',
    name: 'Тарелки',
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
