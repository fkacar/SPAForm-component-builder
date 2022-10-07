export const isArr = (v: any) => Object.prototype.toString.call(v) === '[object Array]'

export const onClickAfterActions = ({
                                        columns,
                                        setColumns,
                                        activeConfigId,
                                        customState,
                                        setCustomState,
                                        activeConfigItemId,
                                        activeKey,
                                        currentLanguage
                                    }: any) => {
    const getItemSavedProperty = (field: string) => {
        const column = columns.find((c: any) => c.tabKey === activeKey)
        let item
        column.columns.forEach((c: any) => {
            const foundItem = c.items.find((i: any) => i.id === activeConfigItemId)

            if (foundItem) item = foundItem
        })

        if (!item) {
            console.error('getItemSavedProperty item not found')
            return ''
        }

        if (item.languageSpecificParams && item.languageSpecificParams.includes(field)) {
            return isArr(item.config[field]) ? item.config[field].find((l: any) => l.language === currentLanguage)?.value : item.config[field]
        }

        return item.config[field]
    }

    const tabActions = () => {

    }

    const inputActions = () => {
        setCustomState({
            ...customState,
            name: getItemSavedProperty('name'),
            defaultValue: getItemSavedProperty('defaultValue'),
            placeholder: getItemSavedProperty('placeholder'),
            allowClear: getItemSavedProperty('allowClear'),
            size: getItemSavedProperty('size'),
            type: getItemSavedProperty('type'),
            showCount: getItemSavedProperty('showCount'),
            maxLength: getItemSavedProperty('maxLength'),
            bordered: getItemSavedProperty('bordered'),
            disabled: getItemSavedProperty('disabled')
        })
    }

    const mapper = {
        tab: tabActions,
        input: inputActions
    }

    const actionMethod = mapper[activeConfigId]

    if (actionMethod) actionMethod()
}

export const saveItemProperty = ({
                                     activeConfigItemId,
                                     activeKey,
                                     columns,
                                     setColumns,
                                     customState,
                                     languages,
                                     currentLanguage
                                 }: any) => {
    const columnsStored = [...columns]
    const column = columnsStored.find((c: any) => c.tabKey === activeKey)
    let item
    column.columns.forEach((c: any) => {
        const foundItem = c.items.find((i: any) => i.id === activeConfigItemId)

        if (foundItem) item = foundItem
    })
    
    if (!item) return console.error('saveItemProperty: Item not found')

    Object.keys(item.config).forEach(key => {
        let langValue
        if (item.config?.languageSpecificParams && item.config.languageSpecificParams.includes(key)) {
            langValue = []

            languages.forEach((lang: string) => {
                if (currentLanguage === lang) {
                    langValue.push({
                        key: lang,
                        value: customState[key]
                    })
                } else {
                    const originalLangValue = (isArr(item.config[key]) && item.config[key].find((l: any) => l.key === lang)) || {
                        key: lang,
                        value: ''
                    }

                    langValue.push(originalLangValue)
                }
            })
        }

        if (key !== 'languageSpecificParams') item.config[key] = langValue || customState[key]
    })

    setColumns(columnsStored)
}