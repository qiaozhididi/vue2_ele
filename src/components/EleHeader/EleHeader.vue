<template>
    <div class="ele-header" @click="openCover">
        <!-- 看到效果图，知道怎么进行布局(标签书写和嵌套) -->
        <div class="container">
            <img :src="seller.avatar" alt="商家图片" class="avatar"/>
            <div class="content">
                <div class="title">
                    <span class="ele-brand"></span>
                    <span>{{seller.name}}</span>
                </div>
                <div class="desc">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
<!--                轮播图-->
<!--                难点：轮播图要等到有数据才能进行轮播（以前图片都是本地，都是直接使用）-->
<!--                    要有优惠信息的数据，优惠个数大于1-->

                <ul class="supports">
                    <li v-for="(supports,i) in seller.supports" :key="i" class="supports-item" v-show="i == index">
                    <span class="supports-icon" :class="supportsClassMap[supports.type]"></span>
                        {{supports.description}}
                    </li>
                </ul>
            </div>
            <div class="supports-count">
<!--                拓展点：v-if和v-show的区别-->
<!--                因为请求数据是需要时间的，在请求数据前，这段代码已经被渲染了，这是，seller数据是空，自然没有supports这个数据，就没有长度，所以报错-->
                {{isSupports || 0}}个
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin">
            {{seller.bulletin}}
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <desc-cover :seller="seller" :supportsClassMap="supportsClassMap" v-show="show" @closeCover="closeCove"></desc-cover>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
    </div>
</template>

<script>
    //引入遮罩层
    import DescCover from "./DescCover";
    export default {
        data: () => ({
            show:false
        }),
        methods:{
            openCover(){
                console.log("打开遮罩层")
                this.show = true;
            },
            //关闭遮罩层的方法
            closeCove(){
                this.show = false;
            }
        },
        name:'EleHeader',
        components: {DescCover},
        // 用props接受父组件传递过来的值
        props:['seller','supportsClassMap','index'],
        // 在生命周期中查看是否有值传递过来
        mounted(){},


        // 计算属性：监听某些可变数据，根据这些数据返回一个新的变量，
        computed:{
            isSupports(){
                //如果数据存在（请求回来），就显示，否则显示为0
                return this.seller.supports && this.seller.supports.length;
            }
    }
    };
</script>

<style lang="scss" scoped>
    .ele-header {
        position: relative;
        color: $e-white;
        background: eleblack(0.5);
        .bg-header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            // 降低这个图片标签的层级
            z-index: -1;
            // 模糊度
            filter: blur(10px);
        }
    }

    .container {
        position: relative;
        display: flex;
        padding: 24px 12px 18px 24px;
        .avatar {
            flex: 0 0 64px;
            width: 64px;
            height: 64px;
            margin-right: 16px;
            border-radius: 2px;
        }
        .content {
            flex: 1;
            padding: 2px 0;

            .title {
                font-size: $lg-size;
                line-height: 18px;
                font-weight: bold;
            }
            .ele-brand {
                display: inline-block;
                width: 30px;
                height: 18px;
                vertical-align: top;
                margin-right: 6px;
                @include bg-img("/image/brand", 30px 18px);
            }
            .desc {
                font-size: $sm-size;
                font-weight: 200;
                line-height: 12px;
                margin: 8px 0 10px;
                // color: rgb(255, 255, 255)
            }
            .supports {
                width: 80%;
                height: 12px;
                margin-top: 10px;
                overflow: hidden;
            }
            .supports-item {
                font-size: $sm-size;
                font-weight: 200;
                line-height: 12px;

                // 只在一行显示，超出的文本用...来替代
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .supports-icon {
                vertical-align: top;
                display: inline-block;
                margin-right: 4px;
                width: 12px;
                height: 12px;
                background: #fff;

                @include supports(1, 12px 12px);
            }
        }

        .supports-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 7px 8px;
            background: rgba(0, 0, 0, 0.2);
            font-weight: 200;
            line-height: 12px;
            border-radius: 12px;
            font-size: $xs-size;
            .icon-keyboard_arrow_right {
                margin-left: 2px;
                vertical-align: bottom;
            }
        }
    }

    .bulletin {
        position: relative;
        padding: 0 18px 0 12px;
        height: 28px;
        line-height: 28px;
        background: eleblack(0.2);
        font-size: $xs-size;
        font-weight: 200;

        // 只在一行显示，超出的文本用...来替代
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .bulletin-icon {
            display: inline-block;
            width: 22px;
            height: 12px;
            vertical-align: middle;
            margin-right: 4px;
        }

        .icon-keyboard_arrow_right {
            position: absolute;
            right: 12px;
            top: 10px;
        }
    }
    .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
    }
</style>