import React, {FC} from 'react'
import {InputNumber} from 'antd'

export interface IPropsInputNumber {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    placeholder?: string
    index?: number
    value?: string
    onChange?: (e: any) => void
    inputLabel?: string
}

const InputNumberComponent: FC<IPropsInputNumber> = (props) => {
    const {innerRef, onInputKeyDownFn, inputLabel} = props

    return (
        <>
            {inputLabel && <div className="input-label">{inputLabel}</div>}
            <InputNumber {...props} onPressEnter={onInputKeyDownFn} ref={innerRef}/>
        </>
    )
}

export default InputNumberComponent