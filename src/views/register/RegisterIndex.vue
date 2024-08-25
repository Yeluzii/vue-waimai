<template>
    <div class="register">
        <Header title="注册" />
        <div class="img">米团</div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请输入用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请输入密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" color="#ffc400">
                    注册
                </van-button>
                <van-button round block type="info" color="#ffc400" class="login" @click="toLogin">
                    去登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Header from '../../components/HeaderOf1.vue';
import { useRouter } from 'vue-router';
import { reactive, toRefs } from 'vue';
import { Toast } from 'vant';
export default {
    components: {
        Header,
    },
    setup() {
        const router = useRouter();
        const onSubmit = (value) => {
            // console.log(value);
            if (localStorage.userInfo) {
                let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (userInfo['username'] === value['username']) {
                    Toast('该用户名已存在');
                    return;
                }
            } else {
                register(value);
            }
        };
        const register = (value) => {
            localStorage.setItem('userInfo', JSON.stringify(value));
            Toast('注册成功');
            router.push('/login');
        };
        const toLogin = () => {
            router.push('/Login');
        };
        const data = reactive({
            username: '',
            password: '',
        });
        return {
            onSubmit,
            toLogin,
            ...toRefs(data),
        }
    },
};
</script>

<style lang="less" scoped>
.register {
    .img {
        width: 200px;
        height: 200px;
        background-color: #ffc400;
        font-size: 80px;
        line-height: 200px;
        text-align: center;
        border-radius: 40px;
        margin: 20px auto;
    }

    .login {
        margin-top: 20px;
    }
}
</style>