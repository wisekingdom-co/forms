import React from 'react'
import * as R from 'ramda'
import { FieldArray as FormikFieldArray, connect, getIn } from 'formik'

import { FieldComponentProps, FieldProps } from './types'
import { getDynamicFunctionResult } from './helper'

const FieldArrayComponent: React.SFC<FieldComponentProps> = props => {
    const { children, formik, validators, disabled, hidden, required, label, componentProps, ...otherProps } = props

    let name = props.name
    if (props.parent && !R.isNil(props.index)) {
        name = `${props.parent}.${props.index}.${props.name}`
    } else if (props.parent) {
        name = `${props.parent}.${props.name}`
    }
    
    const value = getIn(formik.values, name!)
    const labelResult = getDynamicFunctionResult(label ,value, formik)
    const disabledResult = getDynamicFunctionResult(disabled ,value, formik)
    const hiddenResult = getDynamicFunctionResult(hidden ,value, formik)
    const componentPropsResult = getDynamicFunctionResult(componentProps ,value, formik)
    const requiredResult = typeof required === 'function'
        ? required(value, formik)
        : (validators ? validators.some(v => v.name === 'isRequired'): false)

    const dirty = formik.dirty
    const error = getIn(formik.errors, name)
    const isError = typeof error === 'string' && dirty

    return (
        <FormikFieldArray name={props.name}>
            {(renderProps) => {
                const childProps = {
                    value,
                    label: labelResult,
                    required: requiredResult,
                    disabled: disabledResult,
                    hidden: hiddenResult,
                    componentProps: componentPropsResult,
                    dirty,
                    error,
                    isError,
                    ...otherProps,
                    ...renderProps,
                } as any

                if (typeof props.children === 'function') {
                    return (props as any).children(childProps)
                } else {
                    return React.cloneElement(props.children as any, childProps)
                }
            }}
        </FormikFieldArray>
    )
}

export const FieldArray = connect<FieldProps>(FieldArrayComponent)
