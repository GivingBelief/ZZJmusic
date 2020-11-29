import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        //redirect 是重新定向
        redirect: '/new'
    },
    {
        path: "/tabbar",
        name: "tabbar",
        component: () =>
            import(/* webpackChunkName: "about" */ "../components/tabbar.vue")
    },
    {
        path: "/new",
        name: "new",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/new.vue")
    },
    {
        path: "/recommend",
        name: "recommend",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/recommend.vue")
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/search.vue")
    },
    {
        path: "/we",
        name: "we",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/we.vue")
    },
    {
        path: "/play",
        name: "play",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/play.vue")
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
