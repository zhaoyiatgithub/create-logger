import { createLogger } from '../index'

const mockActionSend = jest.fn((key: string, data: any) => {
	console.log(key, data)
})
const mockTraceSend = jest.fn((key: string, data: any) => {
	console.log(key, data)
})
function getDefaultActionLogger() {
	const logger = createLogger({
		action: {
			names: {
				order_mask_show: {
					key: 'order_mask_show',
					data: {
						field_string: '',
						field_boolean: false,
						field_number: 0,
					},
				},
			},
			send: mockActionSend,
		},
	})

	return logger
}

function getDefaultTraceLogger() {
	const logger = createLogger({
		trace: {
			names: {
				order_mask_hide: {
					key: 'order_mask_hide',
					data: {
						field_string: '',
						field_boolean: false,
						field_number: 0,
					},
				},
			},
			send: mockTraceSend,
		},
	})

	return logger
}

describe('代码健壮性测试', () => {
	test('使用不合法的action', () => {
		let errorResult
		try {
			const logger = createLogger({
				//@ts-ignore
				action: 'error',
			})
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('使用不合法的trace', () => {
		let errorResult
		try {
			const logger = createLogger({
				//@ts-ignore
				trace: 'error',
			})
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('使用不合法的action data', () => {
		let errorResult
		try {
			const logger = createLogger({
				action: {
					names: {
						order_mask_show: {
							//@ts-ignore
							data: true,
						},
					},
				},
			})
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('使用不合法的trace data', () => {
		let errorResult
		try {
			const logger = createLogger({
				trace: {
					names: {
						order_mask_hide: {
							//@ts-ignore
							data: true,
						},
					},
				},
			})
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('使用不合法的send', () => {
		let errorResult
		try {
			const logger = createLogger({
				//@ts-ignore
				action: {
					names: {
						//@ts-ignore
						order_mask_show: 'string',
					},
					//@ts-ignore
					send: true,
				},
			})
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('获取单条数据时传入非法的字段名', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.set('field_boolean', true)
		logger.action.order_mask_show.set('field_number', 1)

		let errorResult
		try {
			//@ts-ignore
			expect(logger.action.order_mask_show.get(1)).toBeUndefined()
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('插入单条数据时传入非法的值', () => {
		const logger = getDefaultActionLogger()

		let errorResult
		try {
			//@ts-ignore
			logger.action.order_mask_show.set('field_string', {})
		} catch (error) {
			errorResult = error
		}

		expect(errorResult).toBeUndefined()
	})
	test('删除单条时传入不存在的键值', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.set('field_boolean', true)
		logger.action.order_mask_show.set('field_number', 1)

		expect(logger.action.order_mask_show.get('field_string')).toBe('string')
		expect(logger.action.order_mask_show.get('field_boolean')).toBe(true)
		expect(logger.action.order_mask_show.get('field_number')).toBe(1)

		logger.action.order_mask_show.remove('field_string1')
		expect(logger.action.order_mask_show.get('field_string')).toBe('string')
	})
})

describe('Action功能性测试', () => {
	test('插入单条数据测试', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.set('field_boolean', true)
		logger.action.order_mask_show.set('field_number', 1)

		expect(logger.action.order_mask_show.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('获取单条数据测试', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.set('field_boolean', true)
		logger.action.order_mask_show.set('field_number', 1)

		expect(logger.action.order_mask_show.get('field_string')).toBe('string')
		expect(logger.action.order_mask_show.get('field_boolean')).toBe(true)
		expect(logger.action.order_mask_show.get('field_number')).toBe(1)
	})

	test('移除单条数据测试', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.set('field_boolean', true)
		logger.action.order_mask_show.set('field_number', 1)

		expect(logger.action.order_mask_show.get('field_string')).toBe('string')
		expect(logger.action.order_mask_show.get('field_boolean')).toBe(true)
		expect(logger.action.order_mask_show.get('field_number')).toBe(1)

		logger.action.order_mask_show.remove('field_string')
		logger.action.order_mask_show.remove('field_boolean')
		logger.action.order_mask_show.remove('field_number')

		expect(
			logger.action.order_mask_show.get('field_string')
		).toBeUndefined()
		expect(
			logger.action.order_mask_show.get('field_boolean')
		).toBeUndefined()
		expect(
			logger.action.order_mask_show.get('field_number')
		).toBeUndefined()
	})

	test('插入数据测试', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.action.order_mask_show.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('获取数据测试', () => {
		const logger = getDefaultActionLogger()
		logger.action.order_mask_show.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.action.order_mask_show.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('移除数据测试', () => {
		const logger = getDefaultActionLogger()
		logger.action.order_mask_show.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.action.order_mask_show.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		logger.action.order_mask_show.clear()

		expect(logger.action.order_mask_show.getData()).toEqual({})
	})

	test('发送测试', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		logger.action.order_mask_show.send()

		expect(logger.action.order_mask_show.getData()).toEqual({})
		expect(mockActionSend.mock.calls[0][0]).toBe('order_mask_show')
		expect(mockActionSend.mock.calls[0][1]).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('发送测试 send 传参', () => {
		const logger = getDefaultActionLogger()

		logger.action.order_mask_show.send({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.action.order_mask_show.getData()).toEqual({})
		expect(mockActionSend.mock.calls[0][0]).toBe('order_mask_show')
		expect(mockActionSend.mock.calls[0][1]).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})
})

describe('Trace功能性测试', () => {
	test('插入单条数据测试', () => {
		const logger = getDefaultTraceLogger()

		logger.trace.order_mask_hide.set('field_string', 'string')
		logger.trace.order_mask_hide.set('field_boolean', true)
		logger.trace.order_mask_hide.set('field_number', 1)

		expect(logger.trace.order_mask_hide.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('获取单条数据测试', () => {
		const logger = getDefaultTraceLogger()

		logger.trace.order_mask_hide.set('field_string', 'string')
		logger.trace.order_mask_hide.set('field_boolean', true)
		logger.trace.order_mask_hide.set('field_number', 1)

		expect(logger.trace.order_mask_hide.get('field_string')).toBe('string')
		expect(logger.trace.order_mask_hide.get('field_boolean')).toBe(true)
		expect(logger.trace.order_mask_hide.get('field_number')).toBe(1)
	})

	test('移除单条数据测试', () => {
		const logger = getDefaultTraceLogger()

		logger.trace.order_mask_hide.set('field_string', 'string')
		logger.trace.order_mask_hide.set('field_boolean', true)
		logger.trace.order_mask_hide.set('field_number', 1)

		expect(logger.trace.order_mask_hide.get('field_string')).toBe('string')
		expect(logger.trace.order_mask_hide.get('field_boolean')).toBe(true)
		expect(logger.trace.order_mask_hide.get('field_number')).toBe(1)

		logger.trace.order_mask_hide.remove('field_string')
		logger.trace.order_mask_hide.remove('field_boolean')
		logger.trace.order_mask_hide.remove('field_number')

		expect(logger.trace.order_mask_hide.get('field_string')).toBeUndefined()
		expect(
			logger.trace.order_mask_hide.get('field_boolean')
		).toBeUndefined()
		expect(logger.trace.order_mask_hide.get('field_number')).toBeUndefined()
	})

	test('插入数据测试', () => {
		const logger = getDefaultTraceLogger()

		logger.trace.order_mask_hide.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.trace.order_mask_hide.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('获取数据测试', () => {
		const logger = getDefaultTraceLogger()
		logger.trace.order_mask_hide.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.trace.order_mask_hide.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('移除数据测试', () => {
		const logger = getDefaultTraceLogger()
		logger.trace.order_mask_hide.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.trace.order_mask_hide.getData()).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		logger.trace.order_mask_hide.clear()

		expect(logger.trace.order_mask_hide.getData()).toEqual({})
	})

	test('发送测试', () => {
		const logger = getDefaultTraceLogger()

		logger.trace.order_mask_hide.setData({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		logger.trace.order_mask_hide.send()

		expect(logger.trace.order_mask_hide.getData()).toEqual({})
		expect(mockTraceSend.mock.calls[0][0]).toBe('order_mask_hide')
		expect(mockTraceSend.mock.calls[0][1]).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	test('发送测试 send 传参', () => {
		const logger = getDefaultTraceLogger()

		logger.trace.order_mask_hide.send({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})

		expect(logger.trace.order_mask_hide.getData()).toEqual({})
		expect(mockTraceSend.mock.calls[0][0]).toBe('order_mask_hide')
		expect(mockTraceSend.mock.calls[0][1]).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})
})
