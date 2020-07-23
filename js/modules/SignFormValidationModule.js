class SignFormValidationModule {
    constructor() {
        this.request = {};
        this.error = '';
        this.errorsArray = ['Пустое поле не допустимо', 'Oшибка валидации Email', 'Логин не верно', 'Пароль не верно', 'Минимальная длинна 8', '401 (Unauthorized)', ' Невідома помилка'];
    }

    validateEmpty(value) {
        if (value.length > 0) return true;

        this.setErrorCode(0);
        return false;
    }
    validateLenght(value) {
        if (value.length > 9) return true;

        this.setErrorCode(4);
        return false;
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) return true;

        this.setErrorCode(1);
        return false;
    }
    validateServerResponce(status) {
        if (status == 200) return true;
        if (status == 401) {
            this.setErrorCode(5);
        } else {
            this.setErrorCode(6);
        }
        return false;
    }

    async validateAuth(data, form) {
        let url = form.getAttribute('action');
        let meth = form.getAttribute('method');
        let options = {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: meth,
            body: JSON.stringify(data)
        }

        await fetch(url, options).then(responce => {
            this.request = responce;
        })
    }

    async validationSignInForm(data, form) {
        if (!this.validateEmpty(data.login)) return false;
        if (!this.validateEmpty(data.password)) return false;
        if (!this.validateEmail(data.login)) return false;
        if (!this.validateLenght(data.password)) return false;

        await this.validateAuth(data, form);
        if (!this.validateServerResponce(this.request.status)) return false;

        return true;
    }

    validationOfData(object) {
        let errors = [];
        for (const property in object) {
            if (!this.validateEmpty(object[property])) {
                errors.push({
                    'key': property,
                    'error': this.getError()
                });
            }
        }
        return errors;
    }

    setErrorCode(error) {
        this.error = error;
    }
    getError() {
        let errorCode = this.error;
        this.error = '';
        return this.errorsArray[errorCode];
    }
}
