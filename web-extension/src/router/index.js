import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import PopupHome from "../views/PopupHome.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Notes from "../views/Notes.vue";
import Quiz  from "../views/Quiz.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        components: {
            default: Home,
            popup: PopupHome
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guest: true }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guest: true }
    },
    {
        path: "/quiz",
        name: "Quiz",
        components: {
            default: Quiz,
            popup: Quiz
        },
        meta: {
            crumbs: "/Today's Quiz",
            requiresAuth: true 
        }
    },
    {
        path: "/notes",
        name: "Notes",
        component: Notes,
        meta: { requiresAuth: true }
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuth) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.isAuth) {
            next("/notes");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router;
