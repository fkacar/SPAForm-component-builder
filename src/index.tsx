import React, {FC, useState, useEffect} from 'react'
import {IPropsRebuilder, IFormGenerator} from './types/rebuilder'
import FormBuilderComponent from './components/builder/form'
import {Spin, Alert} from 'antd'
import Cookies from 'js-cookie'
import {getFormData} from './services/form-data.service'
import 'antd/dist/antd.css'
import {rebuilderContainer, spinnerContainer, mountedStyle, rebuilderGeneralStyle} from './styles/rebuilder.style'

// Form Wrapper Component imports
import FormAntd from './components/form/antd/Form'

export interface IConfig {
    accessToken: string
    secretKey: string
    projectCode: string
}

export const config = (configModel: IConfig) => {
    Cookies.set('formactor-config', JSON.stringify(configModel))
}

export const Rebuilder: FC<IPropsRebuilder> = ({data, keyPath, onBeforeSubmit, onSubmitFinish, onErrorSubmit}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()
    const [dataFinal, setDataFinal] = useState<IFormGenerator>()

    const getFormComponent = () => {
        if (!dataFinal || typeof dataFinal.columns === 'undefined') return <></>

        const mapper = {
            antd: FormAntd,
            reactstrap: FormAntd,
            'material-ui': FormAntd
        }

        const FormComponent = mapper[dataFinal.uiKit || 'antd']

        return <FormComponent data={dataFinal} onBeforeSubmit={onBeforeSubmit} onSubmitFinish={onSubmitFinish}
                              onErrorSubmit={onErrorSubmit}/>
    }

    const getData = async () => {
        const data = await getFormData(keyPath)
            .then((res: any) => res.data.result)
            .catch((err: any) => {
                console.error(err)

                return err.message
            })

        if (!data || typeof data === 'string') {
            setError(`There was an error getting the form data from the server. Server response: ${data}`)
            setIsLoading(false)

            return
        }

        setDataFinal(data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (data) {
            setDataFinal(data)
            setIsLoading(false)

            return
        }

        if (keyPath) {
            getData()
        }
    }, [])

    return (
        <main className="rebuilder-container" style={rebuilderContainer}>
            <style dangerouslySetInnerHTML={{__html: rebuilderGeneralStyle}}/>
            {isLoading && (
                <section className="spinner-container" style={spinnerContainer}>
                    <Spin/>
                </section>
            )}
            {!isLoading && (
                <section className="form-container" style={mountedStyle}>
                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                        />
                    )}
                    {!error && getFormComponent()}
                </section>
            )}
        </main>
    )
}

export const FormBuilder = FormBuilderComponent