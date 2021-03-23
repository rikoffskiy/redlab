const dataStore = {
  namespaced: true,
  state: {
    dataList: [],
  },
  getters: {
    dataList: ({ ...items }) => items,
  },
  mutations: {
    updateData(state, id) {
      state.dataList[id].star = true;
    },
  },
  actions: {
    async fetchData(context) {
      console.log(context);
      await fetch(`/data.json`)
        .then((response) => response.json())
        .then((data) => data.forEach((i) => dataStore.state.dataList.push(i)));
    },
  },
};

export default dataStore;

// getters: {
//   dataList: ({ ...items }) => items,
// },
