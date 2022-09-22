import Endpoints from '../constants/endpoints.constants'
import request from '../utils/request'
import Cookies from 'js-cookie'

export async function getFormData(payload: string) {
    const formactorConfig = Cookies.get('formactor-config')
    const formactorConfigParsed = JSON.parse(formactorConfig)
    const {projectCode} = formactorConfigParsed

    return request.get(Endpoints.formData.get, {
        params: {
            'key-path': payload,
            'project-code': projectCode
        }
    })
}