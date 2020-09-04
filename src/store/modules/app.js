

const app = {
  state: {
    subNavList:[],
    navigationMode:'horizontal'
  },
  mutations: {
    addSubNav: (state,data) => {
      state.subNavList = JSON.parse(data)
    },
    changeNavigationMode:(state,data)=>{
      state.navigationMode = data
    }
  },
  actions: {
    addSubNav({ commit },data) {
      commit('addSubNav',data)
    },
    changeNavigationMode({ commit },data){
      commit('changeNavigationMode',data)
    }
  }
}

export default app
