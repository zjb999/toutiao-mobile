import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/views/login'),
    meta: {
        requireAuth: false
    }
}, {
    path: '/',
    component: () =>
        import ('@/views/layout'),
    children: [{
            path: '',
            name: 'home',
            component: () =>
                import ('@/views/home'),
            meta: {
                requireAuth: false
            }
        }, {
            path: '/qy',
            name: 'qy',
            component: () =>
                import ('@/views/qy'),
            meta: {
                requireAuth: false
            }
        }, {
            path: '/video',
            name: 'video',
            component: () =>
                import ('@/views/video'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/my',
            name: 'my',
            component: () =>
                import ('@/views/my'),
            meta: {
                requireAuth: false
            }
        }
    ]
}, {
    path: '/search',
    name: 'search',
    component: () =>
        import ('@/views/search'),
    meta: {
        requireAuth: false
    }
}, {
    path: '/article/:articleId',
    name: 'article',
    component: () =>
        import ('@/views/article'),
    meta: {
        requireAuth: false
    },
    props: true,
}, {
    path: '/user/profile',
    name: 'user-profile',
    component: () =>
        import ('@/views/user-profile'),
    meta: {
        requireAuth: false
    },
}, {
    path: '/user/chart',
    name: 'user-chart',
    component: () =>
        import ('@/views/user-chart'),
    meta: {
        requireAuth: true
    },
}]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.user) return next()
        Dialog.confirm({
                title: '访问提示',
                message: '该功能需要登录才能访问,确认登录吗',
            })
            .then(() => {
                // on confirm

                router.replace({

                    name: 'login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
            })
            .catch(() => {
                next(false)
                    // on cancel
            });
    } else {
        next()
    }
})
export default router