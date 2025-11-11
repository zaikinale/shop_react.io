import style from './style.module.css'

import CloseImg from '../../assets/close.svg'
import TelegramIcon from '../../assets/icon_tg.svg'
import VectorImg from '../../assets/Vector.svg'
import MoreImg from '../../assets/more.svg'

export default function Header ({ setIsSearchActive, isSearchActive }) {
    const handleBackOrClose = () => {
        setIsSearchActive(false); 
    };

    return (
        <div className={style.header}>
            <button className={style.exit} onClick={handleBackOrClose}>
                <img src={CloseImg} alt="close" className={style.icon} />
                {isSearchActive ? 'Назад' : 'Закрыть'}
            </button>
            <button className={style.link}>
                <img src={TelegramIcon} alt="telegram" className={style.iconTg} />
                наш tg-канал
            </button>
            <button className={style.settings}>
                <img src={VectorImg} alt="vector" className={style.icon} />
                <img src={MoreImg} alt="more" className={style.icon} />
            </button>
        </div>
    )
}