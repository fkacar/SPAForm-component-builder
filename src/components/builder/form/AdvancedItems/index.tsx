import React from 'react'
import AntdSelect, {IPropsSelect as IAntdPropsSelect} from '../../../form/antd/Select'
import AntdInput, {IPropsInput as IAntdPropsInput} from '../../../../components/form/antd/Input'
import AntdTextarea, {IPropsTextarea as IAntdPropsTextarea} from '../../../../components/form/antd/Textarea'
import AntdInputNumber, {IPropsInputNumber as IAntdPropsInputNumber} from '../../../../components/form/antd/InputNumber'
import AntdSwitch, {IPropsSwitch as IAntdPropsSwitch} from '../../../../components/form/antd/Switch'

const items = {
    select: {
        render: (props: IAntdPropsSelect) => (
            <AntdSelect {...props} />
        )
    },
    input: {
        render: (props: IAntdPropsInput) => (
            <AntdInput {...props} />
        )
    },
    textarea: {
        render: (props: IAntdPropsTextarea) => (
            <AntdTextarea {...props} />
        )
    },
    inputNumber: {
        render: (props: IAntdPropsInputNumber) => (
            <AntdInputNumber {...props} />
        )
    },
    switch: {
        render: (props: IAntdPropsSwitch) => (
            <AntdSwitch {...props} />
        )
    }
}

