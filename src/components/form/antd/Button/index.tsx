import React, {FC} from 'react'
import {Button} from 'antd'

export interface IPropsButton {
    innerRef?: any
    className?: string
    value?: string
    onChange?: (e: any) => void
    type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
    htmlType: 'submit' | 'button' | 'reset'
    buttonLabel: string
}

const ButtonComponent: FC<IPropsButton> = (props) => {
    const {innerRef, buttonLabel} = props
    const propsMapped = {
        ...props,
        label: undefined
    }

    return (
        <Button {...propsMapped} ref={innerRef}>
            {buttonLabel}
        </Button>
    )
}

export default ButtonComponent