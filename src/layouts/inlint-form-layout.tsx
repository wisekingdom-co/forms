import { Form } from 'antd'
import { ColProps } from 'antd/lib/col'
import * as R from 'ramda'
import * as React from 'react'

import { FieldRenderProps } from '../types'

export interface InlineFormLayoutProps extends Partial<FieldRenderProps> {
    style?: React.CSSProperties
    labelCol?: ColProps
    wrapperCol?: ColProps
}

export const InlineFormLayout: React.SFC<InlineFormLayoutProps> = props => {
    const { labelCol, wrapperCol, style, ...childProps } = props

    let ChildComponent
    if (R.is(Function, props.children)) {
        ChildComponent = (props as any).children(childProps)
    } else {
        ChildComponent = React.cloneElement(props.children as any, childProps)
    }

    return (
        <Form.Item
            {...{ style, label: props.label, required: props.required, labelCol, wrapperCol }}
            validateStatus={props.isError ? 'error' : ""}
            help={props.isError ? props.error : props.help}
        >
            {ChildComponent}
        </Form.Item>
    )
}

InlineFormLayout.defaultProps = {
    labelCol: { sm: 8 },
    wrapperCol: { sm: 8 },
}
