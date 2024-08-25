<template>
    <div class="create-order">
        <Header title="生成订单" />
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.state.orderList" :key="index">
                <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ totalPrice }}</span>
            </div>
            <van-button type="primary" class="pay-btn" block color="#ffc400"
                @click="handleCreateOrder">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import Header from '../../components/HeaderOf1.vue';
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { Dialog } from 'vant';

export default {
    components: {
        Header,
    },
    setup() {
        const data = reactive({
            tel: '1234567890X',
            name: 'Yeluzi',
            totalPrice: 0
        });
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const onEdit = () => { 
            router.push("/address");
        }
        const initPrice = () => {
            let price = 0;
            if (store.state.orderList.length) {
                store.state.orderList.forEach((item) => {
                    price += item.price * item.num;
                });
            }
            data.totalPrice = price;
        };
        // 初始化用户的地址
        const initUser = () => {
            store.state.userAddress.forEach((item) => {
                if (item.isDefault) {
                    data.name = item.name;
                    data.tel = item.tel;
                }
            });
        };

        // 这段代码直接使用 route.query.list.includes(item.id + "")，
        // 如果 route.query.list 为 undefined 或者不是一个数组，会导致 TypeError。

        // const handleCreateOrder = () => {
        //     Dialog({
        //         title: '提示',
        //         message: '生成订单成功！',
        //     }).then(() => {
        //         // console.log(route.query.list);
        //         // 要和购物车联系起来,过滤
        //         let newList = store.state.cartList.filter((item) => {
        //             return !route.query.list.includes(item.id + "");
        //         });
        //         store.commit('delete', newList);
        //         router.push("/order");
        //     });
        // }

        const handleCreateOrder = () => {
            Dialog({
                title: '提示',
                message: '生成订单成功！',
            }).then(() => {
                // 要和购物车联系起来,过滤
                // 确保 route.query.list 是一个数组
                const listIds = route.query.list ? (Array.isArray(route.query.list) ? route.query.list : route.query.list.split(',')) : [];
                // console.log(listIds);

                let newList = store.state.cartList.filter((item) => {
                    // 确保 item.id 被转换为字符串
                    return !listIds.includes(item.id + "");
                });
                store.commit('delete', newList);
                store.commit('orderListEnd');
                router.push("/order");
            });
        };

        onMounted(() => {
            initPrice();
            initUser();
        });
        return {
            ...toRefs(data),
            onEdit,
            store,
            handleCreateOrder
        }
    }
}
</script>

<style lang="less" scoped>
.create-order {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: auto;
    }

    .pay-wrap {
        padding: 10px 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #e9e9e9;

        >div {
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            margin: 10px 0;
            font-size: 14px;

            span:nth-child(2) {
                color: red;
                font-size: 18px;
            }
        }

        .pay-btn {
            width: 90%;
            margin: 0 auto;
        }
    }
}
</style>