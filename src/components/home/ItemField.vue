<template>
  <div class="items-wrapper">
    <div v-for="(list, idx) in   itemsModal  " :key="list" class="list-block">
      <h2>List {{ createLabel(list) }}</h2>
      <div v-for="item in list[createLabel(list)]">
        <h3 class="item__label">{{ item.name }}</h3>
        <div class="item-count">
          <span class="item-count__box" v-for="count in checkCounter(idx, item.name)"
            :style="{ 'background-color': findColor(idx, item.name) }" @click="delBox(idx, item.name)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    itemsData() {
      return this.$store.getters['getItemsData']
    },
    itemsModal() {
      return this.$store.getters['getItemsModal']
    },
  },
  methods: {
    createLabel(obj) {
      return Object.keys(obj)[0]
    },
    checkCounter(idx, name) {
      return this.itemsData[idx].items.find(el => el.itemName == name).counter
    },
    findColor(idx, name) {
      return this.itemsData[idx].items.find(el => el.itemName == name).color
    },
    delBox(idx, id) {
      let targetVal = +this.checkCounter(idx, id) - +1
      this.$store.commit('updateItemsData', { idx, id, targetVal })
    }
  }
}
</script>

<style scoped>
.items-wrapper {
  width: 40rem;
  height: auto;
  padding: 2rem 1rem;
  border: 1px solid black;
  align-items: start;
  text-align: start;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
}

.list-block {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  border: 1px solid black;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
}

.item__label {
  padding-left: 4rem;
}

.item-count {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  flex-wrap: wrap;
}

.item-count__box {
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid black;
  display: block;
  cursor: pointer;
}
</style>