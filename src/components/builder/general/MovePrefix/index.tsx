import React, {FC} from 'react'
import {MovePrefixMain, Line, Dot} from './styles'

const MovePrefix: FC = () => {
    return (
        <MovePrefixMain>
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