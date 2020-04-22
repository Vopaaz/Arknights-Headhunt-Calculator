<template>
  <div>
    <b-jumbotron header="Arknights Headhunt Calculator" lead="明日方舟干员寻访概率期望计算器"></b-jumbotron>
    <b-container fluid>
      <b-row>
        <b-col lg="4" offset-lg="2" md="8" offset-md="2" align-self="center" @change="onChange()">
          <base-input ref="baseInput" />
        </b-col>
        <b-col lg="4" offset-lg="0" md="8" offset-md="2" align-self="center">
          <result-card message="成功出货概率" :probability="baseProbability" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import ResultCard from "../components/ResultCard.vue";
import { calculateProbability } from "../js/calc";

export default {
  data: function() {
    return {
      baseProbability: 0
    };
  },
  components: {
    BaseInput,
    ResultCard
  },
  methods: {
    onChange: function() {
      const d = this.$refs.baseInput;
      this.baseProbability = calculateProbability(
        d.star,
        d.operatorNum,
        d.gem,
        d.originium,
        d.drawCoupon,
        d.drawTenCoupon,
        d.sixPrevDraw,
        d.thisPrevDraw
      );
    }
  }
};
</script>

<style>
</style>