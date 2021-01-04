const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    // _fetchProducts() {
    //     this.goods = [
    //         { id: 1, title: 'Notebook sd адыл ы д длы лыт лыт sdf', price: 2000 },
    //         { id: 2, title: 'Mouse', price: 20 },
    //         { id: 3, title: 'Keyboard', price: 200 },
    //         { id: 4, title: 'Gamepad', price: 50 },
    //     ];
    // }
    render() {
        const row_block = document.querySelector(this.container);
        let cols = 0;
        let row = 1;
        row_block.insertAdjacentHTML('beforeend', `<div class="row" id="row_${row}"></div>`);
        let block = document.getElementById(`row_${row}`);
        for (let product of this.goods) {
            if (cols === 3) {
                cols = 0;
                row++;
                row_block.insertAdjacentHTML('beforeend', `<div class="row" id="row_${row}"></div>`);
                block = document.getElementById(`row_${row}`);
            }
            cols++;
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        // alert(this.getTotalSum())
    }
    getTotalSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    getProductByID(id) {
        return this.allProducts.find(item => item.id == Number(id.slice(13)));
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }

    render() {
        return `<div class="col-sm-4">
                <div class="panel product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <h4>${this.title}</h4>
                    <p>${this.price}</p>
                    <button class="btn btn-primary" name="buyButton" id="buyProductID_${this.id}">Купить</button>
                </div>
            </div>`
    }
}




class Basket {
    constructor(containerID = 'basketBody') {
        this.container = containerID;
        this.elems = [];
        this.allGoods = [];
        this.totalSum = 0;
        this._getElems()
            .then(data => {
                this.totalSum = data['amount'];
                this.elems = [...data['contents']];
                this.render(1)
            });

    }

    _getElems() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render(isNew = 0) {
        const block = document.getElementById(this.container);
        const badge = document.getElementById('basketBadge')
        if (this.elems && isNew) {
            for (let elem of this.elems) {
                const elemObj = new ElemBasket(elem);
                this.allGoods.push(elemObj);
            }
        }
        if (this.allGoods) {
            block.innerHTML = '';
            for (let goods of this.allGoods) {
                block.insertAdjacentHTML('beforeend', goods.render());
            }
            block.insertAdjacentHTML('beforeend', `<div class="row"><div class="col-md-auto">Всего в корзине товаров на сумму: ${this.totalSum} руб.</div></div>`);
            badge.innerText = this.allGoods.reduce((qty, goods) => qty += goods.qty, 0);
            badge.classList.remove('d-none');
        } else {
            block.insertAdjacentHTML('beforeend', `<div class="row"><div class="col-md-auto">Ваша  корзина пуста...</div></div>`);
            badge.classList.add('d-none')
        }
    }

    // static setListener(productList) {
    //     for (let product in productList) {
    //         document.getElementById(`buyProductID_${product.id}`).addEventListener('click', () => {
    //             this.addElem(product);
    //         });
    //     }

    // }

    addElem(product) {
        if (product) {
            let prod_id = this.allGoods.findIndex(item => item.id == product.id);
            if (prod_id < 0) {
                this.allGoods.push(new ElemBasket(product));
            } else {
                this.allGoods[prod_id].qty++;
            }
            this.totalSum = this.getTotal();
            this.render();
        }
    }

    deleteElem() {

    }

    getTotal() {
        return this.allGoods.reduce((total, goods) => total += goods.price * goods.qty, 0);
    }
}

class ElemBasket extends ProductItem {
    constructor(productItem) {
        super(productItem);
        if (productItem.quantity > 0) {
            this.qty = productItem.quantity;
        } else {
            this.qty = 1;
        }
    }

    render() {
        return `
        <div class="card col-md-12 mb-2">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="${this.img}" class="card-img" alt="Изображение ${this.title}">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${this.title}</h5>
                                                <p class="card-text"><small class="text-muted">Количество:
                                                        <b>${this.qty}</b><br>Цена:
                                                        <b>${this.price} руб.</b></small></p>

                                            </div>
                                        </div>
                                    </div>
                                </div>`
    }
}

let list = new ProductsList();
list.render();


let basket = new Basket();
basket.render();
// Basket.setListener(list);

document.querySelector(list.container).addEventListener('click', () => {
    if (event.target.name == 'buyButton') {
        basket.addElem(list.getProductByID(event.target.id));
    }
});