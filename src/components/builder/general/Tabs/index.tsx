import React, {FC} from 'react'
import {Tabs} from 'antd'

const {TabPane} = Tabs

export interface ITabsData {
    key: string
    title: string
    closable: boolean
}

export interface IPropsTabs {
    innerRef?: any
    className?: string
    index?: number
    data: ITabsData[]
    onChangeTab: (newTabKey: string) => void
    activeKey: string
    onClickTab: (tabKey: string) => void
}

const TabComponent: FC<IPropsTabs> = (props) => {
    const {onChangeTab, activeKey, data, className, onClickTab} = props

    return (
        <Tabs {...props} type="card" onChange={onChangeTab} activeKey={activeKey} className={className}
              onTabClick={onClickTab}>
            {data.map((pane: any, index: number) => (
                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}/>
            ))}
        </Tabs>
    )
}

export default TabComponent