<template>
    <Header title="地址管理" />
    <van-address-list :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
</template>

<script>
import Header from '../../components/HeaderOf1.vue';
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {
        Header,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const onAdd = () => {
            router.push({
                path: '/addressEdit',
                query:{
                    type:"add",
                },
            });
        };
        const onEdit = (item) => {
            router.push({
                path: '/addressEdit',
                query:{
                    id:item.id,
                    type:"edit",
                },
            });
        };
        const data = reactive({
            list: [],
        });
        const init = () => {
            data.list = store.state.userAddress.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
                    isDefault: item.isDefault,
                };
            });
        };
        onMounted(() => {
            init();
        });
        return {
            onAdd,
            onEdit,
            ...toRefs(data),
        }
    }
};
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
    background-color: #ffc400;
    border-color: #ffc400;
}

/deep/ .van-switch--on {
    background-color: #ffc400;
}

/deep/ .van-radio__icon {
    display: none;
}
</style>