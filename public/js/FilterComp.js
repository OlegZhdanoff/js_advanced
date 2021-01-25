Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" class="form-inline my-2 my-lg-0">
    <div class="input-group mr-sm-2">
        <input type="text" class="form-control" aria-label=""
        v-model="userSearch" @keyup="$parent.$refs.products.filter(userSearch)">
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-search"></i>
    </span>
        </div>
    </div>  
    </form>
    
    `
})

//     < input class="form-control mr-sm-2" type = "search" placeholder = "Search" aria - label="Поиск"
// v - model="userSearch" @keyup="$parent.$refs.products.filter(userSearch)" >
//     <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button>
