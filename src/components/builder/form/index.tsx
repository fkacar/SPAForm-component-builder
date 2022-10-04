import React, {FC, useState, useRef, useEffect} from 'react'
import {IPropsBuilder} from '../../../types/builder'
import {makeid} from '../../../utils/calculation'
import elements from '../../../assets/data/builder/form'
import LayoutItems from './LayoutItems'
import {Row, Col} from 'reactstrap'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import MovePrefix from '../../../components/builder/general/MovePrefix'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {
    Sidebar,
    SidebarHeader,
    SidebarHeaderTitle,
    SidebarBodyHeader,
    SidebarBodyHeaderTab,
    SidebarBody,
    SidebarBodyContent,
    SidebarBodyFormElement,
    FormBuilderDDWrapper,
    MainContainer,
    NewFormItemWrapper,
    SidebarBodyListContent
} from './styles'

const Builder: FC<IPropsBuilder> = ({options}) => {
    const [uiKit, setUiKit] = useState<'antd' | 'reactstrap' | 'material-ui'>('antd')
    const [formElements, setFormElements] = useState<any[]>([])
    const [newFormItems, setNewFormItems] = useState<any[]>([])
    const [activeKey, setActiveKey] = useState<string>('general')
    const [activeTab, setActiveTab] = useState<'layout' | 'design' | 'advanced' | 'elements'>('elements')
    const [activeConfig, setActiveConfig] = useState<string>('')
    const [activeConfigId, setActiveConfigId] = useState<string>('')
    const [columns, setColumns] = useState<any[]>([
        {
            tabKey: 'general',
            columns: [
                {
                    items: [],
                    colXs: 12,
                    colSm: 12,
                    colMd: 12,
                    colLg: 6,
                    colXl: 6
                },
                {
                    items: [],
                    colXs: 12,
                    colSm: 12,
                    colMd: 12,
                    colLg: 6,
                    colXl: 6
                }
            ]
        }
    ])
    const [customState, setCustomState] = useState<any>({
        columnCount: 2
    })

    const onChangeColumnCount = (value: string) => {
        const columnsTemp = [...columns]
        const column = columnsTemp.find((item: any) => item.tabKey === activeKey)
        let columnItems = []
        const newColumns = []
        const mewColumnCount = parseInt(value)

        column.columns.forEach((item: any) => {
            columnItems = [...columnItems, ...item.items]
        })

        for (let i = 0; i < mewColumnCount; i++) {
            newColumns.push({
                items: i === 0 ? columnItems : [],
                colXs: 12 / mewColumnCount,
                colSm: 12 / mewColumnCount,
                colMd: 12 / mewColumnCount,
                colLg: 12 / mewColumnCount,
                colXl: 12 / mewColumnCount
            })
        }

        column.columns = newColumns
        setColumns(columnsTemp)
    }

    const onChangeCustomState = (key: string, value: any) => {
        if (!key) return

        const customStateUpdateListeners = {
            columnCount: onChangeColumnCount
        }

        customStateUpdateListeners[key](value)
    }

    const customStateUpdater = (key, value) => {
        const updatedStateObj = {
            ...customState,
            [key]: value
        }

        setCustomState(updatedStateObj)
        onChangeCustomState(key, value)
    }

    const isArr = (v: any) => Object.prototype.toString.call(v) === '[object Array]'

    const getFormElements = () => {
        return (
            <Droppable droppableId="elements" isDropDisabled={false}>
                {provided => (
                    <SidebarBodyContent ref={provided.innerRef} {...provided.droppableProps} style={{height: '100%'}}>
                        {formElements.map((element: any, index: number) => (
                            <Draggable draggableId={element.id} index={index} key={element.id}>
                                {providedDraggable => (
                                    <SidebarBodyFormElement
                                        ref={providedDraggable.innerRef}
                                        {...providedDraggable.draggableProps}
                                        {...providedDraggable.dragHandleProps}
                                    >
                                        {element.label}
                                    </SidebarBodyFormElement>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </SidebarBodyContent>
                )}
            </Droppable>
        )
    }

    const getFormLayoutOptions = () => {
        if (!activeConfigId) return <></>

        return (
            <SidebarBodyListContent>
                <LayoutItems component={activeConfigId} onStateChange={customStateUpdater} customState={customState}/>
            </SidebarBodyListContent>
        )
    }

    const getSidebarBodyContent = () => {
        const mapper = {
            elements: getFormElements(),
            layout: getFormLayoutOptions()
        }

        const bodyContent = mapper[activeTab]

        if (typeof bodyContent === undefined) return ''
        return bodyContent
    }

    const onChangeTab = (newTabKey: string) => {
        setActiveKey(newTabKey)
    }

    const onClickTab = (tabKey: string) => {
        setActiveTab('layout')
        setActiveConfig('Tabs')
        setActiveConfigId('tab')
    }

    const getNewFormItemElem = (item: any) => {
        if (!item) return <></>

        let props = {
            ...item.defaultProps
        }

        if (item.id.includes('tab_')) {
            props = {
                ...props,
                onChangeTab,
                onClickTab,
                activeKey
            }
        }

        const Element = item.render(props)

        return Element
    }

    const insertToArray = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
    ]

    const deleteFromArray = (arr, index) => [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ]

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list]
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const onDragEnd = (result: any) => {
        console.log('result', result)
        if (!result.destination) {
            return
        }

        const formElementsTemp = [...formElements]
        const columnsTemp = [...columns]
        const sourceColumnIndex = Number(result.source.droppableId.split('_')[1] || '0')
        const columnIndex = Number(result.destination.droppableId.split('_')[1] || '0')
        const columnItem = columnsTemp.find((column: any) => column.tabKey === activeKey)
        const column = columnItem.columns[columnIndex]
        const columnSource = columnItem.columns[sourceColumnIndex]

        const sourceDroppableId = result.source.droppableId
        const destinationDroppableId = result.destination.droppableId

        const isInColumn = column.items.findIndex((item: any) => item.id === result.draggableId) !== -1

        if (isInColumn && sourceDroppableId !== 'elements') {
            const sourceIndex = result.source.index
            const destinationIndex = result.destination.index

            column.items = reorder(
                column.items,
                sourceIndex,
                destinationIndex
            )

            setColumns(columnsTemp)

            return
        }

        if (!isInColumn && sourceDroppableId !== 'elements' && sourceDroppableId !== destinationDroppableId) {
            const sourceItemId = result.draggableId.split('_')[0]
            const formElementToPush = columnSource.items.find((item: any) => item.id === result.draggableId)
            const formElementToPushIndex = columnSource.items.findIndex((item: any) => item.id === result.draggableId)

            column.items = insertToArray(column.items, result.destination.index, formElementToPush)
            columnSource.items = deleteFromArray(columnSource.items, formElementToPushIndex)

            setColumns(columnsTemp)

            return
        }

        const relatedFormElementIndex = formElements.findIndex((item: any) => item.id === result.draggableId)
        const formElementsBeforeSave = JSON.parse(JSON.stringify([...formElements]))
        const formElementToPush = formElementsBeforeSave[relatedFormElementIndex]
        formElementToPush.render = formElements[relatedFormElementIndex].render
        column.items.push(formElementToPush)
        setColumns(columnsTemp)

        if (relatedFormElementIndex !== -1) {
            const actualId = formElementsTemp[relatedFormElementIndex].id.split('_')[0]
            const newId = `${actualId}_${makeid(12)}`

            formElementsTemp[relatedFormElementIndex].id = newId
        }

        setFormElements(formElementsTemp)
    }

    const onDragStart = (e: any) => {

    }

    const checkIfTabsLayoutActive = () => activeConfig === 'Tabs' && activeTab === 'layout'

    const onClickBackBtn = () => {
        setActiveConfig('')
        setActiveConfigId('')
        setActiveTab('elements')
    }

    useEffect(() => {
        const elementList = elements(uiKit)

        const items = [...elementList].map((item: any) => ({
            ...item,
            id: `${item.id}_${makeid(12)}`
        }))

        setFormElements(items)
        setNewFormItems(
            [{...[...elementList].find((item: any) => item.id === 'tab'), id: 'tab_0'}]
        )
    }, [])

    return (
        <MainContainer>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Row style={{height: '100%'}}>
                    <Col xs={2}>
                        <Sidebar className="formactor-builder-component__sidebar">
                            <SidebarHeader className="formactor-builder-component__sidebar__header">
                                <SidebarHeaderTitle>
                                    {activeConfig && (
                                        <div onClick={onClickBackBtn}>
                                            <ArrowLeftOutlined/>
                                        </div>
                                    )}
                                    {activeConfig && `${activeConfig} config`}
                                    {!activeConfig && `Choose an element`}
                                </SidebarHeaderTitle>
                            </SidebarHeader>
                            <SidebarBody className="formactor-builder-component__sidebar__body">
                                <SidebarBodyHeader>
                                    {
                                        <>
                                            {activeTab === 'elements' && (
                                                <SidebarBodyHeaderTab
                                                    className="formactor-builder-component__sidebar__body__header__tab"
                                                    active
                                                >
                                                    Elements
                                                </SidebarBodyHeaderTab>
                                            )}
                                            {activeTab !== 'elements' && (
                                                <>
                                                    <SidebarBodyHeaderTab
                                                        className="formactor-builder-component__sidebar__body__header__tab"
                                                        active={activeTab === 'layout'}
                                                        onClick={() => setActiveTab('layout')}
                                                    >
                                                        Layout
                                                    </SidebarBodyHeaderTab>
                                                    <SidebarBodyHeaderTab
                                                        className="formactor-builder-component__sidebar__body__header__tab"
                                                        active={activeTab === 'design'}
                                                        onClick={() => setActiveTab('design')}
                                                    >
                                                        Design
                                                    </SidebarBodyHeaderTab>
                                                    <SidebarBodyHeaderTab
                                                        className="formactor-builder-component__sidebar__body__header__tab"
                                                        active={activeTab === 'advanced'}
                                                        onClick={() => setActiveTab('advanced')}
                                                    >
                                                        Advanced
                                                    </SidebarBodyHeaderTab>
                                                </>
                                            )}
                                        </>
                                    }
                                </SidebarBodyHeader>
                                {getSidebarBodyContent()}
                            </SidebarBody>
                        </Sidebar>
                    </Col>
                    <Col xs={10}>
                        <FormBuilderDDWrapper isTabsLayoutActive={checkIfTabsLayoutActive()}>
                            <Row style={{height: '90%'}}>
                                <Col xs={12} className="tabs-wrapper-col">
                                    {
                                        newFormItems
                                            .filter((item: any) => item.id.includes('tab_'))
                                            .map((item: any, index: number) => (
                                                <div key={item.id} style={{display: 'flex'}}>
                                                    {getNewFormItemElem(item)}
                                                </div>
                                            ))
                                    }
                                </Col>
                                {
                                    columns.find((column: any) => column.tabKey === activeKey)?.columns.map((column: any, index: number) => (
                                        <Col
                                            xs={column.colXs}
                                            sm={column.colSm}
                                            md={column.colMd}
                                            lg={column.colLg}
                                            xl={column.colXl}
                                            style={{height: '100%'}}
                                        >
                                            <Droppable droppableId={`list_${index}`} key={index}>
                                                {provided => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}
                                                         style={{height: '100%'}}>
                                                        {
                                                            column.items
                                                                .filter((item: any) => !item.id.includes('tab_'))
                                                                .map((item: any, index: number) => (
                                                                    <Draggable
                                                                        draggableId={item.id}
                                                                        index={index}
                                                                        key={item.id}
                                                                    >
                                                                        {provided => (
                                                                            <div
                                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                <NewFormItemWrapper>
                                                                                    <MovePrefix/>
                                                                                    {getNewFormItemElem(item)}
                                                                                </NewFormItemWrapper>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))
                                                        }
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </FormBuilderDDWrapper>
                    </Col>
                </Row>
            </DragDropContext>
        </MainContainer>
    )
}

export default Builder