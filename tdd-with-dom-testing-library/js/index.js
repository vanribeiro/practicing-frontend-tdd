const button = document.querySelector('button');
const input = document.querySelector('input');

input.addEventListener('input', removeButtonDisabled);
button.addEventListener('click', printUsername);

function removeButtonDisabled(event) {
    const target = event.target;
    target.value.length >= 3  
    ? button.removeAttribute('disabled')
    : button.setAttribute('disabled', 'true');
}

function printUsername() {
    const printer = document.querySelector('.print-username');

    printer.innerHTML = input.value;
    return printer.textContent;
}

export {
    printUsername
}