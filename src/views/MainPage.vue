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
          <line-chart :target="targetProb" :targetStar="targetStarProb"></line-chart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import ResultCard from "../components/ResultCard.vue";
import LineChart from "../components/ChartController.vue";
import { calculateProbability } from "../js/calc";
import * as _ from "lodash";

export default {
  data: function() {
    return {
      baseProbability: 0,
      targetProb: [1, 0, 0, 0, 0, 0, 0],
      targetStarProb: [1, 0, 0, 0, 0, 0, 0],
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
      this.targetProb = result.target
      this.targetStarProb = result.targetStar
    }
  }
};
</script>

<style>
</style>