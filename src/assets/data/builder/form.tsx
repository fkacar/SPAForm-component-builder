import React from 'react'
import ReactstrapInput, {IPropsInput} from '../../../components/form/reactstrap/Input'

// General components
import Tabs, {IPropsTabs} from '../../../components/builder/general/Tabs'

// Antd components
import AntdInput, {IPropsInput as IAntdPropsInput} from '../../../components/form/antd/Input'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../components/form/antd/Select'
import AntdCheckbox, {IPropsCheckbox as IAntdPropsCheckbox} from '../../../components/form/antd/Checkbox'
import AntdRadio, {IPropsRadio as IAntdPropsRadio} from '../../../components/form/antd/Radio'
import AntdTextarea, {IPropsTextarea as IAntdPropsTextarea} from '../../../components/form/antd/Textarea'
import AntdButton, {IPropsButton as IAntdPropsButton} from '../../../components/form/antd/Button'

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
        id: 'tab',
        label: 'Tab',
        static: true,
        layoutDefaultW: 24,
        layoutDefaultH: 6,
        maxWidth: 24,
        minWidth: 16,
        minHeight: 4,
        maxHeight: 20,
        render: (props: IPropsTabs) => (
            <Tabs {...props} />
        ),
        defaultProps: {
            data: [
                {
                    key: 'general',
                    title: 'General',
                    closable: false
                }
            ]
        }
    },
    {
        id: 'input',
        label: 'Input',
        layoutDefaultW: 24,
        layoutDefaultH: 6,
        maxWidth: 24,
        minWidth: 16,
        minHeight: 4,
        maxHeight: 20,
        render: (props: IAntdPropsInput) => (
            <AntdInput {...props} />
        ),
        defaultProps: {
            style: {
                cursor: 'pointer'
            },
            onClick: (e: any) => {
                console.log('yeee5')
                e.preventDefault()
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
            }
        }
    },
    {
        id: 'select',
        label: 'Select',
        render: (props: IAntdPropsSelect) => (
            <AntdSelect {...props} />
        ),
        defaultProps: {
            style: {
                width: '100%'
            },
            placeholder: 'Select anything',
            label: 'Select',
            onChange: (e: any) => '',
            options: [
                {
                    label: 'Option 1',
                    value: '1'
                }
            ]
        }
    },
    {
        id: 'checkbox',
        label: 'Checkbox',
        render: (props: IAntdPropsCheckbox) => (
            <AntdCheckbox {...props} />
        ),
        defaultProps: {}
    },
    {
        id: 'radio',
        label: 'Radio',
        render: (props: IAntdPropsRadio) => (
            <AntdRadio {...props} />
        ),
        defaultProps: {}
    },
    {
        id: 'textarea',
        label: 'Textarea',
        render: (props: IAntdPropsTextarea) => (
            <AntdTextarea {...props} />
        ),
        defaultProps: {}
    },
    {
        id: 'button',
        label: 'Button',
        render: (props: IAntdPropsButton) => (
            <AntdButton {...props} />
        ),
        defaultProps: {}
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