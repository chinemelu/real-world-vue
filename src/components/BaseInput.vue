<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin.js'

export default {
  mixins: [formFieldMixin]
}
</script>

<style lang="scss" scoped></style>
