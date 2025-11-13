

export default function ProfileContainer ({ person, setPerson }) {
    const handleLogout = () => {
        localStorage.removeItem('person');
        setPerson([]);
    };

    return (
        <section>
            <h1>Профиль</h1>
            <div className=''>
                Данные пользователя
                <ul>
                    {person.map((user, index) => (
                        <li key={index}>{user.email}</li>
                    ))}
                </ul>
                <button className="" onClick={handleLogout}>Выйти из профиля</button>
            </div>
        </section>
    )
}