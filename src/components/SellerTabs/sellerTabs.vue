<template>
    <div class="seller-tabs">
        <router-link to="/" tag="div" class="tab-item">商品</router-link>
        <router-link to="/ratings" tag="div" class="tab-item">评论</router-link>
        <router-link to="/seller" tag="div" class="tab-item">商家</router-link>
    </div>
</template>

<script>
export default {
    name:'SellerTabs'
}
</script>
<style lang="scss" scoped>
    .seller-tabs{
        background: #FFF;
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .tab-item{
            flex: 1;
            color: rgb(77,85,93);
            font-size: 14px;
            &.link-active{
                color: rgb(240,20,20);
            }
        }
    }

</style>