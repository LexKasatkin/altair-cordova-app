export const galleryImages = {
    namespaced: true,
    state: {
        images: Array,
    },
    actions: {
        setImages({commit}, images) {
            commit('setImages', images);
        },

        setImage({commit}, index, value) {
            commit('setImage', index, value);
        }
    },
    mutations: {
        setImages(state, images) {
            state.images = images;
        },

        setImage(state, index, value) {
            state.images[index] = value;
        },
    },
    getters: {
        galleryImages(state) {
            return state.images;
        },
    }
};
