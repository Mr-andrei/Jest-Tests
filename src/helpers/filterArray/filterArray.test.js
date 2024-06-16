import {basketWithNoQuantity, filteredBasketWithQuantityOnly} from "../mocks/basket.mock";
import {filterArray} from "./filterArray";


const cb = jest.fn()
// const logSpy = jest.spyOn(console, 'log')

describe('filterArray', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should invoke provided callback as many time as the length of an array', () => {
        const arr = [1, 2, 3, 4]
        filterArray(arr, cb)
        expect(cb).toHaveBeenCalledTimes(4)
    })
    it('should not invoke callback when an array id empty', () => {
        filterArray([], cb)

        expect(cb).not.toHaveBeenCalled()
        // expect(logSpy).not.toHaveBeenCalled()
    })

    it('should filter an array using provided predicate', () => {
        const hasQuantity = (product) => product.qty > 0
        const result = filterArray(basketWithNoQuantity, hasQuantity)

        expect(result).toEqual(filteredBasketWithQuantityOnly)

        // expect(logSpy).toHaveBeenCalledTimes(basketWithNoQuantity.length)
    })
})
