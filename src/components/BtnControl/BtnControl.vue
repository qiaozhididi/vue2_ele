<template>
    <div class="btn-control">
        <span class="icon-remove_circle_outline btn" @click="dec" v-show="num"></span>
        <span class="count" v-show="num >0">{{num}}</span>
        <span class="icon-add_circle btn" @click="add"></span>
    </div>
</template>

<script>
    export default {
        name: 'BtnControl',
        props: ["name", "count"],
        // 计算属性
        computed: {
            num() {
                if (this.count) {
                    return this.count
                } else {
                    return 0
                }
            }
        },
        methods: {
            add() {
                this.$emit('add', {
                    name: this.name,
                    num: this.num + 1
                })
            },
            dec() {
                this.$emit('dec', {
                    name: this.name,
                    num: this.num - 1
                })
            }
        }
    }
</script>


<style lang="scss" scoped>
    .btn-control {
        .btn {
            display: inline-block;
            font-size: 24px;
            color: rgb(0, 160, 220);
            line-height: 24px;
            vertical-align: top;
        }
        .count {
            display: inline-block;
            width: 24px;
            font-size: $xs-size;
            line-height: 24px;
            color: #00a0dc;
            text-align: center;
        }
    }
</style>