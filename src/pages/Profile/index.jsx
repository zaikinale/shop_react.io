// import style from './style.module.css'
import ProfileContainer from '../../components/ProfileContainer'
import RecommendContainer from '../../components/RecommendContainer'
import SliderCardsContainer from '../../components/SliderCardsConteiner'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router'

export default function Profile({ person, setPerson }) {

    const cardsList = useSelector(state => state.cards)
    const likedItems = useSelector(state => state.likedItems) 
    const basketItems = useSelector(state => state.basketItems); 
    const likedCards = (cardsList || []).filter((item) => likedItems.includes(item.id));
    const basketCards = (cardsList || []).filter(item => !!basketItems[String(item.id)]);
    const type = ['saved', 'basket']

    return (
        <>
            <ProfileContainer
                person={person} 
                setPerson={setPerson} 
            />
            <SliderCardsContainer type={type[0]} cards={likedCards} />
            <SliderCardsContainer type={type[1]}  cards={basketCards} />
            <RecommendContainer />
        </>
    ) 
}