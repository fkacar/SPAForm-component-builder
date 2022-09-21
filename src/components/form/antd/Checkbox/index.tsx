import React, {FC} from 'react'
import {Checkbox} from 'antd'

export interface IOptions {
    value: string
    label: string
}

export interface IPropsCheckbox {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    index?: number
    value?: any
    onChange?: (e: any) => void
    options: IOptions[]
}

const CheckboxComponent: FC<IPropsCheckbox> = (props) => {
    const {innerRef, onInputKeyDownFn} = props

    return (
        <Checkbox.Group {...props}>
            {props.options.map((option: IOptions, index: number) => (
                <Checkbox
                    {...(index === 0 ? {ref: innerRef} : {})}
                    value={option.value}
                    onKeyDown={onInputKeyDownFn}
                >
                    {option.label}
                </Checkbox>
            ))}
        </Checkbox.Group>
    )
}

export default CheckboxComponent