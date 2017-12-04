
const state = {

};

const getters = {
  activeIndex: function (state) {
    console.log(state.activeIndex);
    return state.activeIndex
  }
  // activeIndex: state => state.activeIndex
};

const mutations = {
  toggleStyle (state) {

  }
};

const actions = {
  toggleStyle: ({ commit }) => commit('toggleStyle'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment');
        resolve()
      }, 1000)
    })
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
