
Vue.component('cart', {
    props: ['cartItems'],
    template: `
					<div class="modal fade" id="basketModal" tabindex="-1" aria-labelledby="basketModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="basketModalLabel">Ваша корзина</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row" id="basketBody">
                            <div class="card col-md-12 mb-2">
                                    <cart-item v-for="cartItem in cartItems" :key="cartItem.id_product" :cart-item="cartItem"></cart-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="basketSum">
                </div>
                <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            <button type="button" class="btn btn-primary">Оплатить</button>
        </div>
            </div>
        </div>
        
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="row no-gutters">
        <div class="col-md-4">
            <img :src="cartItem.img" class="card-img" :alt="cartItem.product_name">
        </div>
        <div class="col-md-6">
            <div class="card-body">
                <h5 class="card-title">{{ cartItem.product_name }}</h5>
                <p class="card-text"><small class="text-muted">Количество:
                        <b>{{ cartItem.quantity }}</b><br>Цена:
                        <b>{{ cartItem.price * cartItem.quantity }} руб.</b></small>
                </p>
            </div>
        </div>
        <div class="col-md-2 d-flex align-items-center">
            <button type="button" name="basketElemAdd" class="btn btn-link" @click="$parent.$emit('add-product', cartItem)">
                <i name="basketElemAdd" class="fas fa-plus-square"">
                        </i>
                                                    </button>
                    <button type=" button" name="basketElemDel" @click="$parent.$emit('del-product', cartItem)"
                    class="btn btn-link">
                    <i name="basketElemDel""
                        class=" fas fa-minus-square">
                    </i>
            </button>
    
        </div>
        </div>`
});

