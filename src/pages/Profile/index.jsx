// import style from './style.module.css'
import ProfileContainer from '../../components/ProfileContainer'
import RecommendContainer from '../../components/RecommendContainer'
import SliderCardsContainer from '../../components/SliderCardsConteiner'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

export default function Profile({ person, setPerson }) {

    const cardsList = useSelector(state => state.cards)
    const likedItems = useSelector(state => state.likedItems) 
    const basketItems = useSelector(state => state.basketItems); 
    const likedCards = (cardsList || []).filter((item) => likedItems.includes(item.id));
    const basketCards = (cardsList || []).filter(item => !!basketItems[String(item.id)]);
    const subtitles = ['Ваше избранное:', 'Ждут в корзине:']

    return (
        <>
            <ProfileContainer
                person={person} 
                setPerson={setPerson} 
            />
            <Link to="/saved" style={{ textDecoration: 'none', color: 'inherit' }}>
                <SliderCardsContainer subtitle={subtitles[0]} cards={likedCards} />
            </Link>

            <Link to="/basket" style={{ textDecoration: 'none', color: 'inherit' }}>
                <SliderCardsContainer subtitle={subtitles[1]}  cards={basketCards} />
            </Link>
            <RecommendContainer />

        </>
    ) 
}