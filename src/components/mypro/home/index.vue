<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <van-image :src="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
      <ul class="nav">
        <li>
          <van-icon name="like-o" />
          <p>签到</p>
        </li>
        <li>
          <van-icon name="gift-o" />
          <p>礼券</p>
        </li>
        <li @click="$router.push('/m_cut')">
          <van-icon name="gem-o" />
          <p>砍价</p>
        </li>
        <li>
          <van-icon name="fire-o" />
          <p>专栏</p>
        </li>
      </ul>
    </div>
    <!-- 砍价列表 -->
    <div class="cut">
      <van-nav-bar title="全民砍价" @click-right="$router.push('/m_cut')">
        <template #right>
          <van-icon name="arrow" size="18" color="black" />
        </template>
      </van-nav-bar>
      <cut :cutlist="cutlist" />
    </div>
    <!-- 专题栏 -->
    <div class="special">
      <van-nav-bar title="精选专题">
        <template #right>
          <van-icon name="arrow" size="18" color="black" />
        </template>
      </van-nav-bar>
      <div class="spenav">
        <van-swipe :loop="false" :width="300" :show-indicators="false">
          <van-swipe-item v-for="item in speciallist" :key="item.id">
            <img :src="item.pic" />
            <p class="desc">{{item.title}}</p>
            <p class="desc" style="color: #808080;">{{item.descript}}</p>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 精选商品 -->
    <div class="recommand">
      <van-nav-bar title="人气推荐" @click-right="$router.push('/m_recommand')">
        <template #right>
          <van-icon name="arrow" size="18" color="black" />
        </template>
      </van-nav-bar>
      <recommand :goodslist="goodslist"/>
    </div>
  </div>
</template>

<script>
import cut from "../common/cut";
import recommand from "../common/recommandlist"
export default {
  components: { cut,recommand },
  data() {
    return {
      banner: [],
      cutlist: [],
      speciallist: [],
      goodslist: []
    };
  },
  mounted() {
    this.getBanner();
    this.getCut();
    this.getSpecial();
    this.getlist();
  },
  methods: {
    //首页banner管理接口
    getBanner() {
      this.$axios.get("https://api.it120.cc/small4/banner/list").then(dzz => {
        // console.log(dzz);
        this.banner = dzz.data;
      });
    },
    //砍价列表接口
    getCut() {
      this.$axios
        .get("https://api.it120.cc/small4/shop/goods/kanjia/list")
        .then(dzz => {
          //   console.log(dzz);
          let arr = dzz.data.result;
          let goodMap = dzz.data.goodsMap;
          arr.slice(-2).forEach(item => {
            this.cutlist.push(goodMap[item.goodsId]);
          });
        });
    },
    //精选专题
    getSpecial() {
      this.$axios.get("https://api.it120.cc/small4/cms/news/list").then(dzz => {
        // console.log(dzz);
        this.speciallist = dzz.data;
      });
    },
    //推荐商品列表
    getlist() {
      this.$axios
        .get("https://api.it120.cc/small4/shop/goods/list")
        .then(dzz => {
          console.log(dzz);
          let arr = dzz.data.filter(item => {
            return item.name.indexOf("测试") == -1;
          });
          this.goodslist = arr.slice(-4);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  .banner {
    width: 100%;
    position: relative;
    .my-swipe .van-swipe-item {
      width: 100%;
      height: 200px;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
    .nav {
      width: 100%;
      padding: 0px;
      margin: 0px;
      background: #fafafa;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0px;
      left: 0px;
      padding-top: 10px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      li {
        width: 25%;
        text-align: center;
        .van-icon {
          font-size: 30px;
          color: #a00000;
        }
        p {
          font-size: 18px;
        }
      }
    }
  }
  .van-nav-bar {
    width: 100%;
    border-bottom: 1px solid #cccc;
  }
  //砍价列表
  .cut,
  .special,
  .recommand {
    width: 100%;
    background: #fff;
    margin-top: 10px;
    //精选专题
    .spenav {
      img {
        width: 100%;
        height: 180px;
      }
      .van-swipe-item {
        margin-right: 10px;
        .desc {
          margin: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
