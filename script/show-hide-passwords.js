const pswrdFields = document.querySelectorAll("form .input-group input[type='password']");

for (let i = 0; i < pswrdFields.length; i++) {
    const input = pswrdFields[i], eye = input.nextElementSibling;

    eye.classList.add("d-none");

    input.addEventListener("input", () => {
        if (input.value.length > 0) {
            eye.classList.remove("d-none");
        } else {
            eye.classList.add("d-none");
        }
    })

    eye.addEventListener("click", () => {

        eye.classList.toggle("fa-eye")
        eye.classList.toggle("fa-eye-slash")

        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    })

}