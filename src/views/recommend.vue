<template>
    <div class="recommend">
        <tab_bar v-bind:id="1"></tab_bar>
        recommend
    </div>
</template>

<script>
    import tabbar from '@/components/tabbar.vue';
    export default {
        name: "recommend",
        components:{
            'tab_bar':tabbar
        },
    }
</script>

<style scoped>
    .recommend{
        margin-top: 1.4rem;
    }
</style>