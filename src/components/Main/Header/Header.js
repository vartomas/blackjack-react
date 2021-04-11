import { useContext } from 'react'
import { List, PokerChip } from "phosphor-react"
import './Header.scss'
import { userContext } from '../../../App'
 
const Header = ({ openUserMenu }) => {
    const { user } = useContext(userContext)
    return (
        <div className='header'>
            <h3>{user.username}</h3>
            <div className='credits-container'>
                <PokerChip size={24} />
                <p>{user.credits}</p>
            </div>
            <div className='burger-container' onClick={openUserMenu}>
                <List size={36} className='burger'/>
            </div>
        </div>
    )
}

export default Header