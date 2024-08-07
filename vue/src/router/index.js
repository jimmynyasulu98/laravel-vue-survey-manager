import AuthLayout from "@/components/AuthLayout.vue";
import Layout from "@/components/Layout.vue";
import store from "@/store";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Surveys from "@/views/Surveys.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
      
      path: "/",
      redirect: "/dashboard",
      component:Layout,
      meta: { requiresAuth: true },
      children: [
        { path: "/dashboard", name: "Dashboard", component: Dashboard },
        { path: "/surveys", name: "Surveys", component: Surveys },
      ]
    },

    {
      
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            {path: '/register',name: 'Register', component: Register,meta: { isGuest: true },},
            
            { path: '/login',name: 'Login', component: Login,meta: { isGuest: true }, }
        ]
    },

];
const router = createRouter({

    history: createWebHistory(),
    routes,

})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
      next({ name: "Login" });
    } else if (store.state.user.token && to.meta.isGuest) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  });

export default router;