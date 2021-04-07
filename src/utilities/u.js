import validator from 'validator'

const u = {
    setLocal(data, target) {  // puts data to local target
        localStorage.setItem(target, data)
    },
    getLocal(target) { // gets data from local target
        return localStorage.getItem(target) || null
    },
    async checkUser(token) {  // checks if there is a user with the token provided and returns user info
        try {
            const response = await fetch('http://localhost:5000/user?check=1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            if (!response) throw new Error('no such user')
            const data = await response.json()
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async login(email, password) { // user login, returns token if logged in successfully
        try {
            const response = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if (!response) return null
            return response.headers.get('token')
        } catch (e) {
            console.log(e)
        }
    },
    validateRegister(username, email, password, repeatPassword) {  // validate register form
        let output = ''
        if (username.length < 3) output += 'username must be at least 3 characters long, '
        if (!validator.isEmail(email)) output += 'email not valid, '
        if (password !== repeatPassword) output += 'passwords must match, '
        return output ? (output[0].toUpperCase() + output.slice(1)).slice(0, -2) : 'valid'
    },
    async register(username, email, password) { // register user
        try {
            const response = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            if (response.status !== 200) throw response.json()
            return true
        } catch (e) {
            console.log(e)
        }
    },
    async logout() { // logout user
        try {
            const response = await fetch('http://localhost:5000/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: this.getLocal('token')
                }
            })
            if (response.status !== 200) throw new Error(response.json)
            const data = await response.json()
            localStorage.clear()
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async updateCredits(credits) { // update user credits, returns current credits
        try {
            const response = await fetch('http://localhost:5000/user/credits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: this.getLocal('token')
                },
                body: JSON.stringify({
                    credits: credits
                })
            })
            if (response.status !== 200) throw new Error(response.json)
            const currentCredits = await response.json()
            return currentCredits
        } catch (e) {
            console.log(e)
        }
    }
}

export default u