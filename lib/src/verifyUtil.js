'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isSBNtype = exports.isField = exports.isSend = exports.isData = exports.isName = exports._isObject = void 0
function _isObject(target) {
	return Object.prototype.toString.call(target) === '[object Object]'
}
exports._isObject = _isObject
function isName(target) {
	if (_isObject(target)) {
		return true
	} else {
		console.warn('name should be object with key "key" and "data"')
		return false
	}
}
exports.isName = isName
function isData(target) {
	if (
		_isObject(target) &&
		Object.values(target).every((_value) => isSBNtype(_value))
	) {
		return true
	} else {
		console.warn(
			'data must be object and typeof field is string, boolean or number'
		)
		return false
	}
}
exports.isData = isData
function isSend(target) {
	if (typeof target === 'function') {
		return true
	} else {
		console.warn('send must be function')
		return false
	}
}
exports.isSend = isSend
function isField(target) {
	if (typeof target === 'string') {
		return true
	} else {
		console.warn('field must be string')
		return false
	}
}
exports.isField = isField
function isSBNtype(target) {
	if (['string', 'boolean', 'number'].includes(typeof target)) {
		return true
	} else {
		console.warn('value of data field must be string, boolean or number')
		return false
	}
}
exports.isSBNtype = isSBNtype
