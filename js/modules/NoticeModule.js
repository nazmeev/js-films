class NoticeModule {
    constructor(domModule, elements) {
        this.notice = document.querySelector(elements.noticeModal);
        this.error = '';

        this.dom = domModule;
    }

    uniqErrors(array) {
        let promArray = [];
        array.forEach(element => {
            if (!promArray.includes(element)) promArray.push(element)
        });
        return promArray;
    }
    
    set setError(errors) {
        if(errors.length > 0){
            let listErrors = errors.map((item) => item.error)
            this.error = this.uniqErrors(listErrors)
        }
    }

    hideNotice() {
        this.notice.innerHTML = '';
        this.dom.hideElement(this.notice);
    }
    showNotice() {
        this.notice.innerHTML = this.error;
        this.dom.showElement(this.notice);
    }
}
