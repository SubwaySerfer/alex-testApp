<template>
  <main class="home-wrapper">
    <list-items></list-items>
    <item-field></item-field>
  </main>
</template>

<script>
import ItemField from '../../components/home/ItemField.vue';
import ListItems from '../../components/home/ListItems.vue';

export default {
  components: {
    ItemField, ListItems
  },
  created() {
    this.$store.commit('createItemsList')
  }
}
</script>

<style scoped>
.home-wrapper {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 3rem;
}
</style>