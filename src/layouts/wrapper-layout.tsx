import { Form } from 'antd'
import { getIn } from 'formik'
import * as R from 'ramda'
import React from 'react'

import { FieldRenderProps } from '../types'

export interface WrapperLayoutProps extends Partial<FieldRenderProps> { }

const WrapperLayout: React.SFC<WrapperLayoutProps> = props => {
    const { form, field, dirty } = props
    let ChildComponent
    if (R.is(Function, props.children)) {
        ChildComponent = (props as any).children(props)
    } else {
        ChildComponent = React.cloneElement(props.children as any, props)
    }

    const error = getIn(form!.errors, field!.name)
    const isError = typeof error === 'string' && dirty

    return (
        <Form.Item
            help={isError ? error : null}
            validateStatus={isError ? 'error' : ""}>
            {ChildComponent}
        </Form.Item>
    )
}

export { WrapperLayout }
