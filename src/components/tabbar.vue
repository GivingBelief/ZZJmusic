<template>
    <div class="tabbar">
        <ul class="oul">
            <router-link to="/new">
                <li :class="{'li_active':li_active_num==0}" @click="music_click">
                    <img v-if="li_active_num==0" src="../assets/images/music_red.png" alt="">
                    <img v-else src="../assets/images/music.png" alt="">
                    最新
                </li>
            </router-link>
            <router-link to="/recommend">
                <li :class="{'li_active':li_active_num==1}" @click="recommend_click">
                    <img v-if="li_active_num==1" src="../assets/images/recommend_red.png" alt="">
                    <img v-else src="../assets/images/recommend.png" alt="">
                    推荐
                </li>
            </router-link>
            <router-link to="/search">
                <li :class="{'li_active':li_active_num==2}" @click="search_click">
                    <img v-if="li_active_num==2" src="../assets/images/search_red.png" alt="">
                    <img v-else src="../assets/images/search.png" alt="">
                    搜索
                </li>
            </router-link>
            <router-link to="/we">
                <li :class="{'li_active':li_active_num==3}" @click="We_click">
                    <img v-if="li_active_num==3" src="../assets/images/We_red.png" alt="">
                    <img v-else src="../assets/images/We.png" alt="">
                    世界
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "tabbar",
        props: ['id'],
        data() {
            return {
                li_active_num: 0,
            }
        },
        mounted() {
            this.li_active_num = this.id
        },
        methods: {
            //最新按钮事件
            music_click() {
                // this.li_active_num = 0
                // this.$router.push({path: '/new'})
            },
            recommend_click() {
                // this.li_active_num = 1
                // this.$router.push({path: '/recommend'})

            },
            search_click() {
                // this.li_active_num = 2
                // this.$router.push({path: '/search'})

            },
            We_click() {
                // this.li_active_num = 3
                // this.$router.push({path: '/we'})

            },
        }
    }
</script>

<style scoped>
    .oul {
        width: 100%;
        height:1.4rem;
        font-size: 0.3rem;
        display: flex;
        justify-content: space-around;
        background-color: skyblue;
        position: fixed;
        left: 0;
        top: 0;
        /*padding-bottom: 0.067rem;*/
    }

    .oul li {
        height: 1.333rem;
        display: flex;
        flex: 1;
        align-items: center;
        color: #fff;
        justify-content: center;
    }

    .oul li:last-of-type img {
        margin-right: 0.107rem;
    }

    .oul li img {
        width: 0.8rem;
        height: 0.8rem;
    }

    .li_active {
        border-bottom: 0.067rem solid #f00;
        color: #f00 !important;
        font-size: 0.5rem;
        letter-spacing: 0.067rem;
        font-weight: bold;
    }

</style>