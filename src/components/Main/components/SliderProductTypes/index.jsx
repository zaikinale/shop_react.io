import style from './style.module.css'
import TypeCard from './components/TypeCard/index.jsx'

export default function SliderProductTypes({ typesList }) {
  return (
    <div className={style.sliderTypes}>

      {typesList.map(type => (
        <TypeCard key={type.Category_ID} types={type} />
      ))}
    
    </div>
  );
}