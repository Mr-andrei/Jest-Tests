import {createEffect, createEvent, createStore, sample} from "effector";
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:5000'
});

const sendUserDataApi = (data) => {
    return instance.post('login', data)
}

export const $email = createStore('')
export const $password = createStore('')
export const $isDisabled = createStore(false)

export const loginChanged = createEvent()
export const passwordChanged = createEvent()
export const submit = createEvent()
export const isDisabledChanged = createEvent()

const saveUserDataFx = createEffect(sendUserDataApi)


sample({
    clock: loginChanged,
    target: $email
})

sample({
    clock: passwordChanged,
    target: $password
})

sample({
    clock: isDisabledChanged,
    source: $isDisabled,
    fn: (isDisabled) => {
        return !isDisabled
    },
    target: $isDisabled
})
