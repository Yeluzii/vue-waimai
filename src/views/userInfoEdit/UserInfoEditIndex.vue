<template>
    <Header title="账号管理" />
    <div>
        <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
        <van-field v-model="sign" label="个性签名" placeholder="请输入个性签名" disabled />
        <van-field v-model="password" label="密码" placeholder="请输入密码" />
    </div>
    <van-button type="primary" color="#ffc400" round block class="save-btn" @click="save">保存</van-button>
    <van-button type="primary" color="#ffc400" round block class="save-btn" @click="logOut">退出登录</van-button>
</template>

<script>
import Header from '../../components/HeaderOf1.vue';
import { reactive, toRefs } from 'vue';
import {Toast} from 'vant';
import {useRouter} from 'vue-router';
export default {
    components: {
        Header,
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            name: '',
            sign: '野路子，路子就野，不改了！',
            password: '',
        });
        const save = () => {
            if(data.name && data.password){
                let userInfo = JSON.parse(localStorage.userInfo)
                let newUserInfo = {
                    username:data.name || userInfo.name,
                    password:data.password || userInfo.password,
                };
                localStorage.setItem('userInfo',JSON.stringify(newUserInfo));
                Toast('修改成功！！！');
                router.push('/mine')
            }else{
                Toast('请输入内容！！！');
            }
        };
        const logOut = () => {
            localStorage.removeItem('isLogin');
            Toast('退出成功');
            router.push('/login');
        };
        return {
            ...toRefs(data),
            save,
            logOut,
        }
    }
};
</script>

<style lang="less" scoped>
// /deep/ .van-button--danger {
//     background-color: #ffc400;
//     border-color: #ffc400;
// }

.save-btn {
    width: 80%;
    margin: 20px auto;
}
</style>