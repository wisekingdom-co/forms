import { DatePicker } from 'antd'
import moment from 'moment'
import * as R from 'ramda'
import React from 'react'
import { DatePickerProps } from 'antd/lib/date-picker'
import { FieldRenderProps } from '../types'

const isNilOrEmpty = (value: any) => R.isNil(value) || R.isEmpty(value)

export type DateInputProps = Partial<FieldRenderProps> & DatePickerProps

export const DateInput: React.SFC<DateInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props
    return (
        <DatePicker
            {...componentProps}
            {...otherProps}
            disabled={disabled}
            onChange={date => date && form!.setFieldValue(field!.name, !isNilOrEmpty(date) ? date.toDate() : undefined)}
            style={{ display: 'block' }}
            value={!isNilOrEmpty(field!.value) ? moment(field!.value) : null}
        />
    )
}
