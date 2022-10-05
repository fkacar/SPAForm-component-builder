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
        render: (props: IAntdPropsSelect) => (
            <AntdInput {...props} />
        )
    }
}

const mapper = {
    tab: []
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

export default LayoutItems