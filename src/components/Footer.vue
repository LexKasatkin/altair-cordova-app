<template>
    <v-footer class="mt-4" elevation="6" height="auto" padless>
        <v-card class="flex" flat tile>
            <v-container>
                <v-card-text>
                    <v-layout>
                        <v-flex class="pt-2" column layout md4 sm3 xs12>
                            <OpenMapComponent :center="[55.980180, 92.914331]"
                                              :content="address"
                                              :height="'150px'"
                                              :marker="[55.980180, 92.914331]"
                            ></OpenMapComponent>
                        </v-flex>

                        <v-flex class="ml-4 pt-2 pl-4" column layout md5 sm5 xs12>
                            <span class="body-2 text-start">КОНТАКТЫ</span>
                            <v-list dense>
                                <v-list-item
                                        :href="contact.link"
                                        :key="contact.link"
                                        color="transparent"
                                        link
                                        v-for="contact in contacts"
                                >
                                    <v-list-item-icon>
                                        <v-icon>{{ contact.icon }}</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title class="text-start">{{ contact.content }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-container>
        </v-card>
    </v-footer>
</template>

<script>
    import OpenMapComponent from "./OpenMapComponent";

    export default {
        name: "Footer",
        components: {OpenMapComponent},
        data() {
            return {
                address: 'г.Красноярск,ул, Мусоргского 18,  660019',
                contacts: [
                    {
                        icon: 'mdi-home',
                        content: 'г.Красноярск,ул, Мусоргского 18,  660019',
                        link: 'https://www.google.com/maps/place/55.980180,92.914331'
                    },
                    {
                        icon: 'mdi-email',
                        content: '2095171@mail.ru',
                        link: 'mailto:2095171@mail.ru'
                    },
                    {
                        icon: 'mdi-phone',
                        content: '209-51-71',
                        link: 'tel:209-51-71'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
