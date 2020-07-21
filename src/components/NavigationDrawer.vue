<template>
    <v-navigation-drawer
            absolute
            disable-resize-watcher
            temporary
            v-model="localDrawer"
    >
        <v-list dense>

            <v-list-item
                    :key="item.name"
                    :to="item.route"
                    link
                    v-for="item in tabItems"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="text-start">{{ item.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list-item>
            <v-list-item-content>
                <v-switch
                        class="pl-2"
                        hide-details
                        inset
                        label="Тёмная тема"
                        v-model="$vuetify.theme.dark"
                ></v-switch>
            </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "NavigationDrawer",
        data() {
            return {
                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard'},
                    {title: 'Photos', icon: 'mdi-image'},
                    {title: 'About', icon: 'mdi-help-box'},
                ],
                right: null,
            }
        },

        methods: {
            ...mapActions('drawer', [
                'hideDrawer'
            ])
        },

        computed: {
            ...mapGetters('drawer', [
                'drawer',
            ]),

            ...mapGetters('tabs', [
                'tabItems',
            ]),

            localDrawer: {
                get() {
                    return this.drawer;
                },
                set(value) {
                    if (!value) {
                        return this.hideDrawer();
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>