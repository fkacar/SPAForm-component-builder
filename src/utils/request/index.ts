import axios from 'axios'
import Cookies from 'js-cookie'
import {apiBaseUrl} from '../../constants/endpoints.constants'

const apiClient = axios.create({
    baseURL: apiBaseUrl
})

apiClient.interceptors.request.use(request => {
    const formactorConfig = Cookies.get('formactor-config')
    const formactorConfigParsed = JSON.parse(formactorConfig)
    const {accessToken, secretKey} = formactorConfigParsed

    if (accessToken && secretKey) {
        request.headers['access-token'] = accessToken
        request.headers['secret-key'] = secretKey
    }
    return request
})

export default apiClient