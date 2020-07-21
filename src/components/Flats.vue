<template>
    <div class="mx-auto main-container">
        <v-card class="mx-auto filters" elevation="6">
            <v-form
                    @submit.prevent="searchFlats"
                    lazy-validation
                    ref="flatsFilters"
            >
                <v-row justify="space-between">
                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="residentialComplexes"
                                  :value="activeResidentialComplexId"
                                  @input="setResidentialComplexId"
                                  multiple
                                  label="Жилой комплекс"
                                  item-text="name"
                                  item-value="id"
                                  residentialComplex
                        ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="districts"
                                  :value="activeDistrictId"
                                  @input="setDistrictId"
                                  district
                                  multiple
                                  item-text="name"
                                  item-value="id"
                                  label="Район"
                        ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="developers"
                                  :value="activeDeveloperId"
                                  @input="setDeveloperId"
                                  developer
                                  multiple
                                  item-text="name"
                                  item-value="id"
                                  label="Застройщик"
                        ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="wallMaterials"
                                  :value="activeWallMaterialId"
                                  @input="setWallMaterialId"
                                  item-text="name"
                                  item-value="id"
                                  multiple
                                  label="Материал стен"
                                  wallMeterial
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row justify="space-between">
                    <v-col class="d-flex" cols="12" md="6" sm="12">
                        <v-row>
                            <v-col class="d-flex mt-2" md="4" sm="4" xs="2">
                                Стоимость:
                            </v-col>
                            <v-col class="d-flex" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setMinCost"
                                        countFrom
                                        dense
                                        :rules="[costMinRules]"
                                        label="От"
                                        :suffix="costSuffix"
                                        type="number"
                                        outlined
                                        v-model.number="costMin"
                                ></v-text-field>
                            </v-col>
                            <v-col class="align-center" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setMaxCost"
                                        countTo
                                        dense
                                        :rules="[costMaxRules]"
                                        type="number"
                                        :suffix="costSuffix"
                                        label="До"
                                        outlined
                                        v-model.number="costMax"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col class="d-flex" cols="12" md="6" sm="12">
                        <v-row>
                            <v-col class="d-flex mt-2" md="4" sm="4" xs="2">
                                Площадь:
                            </v-col>
                            <v-col class="d-flex" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setMinSquare"
                                        dense
                                        label="От"
                                        :rules="[squareMinRules]"
                                        type="number"
                                        :suffix="squareSuffix"
                                        outlined
                                        squareMin
                                        v-model.number="squareMin"
                                >
                                    <template slot="append">2</template>
                                </v-text-field>
                            </v-col>
                            <v-col class="d-flex" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setMaxSquare"
                                        dense
                                        label="До"
                                        :rules="[squareMaxRules]"
                                        type="number"
                                        outlined
                                        :suffix="squareSuffix"
                                        squareMax
                                        v-model.number="squareMax"
                                >
                                    <template slot="append">2</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="mt-0 text-start" cols="12" md="6" sm="8">
                        <p class="mb-0">Количество комнат</p>
                        <v-btn-toggle
                                :key="flatType.id"
                                class="text-start"
                                multiple
                                v-for="flatType in typesFlat"
                                v-model="flatTypes"
                        >
                            <v-btn :value="flatType.id" color="blue darken-1" outlined tile>
                                {{flatType.label}}
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="12" md="6" sm="4">
                        <v-btn class="mt-7 sm-mt-7 md-mt-7"
                               color="success"
                               type="submit"
                        >
                            Показать
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row
                        align="center"
                        justify="start"
                >
                    <v-col :key="filter"
                           class="shrink"
                           v-for="filter in Object.keys(currentFilters)"
                    >
                        <v-chip @click:close="removeFilter(filter)"
                                close
                        >
                            {{ currentFilters[filter] }}
                        </v-chip>
                    </v-col>

                    <v-col class="shrink"
                           v-if="Object.keys(currentFilters).length>0"
                    >
                        <v-chip @click:close="onRemoveAllFilters"
                                close
                        >
                            Удалить все фильтры
                        </v-chip>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>

        <v-divider class="divider"></v-divider>

        <v-container class="pa-3">
            <v-layout class="pr-3 pl-3" row wrap>
                <v-flex class="justify-sm-center justify-center justify-md-start" d-flex md="7" sm="7" xs="12">
                    <v-select :items="orderings"
                              @change="onSelectOrdering"
                              item-text="title"
                              item-value="value"
                              menu-props="auto"
                              single-line
                              v-model="currentOrdering"
                    >
                        <template slot="selection" slot-scope="data">
                            <v-icon color="#0058b1">{{ data.item.icon }}</v-icon>
                            <v-subheader class="color-text">{{data.item.title}}</v-subheader>
                        </template>
                        <template slot="item" slot-scope="data">
                            <v-icon color="#0058b1">{{ data.item.icon }}</v-icon>
                            <v-subheader class="color-text">{{data.item.title}}</v-subheader>
                        </template>
                    </v-select>
                </v-flex>

                <v-flex class="justify-start text-right" md="5" sm="5" xs="12">
                    <v-btn @click="setMapShowing"
                           class="mt-0 mt-sm-6 pl-2"
                           color="green"
                           outlined
                    >{{labelBtnMap}}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <l-map :center="center" :zoom="zoom" class="mt-4" style="z-index: 0; height: 300px" v-if="showMap">
            <l-tile-layer :attribution="attribution"
                          :url="url"
            ></l-tile-layer>
            <v-marker-cluster>
                <l-marker :icon="icon"
                          :key="i"
                          :lat-lng="marker.position"
                          v-for="(marker,i) in this.markers">
                    <l-popup :content="marker.content"/>
                </l-marker>
            </v-marker-cluster>
        </l-map>

        <v-container>
            <v-row justify="start">
                <v-col :key="i"
                       cols="12"
                       md="4"
                       sm="6"
                       v-for="i in flats.length"
                       xs="12"
                >
                    <FlatCard :flat="flats[--i]">
                    </FlatCard>
                </v-col>
            </v-row>
        </v-container>

        <v-layout class="pa-4" row wrap>
            <v-flex class="pt-3 pl-12" md11 sm10 xs9>
                <v-pagination
                        :length="pagesCount"
                        @input="onChangeCurrentPage"
                        circle
                        color="blue"
                        v-model="currentPage"
                ></v-pagination>
            </v-flex>
            <v-flex class="pr-2" md1 sm2 xs3>
                <v-select :items="pagination.limits"
                          @input="onChangeLimit"
                          v-model="currentLimit"
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import FlatCard from "./FlatCard";
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {icon} from "leaflet";
    import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
    import {LMap, LMarker, LPopup} from 'vue2-leaflet';

    export default {
        name: "Flats",
        components: {
            FlatCard,
            'v-marker-cluster': Vue2LeafletMarkerCluster,
            LPopup,
            LMarker,
            LMap,
        },
        metaInfo() {
            return {title: this.$title('Квартиры')};
        },

        data() {
            return {
                numberOfColumns: 3,
                pagination: {
                    limits: [24, 48, 72, 96],
                },
                costSuffix: 'тыс.',
                squareSuffix: 'м',
                flatTypes: [],

                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                zoom: 9,
                center: [56.010563, 92.852572],
                icon: icon({
                    iconUrl: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png",
                    shadowUrl: require("@/assets/img/shadow.png"),
                    iconSize: [48, 48],
                    shadowSize: [48, 48],
                    iconAnchor: [20, 20],
                    shadowAnchor: [20, 20],
                }),
            }
        },

        methods: {
            ...mapMutations([
                'setActiveTypeFlatId',
                'setActiveDistrictId',
                'setActiveDeveloperId',
                'setActiveResidentialComplexId',
                'setCostMin',
                'setCostMax',
                'setSquareMin',
                'setSquareMax',
                'setActiveWallMaterialId',
            ]),

            ...mapActions([
                'getFlats',
                'getTypesFlat',
                'getDistricts',
                'getDevelopers',
                'getWallMaterials',
                'getResidentialComplexes',
                'removeFilter',
                'removeAllFilters',
                'setLimit',
                'setCurrentPage',
                'calculateOffset',
                'setMapShowing',
                'setCurrentOrdering',
            ]),

            convertToNull(value) {
                return isNaN(value) ? null : value;
            },

            convertToArray(array) {
                return array ? array.split(',').map(value => this.convertToNull(Number(value))) : []
            },

            setTypeFlatId(value) {
                this.setActiveTypeFlatId(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        type_flat: this.activeTypeFlatId.join(',')
                    }
                });
            },

            setDistrictId(value) {
                this.setActiveDistrictId(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        district: this.activeDistrictId.join(',')
                    }
                });
            },

            setDeveloperId(value) {
                this.setActiveDeveloperId(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        developer: this.activeDeveloperId.join(',')
                    }
                });
            },

            setWallMaterialId(value) {
                this.setActiveWallMaterialId(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        wall_material: this.activeWallMaterialId.join(',')
                    }
                });
            },

            setResidentialComplexId(value) {
                this.setActiveResidentialComplexId(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        residential_complex: this.activeResidentialComplexId.join(',')
                    }
                });
            },

            setMinCost(value) {
                this.setCostMin(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        cost_min: this.costMin
                    }
                });
            },

            setMaxCost(value) {
                this.setCostMax(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        cost_max: this.costMax
                    }
                });
            },

            setMinSquare(value) {
                this.setSquareMin(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        square_min: this.squareMin
                    }
                });
            },

            setMaxSquare(value) {
                this.setSquareMax(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        square_max: this.squareMax
                    }
                });
            },

            searchFlats() {
                this.$refs.flatsFilters.validate();
                this.getFlats();
            },

            costMaxRules(value) {
                if (!this.costMin || Number(value) >= Number(this.costMin) || !value)
                    return true;
                else {
                    return 'Максимальная стоимость должна быть больше минимальной.';
                }
            },

            costMinRules(value) {
                if (!this.costMax || Number(value) <= Number(this.costMax) || !value)
                    return true;
                else {
                    return 'Минимальная стоимость должна быть меньше максимальной.';
                }
            },

            squareMaxRules(value) {
                if (!this.squareMin || Number(value) >= Number(this.squareMin) || !value)
                    return true;
                else {
                    return 'Максимальная площадь должна быть больше минимальной.';
                }
            },

            squareMinRules(value) {
                if (!this.squareMax || Number(value) <= Number(this.squareMax) || !value)
                    return true;
                else {
                    return 'Минимальная площадь должна быть меньше максимальной.';
                }
            },

            onChangeCurrentPage(value) {
                this.setCurrentPage(value);
                this.calculateOffset();
                this.getFlats();
            },

            onChangeLimit(value) {
                this.setLimit(value);
                this.calculateOffset();
                this.getFlats();
            },

            onSelectOrdering(value) {
                this.setCurrentOrdering(value);
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        ordering: this.currentOrdering
                    }
                });
                this.getFlats();
            },

            onRemoveAllFilters() {
                this.removeAllFilters();
                this.$router.push({query: null})
                this.getFlats();
            },
        },

        computed: {
            ...mapGetters([
                'flats',
                'typesFlat',
                'activeTypeFlatId',
                'districts',
                'activeDistrictId',
                'developers',
                'activeDeveloperId',
                'wallMaterials',
                'activeWallMaterialId',
                'residentialComplexes',
                'activeResidentialComplexId',
                'costMin',
                'costMax',
                'squareMin',
                'squareMax',
                'currentFilters',
                'currentLimit',
                'currentPage',
                'pagesCount',
                'showMap',
                'orderings',
                'currentOrdering',
                'markers',
            ]),

            labelBtnMap() {
                return this.showMap ? 'Скрыть карту' : 'Показать карту';
            },
        },

        mounted() {
            const typesFlat = this.$route.query.type_flat;
            const districts = this.$route.query.district;
            const developers = this.$route.query.developer;
            const wallMaterials = this.$route.query.wall_material;
            const residentialComplexes = this.$route.query.residential_complex;
            const costMin = Number(this.$route.query.cost_min)
            const costMax = Number(this.$route.query.cost_max)
            const squareMin = Number(this.$route.query.square_min)
            const squareMax = Number(this.$route.query.square_max)
            const ordering = this.$route.query.ordering
            this.flatTypes = this.convertToArray(typesFlat);
            this.setActiveTypeFlatId(this.flatTypes);
            this.setActiveDistrictId(this.convertToArray(districts));
            this.setActiveDeveloperId(this.convertToArray(developers));
            this.setActiveWallMaterialId(this.convertToArray(wallMaterials));
            this.setActiveResidentialComplexId(this.convertToArray(residentialComplexes));
            this.setCostMin(this.convertToNull(costMin));
            this.setCostMax(this.convertToNull(costMax));
            this.setSquareMin(this.convertToNull(squareMin));
            this.setSquareMax(this.convertToNull(squareMax));
            this.setCurrentOrdering(!ordering ? this.orderings[0].value : ordering);
            this.getTypesFlat();
            this.getDistricts();
            this.getDevelopers();
            this.getWallMaterials();
            this.getResidentialComplexes();
            this.getFlats();
        },

        watch: {
            activeTypeFlatId: function (value) {
                if (!value || value.length === 0) {
                    this.flatTypes = value;
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            type_flat: undefined
                        }
                    });
                }
            },

            activeDistrictId: function (value) {
                if (!value || value.length === 0) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            district: undefined
                        }
                    });
                }
            },

            activeDeveloperId: function (value) {
                if (!value || value.length === 0) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            developer: undefined
                        }
                    });
                }
            },

            activeWallMaterialId: function (value) {
                if (!value || value.length === 0) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            wall_material: undefined
                        }
                    });
                }
            },

            activeResidentialComplexId: function (value) {
                if (!value || value.length === 0) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            residential_complex: undefined
                        }
                    });
                }
            },

            costMin: function (value) {
                if (!value) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            cost_min: undefined
                        }
                    });
                }
            },

            costMax: function (value) {
                if (!value) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            cost_max: undefined
                        }
                    });
                }
            },

            squareMin: function (value) {
                if (!value) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            square_min: undefined
                        }
                    });
                }
            },

            squareMax: function (value) {
                if (!value) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            square_max: undefined
                        }
                    });
                }
            },

            currentOrdering: function (value) {
                if (!value) {
                    this.$router.replace({
                        query: {
                            ...this.$route.query,
                            ordering: undefined
                        }
                    });
                }
            },

            flatTypes: function (value) {
                this.setTypeFlatId(value);
            },
        },
    }
</script>

<style scoped>
    .filters {
        padding: 16px;
        margin: 16px;
    }

    .divider {
        margin-top: 24px;
    }
</style>
