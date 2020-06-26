import { Field as FormikField, FieldProps as FormikFieldProps } from 'formik'
import * as R from 'ramda'
import React from 'react'

function getIn<T>(path: string, props: any) {
    return R.path<T>(R.split('.', path), props)
}

export interface ActionFieldProps {
    children?: ((props: FormikFieldProps<any>) => React.ReactNode) | React.ReactNode
}

export const ActionField: React.SFC<ActionFieldProps> = props => {
    const { children, ...otherProps } = props

    return (
        <FormikField>
            {(fieldProps: FormikFieldProps) => {
                const childProps = {
                    ...otherProps,
                    disabled: !fieldProps.form.dirty,
                }
                if (R.is(Function, props.children)) {
                    return (props as any).children(childProps)
                } else {
                    const isSubmitButton =
                        getIn('children.props.htmlType', props) === 'submit' || getIn('children.props.type', props) === 'submit'
                    const { isSubmitting, dirty, isValid } = fieldProps.form
                    const loading = isSubmitButton ? isSubmitting : false
                    const childrenComponent = getIn('children.props.children', props)
                    const disabled = !isValid ? true : isSubmitButton ? false : isSubmitting || !dirty
                    const content = isSubmitButton && isSubmitting ? 'กำลัง' + childrenComponent : childrenComponent

                    return React.cloneElement(props.children as any, {
                        ...childProps,
                        children: content,
                        disabled: !R.isNil((props.children as any).props.disabled)
                            ? isSubmitting
                                ? true
                                : (props.children as any).props.disabled
                            : disabled,
                        loading,
                    })
                }
            }}
        </FormikField>
    )
}
