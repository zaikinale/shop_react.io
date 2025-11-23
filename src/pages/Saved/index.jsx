import style from './style.module.css';
import SavedContainer from '../../components/SavedContainer'

export default function Saved () {
    
    return (
    <div className={style.main}>
        <h1 className={style.sectionTitle}>Избранное:</h1>
        <>
            <SavedContainer />
        </>
    </div>
    )
}