import {v4} from 'uuid'

export function createTodo(title) {
    if (!title) {
        throw new Error('title is required')
    }
    return {
        title,
        completed: false,
        id: v4()
    }
}


export async function createTodoOnServer(title) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(createTodo(title))
    })
    if (!response.ok) throw new Error('Cannot create todo');

    return response.json();
}
