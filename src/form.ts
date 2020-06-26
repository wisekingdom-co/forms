import * as R from 'ramda'
import { FormikProps } from 'formik'

import { isMap } from './validators'

export const getInitialValues = (schema: any) => {
    const initialValues = {} as { [name: string]: any }

    Object.keys(schema).forEach(key => {
        if (!R.isNil(schema[key].defaultValue)) {
            initialValues[key] = schema[key].defaultValue
        }
    })
    return initialValues
}

export const arrayToMap = (values: { key: string; value: string }[]) => {
    const result = {} as { [name: string]: any }
    values.forEach(item => {
        result[item.key] = item.value
    })
    return result
}

export const mapToArray = (value: { [key: string]: string }, formik: FormikProps<any>) => {
    if (R.isNil(value) || R.isEmpty(value)) {
        return []
    }

    return Object.keys(value).map(key => {
        return { key, value: value[key], readonly: true }
    })
}

export const mapFormValidate = (field: string) => (value: any, formik: FormikProps<any>) => {
    const errors: any = {}
    if (value[field]) {
        const inValid = isMap(value[field], formik)
        if (inValid) {
            errors[field] = inValid
        }
    }
    return errors
}
