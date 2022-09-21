import React from 'react'
import ReactstrapInput, {IPropsInput} from '../../../../components/form/reactstrap/Input'

import AntdInput, {IPropsInput as IAntdPropsInput} from '../../../../components/form/antd/Input'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../../components/form/antd/Select'
import AntdCheckbox, {IPropsCheckbox as IAntdPropsCheckbox} from '../../../../components/form/antd/Checkbox'
import AntdRadio, {IPropsRadio as IAntdPropsRadio} from '../../../../components/form/antd/Radio'
import AntdTextarea, {IPropsTextarea as IAntdPropsTextarea} from '../../../../components/form/antd/Textarea'
import AntdButton, {IPropsButton as IAntdPropsButton} from '../../../../components/form/antd/Button'

const itemsReactstrap = [
    {
        id: 'input',
        render: (props: IPropsInput) => (
            <ReactstrapInput {...props} />
        )
    },
    {
        id: 'select',
        render: (props: IPropsInput) => (
            <>Select</>
        )
    },
    {
        id: 'checkbox',
        render: (props: IPropsInput) => (
            <>checkbox</>
        )
    },
    {
        id: 'radio',
        render: (props: IPropsInput) => (
            <>radio</>
        )
    },
    {
        id: 'textarea',
        render: (props: IPropsInput) => (
            <>textarea</>
        )
    },
    {
        id: 'button',
        render: (props: IPropsInput) => (
            <>button</>
        )
    }
]

const itemsAntd = [
    {
        id: 'input',
        render: (props: IAntdPropsInput) => (
            <AntdInput {...props} />
        )
    },
    {
        id: 'select',
        render: (props: IAntdPropsSelect) => (
            <AntdSelect {...props} />
        )
    },
    {
        id: 'checkbox',
        render: (props: IAntdPropsCheckbox) => (
            <AntdCheckbox {...props} />
        )
    },
    {
        id: 'radio',
        render: (props: IAntdPropsRadio) => (
            <AntdRadio {...props} />
        )
    },
    {
        id: 'textarea',
        render: (props: IAntdPropsTextarea) => (
            <AntdTextarea {...props} />
        )
    },
    {
        id: 'button',
        render: (props: IAntdPropsButton) => (
            <AntdButton {...props} />
        )
    }
]

const itemsMaterial = [
    {
        id: 'input',
        render: (props: IPropsInput) => (
            <ReactstrapInput {...props} />
        )
    },
    {
        id: 'select',
        render: (props: IPropsInput) => (
            <>Select</>
        )
    },
    {
        id: 'checkbox',
        render: (props: IPropsInput) => (
            <>checkbox</>
        )
    },
    {
        id: 'radio',
        render: (props: IPropsInput) => (
            <>radio</>
        )
    },
    {
        id: 'textarea',
        render: (props: IPropsInput) => (
            <>textarea</>
        )
    },
    {
        id: 'button',
        render: (props: IPropsInput) => (
            <>button</>
        )
    }
]

export default function (uiKit: 'antd' | 'reactstrap' | 'material-ui') {
    const mapper = {
        antd: itemsAntd,
        reactstrap: itemsReactstrap,
        'material-ui': itemsMaterial
    }

    return mapper[uiKit]
}