<template>
    <Header :title="address" />
    <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result :address-info="addressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
</template>

<script>
import { useStore } from "vuex";
import { useRoute ,useRouter} from "vue-router";
import Header from "../../components/HeaderOf1.vue"
import { reactive, toRefs, onMounted, computed } from "vue";
import { Toast } from "vant";
export default {
    components: {
        Header,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            areaList: {
                province_list: {
                    110000: "广东省",
                    120000: "浙江省",
                    140000: "江苏省",
                },
                city_list: {
                    110100: "广州市",
                    110200: "深圳市",
                    120100: "杭州市",
                    120200: "宁波市",
                    140100: "南京市",
                },
                county_list: {
                    110101: "天河区",
                    110102: "海珠区",
                    120102: "上城区",
                    130102: "下城区",
                    140101: "栖霞区",
                },
            },
            addressInfo: {},
        });
        const onSave = (content) => {
            // 新增和编辑
            if (route.query.type === 'add') {
                store.commit('addAddress', content);
            } else {
                store.commit('editAddress', content);
            }
            Toast("保存成功！");
            setTimeout(()=>{
                router.back()
            },1000);
        };
        const onDelete = (content) => {
            store.commit('deleteAddress', content);
            Toast("删除成功！");
            setTimeout(()=>{
                router.back()
            },1000);
        };
        const init = () => {
            store.state.userAddress.forEach((item) => {
                if (item.id === Number(route.query.id)) {
                    data.addressInfo = item;
                }
            });
        };
        const address = computed(() => {
            return route.query.type === 'add' ? '地址新增' : '地址编辑';
        })
        onMounted(() => {
            init();
        });

        return {
            ...toRefs(data),
            onSave,
            onDelete,
            address,
        }

    },
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
</style>