import React, {FC, useState, useRef, useEffect} from 'react'
import {IPropsBuilder} from '../../../types/builder'
import {makeid} from '../../../utils/calculation'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../components/form/antd/Select'
import elements from '../../../assets/data/builder/form'
import LayoutItems from './LayoutItems'
import DesignItems from './DesignItems'
import AdvancedItems from './AdvancedItems'
import Tabs, {IPropsTabs} from '../../../components/builder/general/Tabs'
import {Row, Col} from 'reactstrap'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import MovePrefix from '../../../components/builder/general/MovePrefix'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {isArr, onClickAfterActions, saveItemProperty} from '../../../utils/builder/form/general'
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
    SidebarBodyListContent,
    SidebarBodyLanguageWrapper
} from './styles'

const Builder: FC<IPropsBuilder> = ({options}) => {
    const [uiKit, setUiKit] = useState<'antd' | 'reactstrap' | 'material-ui'>('antd')
    const [formElements, setFormElements] = useState<any[]>([])
    const [newFormItems, setNewFormItems] = useState<any[]>([])
    const [activeKey, setActiveKey] = useState<string>('general')
    const [activeTab, setActiveTab] = useState<'layout' | 'design' | 'advanced' | 'elements'>('elements')
    const [currentTabs, setCurrentTabs] = useState<any[]>([
        {
            key: 'general',
            title: 'General',
            closable: false,
            isTab: true
        }
    ])
    const [activeConfig, setActiveConfig] = useState<string>('')
    const [activeConfigId, setActiveConfigId] = useState<string>('')
    const [activeConfigItemId, setActiveConfigItemId] = useState<string>('')
    const [isTabsVisible, setCurrentTabsVisible] = useState<boolean>(true)
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
    const [currentLanguage, setCurrentLanguage] = useState<string>(options?.languages?.[0] || 'en')
    const [customState, setCustomState] = useState<any>({
        columnCount: 2,
        name: 'General',
        hidden: 'false',
        defaultValue: '',
        placeholder: '',
        allowClear: false,
        size: '',
        type: '',
        showCount: false,
        maxLength: 1000,
        bordered: true,
        disabled: false
    })

    const onChangeHidden = (value: any) => {
        switch (activeConfigId) {
            case 'tab':
                if (value === 'true') {
                    setCurrentTabsVisible(false)
                    break
                }

                setCurrentTabsVisible(true)
                break

            default:
                break
        }

        setCustomState({
            ...customState,
            hidden: value
        })
    }

    const onChangeSize = (e: any) => {
        setCustomState({
            ...customState,
            size: e
        })
    }

    const onChangeName = (e: any) => {
        const name = e.target.value

        switch (activeConfigId) {
            case 'tab':
                const currentTabsTemp = [...currentTabs]
                const currentTab = currentTabsTemp.find((tab: any) => tab.key === activeKey)
                currentTab.title = name
                setCurrentTabs(currentTabsTemp)
                break

            default:
                break
        }

        setCustomState({
            ...customState,
            name
        })
    }

    const onChangeDefaultValue = (e: any) => {
        const value = e.target.value

        setCustomState({
            ...customState,
            defaultValue: value
        })
    }

    const onChangePlaceholder = (e: any) => {
        const value = e.target.value

        setCustomState({
            ...customState,
            placeholder: value
        })
    }

    const onChangeMaxLength = (e: any) => {
        setCustomState({
            ...customState,
            maxLength: e
        })
    }

    const onChangeAllowClear = (e: any) => {
        setCustomState({
            ...customState,
            allowClear: e
        })
    }

    const onChangeShowCount = (e: any) => {
        setCustomState({
            ...customState,
            showCount: e
        })
    }

    const onChangeBordered = (e: any) => {
        setCustomState({
            ...customState,
            bordered: e
        })
    }

    const onChangeDisabled = (e: any) => {
        setCustomState({
            ...customState,
            disabled: e
        })
    }

    const onChangeType = (e: any) => {
        setCustomState({
            ...customState,
            type: e
        })
    }

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
        setCustomState({
            ...customState,
            columnCount: value
        })
    }

    const onChangeCustomState = (key: string, value: any) => {
        if (!key) return

        const customStateUpdateListeners = {
            columnCount: onChangeColumnCount,
            name: onChangeName,
            hidden: onChangeHidden,
            defaultValue: onChangeDefaultValue,
            placeholder: onChangePlaceholder,
            allowClear: onChangeAllowClear,
            size: onChangeSize,
            type: onChangeType,
            showCount: onChangeShowCount,
            maxLength: onChangeMaxLength,
            bordered: onChangeBordered,
            disabled: onChangeDisabled
        }

        const customStateUpdateListener = customStateUpdateListeners[key]

        if (customStateUpdateListener) customStateUpdateListener(value)
    }

    const customStateUpdater = (key, value) => {
        const updatedStateObj = {
            ...customState,
            [key]: value
        }

        setCustomState(updatedStateObj)
        onChangeCustomState(key, value)
    }

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

    const getFormAdvancedOptions = () => {
        if (!activeConfigId) return <></>

        return (
            <SidebarBodyListContent>
                <AdvancedItems component={activeConfigId} onStateChange={customStateUpdater} customState={customState}/>
            </SidebarBodyListContent>
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

    const getFormDesignOptions = () => {
        if (!activeConfigId) return <></>

        return (
            <SidebarBodyListContent>
                <DesignItems component={activeConfigId} onStateChange={customStateUpdater} customState={customState}/>
            </SidebarBodyListContent>
        )
    }

    const getSidebarBodyContent = () => {
        const mapper = {
            elements: getFormElements(),
            layout: getFormLayoutOptions(),
            design: getFormDesignOptions(),
            advanced: getFormAdvancedOptions()
        }

        const bodyContent = mapper[activeTab]

        if (typeof bodyContent === undefined) return ''
        return bodyContent
    }

    const onClickNewFormItem = (id: string) => {
        const itemId = id.split('_')[0]

        setActiveTab('layout')
        setActiveConfig(itemId.charAt(0).toUpperCase() + itemId.slice(1))
        setActiveConfigId(itemId)
        setActiveConfigItemId(id)

        onClickAfterActions({
            columns,
            setColumns,
            activeConfigId: itemId,
            customState,
            setCustomState,
            activeConfigItemId: id,
            activeKey,
            currentLanguage
        })
    }

    const onChangeTab = (newTabKey: string) => {
        setActiveKey(newTabKey)
    }

    const onClickTab = (tabKey: string) => {
        setActiveTab('layout')
        setActiveConfig('Tabs')
        setActiveConfigId('tab')
        setActiveConfigItemId('tab')

        const tabName = currentTabs.find((item: any) => item.key === tabKey).title

        setCustomState({
            ...customState,
            name: tabName
        })
    }

    const onTabEdit = (targetKey: string, action: 'add' | 'remove') => {
        let columnsTemp = [...columns]

        if (action === 'add') {
            columnsTemp.push(
                {
                    tabKey: `tab_${currentTabs.length}`,
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
            )

            setColumns(columnsTemp)

            setCurrentTabs([
                ...currentTabs,
                {
                    key: `tab_${currentTabs.length}`,
                    title: `New Tab ${currentTabs.length}`,
                    closable: true,
                    isTab: true
                }
            ])

            return
        }

        let currentTabsTemp = [...currentTabs]
        currentTabsTemp = currentTabsTemp.filter((item: any) => item.key !== targetKey)
        columnsTemp = columnsTemp.filter((item: any) => item.tabKey !== targetKey)
        setCurrentTabs(currentTabsTemp)
        setColumns(columnsTemp)
    }

    const getItemFieldValue = (key: string, value: any, languageSpecificParams) => {
        return isArr(value) && languageSpecificParams.includes(key) ? value.find((l: any) => l.key === currentLanguage)?.value : value
    }

    const getNewFormItemElem = (item: any) => {
        if (!item) return <></>
        const itemId = item?.id?.split('_')[0] || ''

        let props = {
            ...item.defaultProps || {}
        }

        if (item.isTab) {
            props = {
                ...props,
                data: [...currentTabs],
                onChangeTab,
                onClickTab,
                onEdit: onTabEdit,
                activeKey,
                type: 'editable-card'
            }

            return <Tabs {...props} />
        }

        if (itemId === 'input') {
            const column = columns.find((c: any) => c.tabKey === activeKey)
            let itemInput
            column.columns.forEach((c: any) => {
                const foundItem = c.items.find((i: any) => i.id === item.id)

                if (foundItem) itemInput = foundItem
            })

            props = {
                ...props,
                value: getItemFieldValue('defaultValue', itemInput.config.defaultValue, itemInput.config.languageSpecificParams),
                placeholder: getItemFieldValue('placeholder', itemInput.config.placeholder, itemInput.config.languageSpecificParams),
                allowClear: itemInput.config.allowClear,
                size: itemInput.config.size,
                type: itemInput.config.type,
                showCount: itemInput.config.showCount,
                maxLength: itemInput.config.maxLength,
                bordered: itemInput.config.bordered,
                disabled: itemInput.config.disabled
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
        if (!result.destination) return

        if (result.draggableId.includes('tab_')) {
            const columnsTemp = [...columns]
            columnsTemp.push(
                {
                    tabKey: `tab_${currentTabs.length}`,
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
            )

            setColumns(columnsTemp)

            setCurrentTabs([
                ...currentTabs,
                {
                    key: `tab_${currentTabs.length}`,
                    title: `New Tab ${currentTabs.length}`,
                    closable: true,
                    isTab: true
                }
            ])

            setCustomState({
                ...customState,
                hidden: 'false'
            })

            setCurrentTabsVisible(true)

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
        if (!customState || !activeConfigItemId) return

        saveItemProperty({
            activeConfigItemId,
            activeKey,
            columns,
            setColumns,
            customState,
            languages: options.languages,
            currentLanguage
        })
    }, [customState])

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
                                <SidebarBodyLanguageWrapper>
                                    <AntdSelect
                                        placeholder="Select language"
                                        options={[
                                            {
                                                label: 'English',
                                                value: 'en'
                                            }
                                        ]}
                                    />
                                </SidebarBodyLanguageWrapper>
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
                                                        {activeConfigId === 'tab' ? 'Layout' : 'Content'}
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
                                {isTabsVisible && (
                                    <Col xs={12} className="tabs-wrapper-col">
                                        <div style={{display: 'flex'}}>
                                            {getNewFormItemElem(currentTabs[0])}
                                        </div>
                                    </Col>
                                )}
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
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <NewFormItemWrapper>
                                                                                    <MovePrefix
                                                                                        onClick={() => onClickNewFormItem(item.id)}
                                                                                    />
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