import {toLower} from './strings'

describe('strings', () => {
    describe('toLower', () => {
        it.each([
            {input: 'Ivan', expected: 'ivan'},
            {input: 'IVAN', expected: 'ivan'},
            {input: '', expected: ''},

        ])('should return $expected for $input', ({input, expected}) => {
            const result = toLower(input)
            expect(result).toBe(expected)
        })
    })
})
