<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="item">
          <i class="el-icon-user-solid"></i>
          <span>1</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item">
          <i class="el-icon-user-solid"></i>
          <span>2</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item">
          <i class="el-icon-user-solid"></i>
          <span>3</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item">
          <i class="el-icon-user-solid"></i>
          <span>4</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="item"></div>
      </el-col>
      <el-col :span="10">
        <div class="item" id="echarts" style="width: 550px;height:350px;"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initecharts();
  },
  methods: {
    initecharts() {
      var myChart = this.$echarts.init(document.getElementById("echarts"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [82, 32, 91, 34, 290, 189, 130]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.el-row {
  margin-top: 15px;
  .item {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>