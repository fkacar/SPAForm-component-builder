import React, {FC} from 'react'
import {Input} from 'antd'

const {TextArea} = Input

export interface IPropsTextarea {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    placeholder?: string
    index?: number
    value?: string
    onChange?: (e: any) => void
    rows?: number
}

const TextareaComponent: FC<IPropsTextarea> = (props) => {
    const {innerRef, onInputKeyDownFn} = props

    return (
        <TextArea  {...props} onPressEnter={onInputKeyDownFn} ref={innerRef}/>
    )
}

export default TextareaComponent