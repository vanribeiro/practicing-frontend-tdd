const button = document.querySelector('button');
const input = document.querySelector('input');

input.addEventListener('input', (event) => removeDisabledFromButton(event.target, button));
button.addEventListener('click', printUsername);

function removeDisabledFromButton(input, button) {
    input.value.length >= 3  
    ? button.removeAttribute('disabled')
    : button.setAttribute('disabled', 'true');
}

function printUsername() {
    const printer = document.querySelector('.print-username');
    printer.innerHTML = input.value;
    return printer.textContent;
}

export {
    printUsername,
    removeDisabledFromButton
}