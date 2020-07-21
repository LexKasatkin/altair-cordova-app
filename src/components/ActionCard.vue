<template>
    <v-card :elevation="6" class="mx-auto action-card">
        <v-card-subtitle class="text-center"><b>
            {{title}}
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
            title: String,
            image: String
        },
        name: "ActionCard",
        computed: {
            imagePath() {
                return require("@/assets/img/" + this.image);
            }
        }
    }
</script>

<style scoped>
    .action-card {
        width: 300px;
        height: 100%;
        align-content: center;
        padding-bottom: 16px;
    }

    .action-image {
        max-width: 128px;
        align-content: end;
    }

</style>
