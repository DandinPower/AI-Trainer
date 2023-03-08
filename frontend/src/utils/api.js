import axios from 'axios'

const HOSTNAME = process.env.REACT_APP_SERVER_HOST

export function SignUp_API(nickName, account, password) {
    return axios.post(`${HOSTNAME}/api/v1/SignUp`, 
        { nickName: nickName, account: account, password: password }
    )
}

export function SignIn_API(account, password) {
    return axios.post(`${HOSTNAME}/api/v1/SignIn`, 
        { account: account, password: password }
    )
}

export function TestToken(token) {
    return axios.get(`${HOSTNAME}/`, 
        { headers: { 'authorization': `${token}` } }    
    )
}
        