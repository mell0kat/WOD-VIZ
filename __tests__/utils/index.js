import { calculate1RM } from '../../dist/src/utils/index'

describe('calculate1RM Function', () => {
	test('1 rep at 100 gives 100', () => {
	  expect(calculate1RM(1, 100)).toBe(100)
	})
	test('2 reps at 100 to be greater than 100', () => {
	  expect(calculate1RM(2, 100)).toBeGreaterThan(100)
	})
	test('can handle complex rep scheme', () => {
		expect(calculate1RM('1*[1,2,1]', 80)).toBeTruthy()
		expect(calculate1RM('1*[1,2,1]', 80)).toEqual(80)
		expect(calculate1RM('4*[1,2,1]', 80)).toBeGreaterThan(80)
	})
})
