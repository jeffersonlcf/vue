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
    },
    {
        path: '/camera',
        name: 'camera',
        component: require('./components/Camera.vue').default
    },
    {
        path: '/ratings',
        name: 'ratings',
        component: require('./components/Ratings.vue').default
    },
    {
        path: '/treelist',
        name: 'treelist',
        component: require('./components/TreeList.vue').default
    }
]

export default new VueRouter({
    routes
})