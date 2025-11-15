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
            
            <a className={style.navBtn}>
                <img src={CatalogIcon} alt="Каталог" />
            </a>
            
            <NavLink to={'/saved'}  className={style.navBtn}>
                <img src={FavoriteIcon} alt="Избранное" />
            </NavLink>
            
            <NavLink to={'/basket'}  className={style.navBtn}>
                <img src={CartIcon} alt="Корзина" />
            </NavLink>
            
            <NavLink to={'/profile'} className={style.navBtn}>
                <img src={AccountIcon} alt="Профиль" />
            </NavLink>

        </div>
    )
}