document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    function displayError(err) {
        const error = document.getElementById('error');

        error.textContent = err;
        error.style.removeProperty('display');
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const txt = document.querySelector('textarea').value;
        if(!txt.includes(" ") || txt.length < 10) {
            displayError("Unsufficient description");
            return;
        }

        const mail = document.querySelector('input[type="email"]').value;
        console.log(mail);
    });
})