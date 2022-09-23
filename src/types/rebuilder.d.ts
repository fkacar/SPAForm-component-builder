export interface IFormGeneratorColumnItem {
    component: 'input' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'button'
    props: any
    name: string
    label?: string
    initialValue: any
    index: number
}

export interface IFormGeneratorColumn {
    items: IFormGeneratorColumnItem[]
    tabKey: string
    colXs: number
    colSm: number
    colMd: number
    colLg: number
    colXl: number
}

export interface IFormGeneratorTab {
    title: string
    content?: string
    key: string
    closable: boolean
}

export interface IFormGenerator {
    columns: IFormGeneratorColumn[]
    tabs: IFormGeneratorTab[]
    autoComplete?: 'on' | 'off'
    uiKit?: 'antd' | 'reactstrap' | 'material-ui'
    validationScheme: any
}

export interface IBeforeSubmit {
    endpoint: string
    requestMethod: 'post' | 'put' | 'get' | 'delete' | 'patch' | 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH'
    headers?: any
    body?: object
    queryParams?: object
}

export interface IPropsRebuilder {
    data?: IFormGenerator
    keyPath?: string
    onBeforeSubmit: (values: object) => IBeforeSubmit
    onSubmitFinish?: (serverResponse: any) => void
    onErrorSubmit?: (formError: any) => void
}