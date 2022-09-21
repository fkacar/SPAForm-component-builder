import React, {FC} from 'react'
import {Input} from 'antd'
import classnames from 'classnames'

export interface IPropsInput {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    placeholder?: string
    index?: number
    value?: string
    onChange?: (e: any) => void
}

const InputComponent: FC<IPropsInput> = (props) => {
    const {innerRef, onInputKeyDownFn} = props

    return (
        <Input {...props} onPressEnter={onInputKeyDownFn} ref={innerRef}/>
    )
}

export default InputComponent