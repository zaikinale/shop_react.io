import style from './style.module.css'

import CloseImg from '../../assets/close.svg'
import TelegramIcon from '../../assets/icon_tg.svg'
import VectorImg from '../../assets/Vector.svg'
import MoreImg from '../../assets/more.svg'

export default function Header () {

    return (
        <div className={style.header}>
            <button className={style.exit}>
                <img src={CloseImg} alt="" className={style.icon} />
                Закрыть 
            </button>
            <button className={style.link}>
                <img src={TelegramIcon} alt="" className={style.iconTg} />
                наш tg-канал
            </button>
            <button className={style.settings}>
                <img src={VectorImg} alt="" className={style.icon} />
                <img src={MoreImg} alt="" className={style.icon} />
            </button>
        </div>
    )
}