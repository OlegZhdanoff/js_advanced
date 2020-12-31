class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook sd адыл ы д длы лыт лыт sdf', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
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
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
        }
        alert(this.getTotalSum())
    }
    getTotalSum() {
        ;
        let sum = 0;
        this.goods.forEach(item => sum += item.price);
        return sum
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render() {
        return `<div class="col-sm-4">
                <div class="panel product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <h4>${this.title}</h4>
                    <p>${this.price}</p>
                    <button class="btn btn-primary">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
list.render();


class Basket {
    addElem() {

    }

    deleteElem() {

    }

    editElem() {

    }

    get_total_sum() {

    }
    get_qty() {

    }
}

class ElemBasket {
    // пока не очень понимаю чем он должен отличаться от класса ProductItem
}