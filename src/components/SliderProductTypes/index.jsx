import style from './style.module.css'
import TypeCard from '../TypeCard/index.jsx'

export default function SliderProductTypes({ typesList }) {
  return (
    <div className={style.sliderTypes}>
      {typesList.map(type => (
        <TypeCard key={type.id} types={type} />
      ))}
    </div>
  );
}