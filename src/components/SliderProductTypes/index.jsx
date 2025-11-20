import style from './style.module.css'
// import TypeCard from '../components/TypeCard/index.jsx'
import TypeCard from '../TypeCard/index.jsx'
import { useSelector } from 'react-redux';


export default function SliderProductTypes() {
  const typesList = useSelector(state => state.types);
  return (
    <div className={style.sliderTypes}>
      {typesList.map(type => (
        <TypeCard key={type.Category_ID} type={type} />
      ))}
    
    </div>
  );
}