<template>
  <div class="food-list" v-if="index === 0">
    <van-tree-select v-model:main-active-index="activeIndex" height="88vw" :items="items" @click-nav="navClick">
      <template #content>
        <div v-for="(item, index) in subItem" :key="index" class="item-bg">
          <ListItem :item="item" :handleAdd="handleAdd" :handleChange="handleChange" />
        </div>
      </template>
</van-tree-select>
</div>

<div v-else>
  {{ foodData.content }}
</div>

</template>

<script>
import { reactive, toRefs } from "vue";
// import FoodListItem from "./FoodListItem.vue";
import ListItem from "../../../components/ListItem.vue";
export default {
  props: ["index", "foodData"],
  components: {
    // FoodListItem,
    ListItem
  },
  setup(props) {
    let data = reactive({
      activeIndex: 0,
      items: [],
      subItem: []
    });

    // console.log('Items:', data.items);

    // 初始化数据

    // const initData = () => {
    //   if (props.foodData && props.foodData.items) {
    //     props.foodData.items.forEach((item) => {
    //       newArray.push({
    //         text: item.text
    //       })
    //     })
    //   }
    //   data.items = newArray;
    // }   

    const initData = () => {
      // 定义 newArray
      let newArray = [];
      props.foodData?.items?.forEach((item, index) => {
        newArray.push({
          text: item.text
        })
        if (data.activeIndex === index) {
          data.subItem = item.children;
        }
      })
      data.items = newArray;
    }
    // 写完调用一下
    initData();

    const navClick = (i) => {
      console.log(i);
      data.activeIndex = i;
      initData();
    };

    const handleAdd = (id) => {
      data.subItem.forEach((item) => {
        if (item.id === id) {
          item.add = false;
          item.num += 1;
        }
      })
    };

    const handleChange = (value,detail) => {
      data.subItem.forEach((item) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      })
      console.log(data.subItem);
    };

    return {
      ...toRefs(data),
      navClick,
      handleAdd,
      handleChange,
    };
  }
};
</script>

<style lang="less" scoped>
.food-list {
  margin-top: 20px;

  .item-bg {
    padding: 10px;
  }
}

/deep/ .van-tree-select__item--active {
  color: #ffc400;
}

/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>
