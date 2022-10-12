export const generator = (columns: any[], currentTabs: any[]) => {
    const formValidationScheme = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'formactor_form_validation_scheme',
        title: 'formactor_form_validation_scheme',
        description: '',
        type: 'object',
        properties: {}
    }

    const yupConfig = {
        errMessages: {}
    }

    const formData: any = {
        tabs: [],
        columns: [],
        autoComplete: 'off',
        validationScheme: formValidationScheme
    }

    const generateYupScheme = (item: any) => {
        formValidationScheme.properties[item.config.name] = {
            type: item.config.yupType
        }

        yupConfig.errMessages[item.config.name] = {
            typeError: item.config.yupTypeErrorMsg
        }

        let methodSpecificFields = {}
        item.config.yupMethods.forEach((method: any) => {
            yupConfig.errMessages[item.config.name] = {
                ...yupConfig.errMessages[item.config.name],
                [method.method]: method.params[method.method].message
            }

            methodSpecificFields = {
                ...methodSpecificFields,
                ...(method.method === 'required' ? {required: true} : {}),
                ...(method.method === 'length' ? {length: method.params.length.limit} : {}),
                ...(method.method === 'min' ? {min: method.params.min.limit} : {}),
                ...(method.method === 'max' ? {max: method.params.max.limit} : {}),
                ...(method.method === 'matches' ? {matches: method.params.matches.regex} : {}),
                ...(method.method === 'email' ? {email: true} : {}),
                ...(method.method === 'url' ? {url: true} : {}),
                ...(method.method === 'uuid' ? {uuid: true} : {}),
                ...(method.method === 'trim' ? {trim: true} : {}),
                ...(method.method === 'lowercase' ? {lowercase: true} : {}),
                ...(method.method === 'uppercase' ? {uppercase: true} : {}),
                ...(method.method === 'lessThan' ? {lessThan: method.params.lessThan.max} : {}),
                ...(method.method === 'moreThan' ? {moreThan: method.params.moreThan.min} : {}),
                ...(method.method === 'positive' ? {positive: true} : {}),
                ...(method.method === 'negative' ? {negative: true} : {}),
                ...(method.method === 'integer' ? {integer: true} : {}),
                ...(method.method === 'truncate' ? {truncate: true} : {}),
                ...(method.method === 'round' ? {round: true} : {}),
                ...(method.method === 'of' ? {
                    of: {
                        type: 'string',
                        enum: method.params.of.enum.split(',').trim()
                    }
                } : {}),
                ...(method.method === 'json' ? {json: true} : {}),
                ...(method.method === 'ensure' ? {ensure: true} : {}),
                ...(method.method === 'compact' ? {compact: true} : {}),
                ...(method.method === 'tuple' ? {tuple: true} : {}),
                ...(method.method === 'shape' ? {shape: [method.params.shape.fields, method.params.shape.noSortEdges]} : {}),
                ...(method.method === 'concat' ? {concat: method.params.concat.schemaB} : {}),
                ...(method.method === 'pick' ? {pick: method.params.pick.keys} : {}),
                ...(method.method === 'omit' ? {omit: method.params.omit.keys} : {}),
                ...(method.method === 'from' ? {from: [method.params.from.fromKey, method.params.from.toKey, method.params.from.alias]} : {}),
                ...(method.method === 'noUnknown' ? {noUnknown: method.params.noUnknown.onlyKnownKeys} : {}),
                ...(method.method === 'camelCase' ? {camelCase: true} : {}),
                ...(method.method === 'constantCase' ? {constantCase: true} : {})
            }
        })

        formValidationScheme.properties[item.config.name] = {
            ...formValidationScheme.properties[item.config.name],
            ...methodSpecificFields
        }
    }

    const getItems = (items: any[]) => {
        const itemsFinal: any = []
        const orgItems = [...items]

        orgItems.forEach(item => {
            generateYupScheme(item)

            delete item.defaultProps.onClick
            delete item.defaultProps.onChange
            delete item.config.yup
            delete item.config.yupMethod
            delete item.config.yupType
            delete item.config.yupTypeErrorMsg
            delete item.config.yupMethods

            const componentName = item.id.split('_')[0]

            itemsFinal.push({
                component: componentName,
                props: {
                    ...item.defaultProps,
                    ...item.config
                },
                name: item.config.name,
                label: item.config.label || '',
                initialValue: item.config.defaultValue,
                placeholder: item.config.placeholder || '',
                ...(item.id === 'textarea' ? {rows: item.config.rows} : {}),
                ...(item.id === 'select' ? {options: item.config.options} : {}),
                ...(item.id === 'button' ? {
                    buttonLabel: item.config.buttonLabel,
                    type: item.config.type,
                    htmlType: item.config.htmlType
                } : {})
            })
        })

        return itemsFinal
    }

    currentTabs.forEach(tab => {
        formData.tabs.push({
            title: tab.title,
            content: '',
            key: tab.key,
            closable: tab.closable
        })
    })

    columns.forEach(column => {
        column.columns.forEach((col: any) => {
            formData.columns.push({
                items: getItems(col.items),
                colXs: col.colXs,
                colSm: col.colSm,
                colMd: col.colMd,
                colLg: col.colLg,
                colXl: col.colXl,
                tabKey: column.tabKey
            })
        })
    })
    
    formData.yupConfig = yupConfig

    console.log('formData', formData)
}