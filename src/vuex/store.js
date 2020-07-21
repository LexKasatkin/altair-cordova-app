import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {loader} from "./loader";
import {flatDetails} from "./flat-details";
import {drawer} from "./drawer"
import {tabs} from "./tabs"
import {hotFlats} from "./hot-flats";
import {galleryImages} from "./gallery-images";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        flats: [],
        typesFlat: [],
        activeTypeFlatId: [],
        districts: [],
        activeDistrictId: [],
        developers: [],
        activeDeveloperId: [],
        wallMaterials: [],
        activeWallMaterialId: [],
        residentialComplexes: [],
        activeResidentialComplexId: [],
        costMin: null,
        costMax: null,
        squareMin: null,
        squareMax: null,
        currentFilters: {},

        showMap: false,

        pagesCount: null,
        currentPage: 1,
        limit: 24,
        offset: 0,

        filters: {
            activeWallMaterialId: 'Материал стен',
            activeTypeFlatId: 'Количество комнат',
            activeDistrictId: 'Район',
            activeDeveloperId: 'Застройщик',
            activeResidentialComplexId: 'Жилой комплекс',
            costMin: 'Минимальная стоимость',
            costMax: 'Максимальная стоимость',
            squareMin: 'Минимальная площадь',
            squareMax: 'Максимальная площадь',
        },

        orderings: [
            {title: 'По стоимости, сначала дешёвые', value: 'cost', icon: 'mdi-sort-ascending'},
            {title: 'По стоимости, сначала дорогие', value: '-cost', icon: 'mdi-sort-descending'},
            {title: 'По площади, сначала малые', value: 'square', icon: 'mdi-sort-ascending'},
            {title: 'По площади, сначала большие', value: '-square', icon: 'mdi-sort-descending'},
            {
                title: 'По стоимости за квадратный метр, сначала дешёвые',
                value: 'cost_square',
                icon: 'mdi-sort-ascending'
            },
            {
                title: 'По стоимости за квадратный метр, сначала дорогие',
                value: '-cost_square',
                icon: 'mdi-sort-descending'
            },
        ],
        currentOrdering: null,
        markers: [],
    },

    mutations: {
        setFlatsToState(state, flats) {
            state.flats = flats;
        },

        setTypesFlatToState(state, typesFlat) {
            state.typesFlat = typesFlat;
        },

        setActiveTypeFlatId(state, activeTypeFlatId) {
            state.activeTypeFlatId = activeTypeFlatId;
            if (activeTypeFlatId && !state.currentFilters[state.filters.activeTypeFlatId] && activeTypeFlatId.length !== 0) {
                state.currentFilters['activeTypeFlatId'] = state.filters.activeTypeFlatId;
            } else {
                delete state.currentFilters['activeTypeFlatId'];
            }
        },

        setDistrictsToState(state, districts) {
            state.districts = districts;
        },

        setActiveDistrictId(state, activeDistrictId) {
            state.activeDistrictId = activeDistrictId;
            if (activeDistrictId && !state.currentFilters[state.filters.activeDistrictId] && activeDistrictId.length !== 0) {
                state.currentFilters['activeDistrictId'] = state.filters.activeDistrictId;
            } else {
                delete state.currentFilters['activeDistrictId'];
            }
        },

        setDevelopersToState(state, developers) {
            state.developers = developers;
        },

        setActiveDeveloperId(state, activeDeveloperId) {
            state.activeDeveloperId = activeDeveloperId;
            if (activeDeveloperId && !state.currentFilters[state.filters.activeDeveloperId] && activeDeveloperId.length !== 0) {
                state.currentFilters['activeDeveloperId'] = state.filters.activeDeveloperId;
            } else {
                delete state.currentFilters['activeDeveloperId'];
            }
        },

        setWallMaterialsToState(state, wallMaterials) {
            state.wallMaterials = wallMaterials;
        },

        setActiveWallMaterialId(state, activeWallMaterialId) {
            state.activeWallMaterialId = activeWallMaterialId;
            if (activeWallMaterialId && !state.currentFilters[state.filters.activeWallMaterialId] && activeWallMaterialId.length !== 0) {
                state.currentFilters['activeWallMaterialId'] = state.filters.activeWallMaterialId;
            } else {
                delete state.currentFilters['activeWallMaterialId'];
            }
        },

        setResidentialComplexesToState(state, residentialComplexes) {
            state.residentialComplexes = residentialComplexes;
        },

        setActiveResidentialComplexId(state, activeResidentialComplexId) {
            state.activeResidentialComplexId = activeResidentialComplexId;
            if (activeResidentialComplexId && !state.currentFilters[state.filters.activeResidentialComplexId] && activeResidentialComplexId.length !== 0) {
                state.currentFilters['activeResidentialComplexId'] = state.filters.activeResidentialComplexId;
            } else {
                delete state.currentFilters['activeResidentialComplexId'];
            }
        },

        setCostMin(state, costMin) {
            state.costMin = costMin;
            if (costMin && !state.currentFilters[state.filters.costMin]) {
                state.currentFilters['costMin'] = state.filters.costMin;
            } else {
                delete state.currentFilters['costMin'];
            }
        },

        setCostMax(state, costMax) {
            state.costMax = costMax;
            if (costMax && !state.currentFilters[state.filters.costMax]) {
                state.currentFilters['costMax'] = state.filters.costMax;
            } else {
                delete state.currentFilters['costMax'];
            }
        },

        setSquareMin(state, squareMin) {
            state.squareMin = squareMin;
            if (squareMin && !state.currentFilters[state.filters.squareMin]) {
                state.currentFilters['squareMin'] = state.filters.squareMin;
            } else {
                delete state.currentFilters['squareMin'];
            }
        },

        setSquareMax(state, squareMax) {
            state.squareMax = squareMax;
            if (squareMax && !state.currentFilters[state.filters.squareMax]) {
                state.currentFilters['squareMax'] = state.filters.squareMax;
            } else {
                delete state.currentFilters['squareMax'];
            }
        },

        deleteCurrentFilter(state, key) {
            delete state.currentFilters[key];
            state[key] = null;
        },

        resetAllFilters(state) {
            Object.keys(state.currentFilters).forEach(function (key) {
                delete state.currentFilters[key];
            });
            state.squareMin = null;
            state.squareMax = null;
            state.costMin = null;
            state.costMax = null;
            state.activeWallMaterialId = [];
            state.activeDeveloperId = [];
            state.activeDistrictId = [];
            state.activeTypeFlatId = [];
        },

        setPagesCount(state, pagesCount) {
            state.pagesCount = pagesCount;
        },

        setOffset(state, offset) {
            state.offset = offset;
        },

        setLimit(state, limit) {
            state.limit = limit;
        },

        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },

        setMapShowing(state) {
            state.showMap = !state.showMap;
        },

        setCurrentOrdering(state, currentOrdering) {
            state.currentOrdering = currentOrdering;
        },

        pushMarkers(state, flats) {
            state.markers = flats.map(flat => {
                return {
                    position: [flat.longitude, flat.latitude],
                    content: `<table>
                                  <tr>
                                    <td style="border-right:7px solid white;">
                                        <img src="${flat.main_image_thumbnail}" style="width: 50px; height: 50px">
                                    </td>
                                    <td>
                                        <a href="/#/flat/${flat.id}" style="{ text-decoration: none; }"><b>${flat.flat_type}</b></a>
                                        <div><b>${flat.cost} ₽ </b>${flat.square}м<sup>2</sup></div>
                                        <div>${flat.city}, ${flat.street} ${flat.house}</div>
                                    </td>
                                  </tr>
                                </table>`
                }
            });
        },
    },

    actions: {
        removeFilter({commit}, key) {
            commit('deleteCurrentFilter', key);
        },

        removeAllFilters({commit}) {
            commit('resetAllFilters')
        },

        getFlats({commit, state}) {
            return axios.get(`${process.env.VUE_APP_URL}/flats/`, {
                params: {
                    flat_type: state.activeTypeFlatId ? state.activeTypeFlatId.join(',') : '',
                    district: state.activeDistrictId ? state.activeDistrictId.join(',') : '',
                    developer: state.activeDeveloperId ? state.activeDeveloperId.join(',') : '',
                    wall_material: state.activeWallMaterialId ? state.activeWallMaterialId.join(',') : '',
                    residential_complex: state.activeResidentialComplexId ? state.activeResidentialComplexId.join(',') : '',
                    cost_min: state.costMin ? state.costMin * 1000 : null,
                    cost_max: state.costMax ? state.costMax * 1000 : null,
                    square_min: state.squareMin,
                    square_max: state.squareMax,
                    offset: state.offset,
                    limit: state.limit,
                    ordering: state.currentOrdering,
                    format: 'json'
                },
                    headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                const flats = response.data.results;
                commit('setFlatsToState', flats);
                commit('setPagesCount', Math.ceil(response.data.count / state.limit));
                commit('pushMarkers', flats);
                this.dispatch('loader/setLoading', false);
                return flats;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getTypesFlat({commit}) {
            return axios.get(`${process.env.VUE_APP_URL}/flat-types/`, {
                    params: {
                        format: 'json'
                    }, headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                const flatTypes = response.data.flat_types.sort((a, b) => a.id - b.id);
                commit('setTypesFlatToState', flatTypes);
                this.dispatch('loader/setLoading', false);
                return flatTypes;
            }).catch(error => {
                console.log(error);
                    return error;
                }
            )
        },

        getDistricts({commit}) {
            return axios.get(`${process.env.VUE_APP_URL}/districts/`, {
                    params: {
                        format: 'json'
                    }, headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setDistrictsToState', response.data.districts);
                this.dispatch('loader/setLoading', false);
                return response.districts;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getDevelopers({commit}) {
            return axios.get(`${process.env.VUE_APP_URL}/developers/`, {
                    params: {
                        format: 'json'
                    }, headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setDevelopersToState', response.data.developers);
                this.dispatch('loader/setLoading', false);
                return response.developers;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getWallMaterials({commit}) {
            return axios.get(`${process.env.VUE_APP_URL}/wall-materials/`, {
                    params: {
                        format: 'json'
                    }, headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setWallMaterialsToState', response.data.wall_materials);
                this.dispatch('loader/setLoading', false);
                return response.wall_materials;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getResidentialComplexes({commit}) {
            return axios.get(`${process.env.VUE_APP_URL}/residential-complexes/`, {
                    params: {
                        format: 'json'
                    }, headers: process.env.HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setResidentialComplexesToState', response.data.residential_complexes);
                this.dispatch('loader/setLoading', false);
                return response.residential_complexes;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        setLimit({commit}, newLimit) {
            commit('setLimit', newLimit);
        },

        calculateOffset({commit, state}) {
            commit('setOffset', (state.currentPage - 1) * state.limit);
        },

        setCurrentPage({commit}, newPage) {
            commit('setCurrentPage', newPage);
        },

        setMapShowing({commit}) {
            commit('setMapShowing');
        },

        setCurrentOrdering({commit}, currentOrdering) {
            commit('setCurrentOrdering', currentOrdering);
        }
    },
    getters: {
        flats(state) {
            return state.flats;
        },

        typesFlat(state) {
            return state.typesFlat;
        },

        activeTypeFlatId(state) {
            return state.activeTypeFlatId;
        },

        districts(state) {
            return state.districts;
        },

        activeDistrictId(state) {
            return state.activeDistrictId;
        },

        developers(state) {
            return state.developers;
        },

        activeDeveloperId(state) {
            return state.activeDeveloperId;
        },

        wallMaterials(state) {
            return state.wallMaterials;
        },

        activeWallMaterialId(state) {
            return state.activeWallMaterialId;
        },

        residentialComplexes(state) {
            return state.residentialComplexes;
        },

        activeResidentialComplexId(state) {
            return state.activeResidentialComplexId;
        },

        costMin(state) {
            return state.costMin;
        },

        costMax(state) {
            return state.costMax;
        },

        squareMin(state) {
            return state.squareMin;
        },

        squareMax(state) {
            return state.squareMax;
        },

        currentFilters(state) {
            return state.currentFilters;
        },

        pagesCount(state) {
            return state.pagesCount;
        },

        currentPage(state) {
            return state.currentPage;
        },

        currentLimit(state) {
            return state.limit;
        },

        showMap(state) {
            return state.showMap;
        },

        currentOrdering(state) {
            return state.currentOrdering;
        },

        orderings(state) {
            return state.orderings;
        },

        markers(state) {
            return state.markers;
        },
    },

    modules: {
        loader,
        flatDetails,
        drawer,
        tabs,
        hotFlats,
        galleryImages,
    }
})

export default store;
