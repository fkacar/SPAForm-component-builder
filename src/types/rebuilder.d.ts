export interface IFormGeneratorColumnItem {
    component: 'input' | 'select' | 'checkbox' | 'radio' | 'textarea'
    props: any,
    name: string
    label?: string
    initialValue: any
    index: number
}

export interface IFormGeneratorColumn {
    items: IFormGeneratorColumnItem[]
    colXs: number
    colSm: number
    colMd: number
    colLg: number
    colXl: number
}

export interface IFormGenerator {
    columns: IFormGeneratorColumn[]
    endpoint: string
    requestMethod: 'post' | 'put' | 'get'
    autoComplete?: 'on' | 'off'
    uiKit?: 'antd' | 'reactstrap' | 'material-ui'
    validationScheme: any
}

export interface IPropsRebuilder {
    data: IFormGenerator
}