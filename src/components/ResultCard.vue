<template>
  <div>
    <b-card :title="showProbability" class="result-card" title-tag="h1">
      <b-card-text>{{ message }}</b-card-text>
    </b-card>
    <b-alert show dismissible>指“以某一个特定干员为目标，至少抽取到目标 1 次的概率”</b-alert>
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