import style from './style.module.css'
import ProfileContainer from '../../components/ProfileContainer'
import RecommendContainer from '../../components/RecommendContainer'

export default function Profile({ person, setPerson }) {
    return (
        <>
            <ProfileContainer
                person={person} 
                setPerson={setPerson} 
            />
            <RecommendContainer />
        </>
    ) 
}