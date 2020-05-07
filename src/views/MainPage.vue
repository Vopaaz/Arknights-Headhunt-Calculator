<template>
  <div>
    <b-jumbotron header="Arknights Headhunt Calculator" lead="明日方舟干员寻访出货概率计算器"></b-jumbotron>
    <b-container fluid>
      <b-row>
        <b-col lg="4" offset-lg="2" md="8" offset-md="2" align-self="center" @change="onChange()">
          <base-input ref="baseInput" />
        </b-col>
        <b-col lg="4" offset-lg="0" md="8" offset-md="2" align-self="center">
          <result-card message="成功出货概率" :probability="baseProbability" />
          <line-chart :chart-data="chartData" :options="options"></line-chart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import ResultCard from "../components/ResultCard.vue";
import LineChart from "../components/Chart.vue";
import { calculateProbability } from "../js/calc";
import * as _ from "lodash";

function getChartData(target, targetStar) {
  return {
    labels: ["0", "1", "2", "3", "4", "5", "6+"],
    datasets: [
      {
        label: "目标干员",
        backgroundColor: "#f87979",
        data: target
      },
      {
        label: "同星级干员",
        backgroundColor: "#123456",
        data: targetStar
      }
    ]
  };
}

export default {
  data: function() {
    return {
      baseProbability: 0,
      chartData: getChartData([1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0]),
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
  components: {
    BaseInput,
    ResultCard,
    LineChart
  },
  methods: {
    onChange: function() {
      const d = this.$refs.baseInput;
      const result = calculateProbability(
        d.star,
        d.operatorNum,
        d.gem,
        d.originium,
        d.drawCoupon,
        d.drawTenCoupon,
        d.sixPrevDraw,
        d.thisPrevDraw,
        d.limited
      );
      this.baseProbability = _.sum(result.target) - result.target[0];
      this.chartData = getChartData(result.target, result.targetStar);
    }
  }
};
</script>

<style>
</style>