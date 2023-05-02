import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import { fireEvent, screen } from '@testing-library/dom';

let container;
let dom;

const readHtmlFile = async () => {
    const jsdom = await JSDOM.fromFile('index.html');
    return jsdom;
}

describe('index.html page', () => {


    beforeAll(async () => {
        // 🔸Constructing a new JSDOM with this option is the key
        // 🔸to getting the code in the script tag to execute.
        // 🔸This is indeed dangerous and should only be done with trusted content.
        // 🔸https://github.com/jsdom/jsdom#executing-scripts

        dom = new JSDOM(await readHtmlFile().then(htmlFile => htmlFile.serialize()));
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

    // test('should have a button with text Print Username', () => {
    //     expect(screen.findByText(/Print Username/i)).toBe(true);
    // })

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

    const isBiggerThanOrEqualThree = (element, value) => element.value === value;

    test('should call onInput when the input value has 03 or more characters ', () => {
        const input = container.querySelector('input');
        const handleInput = jest.fn();
        input.addEventListener('input', handleInput);
        fireEvent.input(input, { target: {value: 'sno'}});
        expect(isBiggerThanOrEqualThree(input, 'sno')).toBe(true);
    });

});