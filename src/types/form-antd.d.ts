import {IBeforeSubmit, IFormGenerator} from './rebuilder'

export interface IFormAntdProps {
    data: IFormGenerator
    onBeforeSubmit: (values: object) => IBeforeSubmit
    onSubmitFinish?: (serverResponse: any) => void
    onErrorSubmit?: (formError: any) => void
}