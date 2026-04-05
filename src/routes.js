import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import Search from './components/Search.vue';
import Camera from './components/Camera.vue';
import Ratings from './components/Ratings.vue';
import TreeList from './components/TreeList.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/camera',
        name: 'camera',
        component: Camera
    },
    {
        path: '/ratings',
        name: 'ratings',
        component: Ratings
    },
    {
        path: '/treelist',
        name: 'treelist',
        component: TreeList
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});