import axios, {AxiosRequestHeaders} from 'axios'
import {IBeforeSubmit} from '../types/rebuilder'

const createRequestInstance = (headers: AxiosRequestHeaders) => {
    return axios.create({
        ...(headers ? {headers} : {})
    })
}

export async function submitForm(payload: IBeforeSubmit) {
    const request = createRequestInstance(payload.headers)

    const methodMapper = {
        get: () => request.get(payload.endpoint, {
            ...(payload.queryParams ? {params: payload.queryParams} : {})
        }),
        post: () => request.post(payload.endpoint, payload.body, {
            ...(payload.queryParams ? {params: payload.queryParams} : {})
        }),
        put: () => request.put(payload.endpoint, payload.body, {
            ...(payload.queryParams ? {params: payload.queryParams} : {})
        }),
        delete: () => request.delete(payload.endpoint, {
            ...(payload.queryParams ? {params: payload.queryParams} : {})
        }),
        patch: () => request.patch(payload.endpoint, payload.body, {
            ...(payload.queryParams ? {params: payload.queryParams} : {})
        })
    }

    return methodMapper[payload.requestMethod.toLowerCase()]()
}