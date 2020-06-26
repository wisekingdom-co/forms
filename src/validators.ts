import moment from 'moment'
import * as R from 'ramda'
import validator from 'validator'
import { FormikProps } from 'formik'

type ValidateFunc = (value: any, formik: FormikProps<any>) => string

export function validateAll(funcs: ValidateFunc[]) {
    return (formik: FormikProps<any>) => (value: any) => {
        for (let i = 0; i < funcs.length; i++) {
            const result = funcs[i](value, formik)
            if (result) {
                return result
            }
        }
    }
}

export function isRequired(value: any, formik: FormikProps<any>) {
    if (R.isNil(value) || R.isEmpty(value)) {
        return 'จำเป็น'
    }
}

export function isEmail(value: any, formik: FormikProps<any>) {
    const isValid = validator.isEmail(value || '')
    if (!isValid) {
        return 'อีเมล์ไม่ถูกต้อง'
    }
}

export function isPhoneNumber(value: any, formik: FormikProps<any>) {
    const isValid = validator.isNumeric(value || '')
    if (!isValid) {
        return 'โปรดใส่ตัวเลข'
    }

    const isValidPhoneNumber = validator.isMobilePhone(value, 'th-TH')
    if (!isValidPhoneNumber) {
        return 'โปรดใส่เบอร์โทรศัพท์ 10 หลัก'
    }
}

export function isLength(option: validator.IsLengthOptions = {}) {
    return (value: any, formik: FormikProps<any>) => {
        if (R.isEmpty(value)) {
            return
        }

        const isValid = validator.isLength(value, option)
        let msg = ''
        if (option.min && option.max) {
            msg = `ต้องมีความยาว ${option.min}-${option.max} ตัวอักษร`
        } else {
            if (option.min) {
                msg = `ต้องมีความยาว ไม่น้อยกว่า ${option.min} ตัวอักษร`
            }
            if (option.max) {
                msg = `ต้องมีความยาว ไม่เกินกว่า ${option.max} ตัวอักษร`
            }
        }
        if (!isValid) {
            return msg
        }
    }
}

export function isFloat(option: validator.IsFloatOptions = {}) {
    return (value: any, formik: FormikProps<any>) => {
        if (R.isEmpty(value)) {
            return
        }

        const isValid = validator.isFloat(value, option)
        let msg = 'ต้องเป็นตัวเลข'
        if (option.min && option.max) {
            msg = msg + ` ${option.min}-${option.max}`
        } else {
            if (option.min) {
                msg = msg + ` ไม่น้อย ${option.min}`
            }
            if (option.max) {
                msg = msg + ` ไม่เกิน ${option.max}`
            }
        }
        if (!isValid) {
            return msg
        }
        return null
    }
}

export function isInt(option: validator.IsIntOptions = {}) {
    return (value: any, formik: FormikProps<any>) => {
        if (R.isEmpty(value)) {
            return
        }

        const isValid = validator.isInt(value, option)
        let msg = 'ต้องเป็นเลขจำนวนเต็ม'
        if (option.min && option.max) {
            msg = msg + ` ${option.min}-${option.max}`
        } else {
            if (option.min) {
                msg = msg + ` ไม่น้อย ${option.min}`
            }
            if (option.max) {
                msg = msg + ` ไม่เกิน ${option.max}`
            }
        }
        if (!isValid) {
            return msg
        }
        return null
    }
}

export const isMap = (value: any, formik: FormikProps<any>) => {
    const isValid = R.uniqBy(R.prop('key'))(value).length === (value || []).length
    if (!isValid) {
        return 'คีย์ต้องไม่ซ้ำกัน'
    }
    return null
}

export const isMapKey = (value: any, formik: FormikProps<any>) => {
    let isValid = /^[a-z0-9-_]+$/.test(value)
    if (!isValid) {
        return 'คีย์ต้องเป็น a-z,0-9,-,_'
    }
    isValid = validator.isLength(value, { min: 1, max: 16 })
    if (!isValid) {
        return 'คีย์ยาว 1-16 ตัวอักษร'
    }
    return null
}

interface IsValidDateOption {
    minDate?: Date
    maxDate?: Date
}

export const isDate = (option: IsValidDateOption = {}) => {
    return (value: any, formik: FormikProps<any>) => {
        if (R.isEmpty(value)) {
            return
        }
        if (!moment(value, 'DD/MM/YYYY').isValid) {
            return 'รูปแบบไม่ถูกต้อง'
        }

        const dateStr = value.toDateString()
        let msg = ''
        let isValid = true
        if (option.minDate && option.maxDate) {
            msg = `ต้องอยู่ในช่วงวันที่ ${option.minDate.toDateString()} - ${option.maxDate.toDateString()}`
            isValid =
                validator.isAfter(dateStr, option.minDate.toDateString()) &&
                validator.isBefore(dateStr, option.maxDate.toDateString())
        } else {
            if (option.maxDate) {
                msg = `ต้องไม่เกินวันที่ ${option.maxDate.toDateString()}`
                isValid = validator.isBefore(dateStr, option.maxDate.toDateString())
            }
            if (option.minDate) {
                msg = `ต้องไม่ก่อนวันที่ ${option.minDate.toDateString()}`
                isValid = validator.isAfter(dateStr, option.minDate.toDateString())
            }
        }
        if (!isValid) {
            return msg
        }
    }
}
