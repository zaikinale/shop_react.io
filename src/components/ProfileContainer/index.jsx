import style from './style.module.css'
import avatarIcon from '../../assets/avatar.svg'

export default function ProfileContainer ({ person, setPerson }) {
    const handleLogout = () => {
        localStorage.removeItem('person');
        setPerson([]);
    };

    return (
        <section className={style.container}>
            <h1 className={style.container__title}>Профиль</h1>
            <div className={style.data}>
                <h2 className={style.subtitle}>Данные пользователя</h2> 
                <div className={style.dataContainer}>
                    <img className={style.imgProfile} src={avatarIcon} alt="Изображение пользователя" />
                    <div className={style.containerDesc}>
                        <ul className={style.data__items}>
                            {person.map((user, index) => (
                                <li className={style.data__item} key={index}>{user.email}</li>
                            ))}
                        </ul>
                        <button className={style.resetData} onClick={handleLogout}>Выйти из профиля</button>
                    </div>
                </div>
            </div>
        </section>
    )
}