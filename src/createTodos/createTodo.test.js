import {createTodo, createTodoOnServer} from "./createTodo";

const mockTodo = {
    title: 'titleMockTodo',
    completed: false,
    id: 'id'
}

const mockedV4 = jest.fn(() => 'id')

// мокаем вызов библиотеки
jest.mock('uuid', () => ({
    // ...jest.requireActual('uuid'),  // весь остальной функционал библиотеки будет работать,
    // кроме функции v4, эта фукнция будет работать так как мы ожидаем
    v4: () => mockedV4()
}))

// эта функция будет вызываться каждый раз когда будет отрабатывать fetch.
// и фетч будет резолвится с данными которые мы замокали

global.fetch = jest.fn(() => Promise.resolve(
    {
        ok: true,
        json: () => Promise.resolve(mockTodo)
    }
))

describe('createTodo', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return todo object', () => {
        const title = 'todoTitle'
        const expectedResult = {
            title,
            completed: false,
            id: 'id'
        }
        const result = createTodo(title)

        expect(mockedV4).toHaveBeenCalledTimes(1)
        expect(result).toEqual(expectedResult)

    })

    it('createTodo check on title', () => {
        const fnToThrow = () => createTodoOnServer()


        expect(fnToThrow).rejects.toThrow('title is required')
    })

    it('should return created data', async () => {
        const result = await createTodoOnServer('titleMockTodo')

        expect(result).toEqual(mockTodo)
        expect(fetch).toHaveBeenCalledTimes(1)

    })

    it('should return error', async () => {
        //  мы разово говорим что фетч будет вызван с ошибкой
        fetch.mockRejectedValueOnce('Error message')

        // ожидаем вызова функции  createTodoOnServer и то что она будет rejected c ошибкой Error message
        await expect(createTodoOnServer('titleMockTodo')).rejects.toMatch('Error message')
    })

    it('should throw error when response not ok', async () => {
        fetch.mockResolvedValueOnce({ok: false})

        const fnToThrow = () => createTodoOnServer('titleMockTodo')
        await expect(fnToThrow).rejects.toThrow('Cannot create todo')
    })
})
