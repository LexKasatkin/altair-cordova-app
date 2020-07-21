export const drawer = {
    namespaced: true,
    state: {
        drawer: false,
    },

    actions: {
        setDrawer({commit}) {
            commit('setDrawer');
        },

        hideDrawer({commit}) {
            commit('hideDrawer');
        },
    },

    mutations: {
        setDrawer(state) {
            state.drawer = !state.drawer;
        },

        hideDrawer(state) {
            state.drawer = false;
        },
    },

    getters: {
        drawer(state) {
            return state.drawer;
        },
    }
};