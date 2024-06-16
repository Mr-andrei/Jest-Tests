import {Input} from './Input.jsx'
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

const testPlaceholder = 'test placeholder'
describe('Input', () => {
    it('should render input', () => {

        render(<Input placeholder={testPlaceholder}/>)

        expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument()
    })
    it('should render input with correct type', () => {
        render(<Input placeholder={testPlaceholder} type='checkbox'/>)

        expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })
    it('should render input with correct class', () => {
        const {container} = render(<Input placeholder={testPlaceholder} containerClassName='containerClassName'/>)

        const containerEl = container.querySelector('.formControl.containerClassName')

        expect(containerEl).toBeInTheDocument()


    })
    it('should render input without label', () => {
        render(<Input placeholder={testPlaceholder}/>)

        expect(screen.queryByTestId('input-label')).not.toBeInTheDocument()
    })
    it('should render input with label', () => {
        render(<Input placeholder={testPlaceholder} label='inputLabel'/>)

        expect(screen.getByLabelText('inputLabel')).toBeInTheDocument()
    })
    it('should render input with correct value', () => {
        render(<Input placeholder={testPlaceholder} value='valueInput' onChange={jest.fn()}/>)

        expect(screen.getByDisplayValue('valueInput')).toBeInTheDocument()
    })
    it('should render input with on change', async () => {
        const onChange = jest.fn()
        render(<Input placeholder={testPlaceholder} value='valueInput' onChange={onChange}/>)

        const element = screen.getByPlaceholderText(testPlaceholder)

        // fireEvent.change(element, {target: {value: '12345'}})
        await userEvent.type(element, '12')

        expect(onChange).toHaveBeenCalledTimes(2)
    })
})
