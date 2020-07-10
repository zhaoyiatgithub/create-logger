'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isVariableName = exports.isString = exports.isObject = void 0
const constants_1 = require('./constants')
function isObject(target) {
	return Object.prototype.toString.call(target) === '[object Object]'
}
exports.isObject = isObject
function isString(target) {
	return typeof target === 'string'
}
exports.isString = isString
function isVariableName(target) {
	if (isString(target) && constants_1.variable_name_reg.test(target)) {
		return true
	}
	throw new Error(constants_1.variable_name_error_tip)
}
exports.isVariableName = isVariableName
