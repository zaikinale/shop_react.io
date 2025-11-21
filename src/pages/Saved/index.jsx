import style from './style.module.css';
import SavedContainer from '../../components/SavedContainer'

export default function Saved () {
    
    return (
    <div className={style.main}>
        <h1 className="">Сохраненые</h1>
        <>
            <SavedContainer />
        </>
    </div>
    )
}