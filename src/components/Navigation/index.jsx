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
                <img src={HomeIcon} alt="" />
            </button>
            <button className={style.navBtn}>
                <img src={CatalogIcon} alt="" />
            </button>
            <button className={style.navBtn}>
                <img src={FavoriteIcon} alt="" />
            </button>
            <button className={style.navBtn}>
                <img src={CartIcon} alt="" />
            </button>
            <button className={style.navBtn}>
                <img src={AccountIcon} alt="" />
            </button>

        </div>
    )
}