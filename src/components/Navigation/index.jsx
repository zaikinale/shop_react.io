import style from './style.module.css'
import { NavLink } from 'react-router'

import HomeUnActiveIcon from '../../assets/homeUnActive.svg'
import CatalogUnActiveIcon from '../../assets/catalogUnActive.svg'
import FavoriteUnActiveIcon from '../../assets/favoriteUnActive.svg'
import CartUnActiveIcon from '../../assets/cartUnActive.svg'
import AccountUnActiveIcon from '../../assets/accountUnActive.svg'

import HomeActiveIcon from '../../assets/homeActive.svg'
import CatalogActiveIcon from '../../assets/catalogActive.svg'
import FavoriteActiveIcon from '../../assets/favoriteActive.svg'
import CartActiveIcon from '../../assets/cartActive.svg'
import AccountActiveIcon from '../../assets/accountActive.svg'

export default function Navigathion () {

    return (
        <div className={style.nav}>
            <NavLink to={'/'} className={style.navBtn}>
                <img src={HomeUnActiveIcon} alt="Главная" />
            </NavLink>
            
            <NavLink to={'/catalog'} className={style.navBtn}>
                <img src={CatalogUnActiveIcon} alt="Каталог" />
            </NavLink>
            
            <NavLink to={'/saved'}  className={style.navBtn}>
                <img src={FavoriteUnActiveIcon} alt="Избранное" />
            </NavLink>
            
            <NavLink to={'/basket'}  className={style.navBtn}>
                <img src={CartUnActiveIcon} alt="Корзина" />
            </NavLink>
            
            <NavLink to={'/profile'} className={style.navBtn}>
                <img src={AccountUnActiveIcon} alt="Профиль" />
            </NavLink>

        </div>
    )
}