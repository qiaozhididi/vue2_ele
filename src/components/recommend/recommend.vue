<template>
<div class="recommend-wrapper">
    <span class="thumb" :class="type == 0 ? 'icon-thumb_up' : 'icon-thumb_down'">
    </span>
    <span class="recommend-item" v-for="(r,index) in recommend" :key="index">{{r}}</span>
</div>
</template>

<script>
    export default {
        name: "recommend",
        props:['recommend','type']
    }
</script>


<style lang="scss" scoped>
    .recommend-wrapper {
        line-height: 16px;
        .thumb {
            font-size: $xs-size;
            margin-right: 8px;
            &.icon-thumb_up {
                color: rgb(0, 160, 220);
            }
            &.icon-thumb_down {
                color: #999;
            }
        }
        .recommend-item {
            display: inline-block;
            border: 1px solid eleblack(0.1);
            border-radius: 2px;
            color: rgb(127, 153, 159);
            font-size: 9px;
            margin-right: 8px;
            margin-bottom: 5px;
            text-align: center;
            padding: 0 6px;
        }
    }
</style>