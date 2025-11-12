import style from './style.module.css'

import HomeIcon from '../../assets/home.svg'
import CatalogIcon from '../../assets/catalog.svg'
import FavoriteIcon from '../../assets/favorite.svg'
import CartIcon from '../../assets/cart.svg'
import AccountIcon from '../../assets/account.svg'


export default function Navigathion () {


    return (
        <div className={style.nav}>

            <button className={style.navBtn}>
                <img src={HomeIcon} alt="Главная" />
            </button>
            
            <button className={style.navBtn}>
                <img src={CatalogIcon} alt="Каталог" />
            </button>
            
            <button className={style.navBtn}>
                <img src={FavoriteIcon} alt="Избранное" />
            </button>
            
            <button className={style.navBtn}>
                <img src={CartIcon} alt="Корзина" />
            </button>
            
            <button className={style.navBtn}>
                <img src={AccountIcon} alt="Профиль" />
            </button>

        </div>
    )
}