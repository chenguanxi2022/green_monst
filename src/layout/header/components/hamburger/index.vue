<template>
  <svg class="icon"
       aria-hidden="true"
       @click="handleCollapse">
    <use :xlink:href="collapse ? '#icon-caidanzhankai' : '#icon-caidanshouqi'"></use>
  </svg>
</template>

<script>
export default {
  name: 'hamburger-component',
  methods: {
    handleCollapse() {
      this.$store.commit('menu/changeCollapse')
    }
  },
  computed: {
    collapse() {
      return this.$store.getters.collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: inherit;
}
</style>