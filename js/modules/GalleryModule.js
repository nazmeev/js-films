    class GalleryModule{
        constructor(elements){

            this.host = 'http://localhost:3000';

            this.descriptionMaxLength = 35;

            this.sort = document.getElementById("dropdown-name");

            this.createContainer = document.querySelector(elements.createContainer);
            this.galleryContainer = document.querySelector(elements.galleryContainer);
            this.gallery = document.querySelector(elements.galleryBody);
        
            this.sortBy = 'nameaz';
            this.filteredData = [];
        }

        initGalleryListeners(){
            this.sort.addEventListener('click', (event) => this.handlerSort(event));
            this.gallery.addEventListener('click', (event) => this.actionsOfGallery(event));
        }
        
        actionsOfGallery(event){
            event.preventDefault();
            let action = event.target.getAttribute('data-action');
            let itemId = event.target.getAttribute('data-id');
            
            if(action == 'view'){
                this.viewItem(itemId);
            }
        }
        
        /* prepare data \ */
        cropStr(str, length){
            return (str.length > length) ? str.substring(0, length) + "..." : str;
        }
        setUrl(url, append){
            return url.indexOf(append) < 0 ? append + url : url;
        }
        transformName(name){
            return name.slice(0, 1) + name.slice(1).toLocaleLowerCase();
        }
        prepareData(item){
            return {
                url: this.setUrl(item.url, 'http://'),
                name: this.transformName(item.name),
                id: item.id,
                description: this.cropStr(item.description, this.descriptionMaxLength),
                fullDescription: item.description,
                date: item.date,
                dateFormat: moment(parseInt(item.date)).format('Do MM YYYY')
            }
        }
        /* prepare data */

        /* sorting \ */
        setDefaultSorting(){
            return (localStorage.getItem('sortBy')) && (sort.value = this.sortBy = localStorage.getItem('sortBy'));
        }
        sortByName(arr){
            return arr.sort((a, b) => a.name > b.name ? 1 : -1);
        }
        sortByDate(arr){
            return arr.sort((a, b) => a.date < b.date ? 1 : -1);
        }
        applySorting(items, sortBy){
            switch (sortBy) {
                case 'nameaz':
                    this.sortByName(items);
                    break;
                case 'nameza':
                    this.sortByName(items);
                    items.reverse();
                    break;
                case 'dateaz':
                    this.sortByDate(items);
                    break;
                case 'dateza':
                    this.sortByDate(items);
                    items.reverse();
                break;
            }
        }

        handlerSort(event){
            event.preventDefault();

            let sort = event.target.getAttribute('date-sort');
            if(!sort) return false;

            this.sortBy = sort;
            
            this.applySorting(this.filteredData, this.sortBy);
            this.buildGallery();
        }
        /* sorting */

        /* HTML utils / */
        getTemplateItem(item, size = 4){
            return `
            <div class="col-md-${size}">
		        <div class="card box-shadow">
			        <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="${item.name}" src="${item.url}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
			        <div class="card-body">
                        <p class="card-text">${item.name}</p>
                        <p class="card-text">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
				            <small class="text-muted">${item.dateFormat}</small>
                        </div>
		            </div>
                </div>
            </div>`;
        }
        printItem(container, html){
            return container.innerHTML = html;
        }
        getHtml(array){
            return array.map(item => this.getTemplateItem(item)).join('');
        }
        /* HTML utils */

        async queryGallery(){
            let url = this.host + '/cars';
            await fetch(url).then(responce => responce.json())
                .then(data => {
                    this.getDataFromResponce(data);
                })  
            }
        getDataFromResponce(data){
            this.filteredData = data.map((item) => this.prepareData(item))
        }
        
        buildGallery(){
            this.applySorting(this.filteredData, this.sortBy);
            let str = this.getHtml(this.filteredData);
            this.printItem(this.gallery, str);
        }

        async initGallery(){
            this.createContainer.classList.add('hide');
            if (!this.filteredData.length) {
                await this.queryGallery();
            }
            this.setDefaultSorting();
            this.buildGallery();
            this.initGalleryListeners();
        }
    }