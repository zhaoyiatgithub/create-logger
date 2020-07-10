import { variable_name_reg, variable_name_error_tip } from './constants'

export function isObject(target: any) {
	return Object.prototype.toString.call(target) === '[object Object]'
}

export function isString(target: any) {
	return typeof target === 'string'
}

export function isVariableName(target: any) {
	if (isString(target) && variable_name_reg.test(target)) {
		return true
	}
	throw new Error(variable_name_error_tip)
}
