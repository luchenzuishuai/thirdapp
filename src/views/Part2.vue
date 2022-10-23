/* Name: Chen Lu
Id: 91906
course number: 2228-CSE-6331-980
lab: Assignment3 */
<template>
  <div class="container">
    <el-divider></el-divider>

    <div class='ques1'>
      <!--  search for magnitude greater than 5.0 -->
      <div style="display: flex; flex-direction: column">
        <span class="ques">✅ Ques2: What would a graph of magnitude against depth for the 100 recent quakes look like?</span>
        <span class="tip">Additional-1：point chart or scatter chart. </span>
      </div>
    </div>
    <el-divider></el-divider>
    <div v-loading="loading" ref="graph" key="1" class="graph"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { GridComponent, TitleComponent } from 'echarts/components'
import { ScatterChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, TitleComponent, ScatterChart, CanvasRenderer, UniversalTransition])
export default {
  async mounted () {
    await this.getDataList()
    // 元素挂载与渲染到dom树上完毕。页面渲染完毕时，去获取实例；created阶段只是实例创建完毕，页面并没有渲染完毕
    this.drawScatter()
  },
  data () {
    return {
      dataList: [],
      loading: false
    }
  },
  methods: {
    async getDataList () {
      this.loading = true
      const { data } = await this.$http.get('/quakes/fetchRecentQuake', {
        params: {
          number: 100
        }
      })
      this.dataList = data.map(item => [item.mag, item.depth])
      // console.log(this.dataList)
      this.loading = false
    },
    drawScatter () {
      const mychart = echarts.init(this.$refs.graph)
      const option = {
        title: {
          text: 'Magnitude-Depth Distribution Map',
          left: 'center'
        },
        xAxis: {
          name: 'magnitude'
        },
        yAxis: {
          name: 'depth'
        },
        series: [
          {
            symbolSize: 5,
            // data: [
            //   [10.0, 8.04],
            // ],
            data: this.dataList,
            type: 'scatter'
          }
        ]
      }
      mychart.setOption(option)
      this.$message.success('Loading succeeded~')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin-top: 15px;
  .head {
    display: flex;
    .el-alert {
      margin-right: 200px;
      /deep/ .el-alert__title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
.ques {
  color: red;
  font-weight: 700;
  font-size: 18px;
}

.tip {
  color: #66d9ef;
  font-weight: 700;
}

.graph {
  height: 600px;
}
</style>
