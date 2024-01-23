<template>
  <ul class="list-wrapper">
    <li v-for="(list, idx) in listsData" class="list-block">
      <label>
        <input type="checkbox" v-model="listModel" @change="updateListModel(list.name)" :value="list.name">{{ list.name }}
      </label>
      <div class="items" v-if="listModel.includes(list.name)">

        <div v-for="(item, index) in list.items" class="item-block" :key="item.itemName">
          <label class="item-block__label">
            <input type="checkbox" :value="item.itemName" @change="updateCheckbox"
              v-model="itemsModel[idx].checked[index].checked">
            {{ item.itemName }}
          </label>
          <input type="number" :value="item.counter" min="0" class="item-block__counter"
            @input="changeCounter(item.itemName, idx)">
          <input type="color" :value="item.color" @change="updateColor(item.itemName, idx)">
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  data() {
    return {
      itemsModel: [],
      listModel: []
    }
  },
  created() {
    this.listsData.forEach((el, idx) => {
      this.itemsModel.push({ 'id': el.id, 'checked': [] })
      el.items.forEach(item => this.itemsModel[idx].checked.push({ name: item.itemName, checked: true }))
      this.listModel.push(el.name)
    })
    this.updateCheckbox()

  },
  methods: {
    updateCheckbox() {
      let arr = []
      this.itemsModel.forEach(el => {
        arr.push({ [el.id]: el.checked.filter(elem => elem.checked == true) })
      })
      this.$store.commit('updateItemsModal', arr)
    },
    changeCounter(id, idx) {
      let targetVal = +event.target.value
      if (typeof (targetVal) != 'number' || targetVal <= 0) {
        targetVal = 0
      }
      this.$store.commit('updateItemsData', { id, idx, targetVal })
    },
    updateColor(id, idx) {
      let targetVal = event.target.value
      this.$store.commit('updateColorItemsData', { id, idx, targetVal })
    },
    updateListModel(name) {
      let inCheckArray = this.checkListInCheckbox(name)
      let id = name.split(' ')[1]
      let currentList = this.itemsModel.find(el => el.id == id).checked

      if (currentList.filter(el => el.checked == false).length > 0) {
        currentList.forEach(el => el.checked = true)
        if (inCheckArray == false) {
          this.listModel.push(name)
        }
      } else {
        currentList.forEach(el => el.checked = false)
      }
      this.updateCheckbox()
    },
    checkListInCheckbox(id) {
      return this.listModel.includes(id)
    }
  },
  computed: {
    listsData() {
      return this.$store.getters['getItemsData']
    }
  }
}
</script>

<style scoped>
.list-wrapper {
  width: 40rem;
  height: auto;
  padding: 2rem 1rem;
  border: 1px solid black;
  gap: 1.5rem;
}

.list-block {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
}



.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-left: 4rem;
  align-items: center;
}

.item-block {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 1rem;
}

/* .item-block__checkbox {
  width: 2rem;
  height: 2rem;
  border: 1px solid black
} */
.item-block__counter {
  width: 5rem;
  text-align: center;
  border-radius: 5px;
}

.item-block__label {
  flex: 1;
  text-align: start;
}
</style>