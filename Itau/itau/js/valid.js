class ValidateForm {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFields = this.checkFields();

        if (checkFields) {
            alert('Formulário enviado.');
            this.formulario.submit(); 
            window.location.href="Parabens.html";
        }


    }

    checkFields() {
        let valid = true

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText

            if (!field.value) {
                this.createErro(field, `Campo "${label}" não pode estar em branco`)
                valid = false
            }

            if (field.classList.contains('cpf')) {
                if (!this.validateCPF(field)) valid = false
            }

            if (field.classList.contains('user')) {
                if (!this.validateUser(field)) valid = false
            }
        }
        return valid
    }

    validateUser(field) {
        const user = field.value
        let valid = true

        if (user.length < 3 || user.length > 12) {
            this.createErro(field, 'Usuario precisa ter entre 3 e 12 caracteres')
            valid = false
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createErro(field, 'Nome de usuario precisa conter apenas letras e numeros')
            valid = false
        }
        return valid
    }

    validateCPF(field) {
        const cpf = new ValidaCPF(field.value)

        if (!cpf.valida()) {
            this.createErro(field, 'CPF invalido')
            return false
        }

        return true
    }

    createErro(field, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        field.insertAdjacentElement('afterend', div)
    }

}

const validate = new ValidateForm()