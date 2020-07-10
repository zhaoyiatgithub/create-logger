import { createLogger } from '../main'
import { actionMap } from '../mock/actionMap'
import { traceMap } from '../mock/traceMap'

describe('test logger key', () => {
	const logger = createLogger({
		action: {
			keys: actionMap,
			send: (key: string, data: any) => {
				expect(key).toBe('order_mask_show')
				expect(data).toEqual({
					field_string: 'string2',
					field_boolean: true,
					field_number: 2,
				})
				console.log(key, data)
			},
		},
		trace: {
			keys: traceMap,
			send: (key: string, data: any) => {
				console.log(key, data)
			},
		},
	})

	it('should logger action key can set', () => {
		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.set('field_boolean', true)
		logger.action.order_mask_show.set('field_number', 1)

		const data = logger.action.order_mask_show.getData()

		expect(data).toEqual({
			field_string: 'string',
			field_boolean: true,
			field_number: 1,
		})
	})

	it('should logger action key can get', () => {
		expect(logger.action.order_mask_show.get('field_string')).toBe('string')
	})

	it('should logger action key can remove', () => {
		logger.action.order_mask_show.remove('field_string')
		expect(logger.action.order_mask_show.get('field_string')).toBe('')

		logger.action.order_mask_show.remove('field_boolean')
		expect(logger.action.order_mask_show.get('field_boolean')).toBe(false)

		logger.action.order_mask_show.remove('field_number')
		expect(logger.action.order_mask_show.get('field_number')).toBe(0)
	})

	it('remove not key', () => {
		logger.action.order_mask_show.set('field_string', 'string')
		logger.action.order_mask_show.remove('field_string1')
		expect(logger.action.order_mask_show.get('field_string')).toBe('string')
	})

	it('should logger action key can setData', () => {
		logger.action.order_mask_show.setData({
			field_string: 'string2',
			field_boolean: true,
			field_number: 2,
		})

		const data = logger.action.order_mask_show.getData()

		expect(data).toEqual({
			field_string: 'string2',
			field_boolean: true,
			field_number: 2,
		})
	})

	it('should logger action key can getData', () => {
		const data = logger.action.order_mask_show.getData()

		expect(data).toEqual({
			field_string: 'string2',
			field_boolean: true,
			field_number: 2,
		})
	})

	it('should logger action key can clear', () => {
		logger.action.order_mask_show.clear()
		const data = logger.action.order_mask_show.getData()

		expect(data).toEqual({
			field_string: '',
			field_boolean: false,
			field_number: 0,
		})
	})

	it('should logger action key can send', () => {
		logger.action.order_mask_show.setData({
			field_string: 'string2',
			field_boolean: true,
			field_number: 2,
		})
		logger.action.order_mask_show.send()
		const data = logger.action.order_mask_show.getData()

		expect(data).toEqual({
			field_string: '',
			field_boolean: false,
			field_number: 0,
		})
	})
})
