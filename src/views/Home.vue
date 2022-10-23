/* Name: Chen Lu
Id: 91906
course number: 2228-CSE-6331-980
lab: Assignment3 */
<template>
  <div>
    <el-divider></el-divider>
    <div class='ques1'>
      <!--  search for magnitude greater than 5.0 -->
      <div style="display: flex; flex-direction: column">
        <span class="ques">✅ Ques1: Show the number of quakes for magnitude below 1, 1 to 2, 2 to 3, up to magnitude 5.Show a Pie Chart with each pie slice in a different color, with labels (totals) outside each pie slice. </span>
        <span class="tip">Additional-1：Perhaps a bar chart (horizontal bars or vertical bars) is easier to understand.</span>
        <span class="tip">Additional-2：Perhaps putting the totals inside each pie slice (or bar) is better. </span>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <el-row type="flex" justify="end">
        <el-switch v-model="type" active-text="bar chart" inactive-text="pie chart" @change="change"></el-switch>
      </el-row>
    </div>
    <!-- graph area -->
    <!-- The width and height of the area corresponding to the echarts must be given, otherwise it will not be loaded -->
    <div v-loading="loading" ref="graph" key="1" class="graph"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { PieChart, BarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  PieChart,
  CanvasRenderer,
  LabelLayout
])
export default {
  async mounted () {
    // 在created中获取数据，没有成功渲染到echarts方法解决
    // 解决方法：在mounted中去拿数据，等数据获取完了，才去渲染
    await this.getDataList()
    // 元素挂载与渲染到dom树上完毕。页面渲染完毕时，去获取实例；created阶段只是实例创建完毕，页面并没有渲染完毕
    this.drawPie()
  },
  data () {
    return {
      dataList: [],
      ques1Number: '',
      ques2Number: '',
      ques2Location: '',
      loading: false,
      type: false
    }
  },
  methods: {
    async getDataList () {
      this.loading = true
      // get quake data[0-1]、[1-2]、[2-3]、[3-4]、[4-5]
      for (let i = 0; i < 5; i++) {
        const { data } = await this.$http.get('/quakes/quakeCount', {
          params: {
            lowMag: i,
            highMag: i + 1
          }
        })
        this.dataList.push({
          value: data,
          name: i + '~' + (i + 1)
        })
      }
      // console.log(this.dataList)
      this.loading = false
    },
    drawPie () {
      const mychart = echarts.init(this.$refs.graph)
      const option = {
        title: {
          text: 'Quantitative distribution of earthquake magnitude',
          subtext: 'magnitude: 0-5(Place the mouse on the graph to display the quantity)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: '20%'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            // data: [
            //   { value: 1048, name: 'Search Engine' },
            // ],
            data: this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      mychart.setOption(option)
      this.$message.success('Loading succeeded~')
    },
    drawBar () {
      const mychart = echarts.init(this.$refs.graph)
      // data-y
      const dataY = this.dataList.map(item => item.value)
      console.log(dataY)
      const option = {
        xAxis: {
          type: 'category',
          data: ['0~1', '1~2', '2~3', '3~4', '4~5']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: dataY,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
      mychart.setOption(option)
      this.$message.success('Loading succeeded~')
    },
    change (val) {
      val ? this.drawBar() : this.drawPie()
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
