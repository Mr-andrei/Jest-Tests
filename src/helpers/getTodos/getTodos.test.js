import axios from "axios";
import {getTodos} from "./getTodos";

const axiosSpy = jest.spyOn(axios, "get")
const errorSpy = jest.spyOn(console, "error")

describe('getTodos', () => {
    it('should return an empty array in case of error and print error to console', async () => {
        const errMessage = 'Network error'
        // axiosSpy.mockImplementationOnce(() => Promise.reject(errMessage))
        axiosSpy.mockRejectedValueOnce(errMessage)

        const result = await getTodos()
        expect(errorSpy).toHaveBeenCalledWith(errMessage)
        expect(result).toEqual([])
    })
    it('should return 200 todos', async () => {
        const result = await getTodos()

        expect(axiosSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos')
        expect(result).toHaveLength(200)
    })
})
