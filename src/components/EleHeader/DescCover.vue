<template>
    <div class="desc-cover">
        <div class="container">
            <h2 class="title">{{seller.name}}</h2>
            <div class="star-wrapper">
            <star :score="seller.score"></star>
            </div>
            <DescTitle title="优惠信息"></DescTitle>
            <ul class="supports">
                <li v-for="(supports,i) in seller.supports" :key="i" class="supports-item">
                    <span class="supports-icon" :class="supportsClassMap[supports.type]"></span>
                    {{supports.description}}
                </li>
            </ul>
            <DescTitle title="商家公告"></DescTitle>
            <div class="cover-bulletin">{{seller.bulletin}}</div>
        </div>
        <div class="icon-close" @click.stop="closeDesc"></div>
    </div>
</template>

<script>
    import DescTitle from "./DescTitle";
    import Star from "../star/star";
    export default {
           props: ['seller','supportsClassMap'],
        components: {Star, DescTitle},
        methods:{
               closeDesc (){
                   console.log("关闭遮罩层")
                   //this.$emit可携带参数
                    this.$emit("closeCover");
    },
        },
    };

</script>


<style lang="scss" scoped>
    .desc-cover {
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: eleblack(0.7);

        // 给模糊度
        // filter: blur(10px);
        // filter 只能模糊容器内部元素，backdrop-filter让元素自身产生毛玻璃效果
        backdrop-filter: blur(10px);

        .container {
            padding: 64px 36px;

            .title {
                text-align: center;
            }

            .star-wrapper {
                margin-top: 28px;
                text-align: center;
            }
            .supports-item {
                font-size: $sm-size;
                font-weight: 200;
                line-height: 12px;
                margin-left: 12px;
                padding-bottom: 12px;
                // 只在一行显示，超出的文本用...来替代
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:last-child {
                    padding-bottom: 0px;
                }
            }
            .supports-icon {
                vertical-align: top;
                display: inline-block;
                margin-right: 6px;
                width: 16px;
                height: 16px;
                // background: #fff;
                @include supports(2, 16px 16px);
            }
            .cover-bulletin {
                font-size: $sm-size;
                line-height: 24px;
                font-weight: 200;
                padding: 0 12px;
            }
        }

        .icon-close {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 32px;
            font-size: 32px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
</style>