import React, {FC} from 'react'
import {MovePrefixMain, Line, Dot} from './styles'

export interface IPropsMovePrefix {
    onClick?: () => void
}

const MovePrefix: FC<IPropsMovePrefix> = ({onClick}) => {
    return (
        <MovePrefixMain onClick={onClick}>
            <Line>
                <Dot/>
                <Dot/>
            </Line>
            <Line>
                <Dot/>
                <Dot/>
            </Line>
            <Line>
                <Dot/>
                <Dot/>
            </Line>
        </MovePrefixMain>
    )
}

export default MovePrefix