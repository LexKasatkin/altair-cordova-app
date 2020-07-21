import axios from "axios";

export const hotFlats = {
    namespaced: true,
    state: {
        hotFlats: [],
        house: null,
        flatId: null,
        limit: null,
        offset: 0,
    },
    actions: {
        getHotFlats({commit, state}) {
            return axios.get(`${process.env.VUE_APP_URL}/flats/`, {
                    params: {
                        offset: state.offset,
                        limit: state.limit,
                        house: state.house,
                        flat_id: state.flatId,
                        format: 'json'
                    },
                    headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                const flats = response.data.results;
                commit('setHotFlatsToState', flats);
                return flats;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        setLimit({commit}, limit) {
            commit('setLimit', limit);
        },

        setHouse({commit}, house) {
            commit('setHouse', house);
        },

        setExcludeFlatId({commit}, flatId) {
            commit('setExcludeFlatId', flatId);
        },
    },

    mutations: {
        setHotFlatsToState(state, hotFlats) {
            state.hotFlats = hotFlats;
        },

        setLimit(state, limit) {
            state.limit = limit;
        },

        setHouse(state, house) {
            state.house = house;
        },

        setExcludeFlatId(state, flatId) {
            state.flatId = flatId;
        },
    },

    getters: {
        hotFlats(state) {
            return state.hotFlats;
        },
    }
};
