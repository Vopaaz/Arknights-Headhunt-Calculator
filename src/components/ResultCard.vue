<template>
  <div>
    <h5> 出货概率 </h5>

    <b-card :title="showProbability" class="result-card" title-tag="h1">
      <b-card-text>抽到目标干员 1 次及以上的概率</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    probability: Number
  },
  computed: {
    showProbability: function() {
      return (this.probability * 100).toFixed(4) + " %";
    }
  }
};
</script>

<style scoped>
.result-card {
  width: 100%;
  margin-bottom: 20px;;
}
</style>