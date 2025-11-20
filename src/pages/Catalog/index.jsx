import style from './style.module.css';
import CatalogContainer from '../../components/CatalogContainer/index.jsx'


export default function Catalog ({types}) {
    return (
        <>
        <div className={style.main}>
            <CatalogContainer typesList={types} />
        </div>
        </>

    )
}