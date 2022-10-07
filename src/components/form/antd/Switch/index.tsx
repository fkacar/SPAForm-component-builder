import React, {FC} from 'react'
import {Switch} from 'antd'

export interface IPropsSwitch {
    innerRef?: any
    className?: string
    onInputKeyDownFn?: (e: any) => void
    index?: number
    value?: boolean
    onChange?: (e: any) => void
    inputLabel?: string
    checkedChildren?: string
    unCheckedChildren?: string
}

const SwitchComponent: FC<IPropsSwitch> = (props) => {
    const {innerRef, onInputKeyDownFn, checkedChildren, unCheckedChildren, inputLabel, value} = props

    return (
        <>
            {inputLabel && <div className="input-label">{inputLabel}</div>}
            <Switch
                {...props}
                ref={innerRef}
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
                checked={value}
            />
        </>
    )
}

export default SwitchComponent