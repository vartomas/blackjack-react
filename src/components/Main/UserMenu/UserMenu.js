import { useContext, useState } from 'react'
import './UserMenu.scss'
import MenuBtn from './MenuBtn/MenuBtn'
import History from './History/History'
import { X } from "phosphor-react"
import { userContext } from '../../../App'
import emptyAvatar from '../../../assets/empty-avatar.png'
import u from '../../../utilities/u'

const UserMenu = ({ userMenu, handleLogout, closeUserMenu }) => {
    const {user, setUser} = useContext(userContext)

    const [historyOpen, setHistoryOpen] = useState(false)

    const getCredits = async () => {
        const response = await u.updateCredits(1000)
        setUser({
            ...user,
            credits: response
        })
    }

    const openHistory = () => {
        setHistoryOpen(true)
    }

    const closeHistory = () => {
        setHistoryOpen(false)
    }

    return (
        <div className='usermenu-container' style={userMenu ? {transform: 'scaleY(1)'} : {transform: 'scaleY(0)'}}>
            <div className='user-info-container'>
                <div className='user-photo-container' style={
                    user.profileImgURL ? 
                    {backgroundImage: `url('http://localhost:5000/${user.profileImgURL}')`} 
                    : {backgroundImage: `url('${emptyAvatar}')`}}></div>
                <p>{user.username}</p>
                <p>Credits: {user.credits}</p>
            </div>
            <div className='menu-btns-container'>
                <MenuBtn text='Get 1000 credits' action={getCredits}/>
                <MenuBtn text='Hand history' action={openHistory}/>
                <MenuBtn text='Achievements'/>
            </div>
            <MenuBtn text='Log out' action={handleLogout}/>
            <div className='colse-user-menu' onClick={closeUserMenu}>
                <X size={36} style={{color: 'white'}}/>
            </div>
            <History open={historyOpen} close={closeHistory}/>
        </div>
    )
}

export default UserMenu