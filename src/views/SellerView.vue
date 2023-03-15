<template>
  <div class="seller-view">
    <div class="seller-header">
      <div class="header-top">
        <div class="seller-content">
          <div class="seller-name title-label">{{seller.name}}</div>
          <div class="content-desc">
            <star :score="seller.score" :size="36" class="star"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="seller-right" @click="favorite =!favorite">
          <div class="icon-favorite" :class="{favorite}"></div>
          <div class="favorite-status">{{favorite ? '已收藏':'未收藏'}}</div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="seller-score-item">
          <div class="seller-score-title">起送价</div>
          <div class="seller-score-desc">
            {{seller.minPrice}}
            <span class="small=letter">元</span>
          </div>
        </div>
        <div class="seller-score-item">
          <div class="seller-score-title">商家配送</div>
          <div class="seller-score-desc">
            {{seller.deliveryPrice}}
            <span class="small=letter">元</span>
          </div>
        </div>
        <div class="seller-score-item">
          <div class="seller-score-title">平均配送时间</div>
          <div class="seller-score-desc">
            {{seller.deliveryTime}}
            <span class="small=letter">分钟</span>
          </div>
        </div>
      </div>
    </div>
    <WhiteSpace />

    <div class="seller-bulletin">
      <div class="title-label">公告与活动</div>
      <div class="bulletin-content">{{seller.bulletin}}</div>
      <ul class="supports">
        <li v-for="(supports,i) in seller.supports" :key="i" class="supports-item">
          <span class="supports-icon" :class="supportsClassMap[supports.type]"></span>
          {{supports.description}}
        </li>
      </ul>
    </div>
    <WhiteSpace />
    <div class="seller-pics">
      <div class="title-label">商家实景</div>
      <div class="pics-wrapper" ref="picsWrapper">
        <!--                ref的作用：在vue中，不用document对象获得元素，一般都只用ref获取元素-->

        <!--                图片张数是要在数据传递过来后才能确定，-->
        <!--                所以better-scorll必须要在数据请求成功后，才能使用-->
        <!--                （侧重点：跟我们平时写的静态页面不一样，因为我请求数据是有一定时间的，-->
        <ul ref="picsUl">
          <li class="pic" v-for="(pic,index) in seller.pics" :key="index">
            <img :src="pic" alt="pic无法显示" width="100%" height="100%" />
          </li>
        </ul>
      </div>
    </div>
    <WhiteSpace />
    <div class="seller-desc">
      <div class="title-label">商家信息</div>
      <ul class="info-container">
        <li v-for="(info,i) in seller.infos" :key="i" class="list-item">{{info}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import star from "../components/star/star";
import WhiteSpace from "../components/whiteSpace/WhiteSpace";
import BScroll from "better-scroll";

export default {
  name: "SellerView",
  data: () => ({
    favorite: true
  }),
  props: ["seller", "supportsClassMap"],
  components: {
    WhiteSpace,
    star
  },
  methods: {
    sellerPicsScroll() {
      // 强撑开内容区域的宽度，让内容区域的宽度超过better-scrool容器的大小
      // 获得内容区域的宽度
      console.log(this.seller)
      let offsetWidth = this.seller.pics.length * 126;
      console.log(offsetWidth);
      // 让ul的宽度等于计算出来的宽度
      this.$refs.picsUl.style.width = offsetWidth + "px";

      if (!this.picsScroll) {
        this.picsScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true //让better—scroll允许在水平滑动
        });
      } else {
        this.picsScroll.refresh();
      }
    }
  },
  // 数据不过来，效果没法出来，数据延迟后过来，生命周期已经执行过了
  mounted() {
    if (this.seller.pics) {
      this.$nextTick(() => {
        this.sellerPicsScroll();
      });
    }
  },
  watch: {
    seller(newValue, oldValue) {
      console.log("新值", newValue);
      console.log("旧值", oldValue);
      this.$nextTick(() => {
        this.sellerPicsScroll();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.title-label {
  margin: 18px 0 8px;
  font-size: $md-size;
  line-height: 14px;
  color: eleblack(1);
}

.seller-header {
  padding: 0 18px;

  .header-top {
    display: flex;
    margin-top: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid eleblack(0.1);

    .seller-content {
      flex: 1;

      .seller-name {
        margin-top: 0;
      }

      .star {
        display: inline-block;
      }

      .ratingCount {
        margin: 0 12px 8px;
      }

      .sellCount,
      .ratingCount {
        font-size: $xs-size;
        line-height: 18px;
        color: $e-gray;
      }
    }

    .seller-right {
      flex: 0 0 50px;
      text-align: center;

      .icon-favorite {
        font-size: 24px;
        line-height: 24px;
        color: #ccc;
        margin-bottom: 8px;

        &.favorite {
          color: $e-red;
        }
      }

      .favorite-status {
        color: $e-gray;
        font-size: $xs-size;
        line-height: 10px;
      }
    }
  }

  .header-bottom {
    text-align: center;
    padding: 18px 0;
    display: flex;

    .seller-score-item {
      flex: 1;
      border-right: 1px solid eleblack(0.1);

      &:last-child {
        border-right: 0;
      }

      .seller-score-title {
        font-size: $xs-size;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }

      .seller-score-desc {
        margin-top: 4px;
        font-size: 24px;
        line-height: 24px;
        color: eleblack(1);

        .small-letter {
          font-weight: 200;
          font-size: $xs-size;
        }
      }
    }
  }
}

.seller-bulletin {
  padding: 0 12px;

  .bulletin-content {
    padding: 0 12px;
    font-size: $xs-size;
    line-height: 24px;
    color: $e-red;
    margin-bottom: 16px;
  }

  .supports {
    margin-top: 10px;
  }

  .supports-item {
    font-size: $sm-size;
    font-weight: 200;
    line-height: 16px;
    border-top: 1px solid eleblack(0.1);
    padding: 16px 12px;

    // 只在一行显示，超出的文本用...来替代
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .supports-icon {
    vertical-align: top;
    display: inline-block;
    margin-right: 4px;
    width: 16px;
    height: 16px;
    background: #fff;

    @include supports(4, 16px 16px);
  }
}

.seller-pics {
  padding: 0 18px 18px;

  .pics-wrapper {
    width: 100%;
    overflow: hidden;

    ul {
      .pic {
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

.seller-desc {
  padding: 0 18px;

  .info-container {
    padding-top: 4px;

    .list-item {
      padding: 16px 12px;
      border-top: 1px solid eleblack(0.1);
      font-size: $xs-size;
      color: eleblack(1);
      font-weight: 200;
      line-height: 16px;
    }
  }
}
</style>
