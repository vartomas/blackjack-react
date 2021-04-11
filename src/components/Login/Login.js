import { useState } from 'react'
import u from '../../utilities/u'
import './Login.scss'
import logo from '../../assets/spades-1.png'

const Login = (props) => {

    const [register, setRegister] = useState(false)
    const [inputs, setInputs] = useState({
        loginEmail: '',
        loginPassword: '',
        loginNotification: '',
        registerUsername: '',
        registerEmail: '',
        registerPassword: '',
        registerRepeatPassword: '',
        registerNotification: ''
    })

    const handleLoginSubmit = async e => {
        e.preventDefault()
        let token
        if (!inputs.loginEmail && !inputs.loginPassword) {  // sukuriu nauja juzeri jeigu niekas neivesta login formoje
            const email = await u.createGuest()
            const password = 'guest123'
            token = await u.login(email, password)
        } else token = await u.login(inputs.loginEmail, inputs.loginPassword)
        if (!token) {
            setInputs({...inputs, loginNotification: 'Wrong email or password'})
            return
        }
        setInputs({...inputs, loginNotification: ''})
        u.setLocal(token, 'token')
        const user = await u.checkUser(token)
        props.setUser(user)
    }

    const handleRegisterSubmit = async e => {
        e.preventDefault()
        const valid = await u.validateRegister(inputs.registerUsername, inputs.registerEmail, inputs.registerPassword, inputs.registerRepeatPassword)
        if (valid !== 'valid') {
            setInputs({...inputs, registerNotification: valid})
            return
        }
        setInputs({...inputs, registerNotification: ''})
        const registered = await u.register(inputs.registerUsername, inputs.registerEmail, inputs.registerPassword)
        if (registered) {
            const token = await u.login(inputs.registerEmail, inputs.registerPassword)
            u.setLocal(token, 'token')
            const user = await u.checkUser(token)
            props.setUser(user)
        }
    }

    const handleChange = e => setInputs({...inputs, [e.target.name]: e.target.value})

    return (
        <div className='login-container'>
            <div className='login-logo-container'>
                <img src={logo} alt='logo' />
            </div>
            {register ? 
            <form onSubmit={handleRegisterSubmit} autoComplete='off'>
                <input type='text' placeholder='Username...' name='registerUsername' onChange={handleChange} value={inputs.registerUsername}/>
                <input type='email' placeholder='Email...' name='registerEmail' onChange={handleChange} value={inputs.registerEmail}/>
                <input type='password' placeholder='Password...' name='registerPassword' onChange={handleChange} value={inputs.registerPassword}/>
                <input type='password' placeholder='Repeat password...' name='registerRepeatPassword' onChange={handleChange} value={inputs.registerRepeatPassword}/>
                <p className='wrongInput'>{inputs.registerNotification}</p>
                <button className='submit-btn'>Register</button>
            </form>
            : <form onSubmit={handleLoginSubmit} autoComplete='off'>
                <input type='email' placeholder='Email...' name='loginEmail' onChange={handleChange} value={inputs.loginEmail}/>
                <input type='password' placeholder='Password...' name='loginPassword' onChange={handleChange} value={inputs.loginPassword}/>
                <p className='wrongInput'>{inputs.loginNotification}</p>
                <button className='submit-btn'>Log In</button>
            </form>}
            <div className='donthave-text'>
                <p>{register ? 'Already have an account?' : `Don't have an account?`}</p>
                <p onClick={() => setRegister(!register)} className='registerBtn'><u>{register ? 'Log in' : 'Register'}</u></p>
            </div>
        </div>
    )
}

export default Login