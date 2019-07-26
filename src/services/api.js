import axios from 'axios'
import { Alert } from 'react-native'

const api = axios.create({
	baseURL: 'http://192.168.122.1:3000'
})

export const setToken = token => {
	api.defaults.headers.common['Authorization'] = `bearer ${token}`
}

export const showError = err => {
	Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
}

export default api
