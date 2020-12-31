const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
const renderProduct = (product, img = 'https://placehold.it/200x150') => {
    return `<div class="col-sm-4 p-4">
                <div class="panel product-item">
                    <img src="${img}">
                    <h4>${product.title}</h4>
                    <p>${product.price} руб</p>
                    <button type="button" class="btn btn-primary">В корзину </button>
                </div>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

renderPage(products);