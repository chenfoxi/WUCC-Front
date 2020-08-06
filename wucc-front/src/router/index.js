import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/RegisterForm.vue";

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
    // {
    //     path: '/profile',
    //     name: 'profile',
    //     // lazy-loaded
    //     component: () => import('./views/Home.vue')
    // },
    // {
    //     path: '/user',
    //     name: 'user',
    //     // lazy-loaded
    //     component: () => import('./views/Home.vue')
    // }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
