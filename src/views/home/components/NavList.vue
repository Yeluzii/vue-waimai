<template>
    <div v-for="(item, index) in navList" :key="index">
        <nav-list-item :itemContent="item"/>
    </div>
</template>

<script>
import NavListItem from './NavListItem.vue'
export default {
    props: ["navList"],
    components: { NavListItem },
};
</script>