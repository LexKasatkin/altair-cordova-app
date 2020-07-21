<template>
    <v-container class="mx-auto main-container mb-3">
        <v-card elevation="6">
            <v-layout class="pr-3 pl-3" row wrap>
                <v-flex class="justify-sm-center justify-center justify-md-start" d-flex md="6" sm="6" xs="12">
                    <v-img :src="avatar" class="avatar">
                    </v-img>
                </v-flex>

                <v-flex class="justify-start" md="6" sm="6" xs="12">
                    <v-card-title class="text-start">Касаткина Анна Андреевна</v-card-title>
                    <v-card-subtitle class="text-start">209-51-71, 8 (983) 269-51-71</v-card-subtitle>
                    <v-card-text class="text-start">2095171@mail.ru
                        <p>Наш адрес: {{this.address}}</p>
                    </v-card-text>
                </v-flex>
            </v-layout>

            <v-layout class="pt-4">
                <OpenMapComponent :center="[55.980180, 92.914331]"
                                  :content="address"
                                  :height="'300px'"
                                  :marker="[55.980180, 92.914331]"
                ></OpenMapComponent>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    import OpenMapComponent from "./OpenMapComponent";

    export default {
        name: "Contacts",
        components: {OpenMapComponent},
        metaInfo() {
            return {title: this.$title('Контакты')};
        },

        data() {
            return {
                address: "г.Красноярск,ул, Мусоргского 18,  660019",
            }
        },

        computed: {
            avatar() {
                return require('@/assets/img/avatar.jpg');
            }
        }
    }
</script>

<style scoped>
    .main-container {
        max-width: 984px;
    }

    .avatar {
        width: 400px;
        height: 300px;
    }
</style>
