import {fireEvent, screen} from "@testing-library/react";

import {fork} from "effector";
import {
    $email,
    $isDisabled,
    $password,
    isDisabledChanged,
    loginChanged,
    passwordChanged,
    submit
} from "./Login.module.js";
import {Login} from "./Login.jsx";
import {componentRender} from "../../helpers/ComponentRender/ComponentRender.jsx";
import {userEvent} from "@testing-library/user-event";


const selectors = {
    email: async () => screen.findByPlaceholderText('email'),
    password: async () => screen.findByPlaceholderText('password'),
    submit: async () => await screen.getByText('Send'),
    text: async () => screen.getByText('Lorem ipsum'),
    disableButton: async () => screen.getByTestId('disabled'),
};


describe('Login', () => {

    it('should render form with all tags', async () => {
        const scope = fork();
        componentRender(<Login/>, {scope});

        const email = await selectors.email();
        const password = await selectors.password();
        const submit = await selectors.submit();
        const text = await selectors.text();
        const disableButton = await selectors.disableButton();

        expect(email).not.toBeDisabled();
        expect(password).not.toBeDisabled();
        expect(submit).not.toBeDisabled();
        expect(submit).not.toBeDisabled();

        expect(email).toHaveValue('');
        expect(password).toHaveValue('');
        expect(submit).toHaveTextContent('Send');
        expect(text).toHaveTextContent('Lorem ipsum');
        expect(disableButton).toHaveTextContent('submit');
    })

    it('render with state', async () => {
        const scope = fork({
            values: new Map().set($email, 'example@domain.dev').set($password, 'qweasd123'),
        });
        componentRender(<Login/>, {scope});

        const email = await selectors.email();
        const password = await selectors.password();

        expect(email).toHaveValue('example@domain.dev');
        expect(password).toHaveValue('qweasd123');
    })

    it('render disabled items', async () => {
        const scope = fork({
            values: new Map().set($isDisabled, true),
        });
        componentRender(<Login/>, {scope});

        const email = await selectors.email();
        const password = await selectors.password();
        const submit = await selectors.submit();
        const disableButton = await selectors.disableButton();

        expect(email).toBeDisabled();
        expect(password).toBeDisabled();
        expect(submit).toBeDisabled();
        expect(disableButton).toHaveTextContent('disabled')
    })


    describe('events', () => {
        const submitFn = jest.fn()
        submit.watch(submitFn)

        const changeEmailFn = jest.fn()
        loginChanged.watch(changeEmailFn)

        const passwordChangeFn = jest.fn()
        passwordChanged.watch(passwordChangeFn)

        const isDisabledChangedFn = jest.fn()
        isDisabledChanged.watch(isDisabledChangedFn)

        beforeEach(() => {
            submitFn.mockReset();
            changeEmailFn.mockReset();
            passwordChangeFn.mockReset();
            isDisabledChangedFn.mockReset();
        });

        it('default page', () => {
            const scope = fork({});
            componentRender(<Login/>, {scope});

            expect(submitFn).toHaveBeenCalledTimes(0)
            expect(changeEmailFn).toHaveBeenCalledTimes(0)
            expect(passwordChangeFn).toHaveBeenCalledTimes(0)
            expect(isDisabledChangedFn).toHaveBeenCalledTimes(0)
        })

        it('click submit', async () => {
            const scope = fork({});
            componentRender(<Login/>, {scope});
            submitFn.mockImplementationOnce(e => e.preventDefault())

            const submit = await selectors.submit();
            await userEvent.click(submit)

            expect(submitFn).toHaveBeenCalledTimes(1)
            expect(changeEmailFn).toHaveBeenCalledTimes(0)
            expect(passwordChangeFn).toHaveBeenCalledTimes(0)
            expect(isDisabledChangedFn).toHaveBeenCalledTimes(0)
        })


        it('emailChange', async () => {
            const scope = fork({});
            componentRender(<Login/>, {scope});

            const email = await selectors.email();
            await userEvent.type(email, 'qwe')

            expect(submitFn).toHaveBeenCalledTimes(0)
            expect(changeEmailFn).toHaveBeenCalledTimes(3)
            expect(passwordChangeFn).toHaveBeenCalledTimes(0)
            expect(isDisabledChangedFn).toHaveBeenCalledTimes(0)
        })
        // it('password Change', async () => {
        //     const scope = fork({});
        //     componentRender(<Login/>, {scope});
        //
        //     const password = await selectors.password();
        //      fireEvent.change(password, { target: { value: 'demo' } })
        //
        //     expect(submitFn).toHaveBeenCalledTimes(0)
        //     expect(changeEmailFn).toHaveBeenCalledTimes(0)
        //     expect(passwordChangeFn).toHaveBeenCalledTimes(1)
        //     expect(isDisabledChangedFn).toHaveBeenCalledTimes(0)
        // })


    })

})
