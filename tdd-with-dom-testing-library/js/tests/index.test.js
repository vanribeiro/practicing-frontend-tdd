/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';
import serialize from '../../my-custom-dom-serializer';

let container;


const isTheSameLength = (element, value) => element.value === value;
const removeDisabledFromButton = (input, button) => input.value.length >= 3 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'true');

describe('index.html page', () => {


    beforeAll(async () => {
        // 🔸Constructing a new JSDOM with this option is the key
        // 🔸to getting the code in the script tag to execute.
        // 🔸This is indeed dangerous and should only be done with trusted content.
        // 🔸https://github.com/jsdom/jsdom#executing-scripts
        let dom = await serialize();
        container = dom.window.document.body;
    });

    test('should render a form', () => {
        expect(container.querySelector('form')).toBeInTheDocument();
    });
    

    test('should have the input username as required', () => {
        expect(container.querySelector('#username')).toBeRequired();
    });

    test('should have the printer to display username', () => {
        expect(container.querySelector('.print-username')).toBeInTheDocument();
    });

    test('should have a button with text Print Username', () => {
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toBe('Print Username');
    })

    test('should have a disabled button and to have button attribute type="button"', () => {
        const button = container.querySelector('button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('disabled');
    });
    
    test('should the input value as "snoopy" username', () => {
        const form = container.querySelector('form');
        const input = container.querySelector('input');
        input.value = 'snoopy';

        expect(form).toHaveFormValues({
            username: 'snoopy'
        });
    });

    test('should call input event when the input value has 03 or more characters ', () => {
        const input = container.querySelector('input');
        const handleInput = jest.fn();
        input.addEventListener('input', handleInput);
        fireEvent.input(input, { target: { value: 'sno' }});
        expect(isTheSameLength(input, 'sno')).toBe(true);
    });

    test('should enable button to be clickable when the input value has 03 or more characters ', () => {
        const input = container.querySelector('input');
        const button = container.querySelector('button');

        const handleInput = jest.fn(removeDisabledFromButton(input, button));
        input.addEventListener('input', handleInput);
        fireEvent.input(input, { target: { value: 'sno' }});
        
        expect(button).not.toBeDisabled();
    });

    test('should display username when button is clicked ', () => {
        const input = container.querySelector('input');
        const button = container.querySelector('button');
        const printer = container.querySelector('.print-username');

        const handleInput = jest.fn(removeDisabledFromButton(input, button));
        input.addEventListener('input', handleInput);
        fireEvent.input(input, { target: { value: 'sno' }});

        fireEvent.click(button);
        printer.innerHTML = 'sno';
        expect(printer.innerHTML).toBe('sno');
    });

});