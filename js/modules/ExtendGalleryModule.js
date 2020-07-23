class ExtendGalleryModule extends GalleryModule{
    constructor(validationModule, noticeModule, modalModule, domModule, elements){
        super(elements);

        this.host = 'http://localhost:3000';

        this.addItemGallery = document.querySelector(elements.addItemGallery);
        this.btnCloseAddGallery = document.querySelector(elements.btnCloseAddGallery);
        this.createContainer = document.querySelector(elements.createContainer);
        this.containerCreateItem = document.querySelector(elements.modalCreateForm);
        this.containerViewItem = document.querySelector(elements.containerViewItem);
        
        this.noticeModal = document.querySelector(elements.noticeModal);

        this.errors = [];

        this.validator = validationModule;
        this.noticer = noticeModule;
        this.former = modalModule;
        this.dom = domModule;
        // this.authModule = authModule;
    }

    initGalleryListeners(){
        super.initGalleryListeners();
        this.addItemGallery.addEventListener("click", () => this.createItem());
        this.containerCreateItem.addEventListener("submit", event => this.handleSubmitModalForm(event));
    }

    // /* HTML utils / */
    getTemplateItem(item){
        return `
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="${item.name}" src="${item.url}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                <div class="card-body">
                    <p class="card-text">${item.name}</p>
                    <p class="card-text">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-secondary" data-id="${item.id}" data-action="view" data-target="#viewModal" data-toggle="modal">View</button>
                            <button type="button" class="btn btn-outline-secondary" data-id="${item.id}" data-action="edit" data-target="#createModal" data-toggle="modal">Edit</button>
                        </div>
                        <a href="#" class="btn btn-danger" data-id="${item.id}" data-action="delete">Delete</a>
                        <small class="text-muted">${item.dateFormat}</small>
                    </div>
                </div>
            </div>
        </div>`;
    }
    // /* HTML utils / */

    async actionsOfGallery(event){
        event.preventDefault();

        let action = event.target.getAttribute('data-action');
        let itemId = event.target.getAttribute('data-id');

        if(action == 'edit') await this.editItem(itemId);
        if(action == 'view') await this.viewItem(itemId);
        if(action == 'delete') await this.deleteItem(itemId);

        return false;
    }
    createItem(){
        event.preventDefault();
        this.noticer.hideNotice();
        this.containerCreateItem.setAttribute('action', '/cars')
        this.containerCreateItem.setAttribute('method', 'POST')
        this.former.clearModalForm(this.containerCreateItem)

        return false;
    }
    async deleteItem(id){
        let url = this.host + '/cars/'+id;
        let options = {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: 'DELETE'
        }
        await fetch(url, options).then(await this.queryGallery()).then(this.buildGallery())
    }
    async editItem(id){
        this.noticer.hideNotice();

        let url = '/cars/'+id;
        this.containerCreateItem.setAttribute('action', url)
        this.containerCreateItem.setAttribute('method', 'PUT')
        
        let options = {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: 'GET'
        }
        await fetch(this.host + url, options).then(responce => responce.json()).then(data => this.former.fillModalForm(data))
    }
    async viewItem(id){
        let url = '/cars/'+id;
        let options = {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: 'GET'
        }
        await fetch(this.host+url, options)
        .then(responce => responce.json())
        .then(data => {
            let item = this.prepareData(data);
            let html = super.getTemplateItem(item, 12);
            this.printItem(this.containerViewItem, html)
        })
    }
    async saveItem(data){
        
        let url = this.containerCreateItem.getAttribute('action');
        let meth = this.containerCreateItem.getAttribute('method');

        let options = {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: meth,
            body: JSON.stringify(data)
        }
        await fetch(this.host+url, options).then(await this.queryGallery()).then(this.buildGallery())
    }

    async handleSubmitModalForm(event){
        event.preventDefault();

        this.errors = [];
        
        let data = this.former.getData(event.target);
        this.errors = this.validator.validationOfData(data);

        if(this.errors.length > 0){
            this.noticer.setError = this.errors;
            this.noticer.showNotice()

        }
        else{
            this.noticer.hideNotice();
            await this.saveItem(data);
            this.btnCloseAddGallery.click();
        }
    }

    async initGallery(){
        super.initGallery();
        this.dom.showElement(this.createContainer)
    }
}

