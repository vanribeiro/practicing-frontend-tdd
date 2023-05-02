import fs from 'fs';
import path from 'path';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';

// 🤓 Tutorial can be read in this in the below link:
// 🌐 https://levelup.gitconnected.com/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-c4c89c9f5e56

const html = fs.readFileSync(path.resolve(__dirname, './../../index.html'), 'utf8');
let dom;
let container;

describe('index.html page', () => {

    beforeEach(() => {
        // 🔸Constructing a new JSDOM with this option is the key
        // 🔸to getting the code in the script tag to execute.
        // 🔸This is indeed dangerous and should only be done with trusted content.
        // 🔸https://github.com/jsdom/jsdom#executing-scripts

        dom = new JSDOM(html, { runScripts: 'dangerously' })
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

});