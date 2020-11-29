<template>
    <div class="search">
        <tab_bar v-bind:id="2"></tab_bar>
        search
    </div>
</template>

<script> import tabbar from '@/components/tabbar.vue';

export default {
    name: "search", components: {
        'tab_bar': tabbar
    },
}
</script>

<style scoped>
    .search{
        margin-top: 1.4rem;
    }
</style>