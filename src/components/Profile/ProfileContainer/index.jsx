import style from './style.module.css'

export default function ProfileContainer ({ person, setPerson }) {
    const handleLogout = () => {
        localStorage.removeItem('person');
        setPerson([]);
    };

    return (
        <section className={style.container}>
            <h1 className={style.container__title}>Профиль</h1>
            <div className={style.data}>
                Данные пользователя
                <ul className={style.data__items}>
                    {person.map((user, index) => (
                        <li className={style.data__item} key={index}>{user.email}</li>
                    ))}
                </ul>
                <button className={style.resetData} onClick={handleLogout}>Выйти из профиля</button>
            </div>
        </section>
    )
}