import React, {FC} from 'react'
import {Tabs} from 'antd'

const {TabPane} = Tabs

export interface ITabsData {
    key: string
    title: string
    closable: boolean
    isTab?: boolean
}

export interface IPropsTabs {
    innerRef?: any
    className?: string
    index?: number
    data: ITabsData[]
    onChangeTab: (newTabKey: string) => void
    activeKey: string
    onClickTab?: (tabKey: string) => void
    type?: 'card' | 'editable-card'
    onEdit?: (targetKey: string, action: 'add' | 'remove') => void
}

const TabComponent: FC<IPropsTabs> = (props) => {
    const {onChangeTab, activeKey, data, className, onClickTab, type = 'card', onEdit} = props

    console.log('props', props)

    const items = data.map((pane: any, index: number) => (
        {label: pane.title, children: '', key: pane.key, closable: pane.closable}
    ))

    return (
        <Tabs
            {...props}
            type={type}
            onChange={onChangeTab}
            activeKey={activeKey}
            className={className}
            onTabClick={onClickTab}
            onEdit={onEdit}
            items={type === 'editable-card' ? items : undefined}
        >
            {type !== 'editable-card' && data.map((pane: any, index: number) => (
                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}/>
            ))}
        </Tabs>
    )
}

export default TabComponent