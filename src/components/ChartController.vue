<template>
  <line-chart :chart-data="chartData" :options="options"></line-chart>
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
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 1
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    chartData: function() {
      return getChartData(this.target, this.targetStar);
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