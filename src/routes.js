import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        name: 'home',
        component: require('./components/Home.vue').default,
    },
    {
        path: '/search',
        name: 'search',
        component: require('./components/Search.vue').default
    }
]

export default new VueRouter({
    routes
})