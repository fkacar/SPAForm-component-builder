import React, {FC, useState, useEffect} from 'react'
import {IPropsRebuilder} from './types/rebuilder'
import 'antd/dist/antd.css'

// Form Wrapper Component imports
import FormAntd from './components/form/antd/Form'

export const Rebuilder: FC<IPropsRebuilder> = ({data}) => {
    const getFormComponent = () => {
        const mapper = {
            antd: FormAntd,
            reactstrap: FormAntd,
            'material-ui': FormAntd
        }

        const FormComponent = mapper[data.uiKit || 'antd']

        return <FormComponent data={data}/>
    }

    return (
        <main className="form-generator-form">
            {getFormComponent()}
        </main>
    )
}