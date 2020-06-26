import { Store } from 'redux'
import { FieldProps as FormikFieldProps, FormikProps } from 'formik'

export type DynamicFunction<ReturnType, ValueType> = ((value: any, formik: FormikProps<ValueType>) => ReturnType) | ReturnType

export type OptionType = {
    value: any
    label: string
    disabled?: boolean
}

export interface FieldSchema<T> {
    name: string
    label?: DynamicFunction<string, T>
    help?: string
    placeholder?: string
    validators?: ((value: any, formik: FormikProps<T>) => string)[]
    options?: OptionType[]
    required?: DynamicFunction<boolean, T>
    hidden?: DynamicFunction<boolean, T>
    disabled?: DynamicFunction<boolean, T>
    componentProps?: DynamicFunction<any, T>

    onDepend?: (options: { form: FormikProps<T>; name: string; index: number; parent: string }) => string[]
    onLoad?: (filter: any, options: { form: FormikProps<T>; store: Store; name: string; index: number; parent: string }) => Promise<any[]>
    onLoadLabel?: (value: any, options: { form: FormikProps<T>; store: Store; name: string; index: number; parent: string }) => Promise<string>
}

export type FormSchema<T> = {
    [name in keyof T]: Partial<FieldSchema<T>>
}

export interface FieldRenderProps extends Partial<FormikFieldProps>, Required<Omit<FieldSchema<any>, 'validators'>> {
    loading: boolean
    disabled: boolean
    hidden: boolean
    required: boolean
    dirty: boolean
    error: string
    isError: boolean
    componentProps: any

    index?: number
    parent?: string
}

export interface FieldProps<T = any> extends FieldSchema<T> {
    children?: ((props: FormikFieldProps<any>) => React.ReactNode) | React.ReactNode
    value?: any
    parent?: string
    index?: number
}

export interface FieldComponentProps<T = any> extends FieldProps<T> {
    formik: FormikProps<T>
}