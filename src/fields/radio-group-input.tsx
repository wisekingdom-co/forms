import { Radio } from 'antd'
import React from 'react'
import { RadioGroupProps as AntRadioGroupProps } from 'antd/lib/radio'
import styled from 'styled-components'
import { FieldRenderProps } from '../types'

export type RadioGroupInputProps = Partial<FieldRenderProps> & AntRadioGroupProps

export const RadioGroupInput: React.SFC<RadioGroupInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props

    return (
        <Radio.Group
            {...componentProps}
            {...otherProps}
            {...field}
            disabled={disabled}
            style={otherProps.style ? otherProps.style : { width: '100%' }}
            onChange={event => form!.setFieldValue(field!.name, event.target.value)}>
            <Flex>
                {options!.map((option, index) => (
                    <Radio key={index} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </Radio>
                ))}
            </Flex>
        </Radio.Group>
    )
}

RadioGroupInput.defaultProps = {
    options: [],
    placeholder: 'กรุณาเลือก',
}

const Flex = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
`
