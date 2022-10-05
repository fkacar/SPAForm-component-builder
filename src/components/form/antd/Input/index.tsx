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
    inputLabel?: string
}

const InputComponent: FC<IPropsInput> = (props) => {
    const {innerRef, onInputKeyDownFn, inputLabel} = props

    return (
        <>
            {inputLabel && <div className="input-label">{inputLabel}</div>}
            <Input {...props} onPressEnter={onInputKeyDownFn} ref={innerRef}/>
        </>
    )
}

export default InputComponent