const getYupParameters = (customState: any, index: number) => {
    const yupMethod = customState?.yupMethods[index - 1]?.method || ''
    if (!yupMethod) return []

    const methods = {
        required: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_required_message',
                inputLabel: 'Yup Required Error Message',
                placeholder: 'e.g. This field is required'
            }
        ],
        length: [
            {
                key: 'inputNumber',
                valueStateKey: 'yup_param_length_limit',
                inputLabel: 'Yup Length Limit',
                placeholder: 'e.g. 10'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_length_message',
                inputLabel: 'Yup Length Error Message',
                placeholder: 'e.g. value must be shorter than 10 characters'
            }
        ],
        min: [
            {
                key: 'inputNumber',
                valueStateKey: 'yup_param_min_limit',
                inputLabel: 'Yup Min Limit',
                placeholder: 'e.g. 10'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_min_message',
                inputLabel: 'Yup Min Error Message',
                placeholder: 'e.g. value must be greater than 10'
            }
        ],
        max: [
            {
                key: 'inputNumber',
                valueStateKey: 'yup_param_max_limit',
                inputLabel: 'Yup Max Limit',
                placeholder: 'e.g. value must be shorter than 10'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_max_message',
                inputLabel: 'Yup Max Error Message',
                placeholder: 'e.g. value must be shorter than 10'
            }
        ],
        matches: [
            {
                key: 'input',
                valueStateKey: 'yup_param_matches_regex',
                inputLabel: 'Yup Matches Regex',
                placeholder: 'e.g. /^[a-zA-Z0-9]{3,30}$/'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_matches_message',
                inputLabel: 'Yup Matches Error Message',
                placeholder: 'e.g. value cannot contain special characters'
            }
        ],
        email: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_email_message',
                inputLabel: 'Yup Email Error Message',
                placeholder: 'e.g. email is not valid'
            }
        ],
        url: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_url_message',
                inputLabel: 'Yup URL Error Message',
                placeholder: 'e.g. url is not valid'
            }
        ],
        uuid: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_uuid_message',
                inputLabel: 'Yup uuid Error Message',
                placeholder: 'e.g. uuid is not valid'
            }
        ],
        trim: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_trim_message',
                inputLabel: 'Yup uuid Error Message',
                placeholder: 'e.g. uuid is not valid'
            }
        ],
        lowercase: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_lowercase_message',
                inputLabel: 'Yup Lowercase Error Message',
                placeholder: 'e.g. value must be lowercase'
            }
        ],
        uppercase: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_uppercase_message',
                inputLabel: 'Yup Uppercase Error Message',
                placeholder: 'e.g. value must be uppercase'
            }
        ],
        lessThan: [
            {
                key: 'inputNumber',
                valueStateKey: 'yup_param_lessThan_max',
                inputLabel: 'Yup lessThan Max',
                placeholder: 'e.g. 10'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_lessThan_message',
                inputLabel: 'Yup lessThan Error Message',
                placeholder: 'e.g. value must be shorter than 10'
            }
        ],
        moreThan: [
            {
                key: 'inputNumber',
                valueStateKey: 'yup_param_moreThan_min',
                inputLabel: 'Yup moreThan Min',
                placeholder: 'e.g. 10'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_moreThan_message',
                inputLabel: 'Yup moreThan Error Message',
                placeholder: 'e.g. value must be greater than 10'
            }
        ],
        positive: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_positive_message',
                inputLabel: 'Yup Positive Error Message',
                placeholder: 'e.g. value must be positive'
            }
        ],
        negative: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_negative_message',
                inputLabel: 'Yup Negative Error Message',
                placeholder: 'e.g. value must be negative'
            }
        ],
        integer: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_integer_message',
                inputLabel: 'Yup Integer Error Message',
                placeholder: 'e.g. value must be integer'
            }
        ],
        truncate: [],
        round: [
            {
                key: 'select',
                valueStateKey: 'yup_param_round_type',
                inputLabel: 'Yup Round Type',
                placeholder: 'e.g. floor',
                options: [
                    {
                        label: 'Floor',
                        value: 'floor'
                    },
                    {
                        label: 'Ceil',
                        value: 'ceil'
                    },
                    {
                        label: 'Trunc',
                        value: 'trunc'
                    },
                    {
                        label: 'Round',
                        value: 'round'
                    }
                ]
            }
        ],
        of: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_of_enum',
                inputLabel: 'Yup Of Enums',
                placeholder: 'e.g. javascript, java, C#'
            }
        ],
        json: [],
        ensure: [],
        compact: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_compact_rejector',
                inputLabel: 'Yup Compact Rejector Function',
                placeholder: 'e.g. (value) => boolean'
            }
        ],
        tuple: [],
        shape: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_shape_fields',
                inputLabel: 'Yup Shape Fields Object',
                placeholder: 'e.g. { a: 1 }'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_shape_noSortEdges',
                inputLabel: 'Yup Shape noSortEdges Array',
                placeholder: 'e.g. [ "a", "b" ]'
            }
        ],
        concat: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_concat_schemaB',
                inputLabel: 'Yup Concat schemaB Object',
                placeholder: 'e.g. { a: 1 }'
            }
        ],
        pick: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_pick_keys',
                inputLabel: 'Yup Pick Keys Array',
                placeholder: 'e.g. [ "a", "b" ]'
            }
        ],
        omit: [
            {
                key: 'textarea',
                valueStateKey: 'yup_param_omit_keys',
                inputLabel: 'Yup Omit Keys Array',
                placeholder: 'e.g. [ "a", "b" ]'
            }
        ],
        from: [
            {
                key: 'input',
                valueStateKey: 'yup_param_from_fromKey',
                inputLabel: 'Yup From Key',
                placeholder: 'e.g. name'
            },
            {
                key: 'input',
                valueStateKey: 'yup_param_from_toKey',
                inputLabel: 'Yup From toKey',
                placeholder: 'e.g. surname'
            },
            {
                key: 'switch',
                valueStateKey: 'yup_param_from_alias',
                inputLabel: 'Yup From Alias'
            }
        ],
        noUnknown: [
            {
                key: 'switch',
                valueStateKey: 'yup_param_noUnknown_onlyKnownKeys',
                inputLabel: 'Yup noUnknown onlyKnownKeys'
            },
            {
                key: 'textarea',
                valueStateKey: 'yup_param_noUnknown_message',
                inputLabel: 'Yup noUnknown Error Message',
                placeholder: 'e.g. value must be known'
            }
        ],
        camelCase: [],
        constantCase: []
    }

    const currentItems = methods[yupMethod]
    const yupParameters = currentItems.map((item: any) => ({
        ...item,
        renderConditions: [
            {
                key: 'yupMethod',
                value: 'not-null'
            }
        ],
        index,
        yupMethod,
        props: {
            ...(item.key === 'switch' ? {} : {style: {width: '100%'}}),
            placeholder: item.placeholder,
            inputLabel: `${index}. ${item.inputLabel}`,
            ...(!!item.options ? {options: item.options} : {})
        }
    }))

    return yupParameters
}

