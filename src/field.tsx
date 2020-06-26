import React from 'react'
import * as R from 'ramda'
import { Field as FormikField, connect, getIn } from 'formik'

import { validateAll } from './validators'
import { FieldComponentProps, FieldProps, FieldRenderProps } from './types'
import { getDynamicFunctionResult } from './helper'

const FieldComponent: React.SFC<FieldComponentProps> = props => {
    const { children, formik, validators, disabled, hidden, required, label, componentProps, ...otherProps } = props
    const validateFunc = validators ? validateAll(validators)(formik!) : null
    
    let name = props.name
    if (props.parent && !R.isNil(props.index)) {
        name = `${props.parent}.${props.index}.${props.name}`
    } else if (props.parent) {
        name = `${props.parent}.${props.name}`
    }
    const value = getIn(formik.values, name)
    const labelResult = getDynamicFunctionResult(label, value, formik)
    const disabledResult = getDynamicFunctionResult(disabled, value, formik)
    const hiddenResult = getDynamicFunctionResult(hidden, value, formik, { name: props.name, index: props.index, parent: props.parent })
    const componentPropsResult = getDynamicFunctionResult(componentProps, value, formik)
    const requiredResult = typeof required === 'function'
            ? required(value, formik)
            : (validators ? validators.some(v => v.name === 'isRequired') : false)

    const dirty = formik.dirty && getIn(formik.values, name!) !== undefined
    const error = getIn(formik!.errors, name!)
    const isError = typeof error === 'string' && dirty

    return (
        <FormikField name={name} alidate={validateFunc}>
            {({ children, ...renderProps }: FieldProps) => {
                const childRenderProps = {
                    label: labelResult,
                    required: requiredResult,
                    disabled: disabledResult,
                    hidden: hiddenResult,
                    componentProps: componentPropsResult,
                    index: props.index,
                    parent: props.parent,
                    dirty,
                    error,
                    isError,
                    ...otherProps,
                    ...renderProps,
                } as FieldRenderProps

                if (typeof props.children === 'function') {
                    return (props as any).children(childRenderProps)
                } else {
                    return React.cloneElement(props.children as any, childRenderProps)
                }
            }}
        </FormikField>
    )
}

export const Field = connect<FieldProps>(FieldComponent)
