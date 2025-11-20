import style from './style.module.css'
import CatalogItem from '../CatalogItem/index.jsx'

export default function CatalogContainer ({ typesList }) {
  return (
    <div className={style.sliderTypes}>

      {typesList.map(type => (
        <CatalogItem key={type.Category_ID} types={type} />
      ))}
    
    </div>
  );
}