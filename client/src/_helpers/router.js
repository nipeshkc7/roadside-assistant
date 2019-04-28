import Vue from 'vue';
import Router from 'vue-router';

import { authenticationService } from '@/_services';
import RegisterPage from '@/views/RegisterPage';
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import AdminPage from '@/views/AdminPage';
import MakeRequestPage from '@/views/MakeRequestPage';
import RequestsPage from '@/views/RequestsPage';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage,
            meta: { authorize: [] }
        },
        {
            path: '/register',
            component: RegisterPage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/admin',
            component: AdminPage,
            meta: { authorize: ['Admin'] }
        },
        {
            path: '/make-request',
            component: MakeRequestPage,
            meta: { authorize: ['Member'] }
        },
        {
            path: '/requests',
            component: RequestsPage,
            meta: { authorize: ['Professional'] }
        },
        
        // Else redirect to home page
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // Redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUser;

    if (authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.source.value.role)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
})