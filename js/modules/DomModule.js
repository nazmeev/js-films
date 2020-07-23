class DomModule {
    constructor(elements) {
        this.formContainer = document.querySelector(elements.formContainer);
        this.infoContainer = document.querySelector(elements.infoContainer);
        this.galleryContainer = document.querySelector(elements.galleryContainer);

        this.menuExit = document.querySelector(elements.menuExit);
        this.menuGallery = document.querySelector(elements.menuGallery);
        this.menuAbout = document.querySelector(elements.menuAbout);
    }

    hideElement(area) {
        area.classList.add('hide');
    }
    showElement(area) {
        area.classList.remove('hide');
    }

    deactiveMenu() {
        let menuElements = document.querySelectorAll('nav a');
        menuElements.forEach(function (menuItem) {
            menuItem.classList.remove('active')
        })
    }
    activeMenu(element) {
        this.deactiveMenu();
        element.classList.add('active');
    }

    showGalleryContainer(checkAuth) {
        this.hideAll();
        if (checkAuth) {
            this.showElement(this.galleryContainer);
            this.activeMenu(this.menuGallery);
        } else {
            this.showElement(this.formContainer);
            this.activeMenu(this.menuExit);
        }
    }
    showInfoContainer(checkAuth) {
        this.hideAll();
        if (checkAuth) {
            this.showElement(this.infoContainer);
            this.activeMenu(this.menuAbout);
        } else {
            this.activeMenu(this.menuExit);
            this.showElement(this.formContainer);
        }
    }

    hideAll() {
        this.hideElement(this.formContainer);
        this.hideElement(this.infoContainer);
        this.hideElement(this.galleryContainer);
    }
}