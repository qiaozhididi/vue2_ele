<template>
    <div class="el-goods">
        <div class="goods-wrapper">
            <!-- 左边菜单模块 -->
            <div class="goods-menu" ref="menu">
                <div>
                    <div
                            class="menu-item"
                            v-for="(g, index) in goods"
                            :key="index"
                            :class="{ active: currentIndex === index }"
                            @click="scrollToCurrentGoods(index)"
                    >
                        <div class="item-cell">
                            <span class="icon" :class="supportsClassMap[g.type]" v-if="g.type >= 0"></span>
                            <span class="menu-name">{{ g.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右边菜单模块 -->
            <div class="goods-list" ref="goodsList">
                <div>
                    <div class="goods-item" ref="goodsItems" v-for="(g, index) in goods" :key="index">
                        <h2 class="goods-subtitle">{{ g.name }}</h2>

                        <!--具体食物内容 -->
                        <div class="food-wrapper">
                            <div class="food-container" v-for="(f,i) in g.foods" :key="i">
                                <img :src="f.icon" alt="商品图片" class="food-icon" />

                                <div class="food-content">
                                    <div class="name">{{f.name}}</div>
                                    <div class="food-desc" v-show="f.description">{{f.description}}</div>
                                    <div class="food-rating">月售{{f.sellCount}}份 好评率{{f.rating}}%</div>
                                    <div class="food-price">
                                        <span class="new-price">￥{{f.price}}</span>
                                        <span class="old-price" v-show="f.oldPrice">￥{{f.oldPrice}}</span>
                                    </div>
                                </div>

                                <!-- 购物车按钮 -->
                                <div class="btn-wrapper">
                                    <BtnControl @dec="decFood" :name="f.name" :count="f.count" @add="addFood" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 购物车组件 -->
        <ShopCart :shopCartList="shopCartList" :seller="seller" @add="addFood" @dec="decFood"/>
    </div>
</template>
<script>
    import BtnControl from "../components/BtnControl/BtnControl";
    import ShopCart from "../components/ShopCart/ShopCart";
    import BScroll from "better-scroll";
    export default {
        data: "goodsView",
        props: ["supportsClassMap", "seller"],
        data: () => ({
            goods: [],
            currentIndex: 0,
            goodsItemHeightArr: [0]
        }),

        // 计算属性，过滤购买数量为0的食品
        computed: {
            shopCartList() {
                let result = [];
                this.goods.forEach(g => {
                    g.foods.forEach(f => {
                        // 如果没有购物的数据，不把数据添加到购物车数组中
                        if (f.count > 0) {
                            // 判断是否为相同的食品
                            let food = result.find(item => item.name === f.name);
                            if (!food) {
                                result.push(f);
                            }
                        }
                    });
                });
                // console.log(result);
                return result;
            }
        },
        methods: {
            // 添加食物
            addFood({ name, num }) {
                // 数量添加，在之前的基础添加数量（问题在于：创建不存在购买数量键值对）
                // console.log(name,num)
                this.goods.forEach(item => {
                    item.foods.forEach(food => {
                        if (food.name === name) {
                            // 可以理解为强制创建键值对
                            this.$set(food, "count", num);
                            // console.log(food);
                        }
                    });
                });
            },

            // 减少对应的食物
            decFood({ name, num }) {
                console.log(name, num);
                this.goods.forEach(item => {
                    item.foods.forEach(food => {
                        if (food.name === name) {
                            food.count = num;
                        }
                    });
                });
            },

            async getGoodsData() {
                let res = await this.axios("/api/goods");
                // 请求到数据之后，赋值给本地变量
                this.goods = res.data;
                // console.log(this.goods);

                this.$nextTick(() => {
                    this.initBetterScroll();
                    // 要等数据请求成功，页面渲染完成，才能获得高度
                    this.calculateGoodItemHeight();
                });
            },
            scrollToCurrentGoods(index) {
                this.currentIndex = index;

                // 根据左边点击的索引值取到对应索引值的要移动的高度
                let offsetY = -this.goodsItemHeightArr[index];
                console.log(offsetY);
                this.goodsList.scrollTo(0, offsetY, 500);
            },
            // 左右两边可以滚动--执行better-scroll必须要等数据请求过来和数据渲染完成
            initBetterScroll() {
                if (this.menuScroll) {
                    this.menuScroll.refresh();
                } else {
                    // 左边滚动
                    this.menuScroll = new BScroll(this.$refs.menu, {
                        scrollY: true,
                        click: true //使用better-scroll后会阻止原生的点击事件
                    });
                }

                if (this.goodsList) {
                    this.goodsList.refresh();
                } else {
                    // 右边滚动
                    this.goodsList = new BScroll(this.$refs.goodsList, {
                        scrollY: true,
                        probeType: 2, // 参数1，2和3的区别
                        click: true
                    });
                }

                // 给右边的better-scroll滚动框加上滚动事件
                this.goodsList.on("scroll", this.goodsWrapperScroll);
            },

            // 右边滚动，左边高亮变化
            goodsWrapperScroll({ y }) {
                // y代表在y轴上的偏移量
                // console.log(y);

                if (y > 0) {
                    // 左边是否高亮是通过currentIndex来判断的
                    this.currentIndex = 0;
                } else {
                    y = Math.abs(y);
                    for (var i = 0; i < this.goodsItemHeightArr.length - 1; i++) {
                        let h1 = this.goodsItemHeightArr[i];
                        let h2 = this.goodsItemHeightArr[i + 1];
                        // console.log(h1, h2);
                        if (y <= h2 && y >= h1) {
                            this.currentIndex = i;
                        }
                    }
                }
            },

            // 计算右边每个菜式模块的高度
            calculateGoodItemHeight() {
                let items = this.$refs.goodsItems;
                // console.log(items);
                let h = 0;
                for (var i = 0; i < items.length; i++) {
                    h = h + items[i].offsetHeight;
                    // 把要移动的高度记录到数组中a
                    this.goodsItemHeightArr.push(h);
                }
                // console.log(this.goodsItemHeightArr);
            }
        },
        mounted() {
            this.getGoodsData();
        },
        components: {
            ShopCart,
            BtnControl
        }
    };
</script>
<style lang="scss" scoped>
    .el-goods {
        width: 100%;
        position: fixed;
        top: 175px;
        bottom: 0;
        left: 0;
        bottom: 0;
        .goods-wrapper {
            display: flex;
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 56px;
            .goods-menu {
                flex: 0 0 80px;
                width: 80px;
                background: #f3f5f7;
                overflow: hidden;
                .menu-item {
                    display: table;
                    height: 54px;
                    width: 100%;
                    font-size: $xs-size;
                    font-weight: 200;

                    &.active {
                        background: #fff;
                        .menu-name {
                            font-weight: 700;
                        }
                    }

                    .item-cell {
                        display: table-cell;
                        vertical-align: middle;
                        padding: 0 12px;
                        text-align: center;
                        // border-bottom: 1px solid eleblack(0.1);
                        // line-height: 54px;

                        .menu-name {
                            line-height: 14px;
                        }
                        .icon {
                            display: inline-block;
                            width: 12px;
                            height: 12px;
                            vertical-align: top;
                            margin-right: 4px;
                            @include supports(3, 12px 12px);
                        }
                    }
                }
            }
            .goods-list {
                flex: 1;
                overflow: hidden;
                .goods-subtitle {
                    font-size: $sm-size;
                    color: rgb(147, 153, 159);
                    height: 26px;
                    line-height: 26px;
                    background: #f3f5f7;
                    border-left: 2px solid #d9dde1;
                    padding-left: 14px;
                }

                .food-wrapper {
                    padding: 0 18px;
                }
                .food-container {
                    position: relative;
                    display: flex;
                    padding: 18px 0;
                    border-bottom: 1px solid eleblack(0.1);
                    .food-icon {
                        flex: 0 0 57px;
                        width: 57px;
                        height: 57px;
                        margin-right: 10px;
                        border-radius: 4px;
                    }
                    .food-content {
                        flex: 1;
                        .name {
                            font-size: $md-size;
                            color: eleblack(1);
                            line-height: 14px;
                            margin-top: 2px;
                        }
                        .food-desc {
                            max-width: 40vw;
                            padding-top: 8px;
                            padding-bottom: 1.5px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .food-rating {
                            padding: 8px 0;
                        }
                        .food-desc,
                        .food-rating {
                            font-size: $xs-size;
                            line-height: 10px;
                            color: rgb(147, 153, 159);
                        }

                        .new-price {
                            font-size: $md-size;
                            font-weight: 700;
                            font-weight: normal;
                            line-height: 24px;
                            color: red;
                        }

                        .old-price {
                            font-size: $xs-size;
                            line-height: 24px;
                            color: rgb(147, 153, 159);
                            margin-left: 8px;
                            text-decoration: line-through;
                        }
                    }

                    .btn-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 20px;
                    }
                }
            }
        }
    }
</style>