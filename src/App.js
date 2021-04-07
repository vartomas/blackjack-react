import React, { useEffect, useState } from 'react'
import './App.scss'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import u from './utilities/u'

export const userContext = React.createContext(null)

function App() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const loginUser = async () => {
            const token = u.getLocal('token')
            if (!token) return
            const userRes = await u.checkUser(token)
            setUser(userRes)
        }
        loginUser()
    }, [])

    const handleLogout = () => {
        u.logout()
        setUser(null)
    }

    return (
        <userContext.Provider value={{user, setUser}}>
            <div className={user ? 'main' : 'login'}>
                {user ? <Main handleLogout={handleLogout}/> : <Login setUser={setUser}/>}
            </div>
        </userContext.Provider>
    )
}

export default App
