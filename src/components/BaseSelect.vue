<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="(option, index) in options"
        :value="option"
        :key="index"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin.js'

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  mixins: [formFieldMixin]
}
</script>

<style lang="scss" scoped></style>
