function _isObject(target: any) {
	return Object.prototype.toString.call(target) === '[object Object]'
}

export function isName(target: any) {
	if (_isObject(target)) {
		return true
	} else {
		console.warn('name should be object with key "key" and "data"')
		return false
	}
}

export function isData(target: any) {
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

export function isSend(target: any) {
	if (typeof target === 'function') {
		return true
	} else {
		console.warn('send must be function')
		return false
	}
}

export function isField(target: any) {
	if (typeof target === 'string') {
		return true
	} else {
		console.warn('field must be string')
		return false
	}
}

export function isSBNtype(target: any) {
	if (['string', 'boolean', 'number'].includes(typeof target)) {
		return true
	} else {
		console.warn('value of data field must be string, boolean or number')
		return false
	}
}
