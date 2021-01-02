<template>
  <div class="good-detail">
    <div class="back" @click="$router.go(-1)">
      <van-icon name="arrow-left" style="font-size:22px;color:#505050" />
    </div>
    <!-- 轮播 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品列表 -->
    <div class="good-info">
      <van-card>
        <template #title>
          <p class="title">{{goods_info.name}}</p>
        </template>
        <template #desc>
          <p class="desc">{{goods_info.characteristic}}</p>
        </template>
        <template #price>
          <p class="price">低价：￥{{goods_info.originalPrice}}</p>
        </template>
        <template #num>
          <p class="num">库存：{{goods_info.minPrice}}</p>
        </template>
      </van-card>
    </div>
    <!-- 商品详情介绍 -->
    <div class="good-desc">
      <van-tabs v-model="active" line-width="50%" line-height="2px">
        <van-tab title="商品介绍"></van-tab>
        <van-tab title="商品评价"></van-tab>
      </van-tabs>
      <div id="good-content" v-show="active==0" v-html="content"></div>
      <div v-show="active==1">hhh</div>
    </div>
    <!-- 商品导航内容 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="$store.getters.nums"
        @click="$router.push('/m_cart')"
      />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="show=true" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 商品规格校验 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="id"
      @add-cart="addCart"
      @stepper-change="Change"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      banner: [],
      goods_info: {},
      active: 0,
      content: "", //商品介绍内容
      show: false,
      sku: {
        tree: [
          {
            k: "颜色", //规格类目名称
            k_s: "s1",
            v: [
              {
                id: "1", // 规格值 id
                name: "红色" //规格值名称
              },
              {
                id: "2",
                name: "蓝色"
              },
              {
                id: "3",
                name: "粉色"
              }
            ]
          },
          {
            k: "尺码", //规格类目名称
            k_s: "s2",
            v: [
              {
                id: 6, // 规格值 id
                name: "160/s" //规格值名称
              },
              {
                id: 7,
                name: "170/m"
              },
              {
                id: 8,
                name: "180/L"
              }
            ]
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 199, // skuId
            s1: 1, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 6,
            price: 100, // 价格（单位分）
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 99, // skuId
            s1: 2, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 6,
            price: 100, // 价格（单位分）
            stock_num: 30 // 当前 sku 组合对应的库存
          },
          {
            id: 89, // skuId
            s1: 3, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 6,
            price: 30000, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 199, // skuId
            s1: 1, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 7,
            price: 100, // 价格（单位分）
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 99, // skuId
            s1: 2, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 7,
            price: 90, // 价格（单位分）
            stock_num: 30 // 当前 sku 组合对应的库存
          },
          {
            id: 89, // skuId
            s1: 3, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 7,
            price: 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 199, // skuId
            s1: 1, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 8,
            price: 100, // 价格（单位分）
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 99, // skuId
            s1: 2, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 8,
            price: 90, // 价格（单位分）
            stock_num: 30 // 当前 sku 组合对应的库存
          },
          {
            id: 89, // skuId
            s1: 3, // 规格类目 k_s 为 s1 的对应规格值 id
            s2: 8,
            price: 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "99.00", // 价格（单位分）
        stock_num: 227 //商品总库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      },
      goods_num: 1
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$axios
        .post(`https://api.it120.cc/small4/shop/goods/detail?id=` + this.id)
        .then(dzz => {
          console.log(dzz);
          this.banner = dzz.data.pics;
          this.goods_info = dzz.data.basicInfo;
          this.content = dzz.data.content;
          if (dzz.data.hasOwnProperty("properties")) {
            this.setSku(dzz.data.properties);
          }
          console.log(dzz.data.properties);

          this.goods.picture = this.banner[0].pic;
          this.$nextTick(() => {
            let imgs = document.getElementsByClassName("img-lazyload");
            // console.log(imgs);
            for (let i = 0; i < imgs.length; i++) {
              imgs[i].style.width = "100%";
              imgs[i].style.height = "100%";
            }
          });
        });
    },
    selSku(skuval) {
      console.log(skuval);
    },
    setSku(property) {
      console.log(property);
      let tree = [];
      property.forEach(item => {
        let obj = {
          k: item.name,
          k_s: "p_"+item.id,
          v: item.childsCurGoods,
        };
        tree.push(obj)
      });
      console.log(tree)
      this.sku.tree=tree
    },
    Change(num) {
      console.log(num);
      this.num = num;
    },
    //添加到购物车
    addCart() {
      if (this.$store.state.token == "") {
        this.$dialog
          .confirm({
            title: "登录提示",
            message: "你还未登录,请先登录"
          })
          .then(() => {
            this.$router.push("/m_login");
          })
          .catch(() => {
            this.$toast("你已取消登录");
          });
      }
      let goods = {
        id: this.id,
        name: this.goods_info.name,
        img: this.goods.picture,
        price: this.goods_info.originalPrice,
        num: this.goods_num,
        checkd: true
      };
      this.$store.commit("addCart", goods);
      this.$toast.success("加入购物车成功");
      this.show = false;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.good-detail {
  width: 100%;
  position: relative;
  background: #ddd;
  .back {
    padding: 10px;
    border: 1px #dddd solid;
    position: fixed;
    background: #f0f0f0;
    left: 10px;
    top: 10px;
    border-radius: 50%;
    box-shadow: #ddd 10px;
    z-index: 100;
    font-size: 20px;
  }
  .banner {
    width: 100%;
    img {
      width: 100%;
      height: 350px;
    }
  }
  .good-info {
    width: 100%;
    background: #fff;
    .title {
      margin-top: 5px;
      font-size: 18px;
    }
    .desc {
      margin-top: 5px;
      color: #dddddd;
      font-size: 14px;
    }
    .price {
      color: #ff0000;
      font-size: 14px;
    }
    .desc {
      font-size: 15px;
    }
  }
  .good-desc {
    width: 100%;
    margin-top: 20px;
    background: #fff;
    .van-tabs {
      margin-bottom: 10px;
    }
    #good-content {
      width: 100%;
      ul {
        width: 100% !important;
        list-style: none;
        li {
          width: 100% !important;
        }
      }
      p {
        width: 100% !important;
      }
      img {
        width: 100% !important;
      }
    }
  }
}
</style>

