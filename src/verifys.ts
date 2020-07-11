function _isObject(target: any) {
	return Object.prototype.toString.call(target) === '[object Object]'
}

export function isKey(target: any) {
	if (typeof target === 'string') {
		return true
	} else {
		console.error('key must be string')
		return false
	}
}

export function isKeyData(target: any) {
	if (
		_isObject(target) &&
		Object.values(target).every((_value) => isSBNtype(_value))
	) {
		return true
	} else {
		console.error(
			'data must be object and field is string, boolean or number'
		)
		return false
	}
}

export function isSend(target: any) {
	if (typeof target === 'function') {
		return true
	} else {
		console.error('send must be function')
		return false
	}
}

export function isField(target: any) {
	if (typeof target === 'string') {
		return true
	} else {
		console.error('field must be string')
		return false
	}
}

export function isSBNtype(target: any) {
	if (['string', 'boolean', 'number'].includes(typeof target)) {
		return true
	} else {
		console.error('value of data field must be string, boolean or number')
		return false
	}
}
