import React from 'react'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../form/antd/Select'
import AntdInput, {IPropsInput as IAntdPropsInput} from '../../../../components/form/antd/Input'
import AntdInputNumber, {IPropsInputNumber as IAntdPropsInputNumber} from '../../../../components/form/antd/InputNumber'
import AntdSwitch, {IPropsSwitch as IAntdPropsSwitch} from '../../../../components/form/antd/Switch'

const items = {
    select: {
        render: (props: IAntdPropsSelect) => (
            <AntdSelect {...props} />
        )
    },
    input: {
        render: (props: IAntdPropsSelect) => (
            <AntdInput {...props} />
        )
    },
    switch: {
        render: (props: IAntdPropsSwitch) => (
            <AntdSwitch {...props} />
        )
    },
    inputNumber: {
        render: (props: IAntdPropsInputNumber) => (
            <AntdInputNumber {...props} />
        )
    }
}

const mapper = {
    tab: [
        {
            key: 'input',
            valueStateKey: 'name',
            props: {
                style: {
                    width: '100%'
                },
                placeholder: 'Name...',
                inputLabel: 'Tab Name'
            }
        },
        {
            key: 'select',
            valueStateKey: 'hidden',
            props: {
                inputLabel: 'Is All Tabs Hidden?',
                style: {
                    width: '100%'
                },
                placeholder: 'Select if hidden',
                options: [
                    {
                        label: 'No',
                        value: 'false'
                    },
                    {
                        label: 'Yes',
                        value: 'true'
                    }
                ]
            }
        }
    ],
    input: [
        {
            key: 'switch',
            valueStateKey: 'allowClear',
            props: {
                inputLabel: 'Allow Clear'
            }
        },
        {
            key: 'select',
            valueStateKey: 'size',
            props: {
                inputLabel: 'Size',
                style: {
                    width: '100%'
                },
                placeholder: 'Select size',
                options: [
                    {
                        label: 'Small',
                        value: 'small'
                    },
                    {
                        label: 'Middle',
                        value: 'middle'
                    },
                    {
                        label: 'Large',
                        value: 'large'
                    }
                ]
            }
        },
        {
            key: 'select',
            valueStateKey: 'type',
            props: {
                inputLabel: 'Type',
                style: {
                    width: '100%'
                },
                placeholder: 'Select type',
                options: [
                    {
                        label: 'Text',
                        value: 'text'
                    },
                    {
                        label: 'E-mail',
                        value: 'email'
                    }
                ]
            }
        },
        {
            key: 'switch',
            valueStateKey: 'showCount',
            props: {
                inputLabel: 'Show Text Count'
            }
        },
        {
            key: 'inputNumber',
            valueStateKey: 'maxLength',
            props: {
                style: {
                    width: '100%'
                },
                placeholder: 'Max Length...',
                inputLabel: 'Max Length'
            }
        },
        {
            key: 'switch',
            valueStateKey: 'bordered',
            props: {
                inputLabel: 'Bordered or not'
            }
        },
        {
            key: 'switch',
            valueStateKey: 'disabled',
            props: {
                inputLabel: 'Is Disabled?'
            }
        }
    ]
}

export interface IPropsLayoutItems {
    component: string
    onStateChange: (key: string, value: any) => void
    customState: any
}

const LayoutItems: React.FC<IPropsLayoutItems> = ({component, onStateChange, customState}) => {
    const itemMapElement = mapper[component]

    const getItems = () => {
        const currentItems = itemMapElement.map((itemMapElementItem) => ({
            ...itemMapElementItem,
            render: items[itemMapElementItem.key].render,
            props: {
                ...itemMapElementItem.props,
                onChange: (value: any) => (onStateChange(itemMapElementItem.valueStateKey, value)),
                value: customState[itemMapElementItem.valueStateKey]
            }
        }))

        return currentItems
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

export default LayoutItems