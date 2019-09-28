import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'


// axios.defaults.baseURL = 'http://192.168.0.107:3000'


const handleResponse = res => {
    return new Promise(resolve => resolve(res.data))
}


function GET(path, params = {}){
    return axios.get(path, { params }).then(handleResponse)
}


export {
    GET
}