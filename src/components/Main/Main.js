import { useState } from 'react'
import Header from './Header/Header'
import UserMenu from './UserMenu/UserMenu'
import Table from './Table/Table'
import Game from './Game/Game'

const Main = ({ handleLogout }) => {

    const [userMenu, setUserMenu] = useState(false)

    const openUserMenu = () => {
        setUserMenu(true)
    }

    const closeUserMenu = () => {
        setUserMenu(false)
    }

    return (
        <>
            <Table />
            <Game />
            <Header openUserMenu={openUserMenu} />
            <UserMenu userMenu={userMenu} handleLogout={handleLogout} closeUserMenu={closeUserMenu}/>
        </>
    )
}

export default Main