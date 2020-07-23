class SignFormModule {
    constructor(domModule, validationModule, galleryModule, userinfoModule, modalFormModule, authModule, elements) {

        this.formSignIn = document.querySelector(elements.form);
        
        this.menuExit = document.querySelector(elements.menuExit);
        this.menuGallery = document.querySelector(elements.menuGallery);
        this.menuAbout = document.querySelector(elements.menuAbout);

        this.notice = document.querySelector(elements.notice);
        
        this.error = '';
        // this.user;
        
        this.validator = validationModule;
        this.gallery = galleryModule;
        this.userinfo = userinfoModule;
        this.dom = domModule;
        this.authModule = authModule;
        this.formModule = modalFormModule;
    }

    initSignFormListeners() {
        this.formSignIn.addEventListener('submit', event => this.formSubmit(event));
        this.menuExit.addEventListener('click', () => this.authModule.logOut());
        this.menuGallery.addEventListener('click', () => this.dom.showGalleryContainer(this.authModule.auth));
        this.menuAbout.addEventListener('click', () => this.dom.showInfoContainer(this.authModule.auth));
    }

    formAccepted() {
        sessionStorage.setItem('auth', 'authorized');
        // better to create o migrate method setText to DomModule or NoticeModule
        // this.userinfo.setText(this.notice, this.error);
        this.dom.hideElement(this.notice);      
        location.reload();
    }
    formResused() {
        sessionStorage.removeItem('auth');
        this.userinfo.setText(this.notice, this.error);
        this.dom.showElement(this.notice);
    }

    // getData(formObj) { //duplicate 
    //     let formData = new FormData(formObj);
    //     var object = {};
    //     formData.forEach(function (value, key) {
    //         object[key] = value;
    //     });
    //     return object;
    // }

    async formSubmit(event) {
        event.preventDefault();
        
        // this.userinfo.setText(this.notice, '');
        // this.dom.hideElement(this.notice);
        
        let data = this.formModule.getData(event.target);

        if (await this.validator.validationSignInForm(data, event.target)) {
            // this.user = data;
            this.formAccepted();
        } else {
            this.error = this.validator.getError();
            // console.log('err', this.error)
            this.formResused();
        }
    }

    async initComponent() {
        this.initSignFormListeners();
        const checkAuth = this.authModule.checkAuth();
        if (checkAuth) {
            await this.userinfo.getUserInfo();
            this.gallery.initGallery();
            this.userinfo.initListeners();
        }
        this.dom.showGalleryContainer(checkAuth);
    }
}
