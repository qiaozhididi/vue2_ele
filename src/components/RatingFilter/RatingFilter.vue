<template>
    <div class="rating-filter">
        <div class="filter-btn">
            <span class="btn-item positive" :class="{ active:selected === 2 }" @click="changeSelected(2)">全部
            <span class="count">{{ratings.length}}</span>
            </span>
            <span class="btn-item positive" :class="{ active:selected=== 0 }" @click="changeSelected(0)">满意
            <span class="count">{{positiveCount}}</span>
            </span>
            <span class="btn-item negative" :class="{ active:selected === 1 }" @click="changeSelected(1)">不满意
            <span class="count">{{negativeCount}}</span>
            </span>
        </div>
        <div class="only-content" :class="{ active:onlyContent }">
            <span class="icon-check_circle" @click="toggleOnlyContent"></span>
            <span class="text">只有内容评价</span>
        </div>
    </div>
</template>

<script>
    export default {
        data:()=>({}),
        name: "RatingFilter",
        props: {
            selected: {
                type: Number,
                default: 2,
            },
            onlyContent: {
                type: Boolean,
                default: true,
            },
            ratings:{
                type:Array,
            },
        },
        // 计算属性
        computed:{
        positiveCount(){
            let count = 0;
            this.ratings.forEach((item)=>{
                if (item.rateType === 0){
                    count++;
                }
            });
            return count;
        },
            negativeCount(){
                let count = 0;
                this.ratings.forEach((item)=>{
                    if (item.rateType === 1){
                        count++;
                    }
                });
                return count;
            },
        },

        methods: {
            changeSelected(arg) {
                // this.selected = arg
                this.$emit('update:selected',arg)
            },
            toggleOnlyContent() {
                // this.onlyContent = !this.onlyContent
                this.$emit('update:onlyContent', !this.onlyContent)
            }
        }
    }
</script>


<style lang="scss" scoped>
    .rating-filter {
        padding: 18px 18px 0;
        border-bottom: 1px solid eleblack(0.1);

        .filter-btn {
            padding-bottom: 18px;
            border-bottom: 0.5px solid eleblack(0.1);

            .btn-item {
                display: inline-block;
                border-radius: 1px;
                color: #666;
                font-size: $md-size;
                line-height: 16px;
                margin-right: 8px;
                padding: 8px 12px;

                .count {
                    font-size: 8px;
                    margin-left: 2px;
                }
            }

            .positive {
                background: rgba(0, 160, 220, 0.2);

                &.active {
                    color: white;
                    background: #00a0dc;
                }
            }

            .negative {
                background: #ccc;

                &.active {
                    background: #666;
                    color: white;
                }
            }
        }

        .only-content {
            padding: 12px 0;
            line-height: 24px;

            &.active {
                .icon-check_circle {
                    color: #00b43c;
                }
            }

            .icon-check_circle {
                color: #999;
                font-size: 24px;
                margin-right: 4px;
            }

            .text {
                color: #999;
                font-size: 12px;
                // display: inline-block;
                vertical-align: top;
            }
        }
    }
</style>
