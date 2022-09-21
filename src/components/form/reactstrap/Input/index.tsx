import React, {FC} from 'react'
// @ts-ignore
import {Input, FormGroup, Label} from 'reactstrap'
// @ts-ignore
import classnames from 'classnames'

export interface IPropsInput {
    title?: string
    isRequired: boolean
    ref: any
    className?: string
    isInvalid: boolean
    onInputKeyDown: (e: any, index: number) => void
    index: number
    name: string
    id: string
}

const InputComponent: FC<IPropsInput> = ({
                                             title,
                                             isRequired,
                                             ref,
                                             className,
                                             isInvalid,
                                             onInputKeyDown,
                                             index,
                                             name,
                                             id
                                         }) => {
    return (
        <FormGroup>
            <Label for="code">
                {title} {isRequired && <span className="text-danger">*</span>}
            </Label>
            <Input
                name={name}
                id={id}
                innerRef={ref}
                className={classnames({'is-invalid': isInvalid, [className || '']: true})}
                onKeyDown={(e: any) => onInputKeyDown(e, index)}
            />
        </FormGroup>
    )
}

export default InputComponent