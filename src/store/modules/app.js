

const app = {
  state: {
    subNavList:[],
  },
  mutations: {
    addSubNav: (state,data) => {
      state.subNavList = JSON.parse(data)
    }
  },
  actions: {
    addSubNav({ commit },data) {
      commit('addSubNav',data)
    },
  }
}

export default app
