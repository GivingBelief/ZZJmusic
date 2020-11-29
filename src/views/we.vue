<template>
    <div class="we">
        <tab_bar v-bind:id="3"></tab_bar>
        we
    </div>
</template>

<script> import tabbar from '@/components/tabbar.vue';

export default {
    name: "we", components: {
        'tab_bar': tabbar
    },
}
</script>

<style scoped>
    .we{
        margin-top: 1.4rem;
    }
</style>