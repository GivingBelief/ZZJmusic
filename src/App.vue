<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
        outline: none;
        list-style: none;
        text-decoration: none;
    }

    ::-webkit-scrollbar {
        display: none !important;
    }

    .aplayer {
        transform: none !important;
        margin-top: 1.4rem !important;
        margin-bottom: 1.8rem !important;
    }

    .aplayer-body {
        margin: 0 !important;
        background-color: skyblue;
        position: fixed !important;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.8rem;
        z-index: 999;
    }

    .aplayer .aplayer-body .aplayer-info {
        padding: 0 7px 0 10px !important;
    }

    .aplayer .aplayer-body .aplayer-info .aplayer-title {
        display: inline-block;
        width: 3rem !important;
        /*background-color: #f00;*/
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.4rem !important;
    }

    .aplayer .aplayer-body .aplayer-info .aplayer-author {
        display: inline-block;
        width: 4rem !important;
        /*background-color: #f0f;*/
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .aplayer-list ol {
        font-size: 0.4rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.313rem 0.313rem 0 0.313rem;
    }

    .aplayer-list ol li .aplayer-list-index {
        display: none !important;
    }

    .aplayer-list ol li {
        display: flex;
        flex-direction: column;
        overflow: initial !important;
        line-height: 0.5rem !important;
        padding: 0 !important;
        border-top: none !important;
        height: auto !important;
        margin-bottom: 0.267rem !important;
    }

    .aplayer-list ol li .aplayer-list-title {
        display: inline-block;
        width: 2.667rem;
        white-space: nowrap; /*不允许换行*/
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*文本超出三点代替*/
        text-align: center;
        flex-grow: 0 !important;
    }

    .aplayer-list ol li .aplayer-list-author {
        display: inline-block;
        width: 2.667rem;
        white-space: nowrap; /*不允许换行*/
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*文本超出三点代替*/
        text-align: center;
    }

    .newImg {
        width: 2.667rem;
        height: 2.667rem;
        margin-bottom: 0.267rem;
    }
</style>

<script>

    export default {
        name: "app"

    }
</script>

