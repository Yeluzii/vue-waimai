<template>
    <div class="order">
        <Header title="订单"></Header>
        <div class="content">
            <!-- <van-tabs color="#ffc400">
                <van-tab :title="item" v-for="(item, index) in navData" :key="index">
                    <div v-for="(i, index) in store.state.orderListEnd" :key="index"
                        v-if="item === '全部' && store.state.orderListEnd.length">
                        <van-card :num="i.num" :price="i.price" :title="i.title" :thumb="i.pic" />
                    </div>
                    <div v-else>
                        <Empty></Empty>
                    </div>
                </van-tab>
            </van-tabs> -->
            <van-tabs color="#ffc400">
                <van-tab :title="item" v-for="(item, index) in navData" :key="index">
                    <template v-if="item === '全部' && store.state.orderListEnd.length">
                        <div v-for="(i, index) in store.state.orderListEnd" :key="index">
                            <van-card :num="i.num" :price="i.price" :title="i.title" :thumb="i.pic" />
                        </div>
                    </template>
                    <template v-else>
                        <Empty></Empty>
                    </template>
                </van-tab>
            </van-tabs>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../../components/main-footer.vue';
import Header from '../../components/HeaderOf1.vue';
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import Empty from "../../components/EmptyIndex1.vue";
export default {
    components: {
        Footer,
        Header,
        Empty
    },
    setup() {
        const store = useStore();
        const data = reactive({
            navData: ['全部', '交易完成', '待付款', '待发货', '已发货'],
        });

        return {
            ...toRefs(data),
            store
        };
    },
};
</script>

<style lang="less" scoped>
.order {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1%;
        overflow-y: auto;
    }
}
</style>