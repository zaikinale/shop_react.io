import style from './style.module.css'
import SliderImg1 from '../../assets/media/slider_1.png'
import SliderImg2 from '../../assets/media/slider_2.png'

export default function NewReleasesSlider() {
    return (
        <div className={style.container}>
            <div className={style.sliderContainer}>
                <img className={style.sliderImg} src={SliderImg1} alt="" />
            </div>
            <div className={style.controlContainer}>
                <button className={`${style.controlBtn} ${style.controlBtnActive}`}></button>
                <button className={style.controlBtn}></button>
                <button className={style.controlBtn}></button>
            </div>
        </div>
    )
}




