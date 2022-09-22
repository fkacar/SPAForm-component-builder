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
    endpoint: string
    requestMethod: 'post' | 'put' | 'get'
    autoComplete?: 'on' | 'off'
    uiKit?: 'antd' | 'reactstrap' | 'material-ui'
    validationScheme: any
}

export interface IPropsRebuilder {
    data?: IFormGenerator
    keyPath?: string
}