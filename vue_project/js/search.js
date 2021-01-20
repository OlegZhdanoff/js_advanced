Vue.component('search', {
    props: ['products', 'filtered'],
    data() {
        return {
            userSearch: '',
        }
    },
    methods: {
        filtering1() {
            console.log(this.filtered);
            return this.products.filter(el =>
                el.product_name.toLowerCase().includes(this.userSearch.toLowerCase()));
            // console.log(this.filtered);
            // return this.filtered;
        }
    },
    computed: {
        FilterGoods: function () {
            console.log(userSearch);
            return products.filter(el =>
                el.product_name.toLowerCase().includes(userSearch.toLowerCase()));
        }
    },
    template: `
    <form action="#" class="search-form" @keydown="$parent.$emit('filtering', 'userSearch')">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                    <p>{{userSearch}}</p>
                </form>
    `
});