import { Select } from 'antd'
import React from 'react'
import { SelectProps as AntSelectProps } from 'antd/lib/select'
import { Store, AnyAction } from 'redux'

import { FieldRenderProps } from '../types'

export type SelectInputProps = Partial<FieldRenderProps> & AntSelectProps<any> & { store?: Store<any, AnyAction> }

export const SelectInput: React.SFC<SelectInputProps> = props => {
    const {
        field,
        form,
        required,
        label,
        error,
        isError,
        dirty,
        hidden,
        help,
        disabled,
        options,
        children,
        componentProps,
        index,
        parent,
        ...otherProps
    } = props

    return (
        <Select
            allowClear={!required}
            {...componentProps}
            {...field}
            {...otherProps}
        >
            {options!.map((option, optionIndex) => (
                <Select.Option key={optionIndex} value={option.value} disabled={option.disabled}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    )
}

SelectInput.defaultProps = {
    placeholder: 'กรุณาเลือก',
    required: false,
    options: [],
}
