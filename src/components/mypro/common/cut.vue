<template>
  <div>
    <div class="cut-list" v-for="item in cutlist" :key="item.id">
      <div class="cut-item">
        <img :src="item.pic" />
      </div>
      <div class="cut-info">
        <p class="title">{{item.name}}</p>
        <p class="desc">{{item.characteristic}}</p>
        <ul>
          <li>
            <span>￥{{item.minPrice}}</span>
            <p>低价</p>
          </li>
          <li>
            <span>￥{{item.originalPrice}}</span>
            <p>原价</p>
          </li>
          <li>
            <span>{{item.stores}}件</span>
            <p>限量</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cutlist"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
.cut-list {
  width: 100%;
  margin-top: 5px;
  display: flex;
  .cut-item {
    width: 40%;
    padding: 0 10px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 140px;
    }
  }
  .cut-info {
    width: 60%;
    .desc {
      color: #808080;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      padding: 5px;
    }
    ul {
      width: 100%;
      display: flex;
      padding: 0px;
      margin-top: 10px;
      align-items: center;
      li {
        text-align: center;
      }
      li:nth-of-type(2),
      li:nth-of-type(3) {
        width: 30%;
        color: #808080;
      }
    }
  }
}
</style>
