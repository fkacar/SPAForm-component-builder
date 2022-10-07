import React from 'react'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../form/antd/Select'
import AntdInput, {IPropsInput as IAntdPropsInput} from '../../../../components/form/antd/Input'
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
    }
}

const mapper = {
    tab: [
        {
            key: 'select',
            valueStateKey: 'columnCount',
            props: {
                inputLabel: 'Column Count',
                style: {
                    width: '100%'
                },
                placeholder: 'Select column count',
                options: [
                    {
                        label: '1 / 12 Column',
                        value: '1'
                    },
                    {
                        label: '2 / 12 Column',
                        value: '2'
                    },
                    {
                        label: '3 / 12 Column',
                        value: '3'
                    },
                    {
                        label: '4 / 12 Column',
                        value: '4'
                    },
                    {
                        label: '6 / 12 Column',
                        value: '6'
                    },
                    {
                        label: '12 / 12 Column',
                        value: '12'
                    }
                ]
            }
        }
    ],
    input: [
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
        },
        {
            key: 'input',
            valueStateKey: 'defaultValue',
            props: {
                style: {
                    width: '100%'
                },
                placeholder: 'Default value...',
                inputLabel: 'Default value'
            }
        },
        {
            key: 'input',
            valueStateKey: 'placeholder',
            props: {
                style: {
                    width: '100%'
                },
                placeholder: 'Placeholder...',
                inputLabel: 'Placeholder'
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