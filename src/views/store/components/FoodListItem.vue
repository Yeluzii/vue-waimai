<template>
    <div class="content-item">
        <div class="left">
            <img :src="item.pic" />
            <div class="text">
                <div class="title">{{ item.title }}</div>
                <van-icon name="add-o" v-if="item.add" @click="handleAdd(item.id)" />
                <van-stepper v-else v-model="localNum" @change="handleChange" :name="item.id" />
            </div>
        </div>
        <div class="price">￥{{ item.price }}</div>
    </div>
</template>
<script>
export default {
    props: ['item', 'handleAdd','handleChange'],
    data() {
    return {
      localNum: this.item.num || 0,
    };
  },
  watch: {
    // 当item.num发生变化时，同步更新localNum
    'item.num': function(newVal) {
      this.localNum = newVal;
    },
    // 当localNum发生变化时，通知父组件更新item.num
    localNum: function(newVal) {
      this.$emit('update:item.num', newVal);
    }
  },
}
</script>

<style lang="less" scoped>
.content-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .price {
        font-size: 16px;
        font-weight: 600;
    }

    .left {
        display: flex;
        align-items: center;
        flex: 1;

        img {
            margin-left: 10px;
            width: 60px;
            height: 60px;
            margin-right: 10px;
            border-radius: 10px;
        }

        .text {
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            height: 100%;
            position: relative;
            flex: 1;

            .title {
                font-size: 16px;
            }

            .van-icon {
                color: red;
                font-size: 20px;
                position: absolute;
                right: 4px;
                bottom: 4px;
            }
        }
    }
}
</style>