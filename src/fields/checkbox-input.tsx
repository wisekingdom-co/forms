import { Checkbox } from 'antd'
import React from 'react'
import { CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox'
import { FieldRenderProps } from '../types'

export type CheckboxInputProps = Partial<FieldRenderProps> & AntCheckboxProps

export const CheckboxInput: React.SFC<CheckboxInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props

    return (
        <Checkbox
            {...componentProps}
            {...otherProps}
            {...field}
            disabled={disabled}
            defaultChecked={field!.value}
            onChange={event => form!.setFieldValue(field!.name, event.target.checked)}
        ></Checkbox>
    )
}
