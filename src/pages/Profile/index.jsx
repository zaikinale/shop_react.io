import style from './style.module.css'
import ProfileContainer from '../../components/ProfileContainer'

export default function Profile({ person, setPerson }) {
    return (
        <>
            <ProfileContainer
                person={person} 
                setPerson={setPerson} 
            
            />
        </>
    ) 
}