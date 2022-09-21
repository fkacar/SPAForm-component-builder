import React, {FC, useState} from 'react'
import {Form, Select} from 'antd'
import classnames from 'classnames'

export interface IOptions {
    label: string
    value: string
}

export interface IPropsSelect {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    placeholder?: string
    index?: number
    value?: string
    onChange?: (e: any) => void
    options: IOptions[]
}

const SelectComponent: FC<IPropsSelect> = (props) => {
    const {innerRef, onInputKeyDownFn} = props

    const [isOpen, setIsOpen] = useState(false)

    const onFocusHandler = () => {
        setIsOpen(true)
    }

    const onBlurHandler = () => {
        setIsOpen(false)
    }

    const onChangeHandler = (value: any) => {
        props.onChange(value)
        setIsOpen(false)
    }

    return (
        <Select
            {...props}
            onInputKeyDown={onInputKeyDownFn}
            open={isOpen}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            ref={innerRef}
        >
            {props.options.map((option: IOptions) => (
                <Select.Option value={option.value}>{option.label}</Select.Option>
            ))}
        </Select>
    )
}

export default SelectComponent