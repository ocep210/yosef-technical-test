import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('@/views/Home.vue')
const List = () => import('@/views/List.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/list',
        name: 'List',
        component: List
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router