const getYupMethodItems = (customState, index: number) => {
    const yupMethodItems = []

    const methods = {
        mixed: [
            'required',
            'length',
            'min',
            'max',
            'matches',
            'email',
            'url',
            'uuid',
            'ensure',
            'trim',
            'lowercase',
            'uppercase',
            'lessThan',
            'moreThan',
            'positive',
            'negative',
            'integer',
            'truncate',
            'round',
            'of',
            'json',
            'compact',
            'shape',
            'concat',
            'pick',
            'omit',
            'from',
            'noUnknown',
            'camelCase',
            'constantCase'
        ],
        string: [
            'required',
            'length',
            'email',
            'trim',
            'min',
            'max',
            'matches',
            'lowercase',
            'uppercase',
            'url',
            'uuid',
            'ensure'
        ],
        number: [
            'min',
            'max',
            'lessThan',
            'moreThan',
            'positive',
            'negative',
            'integer',
            'truncate',
            'round'
        ],
        boolean: [],
        date: [
            'min',
            'max'
        ],
        array: [
            'of',
            'json',
            'length',
            'ensure',
            'compact',
            'min',
            'max',
            'ensure',
            'compact'
        ],
        tuple: [],
        object: [
            'shape',
            'json',
            'concat',
            'pick',
            'omit',
            'noUnknown',
            'camelCase',
            'from',
            'constantCase'
        ]
    }

    Object.keys(methods).forEach((key) => {
        const renderConditions = [
            {
                key: 'yupType',
                value: key
            }
        ]
        const options = []

        methods[key].forEach((method: any) => {
            options.push({
                label: method.charAt(0).toUpperCase() + method.slice(1),
                value: method
            })
        })

        yupMethodItems.push({
            key: 'select',
            valueStateKey: 'yupMethod',
            index,
            renderConditions,
            props: {
                inputLabel: `${index}. Yup Validation Method`,
                style: {
                    width: '100%'
                },
                placeholder: 'Select yup validation method',
                options
            }
        })
    })

    return yupMethodItems
}

const getYupMethodArea = (customState: any) => {
    let methodElements = []

    for (let i = 0; i < customState.yupMethods.length + 1; i++) {
        methodElements = methodElements.concat([
            ...getYupMethodItems(customState, i + 1),
            ...getYupParameters(customState, i + 1)
        ])
    }

    return methodElements
}

const getYupItems = (customState: any) => [
    {
        key: 'select',
        valueStateKey: 'yupType',
        props: {
            inputLabel: 'Yup Validation Type',
            style: {
                width: '100%'
            },
            placeholder: 'Select yup validation type',
            options: [
                {
                    label: 'Mixed',
                    value: 'mixed'
                },
                {
                    label: 'String',
                    value: 'string'
                },
                {
                    label: 'Number',
                    value: 'number'
                },
                {
                    label: 'Boolean',
                    value: 'boolean'
                },
                {
                    label: 'Date',
                    value: 'date'
                },
                {
                    label: 'Tuple',
                    value: 'tuple'
                },
                {
                    label: 'Object',
                    value: 'object'
                }
            ]
        }
    },
    {
        key: 'textarea',
        valueStateKey: 'yupTypeErrorMsg',
        renderConditions: [
            {
                key: 'yupType',
                value: 'not-null'
            }
        ],
        props: {
            style: {
                width: '100%'
            },
            placeholder: 'e.g. Value must be a string',
            inputLabel: 'Yup Type Error Message'
        }
    },
    ...getYupMethodArea(customState)
]

const mapper = (customState: any) => ({
    tab: [],
    input: [...getYupItems(customState)]
})

export interface IPropsAdvancedItems {
    component: string
    onStateChange: (key: string, value: any) => void
    customState: any
}

const AdvancedItems: React.FC<IPropsAdvancedItems> = ({component, onStateChange, customState}) => {
    const itemMapElement = mapper(customState)[component]

    const getValue = (customStateInner: any, item: any) => {
        let finalValue

        if (item.valueStateKey.includes('_')) {
            const fields = item.valueStateKey.split('_')
            const lastField = fields.at(-1)
            const methodField = fields.at(-2)

            finalValue = customStateInner.yup.param[methodField][lastField]

            return finalValue
        }

        if (item.valueStateKey === 'yupMethod') {
            finalValue = customStateInner?.yupMethods[item.index - 1]?.method || ''

            return finalValue
        }

        finalValue = customStateInner[item.valueStateKey]

        return finalValue
    }

    const getItems = () => {
        const currentItems =
            itemMapElement
                .filter(item => {
                    if (!item.renderConditions) return true

                    let result = false
                    item.renderConditions.forEach(condition => {
                        if (condition.key === 'yupMethod') {
                            const param = item.yupMethod

                            if (
                                (condition.value === 'not-null' &&
                                    customState.yupMethods?.findIndex((state: any) => state.method === param) !== -1) ||
                                (customState.yupMethods?.find((state: any) => state.method === param)?.method === condition.value)) result = true
                        }

                        if ((condition.value === 'not-null' && !!customState[condition.key]) || (customState[condition.key] === condition.value)) result = true
                    })


                    return result
                })
                .map((itemMapElementItem) => ({
                    ...itemMapElementItem,
                    render: items[itemMapElementItem.key].render,
                    props: {
                        ...itemMapElementItem.props,
                        onChange: (value: any) => (onStateChange(itemMapElementItem.valueStateKey, value)),
                        value: getValue(customState, itemMapElementItem)
                    }
                }))


        return currentItems || []
    }

    return (
        <>
            {getItems().map((item: any) => (
                <div className="layout-item">
                    {item.render(item.props)}
                </div>
            ))}
        </>
    )
}

export default AdvancedItems