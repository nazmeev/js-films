let Gallery = { 
    init: (version) => {

        let domModule = new DomModule(formHtmlElements);

        let validationModule = new SignFormValidationModule();
        let noticerModule = new NoticeModule(domModule, formHtmlElements);
        let modalFormModule = new ModalFormModule(formHtmlElements);
        let authModule = new AuthModule();
        let userinfoModule = new UserinfoModule(domModule, authModule, formHtmlElements);

        if(version == 'base'){
            var galleryModule = new GalleryModule(formHtmlElements);
        }
        if(version == 'extend'){
            var galleryModule = new ExtendGalleryModule(validationModule, noticerModule, modalFormModule, domModule, formHtmlElements);
        }
        let formModule = new SignFormModule(domModule, validationModule, galleryModule, userinfoModule, modalFormModule, authModule, formHtmlElements);

        formModule.initComponent();
    }
}