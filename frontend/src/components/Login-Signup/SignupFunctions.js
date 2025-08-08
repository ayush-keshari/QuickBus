import axios from 'axios'

export function registerUser(newUserDetails){
    let apiUrl = 'https://quick-bus.vercel.app/register'
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
