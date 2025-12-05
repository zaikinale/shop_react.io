// import style from './style.module.css'
import ProfileContainer from '../../components/ProfileContainer'
import CardsContainer from '../../components/CardsContainer'
import SliderCardsContainer from '../../components/SliderCardsConteiner'
import { useCardsDatas } from '../../hooks/useCardsDatas.js'

export default function Profile({ person, setPerson }) {
    const { likedCards, basketCards } = useCardsDatas();
    const type = ['saved', 'basket']

    return (
        <>
            <ProfileContainer
                person={person} 
                setPerson={setPerson} 
            />
            <SliderCardsContainer type={type[0]} cards={likedCards} />
            <SliderCardsContainer type={type[1]}  cards={basketCards} />
            <CardsContainer mode={'recommend'} />
        </>
    ) 
}