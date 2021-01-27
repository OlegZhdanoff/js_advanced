const products = {
    props: ['userSearch',],
    components: {
        product
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            this.filtered = this.products.filter(el =>
                el.product_name.toLowerCase().includes(userSearch.toLowerCase()));
        }
    },
    template: `<div class="col-sm-9 products">
                <product v-for="item of filtered" 
                :key="item.id_product"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
};
const product = {
    props: ['product'],
    template: `
            <div class="col-sm-4">
                <div class="panel product-item">
                    <img :src="product.img" alt="Some img" height=100>
                    <h4>{{product.product_name}}</h4>
                    <p>{{product.price}}</p>
                    <button class="btn btn-primary"
                    @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `
};

export default {
    products
}