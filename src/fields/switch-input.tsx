import { Switch } from 'antd'
import { SwitchProps as AntSwitchProps } from 'antd/lib/switch'
import React from 'react'

import { FieldRenderProps } from '../types'

export type SwitchInputProps = Partial<FieldRenderProps> & AntSwitchProps

export const SwitchInput: React.SFC<SwitchInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props
    const { value, ...otherField } = field!
    return (
        <Switch
            {...componentProps}
            {...otherProps}
            {...otherField}
            defaultChecked={value}
            disabled={disabled}
            onChange={checked => form!.setFieldValue(field!.name, checked)}
        />
    )
}
