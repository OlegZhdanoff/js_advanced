const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    getTotalSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    // render() {
    //     const block = document.querySelector(this.container);
    //     for (let product of this.goods) {
    //         //console.log(this.constructor.name);
    //         const productObj = new this.list[this.constructor.name](product);//мы сделали объект товара либо CartItem, либо ProductItem
    //         console.log(productObj);
    //         this.allProducts.push(productObj);
    //         block.insertAdjacentHTML('beforeend', productObj.render());
    //     }
    // }

    _init() {
        return false
    }

    render() {
        return false
    }

    getProductByID(id) {
        // return this.allProducts.find(item => item.id == Number(id.slice(id.lastIndexOf('_') + 1)));
        return this.allProducts.find(item => item.id == +id);
    }
}
class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

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

    _init() {
        // document.querySelector(this.container).addEventListener('click', e => {
        //     if (e.target.classList.contains('buy-btn')) {
        //         //                console.log(e.target);
        //         this.cart.addProduct(e.target.dataset['id']);
        //     }
        // });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.name == 'buyButton') {
                this.cart.addElem(this.getProductByID(e.target.dataset['id']));
            }
        });

    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.title = el.product_name ? el.product_name : el.title;
        this.price = el.price;
        this.id = el.id_product ? el.id_product : el.id;
        this.img = el.img ? el.img : img;
    }
    render() {
        return `<div class="col-sm-4">
                <div class="panel product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <h4>${this.title}</h4>
                    <p>${this.price}</p>
                    <button class="btn btn-primary"
                    name="buyButton"
                    id="buyProductID_${this.id}" 
                    data-id="${this.id}">Купить</button>
                </div>
            </div>`
    }
}

class ProductItem extends Item { }

class Cart extends List {
    constructor(containerID = 'basketBody', url = "/getBasket.json") {
        super(url, containerID);
        // this.container = containerID;
        // this.elems = [];
        // this.allGoods = [];
        // this.totalSum = 0;
        // this._getElems()
        //     .then(data => {
        //         this.totalSum = data['amount'];
        //         this.elems = [...data['contents']];
        //         this.render(1)
        //     });
        this.getJson()
            .then(data => {
                this.handleData(data.contents);//вывели все товары в корзине 
                this.render(1);
            });

    }

    render(isNew = 0) {
        const block = document.getElementById(this.container);
        const badge = document.getElementById('basketBadge');
        console.log(this.allProducts);
        if (this.goods && isNew) {
            for (let elem of this.goods) {
                const elemObj = new CartItem(elem);
                this.allProducts.push(elemObj);
            }
        }
        if (this.allProducts.length) {
            block.innerHTML = '';
            for (let goods of this.allProducts) {
                block.insertAdjacentHTML('beforeend', goods.render());
            }
            block.insertAdjacentHTML('beforeend', `<div class="row"><div class="col-md-auto">Всего в корзине товаров на сумму: ${this.getTotal()} руб.</div></div>`);
            badge.innerText = this.allProducts.reduce((qty, goods) => qty += goods.qty, 0);
            badge.classList.remove('d-none');
        } else {
            block.innerHTML = '';
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
            let prod_id = this.allProducts.findIndex(item => item.id == product.id);
            if (prod_id < 0) {
                this.allProducts.push(new CartItem(product));
            } else {
                this.allProducts[prod_id].qty++;
            }
            this.render();
        }
    }

    delElem(product) {
        if (product) {
            let prod_id = this.allProducts.findIndex(item => item.id == product.id);
            if (prod_id > -1) {
                if (this.allProducts[prod_id].qty > 1) {
                    this.allProducts[prod_id].qty--;
                } else {
                    this.allProducts.splice(prod_id, prod_id + 1);
                    // prod_id == 0 ? this.allProducts.shift() : this.allProducts.splice(prod_id, prod_id);
                }
            }
            this.render();
        }
    }

    getTotal() {
        return this.allProducts.reduce((total, goods) => total += goods.price * goods.qty, 0);
    }

    _init() {
        // document.querySelector('.btn-cart').addEventListener('click', () => {
        //     document.querySelector(this.container).classList.toggle('invisible');
        // });
        // document.querySelector(this.container).addEventListener('click', e => {
        //     if (e.target.classList.contains('del-btn')) {
        //         this.removeProduct(e.target);
        //     }
        // })
        document.getElementById('basketBody').addEventListener('click', e => {
            // console.log(event.target)
            if (e.target.attributes.name.value == 'basketElemAdd') {
                this.addElem(this.getProductByID(e.target.dataset['id']));
            } else if (e.target.attributes.name.value == 'basketElemDel') {
                this.delElem(this.getProductByID(e.target.dataset['id']));
            }
        });
    }
}

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        if (el.quantity > 0) {
            this.qty = el.quantity;
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
                                        <div class="col-md-6">
                                            <div class="card-body">
                                                <h5 class="card-title">${this.title}</h5>
                                                <p class="card-text"><small class="text-muted">Количество:
                                                        <b>${this.qty}</b><br>Цена:
                                                        <b>${this.price * this.qty} руб.</b></small></p>
                                            </div>
                                        </div>
                                        <div class="col-md-2 d-flex align-items-center">
                                        <button type="button"
                                            name="basketElemAdd"
                                            id="btnBasketElemAddID_${this.id}" 
                                            class="btn btn-link" 
                                            data-id="${this.id}">
                                            <i name="basketElemAdd"
                                                id="basketElemAddID_${this.id}" 
                                                class="fas fa-plus-square"
                                                data-id="${this.id}">
                                            </i>
                                        </button>
                                        <button type="button"
                                            name="basketElemDel"
                                            id="btnBasketElemDelID_${this.id}" 
                                            class="btn btn-link" 
                                            data-id="${this.id}">
                                            <i name="basketElemDel"
                                                id="basketElemDelID_${this.id}" 
                                                class="fas fa-minus-square" 
                                                data-id="${this.id}">
                                            </i>
                                        </button>
                                        
                                        </div>
                                    </div>
                                </div>`
    }
}

const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();

let products = new ProductsList(cart);

// document.querySelector(list.container).addEventListener('click', () => {
//     if (event.target.name == 'buyButton') {
//         basket.addElem(list.getProductByID(event.target.dataset['id']));
//     }
// });

// console.log(document.getElementById('basketBody'));
// document.getElementById('basketBody').addEventListener('click', () => {
//     console.log(event.target)
//     if (event.target.attributes.name.value == 'basketElemAdd') {
//         basket.addElem(list.getProductByID(event.target.dataset['id']));
//     } else if (event.target.attributes.name.value == 'basketElemDel') {
//         basket.delElem(list.getProductByID(event.target.id));
//     }
// });