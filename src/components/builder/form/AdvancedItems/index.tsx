import React from 'react'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../form/antd/Select'
import AntdInput, {IPropsInput as IAntdPropsInput} from '../../../../components/form/antd/Input'

const items = {
    select: {
        render: (props: IAntdPropsSelect) => (
            <AntdSelect {...props} />
        )
    },
    input: {
        render: (props: IAntdPropsInput) => (
            <AntdInput {...props} />
        )
    }
}

const getYupMethodItems = () => {
    const yupMethodItems = []

    const methods = {
        mixed: [
            'required',
            'length',
            'min',
            'max',
            'matches',
            'email',
            'url',
            'uuid',
            'ensure',
            'trim',
            'lowercase',
            'uppercase',
            'lessThan',
            'moreThan',
            'positive',
            'negative',
            'integer',
            'truncate',
            'round',
            'of',
            'json',
            'ensure',
            'compact',
            'shape',
            'concat',
            'pick',
            'omit',
            'from',
            'noUnknown',
            'camelCase',
            'constantCase'
        ],
        string: [
            'required',
            'length',
            'email',
            'trim',
            'min',
            'max',
            'matches',
            'lowercase',
            'uppercase',
            'url',
            'uuid',
            'ensure'
        ],
        number: [
            'min',
            'max',
            'lessThan',
            'moreThan',
            'positive',
            'negative',
            'integer',
            'truncate',
            'round'
        ],
        boolean: [],
        date: [
            'min',
            'max'
        ],
        array: [
            'of',
            'json',
            'length',
            'ensure',
            'compact',
            'min',
            'max',
            'ensure',
            'compact'
        ],
        tuple: [],
        object: [
            'shape',
            'json',
            'concat',
            'pick',
            'omit',
            'noUnknown',
            'camelCase',
            'constantCase'
        ]
    }

    Object.keys(methods).forEach((key) => {
        const renderConditions = [
            {
                key: 'yupType',
                value: key
            }
        ]
        const options = []

        methods[key].forEach((method: any) => {
            options.push({
                label: method.charAt(0).toUpperCase() + method.slice(1),
                value: method
            })
        })

        yupMethodItems.push({
            key: 'select',
            valueStateKey: 'yupMethod',
            renderConditions,
            props: {
                inputLabel: 'Yup Validation Method',
                style: {
                    width: '100%'
                },
                placeholder: 'Select yup validation method',
                options
            }
        })
    })

    return yupMethodItems
}

const getYupItems = () => [
    {
        key: 'select',
        valueStateKey: 'yupType',
        props: {
            inputLabel: 'Yup Validation Type',
            style: {
                width: '100%'
            },
            placeholder: 'Select yup validation type',
            options: [
                {
                    label: 'Mixed',
                    value: 'mixed'
                },
                {
                    label: 'String',
                    value: 'string'
                },
                {
                    label: 'Number',
                    value: 'number'
                },
                {
                    label: 'Boolean',
                    value: 'boolean'
                },
                {
                    label: 'Date',
                    value: 'date'
                },
                {
                    label: 'Tuple',
                    value: 'tuple'
                },
                {
                    label: 'Object',
                    value: 'object'
                }
            ]
        }
    },
    ...getYupMethodItems(),
    {
        key: 'input',
        valueStateKey: 'name',
        props: {
            style: {
                width: '100%'
            },
            placeholder: 'Name...',
            inputLabel: 'Name of parameter to submit'
        }
    }
]

const mapper = {
    tab: [],
    input: [...getYupItems()]
}

export interface IPropsAdvancedItems {
    component: string
    onStateChange: (key: string, value: any) => void
    customState: any
}

const AdvancedItems: React.FC<IPropsAdvancedItems> = ({component, onStateChange, customState}) => {
    const itemMapElement = mapper[component]

    const getItems = () => {
        const currentItems =
            itemMapElement
                .filter(item => {
                    if (!item.renderConditions) return true

                    let result = false
                    item.renderConditions.forEach(condition => {
                        if (customState[condition.key] === condition.value) result = true
                    })

                    return result
                })
                .map((itemMapElementItem) => ({
                    ...itemMapElementItem,
                    render: items[itemMapElementItem.key].render,
                    props: {
                        ...itemMapElementItem.props,
                        onChange: (value: any) => (onStateChange(itemMapElementItem.valueStateKey, value)),
                        value: customState[itemMapElementItem.valueStateKey]
                    }
                }))

        return currentItems || []
    }

    return (
        <>
            {getItems().map((item: any) => (
                <div className="layout-item">
                    {item.render(item.props)}
                </div>
            ))}
        </>
    )
}

export default AdvancedItems