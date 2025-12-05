import style from './style.module.css'
import TypeCard from '../TypeCard/index.jsx'
import { useCardsDatas } from "../../hooks/useCardsDatas.js";


export default function SliderProductTypes() {
    const { typesItems } = useCardsDatas()
  return (
    <div className={style.sliderTypes}>
      {typesItems.map(type => (
        <TypeCard key={type.Category_ID} type={type} />
      ))}
    </div>
  );
}