let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.findIndex(el => el.id_product === +req.params.id);
    cart.contents[find].quantity += req.body.quantity;
    // console.log('cart.contents[find].quantity ' + cart.contents[find].quantity);
    if (cart.contents[find].quantity < 1) {
        cart.contents.splice(find, 1);
    }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change
};