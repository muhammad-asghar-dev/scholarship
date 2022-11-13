const form = document.querySelector("form");
const inputs = form.querySelectorAll(".input-group input[type='password']");
const error = form.querySelector('.input-group input[type] ~i~.invalid-input-error')

const input1 = inputs[0], input2 = inputs[1];

function checkInputValues() {
    if (input1.value === input2.value) {
        error.classList.add("d-none");
        return true;
    } else {
        error.classList.remove("d-none");
        return false;
    }
}

input2.addEventListener("input", checkInputValues)

form.addEventListener("submit", (e) => {
    if (!checkInputValues()) {
        e.preventDefault();
    }
})