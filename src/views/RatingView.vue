<template>
    <div class="rating-view">
        <!-- 1.0 评分模块 -->
        <div class="rating-rank">
            <div class="rating-score">
                <h2 class="score">{{ seller.score }}</h2>
                <div class="name">综合评分</div>
                <div class="rate">高于周边商家{{ seller.rankRate }}%</div>
            </div>

            <div class="rating-desc">
                <div class="rating-item">
                    <span class="title">服务态度</span>
                    <star :score="seller.serviceScore" :size="36" class="star"/>
                    <span class="score">{{ seller.serviceScore }}</span>
                </div>
                <div class="rating-item">
                    <span class="title">商品评分</span>
                    <star :score="seller.foodScore" :size="36" class="star"/>
                    <span class="score">{{ seller.foodScore }}</span>
                </div>
                <div class="rating-item">
                    <span class="title">送达时间</span>
                    <span class="time">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <WhiteSpace/>

        <!--        评价列表模块-->
        <!--        步骤分析：-->
        <!--        （1）请求到对应的数据-->
        <!--        （2）分析情况，那些模块可以写成组件-->
        <!--        （3）数据传递和交互-->
        <!--        <h1>看子元素传递过来的selected修改效果:{{selected}}</h1>-->
        <!--        <h1>onlyContent:{{onlyContent}}</h1>-->
        <RatingFilter :ratings="ratings" :onlyContent.sync="onlyContent" :selected.sync="selected"/>
        <div class="rating-list">
            <div class="rating-list-item" v-for="(r,i) in ratingsList" :key="i">
                <img :src="r.avatar" alt="头像无法显示" class="rating-avatar">
                <div class="rating-content">
                    <div class="rating-name">{{r.username}}</div>
                    <div class="rating-desc">
                        <star :score="r.score" :size="24" class="star"/>
                        <span class="delivery" v-show="r.deliveryTime">{{r.deliveryTime}}分钟送达</span>
                    </div>
                    <div class="rating-text">{{r.text}}</div>
                    <div class="rating-recommend" v-show="r.recommend.length">
                        <recommend :type="r.rateType" :recommend="r.recommend"/>
                    </div>
                </div>
                <div class="rating-time">{{r.rateTime | getTemplateDate}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    //2代表全部：1代表不满意：2代表满意
    import star from "../components/star/star";
    import WhiteSpace from "../components/whiteSpace/WhiteSpace";
    import RatingFilter from "../components/RatingFilter/RatingFilter";
    import Recommend from "../components/recommend/recommend";
    //引入时间戳函数
    import {getTemplateDate} from "../js/tool";

    export default {
        name: "RatingView",
        props: ["seller"],
        data: () => ({
            ratings: [],
            selected: 2,
            onlyContent: true,
        }),
        components: {
            Recommend,
            RatingFilter,
            WhiteSpace,
            star,
        },
        filters: {
            getTemplateDate,
        },
        methods: {
            async getRatingData() {
                let res = await this.axios("/api/ratings")
                this.ratings = res.data;
                console.log(this.ratings)
            }
        },

        mounted() {
            this.getRatingData()
        },
        // 用计算属性来书写过滤
        // ES6写法：
        // result = result.filter((item)=> item.rateType == 0);
        computed: {
            ratingsList() {
                let result = this.ratings;
                // 根据满不满意来筛选评论的数量
                if (this.selected == 0) {
                    // filter是对数组进行处理的方法，不是过滤器中的fillter
                    // result = result.filter(function (item) {
                    //     return item.rateType == 0
                    // });
                    result = result.filter((item) => item.rateType == 0);
                };

                if (this.selected == 1) {
                    // filter是对数组进行处理的方法，不是过滤器中的fillter
                    // result = result.filter(function (item) {
                    //     return item.rateType == 1
                    // });
                    result = result.filter((item) => item.rateType == 1);
                };

                // 过滤是否只读
                if(this.onlyContent){
                    // result = result.filter(function (item) {
                    //     return item.text;
                    // })
                result = result.filter((item)=> item.text);
                }
                // 把最终结果返回出去
                return result;
            },

        }
    };

</script>


<style lang="scss" scoped>
    .rating-rank {
        display: flex;
        padding: 18px 0;

        .rating-score {
            flex: 0 0 137px;
            width: 137px;
            text-align: center;
            border-right: 1px solid #d9dde1;
            @media screen and (max-width: 365px) {
                flex: 0 0 120px;
                width: 120px;
            }

            .score {
                font-size: 24px;
                line-height: 28px;
                color: rgb(255, 153, 0);
                padding: 0 6px;
            }

            .name {
                margin-bottom: 8px;
                font-size: $md-size;
                line-height: 12px;
                color: eleblack(1);
            }

            .rate {
                font-size: $xs-size;
                line-height: 10px;
                color: #999;
                margin-bottom: 6px;
            }
        }

        .rating-desc {
            flex: 1;
            padding: 0 24px;
            @media screen and (max-width: 400px) {
                padding: 0 12px;
            }
            @media screen and (max-width: 360px) {
                padding: 0 8px;
            }

            .rating-item {
                margin-bottom: 8px;

                &:last-child {
                    margin-bottom: 0;
                }

                .title {
                    display: inline-block;
                    color: eleblack(1);
                    line-height: 18px;
                    font-size: $sm-size;
                    margin-right: 12px;
                    @media screen and (max-width: 380px) {
                        margin-right: 6px;
                    }
                    @media screen and (max-width: 360px) {
                        margin-right: 3px;
                    }
                }

                .star {
                    display: inline-block;
                    vertical-align: middle;
                }

                .score {
                    font-size: $sm-size;
                    line-height: 18px;
                    color: rgb(255, 153, 0);
                    margin-left: 12px;
                    @media screen and (max-width: 380px) {
                        margin-left: 6px;
                    }
                    @media screen and (max-width: 360px) {
                        margin-right: 3px;
                    }
                }

                .time {
                    font-size: $sm-size;
                    color: rgb(147, 153, 159);
                    line-height: 18px;
                }
            }
        }
    }

    .rating-list {
        padding: 0 18px;

        .rating-list-item {
            position: relative;
            display: flex;
            padding: 18px 0;

            border-bottom: 1px solid eleblack(0.1);

            .rating-avatar {
                flex: 0 0 28px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                margin-right: 12px;
            }

            .rating-content {
                flex: 1;

                .rating-name {
                    font-size: $xs-size;
                    color: eleblack(1);
                    line-height: 12px;
                }

                .rating-desc {
                    margin: 4px 0px 6px;
                    line-height: 12px;

                    .star {
                        display: inline-block;
                        margin-right: 6px;
                    }

                    .delivery {
                        font-size: $xs-size;
                        color: rgb(147, 153, 159);
                        font-weight: 200;
                    }
                }

                .rating-text {
                    font-size: $sm-size;
                    line-height: 18px;
                    color: eleblack(1);
                }

                .rating-recommend {
                    margin-top: 8px;
                }
            }

            .rating-time {
                position: absolute;
                right: 0px;
                top: 18px;
                line-height: 12px;
                color: rgb(147, 153, 159);
                font-size: $xs-size;
            }
        }
    }
</style>