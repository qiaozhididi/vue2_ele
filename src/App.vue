<template>
    <div id="app">
        <!-- 头部 -->
        <EleHeader :seller="seller" :supportsClassMap="supportsClassMap" :index="index"></EleHeader>
        <SellerTabs></SellerTabs>

        <router-view :seller="seller" :supportsClassMap="supportsClassMap"/>
    </div>
</template>

<script>
    // 引入组件路径
    import SellerTabs from "./components/SellerTabs/sellerTabs";
    import EleHeader from "./components/EleHeader/EleHeader";


    // import axios from "axios";
    export default {
        data: () => ({
            timer:null,
            index:0,
            seller: {},
            // 定义优惠类型的变量数组
            supportsClassMap:[
                'decrease',
                'discount',
                'special',
                'invoice',
                'guarantee'

                ]
        }),
        methods: {

            // 用axios请求数据 —— ES7写法
            async getSellerData() {
                try {
                    let res = await this.axios("http://shixun.com/seller.php");
                    console.log(res);
                    // 请求到的数据赋值给本地变量
                    this.seller = res.data;
                    this.startSlider(this.seller.supports);
                    console.log(this.seller);
                } catch (e) {
                    console.error(e)
                }
            },
            // async getPhpData() {
            //     try {
            //         let res = await this.axios("http://shixun.com/connect.php");
            //         console.log(res);
            //     } catch (e) {
            //         console.error(e)
            //     }
            // },
            startSlider(arr){
                // 如果商家的优惠信息（后台返回来的），并且优惠信息要有两个或者两个以上才能轮播
                if(arr && arr.length > 1){
                    this.timer = setInterval(() => {
                        this.index++;
                        if(this.index >= arr.length){
                            this.index = 0;
                        }
                    },1500);
                }

            }
        },
        mounted() {
            // 执行函数，请求数据
            this.getSellerData();
            // 运行请求php请求函数
            // this.getPhpData();
        },
        // 把引入的组件注册成子组件
        components: {
            SellerTabs,
            EleHeader
        },
    };
</script>

<style lang="scss" scoped>

</style>