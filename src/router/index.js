import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/new',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/NEW.vue'),
                    meta: { title: '下单' }
                },
                {
                    path: '/nurse',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/nurse.vue'),
                    meta: { title: '护士派单' }
                },
                {
                    path: '/blood',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/blood.vue'),
                    meta: { title: '金域订单派送' }
                },
                {
                    path: '/orderStatus',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/orderStatus.vue'),
                    meta: { title: '订单状态' }
                },
                {
                    path: '/addNurse',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/addNurse.vue'),
                    meta: { title: '新增护士' }
                },
                {
                    path: '/qrCode',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/xhQr.vue'),
                    meta: { title: '推广码管理' }
                },
                {
                    path: '/qrOrderList',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/qrOrderList.vue'),
                    meta: { title: '推广订单' }
                },

                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
