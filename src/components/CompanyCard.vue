<template>
    <v-card :elevation="6" class="mx-auto action-card">
        <v-card-subtitle class="text-center"><b>
            {{data.title}}
        </b></v-card-subtitle>
        <v-row class="justify-center">
            <v-img :src="imagePath"
                   class="action-image"
            ></v-img>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        props: {
            data: Object
        },
        name: "CompanyCard",
        computed: {
            imagePath() {
                return require("@/assets/img/" + this.data.image);
            }
        },


    }
</script>

<style scoped>
    .action-card {
        max-width: 320px;
        height: 100%;
        padding-bottom: 16px;
    }

    .action-image {
        margin-top: 10%;
        max-width: 300px;
    }

</style>
