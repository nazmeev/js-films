class UserinfoModule {
    constructor(domModule, authModule, elements) {
        this.host = 'http://localhost:3000';

        this.passwordInfo = document.querySelector(elements.passwordInfo);
        this.loginInfo = document.querySelector(elements.loginInfo);
        this.btnToggle = document.querySelector(elements.btnToggle);

        // this.notice = document.querySelector(elements.notice);
        this.btnBack = document.querySelector(elements.btnBack);

        this.textArray = ['Show Password', 'Hide Password'];

        this.dom = domModule;
        this.authModule = authModule;
    }

    initListeners(){
        this.btnBack.addEventListener('click', () => this.dom.showGalleryContainer(this.authModule.auth));
        this.btnToggle.addEventListener('click', () => this.togglePassword());
    }

    setText(area, text) {
        area.innerHTML = text;
    }
    setValue(area, value) {
        area.value = value;
    }

    togglePassword() {
        this.passwordInfo.type = (this.passwordInfo.type == 'password') ? 'text' : 'password';
        this.btnToggle.textContent = (this.passwordInfo.type == 'password') ? this.textArray[1] : this.textArray[0];
    }
    
    setUserInfo(data) {
        this.setText(this.loginInfo, data.login);
        this.setValue(this.passwordInfo, data.password);
    }

    async getUserInfo() {
        let url = this.host + '/user';
        let options = {
            method: 'GET'
        }
        await fetch(url, options)
            .then(responce => responce.json())
            .then(data => {
                this.setUserInfo(data)
            })
    }
}