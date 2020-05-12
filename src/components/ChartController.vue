<template>
  <div>
    <h5>概率分布图</h5>
    <line-chart :chart-data="chartData" :options="options"></line-chart>

    <b-form-group id="chart-type-group" label="图表类型" label-for="chart-type" label-cols="6">
      <b-form-radio-group
        id="chart-type"
        v-model="chartType"
        :options="chartTypeOptions"
        required
        buttons
        button-variant="outline-secondary"
      ></b-form-radio-group>
    </b-form-group>

    <b-alert show dismissible>
      PMF: 恰好抽取到对应次数的概率，即
      <span v-katex="'\\text{Pr}(X = x)'"></span>
      <br />CDF: 抽到对应次数及以上的概率，即
      <span v-katex="'\\text{Pr}(X \\geq x)'"></span>
    </b-alert>
  </div>
</template>

<script>
import LineChart from "../components/Chart.vue";

function getChartData(target, targetStar) {
  return {
    labels: ["0", "1", "2", "3", "4", "5", "6+"],
    datasets: [
      {
        label: "目标干员",
        backgroundColor: "#7CA7CF88",
        data: target
      },
      {
        label: "同星级干员",
        backgroundColor: "#CF7CA788",
        data: targetStar
      }
    ]
  };
}

export default {
  data: function() {
    return {
      chartType: "PMF",
      chartTypeOptions: [
        {
          text: "PMF",
          value: "PMF"
        },
        {
          text: "CDF",
          value: "CDF"
        }
      ],
      options: {
        tooltips: {
          mode: "index",
          intersect: false,
          position: "nearest",
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += "：";
              }
              label += (tooltipItem.yLabel * 100).toFixed(4);
              return label + " %";
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 1
              },
              scaleLabel: {
                display: true,
                labelString: "概率",
                fontSize: 16
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "出货次数",
                fontSize: 16
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    chartData: function() {
      if (this.chartType === "PMF") {
        return getChartData(this.target, this.targetStar);
      } else {
        const l = this.target.length;
        let targetAcc = 0;
        let targetStarAcc = 0;
        let target = Array(l);
        let targetStar = Array(l);
        for (let index = l - 1; index >= 0; index--) {
          targetAcc += this.target[index];
          target[index] = targetAcc;
          targetStarAcc += this.targetStar[index];
          targetStar[index] = targetStarAcc;
        }
        return getChartData(target, targetStar);
      }
    }
  },
  components: {
    LineChart
  },
  props: ["target", "targetStar"]
};
</script>

<style>
</style>