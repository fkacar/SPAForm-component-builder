import React, {FC} from 'react'
import {Radio} from 'antd'

export interface IRadioOptions {
    value: string
    label: string
}

export interface IPropsRadio {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    index?: number
    value?: string
    onChange?: (e: any) => void
    options: IRadioOptions[]
}

const RadioComponent: FC<IPropsRadio> = (props) => {
    const {innerRef, onInputKeyDownFn} = props

    return (
        <Radio.Group {...props}>
            {props.options.map((option: IRadioOptions, index: number) => (
                <Radio.Button
                    {...(index === 0 ? {ref: innerRef} : {})}
                    value={option.value}
                    onKeyDown={onInputKeyDownFn}
                >
                    {option.label}
                </Radio.Button>
            ))}
        </Radio.Group>
    )
}

export default RadioComponent