import style from './style.module.css';
import SavedContainer from '../../components/SavedContainer'
import RecommendContainer from '../../components/RecommendContainer';

export default function Saved () {
    
    return (
    <div className={style.main}>
        <h1 className={style.sectionTitle}>Избранное:</h1>
        <>
            <SavedContainer />
            <RecommendContainer />
        </>
    </div>
    )
}