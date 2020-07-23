class ModalFormModule {
    constructor(elements) {
        this.formAddItem = document.querySelector(elements.modalForm);
    }

    fillModalForm(item) {
        if (typeof item != 'object') return false;
        Object.keys(item).forEach(key => {
            // if(key != 'id') {
            document.querySelector(`input[name="${key}"]`).value = item[key]
            // }
        })
    }

    getData(formObj) {
        let formData = new FormData(formObj);
        var object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        return object;
    }

    clearModalForm(form) {
        let fields = form.getElementsByTagName("input");
        let listFields = [...fields]; //Array.from(fields) // querySelector
        listFields.forEach(element => element.value = '')
    }
}

