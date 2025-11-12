import style from './style.module.css'

import CloseImg from '../../assets/close.svg'
import TelegramIcon from '../../assets/icon_tg.svg'
import VectorImg from '../../assets/Vector.svg'
import MoreImg from '../../assets/more.svg'

import SunIcon from '../../assets/sun.svg'
import MoonIcon from '../../assets/moon.svg'

export default function Header ({ setIsSearchActive, isSearchActive, isSettingsActive, setIsSettingsActive, setIsDarkTheme, isDarkTheme }) {
    const handleBackOrClose = () => {
        setIsSearchActive(false); 
    };

    const handleOpenSettings = () => {
        setIsSettingsActive(true);
    }

    const handleCloseSettings = () => {
        setIsSettingsActive(false);
    }

    const handleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

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

            <button className={style.settings} onClick={handleOpenSettings}>
                <img src={VectorImg} alt="vector" className={style.icon} />
                <img src={MoreImg} alt="more" className={style.icon} />
            </button>

            { isSettingsActive ? (
                <div className={style.btnControlContainer}>
                    <button className={style.btnControl} onClick={handleCloseSettings}>
                        <img src={VectorImg} alt="close" className={style.btnControlImgBack} />
                        <p className={style.btnControlText}>Закрыть</p>
                    </button>
                    <button className={style.btnControl} onClick={handleTheme} >
                        <img src={isDarkTheme ? SunIcon : MoonIcon } alt="close" className={style.btnControlImg} />
                        <p className={style.btnControlText}>Сменить тему</p>
                    </button>
                </div>
            ) : ''}

        </div>
    )
}