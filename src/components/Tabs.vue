<template>
    <v-tabs
            dark
            grow
            v-model="activeTab"
    >
        <v-tab :key="i" :tabindex="i" :to="tab.route" v-for="(tab,i) in tabItems">{{tab.name}}
        </v-tab>
    </v-tabs>
</template>

<script>

    export default {
        name: "Tabs",

        data() {
            return {
                activeTab: 2,
                tabItems: [
                    {
                        name: 'Главная',
                        route: '/main',
                        icon: 'mdi-home',
                    },
                    {
                        name: 'О компании',
                        route: '/company',
                        icon: 'mdi-information',
                    },
                    {
                        name: 'Квартиры',
                        route: '/flats',
                        icon: 'mdi-office-building',
                    },
                    {
                        name: 'Контакты',
                        route: '/contacts',
                        icon: 'mdi-contacts',
                    },
                ]
            }
        },
    }
</script>

<style scoped>

</style>
