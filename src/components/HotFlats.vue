<template>
    <div class="mx-auto main-container" v-if="showHotFlats()">
        <v-card-title class="text-start">
            Другие квартиры в этом доме
        </v-card-title>
        <v-row justify="start">
            <v-col :key="i"
                   cols="12"
                   md="4"
                   sm="6"
                   v-for="i in hotFlats.length"
                   xs="12"
            >
                <FlatCard :flat="hotFlats[--i]">
                </FlatCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import FlatCard from "./FlatCard";

    export default {
        name: "HotFlats",
        components: {FlatCard},

        props: {
            house: {
                required: true,
                type: Number,
                default: -1,
            },
            flatId: {
                required: true,
                type: Number,
                default: -1,
            }
        },

        data() {
            return {
                countOfFlats: 3,
            };
        },

        methods: {
            ...mapActions('hotFlats', [
                'getHotFlats',
                'setLimit',
                'setHouse',
                'setExcludeFlatId',
            ]),

            ...mapMutations('flatDetails', [
                'setFlatDetailsLoaded',
            ]),

            showHotFlats() {
                return this.hotFlats.length > 0;
            }
        },


        computed: {
            ...mapGetters('hotFlats', [
                'hotFlats',
            ]),
            ...mapGetters('flatDetails', [
                'flatDetailsLoaded',
            ])
        },

        watch: {
            flatDetailsLoaded: function (value) {
                if (value) {
                    this.setHouse(this.house);
                    this.setLimit(this.countOfFlats);
                    this.setExcludeFlatId(this.flatId);
                    this.getHotFlats();
                    this.setFlatDetailsLoaded(false);
                }
            },
        },
    }
</script>

<style scoped>

</style>
