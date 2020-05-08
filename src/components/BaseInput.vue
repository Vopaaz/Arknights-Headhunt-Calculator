<template>
  <div>
    <b-form>
      <h5 class="section">抽取目标</h5>

      <b-form-group id="star-group" label="是否限定" label-for="limited" label-cols="4" description="限定卡池 up 6 星占全部 6 星的 70%, 标准池为 50%">
        <b-form-radio-group
          id="limited"
          v-model="limited"
          :options="limitedOptions"
          required
          buttons
          button-variant="outline-secondary"
          @input="onInput()"
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group id="star-group" label="目标干员" label-for="star" label-cols="4">
        <b-form-radio-group
          id="star"
          v-model="star"
          :options="starOptions"
          required
          buttons
          button-variant="outline-secondary"
          @input="onInput()"
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group
        id="opertor-num-group"
        label="同星 up 干员数"
        label-for="operator-num"
        label-cols="4"
        description="假设同星干员出率相等"
      >
        <b-form-radio-group
          id="operator-num"
          v-model="operatorNum"
          :options="operatorNumOptions"
          required
          buttons
          button-variant="outline-secondary"
          @input="onInput()"
        ></b-form-radio-group>
      </b-form-group>

      <h5 class="section">投入资源</h5>
      <b-form-group
        id="gem-group"
        label="合成玉"
        label-for="gem"
        label-cols="4"
        :state="gem>=0"
        invalid-feedback="合成玉投入量必须 >= 0"
      >
        <b-form-input
          type="number"
          number
          id="gem"
          v-model="gem"
          required
          :state="gem>=0"
          :step="100"
          @input="onInput()"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="originium-group"
        label="至纯源石"
        label-for="originium"
        label-cols="4"
        :state="originium>=0"
        invalid-feedback="源石投入量必须 >= 0"
      >
        <b-form-input
          type="number"
          number
          id="originium"
          v-model="originium"
          required
          :state="originium>=0"
          @input="onInput()"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="draw-coupon-group"
        label="单抽券"
        label-for="draw-coupon"
        label-cols="4"
        :state="drawCoupon>=0"
        invalid-feedback="单抽券投入量必须 >= 0"
      >
        <b-form-input
          type="number"
          number
          id="draw-coupon"
          v-model="drawCoupon"
          required
          :state="drawCoupon>=0"
          @input="onInput()"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="draw-ten-coupon-group"
        label="十连券"
        label-for="draw-ten-coupon"
        label-cols="4"
        :state="drawTenCoupon>=0"
        invalid-feedback="十连券投入量必须 >= 0"
      >
        <b-form-input
          type="number"
          number
          id="draw-ten-coupon"
          v-model="drawTenCoupon"
          required
          :state="drawTenCoupon>=0"
          @input="onInput()"
        ></b-form-input>
      </b-form-group>

      <h5 class="section">垫刀情况</h5>

      <b-form-group
        id="six-prev-draw-group"
        label="六星寻访水位"
        label-for="six-prev-draw"
        label-cols="4"
        description="已经连续没有获得 6 星干员的次数，注意区分标准和限定寻访"
        :state="sixPrevDraw>=0 && sixPrevDraw<=98"
        invalid-feedback="水位必须 >= 0, 另外理论上连续无六星时第 99 抽出 6 星的概率是 100%, 所以水位也不可能 > 98."
      >
        <b-form-input
          type="number"
          number
          id="six-prev-draw"
          v-model="sixPrevDraw"
          required
          :state="sixPrevDraw>=0 && sixPrevDraw<=98"
          @input="onInput()"
          :disabled="star === 5"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="this-prev-draw-group"
        label="本池已抽次数"
        label-for="this-prev-draw"
        label-cols="4"
        description="本次寻访已经抽取次数，仅用于计算五星保底"
        :state="thisPrevDraw>=0"
        invalid-feedback="已抽次数必须 >= 0"
      >
        <b-form-input
          type="number"
          number
          id="this-prev-draw"
          v-model="thisPrevDraw"
          required
          :state="thisPrevDraw>=0"
          @input="onInput()"
          :disabled="star === 6"
        ></b-form-input>
      </b-form-group>

      <b-alert show dismissible>如果输入框变灰则说明该项对寻访目标无影响</b-alert>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limited: false,
      limitedOptions: [
        { text: "是", value: true },
        { text: "否", value: false }
      ],
      star: 6,
      starOptions: [
        { text: "5 ⭐", value: 5 },
        { text: "6 ⭐", value: 6 }
      ],
      operatorNum: 2,
      operatorNumOptions: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 }
      ],
      gem: 0,
      originium: 0,
      drawCoupon: 0,
      drawTenCoupon: 0,
      sixPrevDraw: 0,
      thisPrevDraw: 0
    };
  },
  methods: {
    onInput: function() {
      this.$emit("change");
    }
  }
};
</script>

<style scoped>
.section {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>