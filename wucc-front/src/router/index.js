import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/RegisterForm.vue";
import EventList from "../views/EventList";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: LoginForm
    },
    {
        path: '/register',
        component: RegisterForm
    },
    {
        path: '/events',
        component: EventList
    },
    {
        path: '/event/:type/:id',
        name: 'eventDetails',
        // lazy-loaded
        component: () => import('@/views/EventDetailPage.vue')
    },
    {
        path: '/revent/:id',
        name: 'revent',
        // lazy-loaded
        component: () => import('@/views/REventPage.vue')
    }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
