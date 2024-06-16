import {Form} from './Form.jsx'
import {fireEvent, render, waitFor} from "@testing-library/react";


describe('Form', () => {
    it('should render form with children', () => {
        const {container, getByTestId} = render(
            <Form>
                <div data-testid='child'/>
            </Form>
        )
        expect(getByTestId('child')).toBeInTheDocument()
        expect(container.querySelector('form')).toBeInTheDocument()
    })
    it('should render form with submit', () => {
        const onChange = jest.fn()
        const {container} = render(<Form onSubmit={onChange}/>)

        const form = container.querySelector('form')
        fireEvent.submit(form)

        expect(onChange).toBeCalledTimes(1)
    })
    it('should render form with onSuccess', async () => {
        const onSuccess = jest.fn()
        const {container} = render(<Form onSubmit={jest.fn()} onSuccess={onSuccess}/>)

        const form = container.querySelector('form')
        fireEvent.submit(form)

        await waitFor(() => {
            expect(onSuccess).toBeCalledTimes(1)
        })
    })
    it('should render form with onError', async () => {
        const onError = jest.fn()
        const {container} = render(<Form onSubmit={() => Promise.reject()} onError={onError}/>)

        const form = container.querySelector('form')
        fireEvent.submit(form)

        await waitFor(() => {
            expect(onError).toBeCalledTimes(1)
        })
    })


})
