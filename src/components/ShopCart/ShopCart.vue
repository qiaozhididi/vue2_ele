<template>
    <div class="shop-cart">
        <div class="shopcart-content">
            <div class="shopcart-left">
        <span class="icon-shopping_cart" @click="toggleGoodsList" :class="{active: goodsCount> 0}">
          <span class="cart-badge" v-show="goodsCount">{{goodsCount}}</span>
        </span>
                <span class="price">￥{{goodsPrice}}</span>
                <span class="desc">另需配送费￥{{seller.deliveryPrice}}元</span>
            </div>
            <div class="shopcart-right" :class="{enough:goodsPrice >= seller.minPrice}">{{buyDesc}}</div>
        </div>

        <div class="shopcart-list" v-show="showGoodsList">
            <div class="list-header">
                <span class="title">购物车</span>
                <span class="empty">清空</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <ul>
                    <li class="list-item border-1px" v-for="(food, index) in shopCartList" :key="index">
                        <div class="list-name">{{food.name}}</div>
                        <div class="list-price">￥{{food.price}}</div>
                        <div class="list-btn">
                            <BtnControl :count="food.count" :name="food.name" @add="add" @dec="dec" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg-cover" v-show="showGoodsList" @click="closeGoodsList"></div>
    </div>
</template>
<script>
    import Bscroll from "better-scroll";
    import BtnControl from "../BtnControl/BtnControl";
    export default {
        name: "ShopCart",
        data: () => ({
            switch: false
        }),
        props: ["shopCartList", "seller"],
        components: {
            BtnControl
        },
        computed: {
            showGoodsList() {
                console.log(this.switch);
                if (!this.switch) {
                    return false;
                }
                // // 如果购物车的数量长度为0时，不显示菜单展示模块
                if (this.shopCartList.length <= 0) {
                    // eslint-disable-next-line
                    this.switch = false;
                    return false;
                }
                // 每次购物数量有变化时，重新计算展示盒子的高度
                this.$nextTick(() => {
                    this.initShopCartList();
                });
                // console.log(this.switch)
                return true;
            },

            // 还差多少钱
            buyDesc() {
                let result = `${this.seller.minPrice}元起送`;
                if (this.goodsPrice > 0 && this.goodsPrice < this.seller.minPrice) {
                    result = `还差￥${this.seller.minPrice - this.goodsPrice}元起送`;
                } else if (this.goodsPrice >= this.seller.minPrice) {
                    result = "立即购买";
                }
                return result;
            },

            // 购物车总价格
            goodsPrice() {
                let num = 0;
                this.shopCartList.forEach(f => {
                    num += f.count * f.price;
                });
                return num;
            },

            // 购物车的数量
            goodsCount() {
                let count = 0;
                this.shopCartList.forEach(f => {
                    count += f.count;
                });
                return count;
            }
        },
        methods: {
            add(arg) {
                // console.log(arg);
                // 才跟父组件GoodsView进行数据交互
                this.$emit("add", arg);
            },
            dec(arg) {
                // console.log(arg);
                this.$emit("dec", arg);
            },
            // 关闭购物车菜式内容
            closeGoodsList() {
                this.switch = false;
            },

            // 显示购物菜式内容
            toggleGoodsList() {
                // console.log('显示购物车菜单的内容')
                this.switch = !this.switch;
                // console.log("this.switch的值：", this.switch);
            },
            // 购物车菜式展示  —— 这个玩意在哪里执行？
            initShopCartList() {
                if (this.listScroll) {
                    this.listScroll.refresh();
                } else {
                    this.listScroll = new Bscroll(this.$refs.listWrapper, {
                        scrollY: true,
                        click: true
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .shop-cart {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;

        .shopcart-content {
            position: relative;
            z-index: 50;
            display: flex;
            height: 56px;
            color: rgba(255, 255, 255, 0.4);
            background: #141d27;

            .shopcart-left {
                padding: 12px 0 12px 12px;
                @media screen and (max-width: 360px) {
                    padding: 12px 0 12px 6px;
                }
                flex: 1;
            }

            .icon-shopping_cart {
                position: relative;
                top: -28px;
                margin-right: 12px;
                display: inline-block;
                width: 56px;
                height: 56px;
                line-height: 50px;
                border: 6px solid #141d27;
                border-radius: 50%;
                font-size: 24px;
                text-align: center;
                background: #283338;
                vertical-align: top;
                @media screen and (max-width: 360px) {
                    margin-right: 6px;
                }

                &.active {
                    background: rgb(0, 160, 220);
                    color: #fff;
                }

                .cart-badge {
                    position: absolute;
                    right: 0;
                    top: -6px;
                    display: inline-block;
                    padding: 0 6px;
                    border-radius: 12px;
                    font-size: 9px;
                    line-height: 16px;
                    background: red;
                    color: #fff;
                }
            }

            .price {
                display: inline-block;
                margin-right: 12px;
                font-size: $lg-size;
                font-weight: 700;
                line-height: 24px;
                @media screen and (max-width: 360px) {
                    margin-right: 6px;
                }
            }

            .desc {
                display: inline-block;
                padding-left: 12px;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                font-size: $sm-size;
                font-weight: 200;
                line-height: 24px;
                @media screen and (max-width: 360px) {
                    padding-left: 6px;
                }
            }

            .shopcart-right {
                flex: 0 0 89px;
                padding: 0 8px;
                font-size: $sm-size;
                font-weight: 700;
                line-height: 56px;
                text-align: center;
                background: #283338;

                &.enough {
                    color: #fff;
                    background: #33b04f;
                }
            }
        }

        .shopcart-list {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 46px;
            z-index: 20;

            .list-header {
                padding: 0 18px;
                height: 40px;
                width: 100%;
                line-height: 40px;
                font-size: $md-size;
                font-weight: 200;
                color: eleblack(1);
                background: #f3f5f7;

                .empty {
                    float: right;
                    margin-right: 30px;
                    font-size: $sm-size;
                    color: rgb(0, 160, 220);
                }
            }

            .list-wrapper {
                padding: 0 18px;
                background: #fff;
                max-height: 219px;
                overflow: hidden;
            }

            .list-item {
                display: flex;
                padding: 12px 0;
                line-height: 24px;
                font-size: $md-size;
                // @include border-bottom(eleblack(0.1));

                //   &:last-child {
                //     @include border-none;
                //   }
            }

            .list-name {
                flex: 1;
                color: eleblack(1);
            }

            .list-price {
                margin: 0 12px 0 18px;
                display: inline-block;
                font-weight: 700;
                color: red;

                &:first-letter {
                    font-size: $xs-size;
                    font-weight: normal;
                }
            }

            .list-btn {
                flex: 0 0 72px;
                text-align: right;
            }
        }

        .bg-cover {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: eleblack(0.6);
            backdrop-filter: blur(5px);
            z-index: 12;
        }
    }
</style>