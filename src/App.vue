<template>
    <v-app>
        <div id="app">
            <Header></Header>
            <NavigationDrawer></NavigationDrawer>
            <notifications group="errors" position="bottom right"/>
            <ProgressDialog :visibility="loading"></ProgressDialog>
            <div>
                <v-sheet
                        class="overflow-y-auto"
                        id="scrolling-techniques-3"
                >
                    <v-container :class="bigMargin ? 'content-margin-big' : 'content-margin'">
                        <router-view></router-view>
                    </v-container>
                </v-sheet>
            </div>
            <Footer></Footer>
        </div>
    </v-app>
</template>

<script>
    import Header from "./components/Header";
    import axios from "axios";
    import {mapActions, mapGetters} from "vuex";
    import ProgressDialog from "./components/ProgressDialog";
    import NavigationDrawer from "./components/NavigationDrawer";
    import Footer from './components/Footer'

    export default {
        components: {Header, ProgressDialog, NavigationDrawer, Footer},

        created() {
            axios.interceptors.request.use((config) => {
                this.setLoading(true);
                return config;
            }, (error) => {
                this.setLoading(false);
                this.showErrorMessage(error.message)
                return Promise.reject(error);
            });

            axios.interceptors.response.use((response) => {
                this.setLoading(false);
                return response;
            }, (error) => {
                this.setLoading(false);
                this.showErrorMessage(error.message)
                return Promise.reject(error);
            });
        },

        methods: {
            ...mapActions('loader', [
                'setLoading',
            ]),

            showErrorMessage(message) {
                this.$notify({
                    group: 'errors',
                    text: message,
                    type: 'error',
                });
            }
        },

        computed: {
            ...mapGetters('loader', [
                'loading',
            ]),

            bigMargin() {
                return !(this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm');
            },
        }
    }
</script>


<style>
    @import "~leaflet.markercluster/dist/MarkerCluster.css";
    @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .main-container {
        max-width: 984px;
    }

    .content-margin-big {
        margin-top: 180px;
    }

    .content-margin {
        margin-top: 80px;
    }

    .color-text {
        color: #1976D2;
    }
</style>
