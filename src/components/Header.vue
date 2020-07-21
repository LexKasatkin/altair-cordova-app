<template>
    <v-container>
        <v-app-bar
                absolute
                color="#1976D2"
                dark
                elevation="10"
                fade-img-on-scroll
                prominent
                dense
                scroll-target="#scrolling-techniques-3"
                shrink-on-scroll
                src="@/assets/img/header.jpg"
        >
            <template v-slot:img="{ props }">
                <v-img gradient="to top right, rgba(25, 118, 210, 1), rgba(25, 118, 210, 0.85)"
                       v-bind="props"
                ></v-img>
            </template>
            <v-app-bar-nav-icon @click.stop="setDrawer" v-if="!showTabs"></v-app-bar-nav-icon>

            <v-spacer/>
            <v-toolbar-title>{{title}}</v-toolbar-title>

            <v-spacer/>
            <v-btn
                    :href="socialNetwork.route"
                    :key="socialNetwork.route"
                    class="mx-3"
                    dark
                    icon
                    target="_blank"
                    v-for="socialNetwork in socialNetworks"
            >
                <v-icon size="32px">{{ socialNetwork.icon }}</v-icon>
            </v-btn>
            <template v-if="showTabs" v-slot:extension>
                <Tabs></Tabs>
            </template>
        </v-app-bar>
    </v-container>
</template>

<script>
    import Tabs from "./Tabs";
    import {mapActions} from "vuex";

    export default {
        name: "Header",
        components: {Tabs},
        data() {
            return {
                title: 'Альтаир Инвест',
                drawer: false,
                socialNetworks: [{route: 'https://vk.com/ainvest24', icon: 'mdi-vk'}],
            }
        },

        methods: {
            ...mapActions('drawer', [
                'setDrawer',
            ]),
        },

        computed: {
            showTabs() {
                return !(this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm');
            },
        }
    }
</script>

<style scoped>
</style>
