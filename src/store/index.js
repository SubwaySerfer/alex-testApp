import { createStore } from 'vuex'
import itemsData from '/public/assets/data/items.json'

const store = createStore({
  state() {
    return {
      itemsData: [],
      itemsModal: []
    }
  },
  mutations: {
    createItemsList(state) {
      state.itemsData = itemsData.lists
    },
    updateItemsModal(state, payload) {
      state.itemsModal = payload
    },
    updateItemsData(state, payload) {
      state.itemsData[payload.idx].items.find(el => el.itemName == payload.id).counter = +payload.targetVal
    },
    updateColorItemsData(state, payload) {
      state.itemsData[payload.idx].items.find(el => el.itemName == payload.id).color = payload.targetVal
    }
  },
  getters: {
    getItemsData(state) {
      return state.itemsData
    },
    getItemsModal(state) {
      return state.itemsModal
    }
  }
})

export default store