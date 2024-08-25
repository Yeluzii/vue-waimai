import {createRouter,createWebHashHistory} from 'vue-router';
import {Toast} from 'vant';

const routes = [
    {
        path:'/',
        component:()=>import('../views/home/HomeIndex.vue')
    },
    {
        path:'/home',
        component:()=>import('../views/home/HomeIndex.vue')
    },
    {
        path:'/order',
        component:()=>import('../views/order/OrderIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path:'/mine',
        component:()=>import('../views/mine/MineIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path:'/cart',
        component:()=>import('../views/cart/CartIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path: '/store',
        component: () => import('../views/store/StoreIndex.vue')
    },
    {
        path: '/createOrder',
        component: () => import('../views/createOrder/CreateOrderIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path: '/address',
        component: () => import('../views/address/AddressIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path: '/addressEdit',
        component: () => import('../views/addressEdit/addressEditIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path: '/userInfoEdit',
        component: () => import('../views/userInfoEdit/UserInfoEditIndex.vue'),
        meta:{
            isAuth:true,
        }
    },
    {
        path: '/login',
        component: () => import('../views/login/LoginIndex.vue')
    },
    {
        path: '/register',
        component: () => import('../views/register/RegisterIndex.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        // 登录以后，会在localstorage中存储一个标识
        // 验证是否登录
        const token = localStorage.isLogin;
        if (token === 'login') {
            next()
        } else {
            next('/login')
            Toast('请先登录')
        }
    } else {
        next()
    }
 
})

export default router