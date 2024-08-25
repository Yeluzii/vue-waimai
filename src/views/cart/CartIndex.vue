<template>
    <div class="cart">
        <Header title="购物车" :edit="true" />
        <CartDetail v-if="isShow" :changeShow="changeShow" />
        <Empty v-else />
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../../components/main-footer.vue';
import Empty from '../../components/EmptyIndex1.vue';
import Header from "../../components/HeaderOf1.vue";
import CartDetail from "./components/CartDetail.vue";
import { useStore } from "vuex"
import { onMounted, ref } from 'vue';

export default {
    components: {
        Footer,
        Empty,
        Header,
        CartDetail
    },
    setup() {
        const isShow = ref(true)
        const store = useStore();

        const init = () => {
            if (store.state.cartList.length === 0) {
                isShow.value = false;
            }
        };

        const changeShow = () => {
            isShow.value = false;
        };

        onMounted(() => {
            init();
        });

        return {
            isShow,
            changeShow,
        };
    },
};
</script>

<style lang="less" scoped>
.cart {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: auto;
    }
}
</style>