import { Form } from 'antd'
import * as R from 'ramda'
import * as React from 'react'
import { FieldRenderProps } from '../types'

export interface HFormLayoutProps extends Partial<FieldRenderProps> {
    nolabel?: boolean
    style?: React.CSSProperties
}

const HFormLayout: React.SFC<HFormLayoutProps> = props => {
    const { nolabel, style, ...childProps } = props
    let ChildComponent
    if (R.is(Function, props.children)) {
        ChildComponent = (props as any).children(childProps)
    } else {
        ChildComponent = React.cloneElement(props.children as any, childProps)
    }

    return (
        <Form.Item
            {...{ style, label: nolabel ? null : props.label, required: props.required }}
            validateStatus={props.isError ? 'error' : ""}
            help={props.isError ? props.error : props.help}
        >
            {ChildComponent}
        </Form.Item>
    )
}

export { HFormLayout }
