<template>
    <div class="container">
        <mt-header fixed title="学无止境-网课随心购"></mt-header>
        <!-- <h1>这是App组件</h1> -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopping">
                <span class="mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">9</span>
                </span>
                <!-- <span class="mui-icon-extra mui-icon-extra-cart"></span> -->
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
    };
</script>
<style lang="scss" scoped>
    .container {
        margin-top: 40px;
    }
    .mui-icon-extra {
        font-family: MuiiconSpread;
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
    }
    .mui-bar .mui-icon-extra {
        font-size: 24px;
        position: relative;
        z-index: 20;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .mui-bar-tab .mui-tab-item .mui-icon-extra {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item .mui-icon-extra ~ .mui-tab-label[data-v-7ba5bd90] {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /* 徽章badge */
    .mui-icon-extra .mui-badge {
        font-size: 10px;
        line-height: 1.4;
        position: absolute;
        top: -2px;
        left: 100%;
        margin-left: -10px;
        padding: 1px 5px;
        color: #fff;
        background: red;
    }

    /*购物车原本样式*/
    /* 去掉mui-icon之前相关的样式，和mui-icon-extra现有样式对比*/
    /* .mui-icon {
        font-family: Muiicons;
        font-size: 24px;
        font-weight: 400;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
    }
    .mui-bar .mui-icon {
        font-size: 24px;
        position: relative;
        z-index: 20;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .mui-bar-tab .mui-tab-item .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item .mui-icon ~ .mui-tab-label[data-v-7ba5bd90] {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mui-icon .mui-badge {
        font-size: 10px;
        line-height: 1.4;
        position: absolute;
        top: -2px;
        left: 100%;
        margin-left: -10px;
        padding: 1px 5px;
        color: #fff;
        background: red;
    } */
</style>
