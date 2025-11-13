import style from './style.module.css'
import { NavLink } from 'react-router'

import HomeIcon from '../../assets/home.svg'
import CatalogIcon from '../../assets/catalog.svg'
import FavoriteIcon from '../../assets/favorite.svg'
import CartIcon from '../../assets/cart.svg'
import AccountIcon from '../../assets/account.svg'


export default function Navigathion () {


    return (
        <div className={style.nav}>
            <NavLink to={'/'} className={style.navBtn}>
                <img src={HomeIcon} alt="Главная" />
            </NavLink>
            
            <addEventListener className={style.navBtn}>
                <img src={CatalogIcon} alt="Каталог" />
            </addEventListener>
            
            <a className={style.navBtn}>
                <img src={FavoriteIcon} alt="Избранное" />
            </a>
            
            <a className={style.navBtn}>
                <img src={CartIcon} alt="Корзина" />
            </a>
            
            <NavLink to={'/profile'} className={style.navBtn}>
                <img src={AccountIcon} alt="Профиль" />
            </NavLink>

        </div>
    )
}