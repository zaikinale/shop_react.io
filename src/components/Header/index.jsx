import style from './style.module.css';
import { useNavigate, useLocation } from 'react-router';
import useDarkTheme from '../../hooks/useDarkTheme';
import CloseImg from '../../assets/media/close.svg';
import TelegramIcon from '../../assets/media/icon_tg.svg';
import VectorImg from '../../assets/media/Vector.svg';
import MoreImg from '../../assets/media/more.svg';
import SunIcon from '../../assets/media/sun.svg';
import MoonIcon from '../../assets/media/moon.svg';

export default function Header({
    setIsSearchActive,
    isSearchActive,
    isSettingsActive,
    setIsSettingsActive
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [isDarkTheme, setIsDarkTheme] = useDarkTheme();

    const handleBackOrClose = () => {
        if (isSearchActive) {
            setIsSearchActive(false);
            return;
        }
        if (location.pathname.startsWith('/product/')) {
            navigate(-1);
            return;
        }
    };

    const handleOpenSettings = () => {
        setIsSettingsActive(true);
    };

    const handleCloseSettings = () => {
        setIsSettingsActive(false);
    };

    const handleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
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

            <button className={style.settings} onClick={handleOpenSettings}>
                <img src={VectorImg} alt="vector" className={style.icon} />
                <img src={MoreImg} alt="more" className={style.icon} />
            </button>

            {isSettingsActive ? (
                <div className={style.btnControlContainer}>
                    <button className={style.btnControl} onClick={handleCloseSettings}>
                        <img src={VectorImg} alt="close" className={style.btnControlImgBack} />
                        <p className={style.btnControlText}>Закрыть</p>
                    </button>
                    <button className={style.btnControl} onClick={handleTheme}>
                        <img
                            src={isDarkTheme ? SunIcon : MoonIcon}
                            alt="theme"
                            className={style.btnControlImg}
                        />
                        <p className={style.btnControlText}>Сменить тему</p>
                    </button>
                </div>
            ) : null}
        </div>
    );
}