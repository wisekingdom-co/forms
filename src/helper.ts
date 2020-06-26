

export function getDynamicFunctionResult(prop: any, value: any, formik: any, options?: any) {
    return typeof prop === 'function' ? prop(...[value, formik, options]) : prop
}

export function buildFieldName(name: string, parent?: string) {
    return parent ? `${parent}.${name}` : name
}