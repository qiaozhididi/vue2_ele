<template>
    <div class="star-content" :class="`size-${size}`">
        <span v-for="(star,index) in starItems" :key="index" :class="[`stars-${size}`,`star-${star}`]"></span>
    </div>
</template>

<script>
    const starCount = 5;
    export default {
        name: "star",
        props: {
            score: {
                type: Number,
                default: 0
            },
            size: {
                type: Number,
                default: 48
            }
        },
        // 用计算属性里处理分数对应的星星显示状态
        computed: {
            starItems() {
                let num = Math.floor(this.score * 2) / 2;
                let result = [];
                for (var i = 0; i < starCount; i++) {
                    if (i < Math.floor(num)) {
                        result.push("on");
                    } else if (i == Math.floor(num) && i < num) {
                        result.push("half");
                    } else {
                        result.push("off")
                    }
                }
                return result;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .star-content {
        &.size-48 {
            height: 24px;
        }

        &.size-36 {
            height: 18px;
        }

        &.size-24 {
            height: 12px;
        }
    }

    @include stars(48, 24);
    @include stars(36, 8);
    @include stars(24, 2);

    @media screen and (max-width: 360px) {
        @include stars(36, 3);
    }
</style>