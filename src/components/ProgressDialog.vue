<template>
    <v-overlay color="transparent" v-model="visibility">
        <v-card color="transparent" elevation="0" width="80">
            <v-card-text class="text-center">
                <v-progress-circular color="blue" indeterminate size="80" width="7"></v-progress-circular>
            </v-card-text>
        </v-card>
    </v-overlay>
</template>

<script>
    export default {
        name: "ProgressDialog",

        props: {
            visibility: {
                type: Boolean,
                required: true,
            }
        },

        data() {
            return {}
        },
    }
</script>

<style scoped>
    v-progress-circular {
        margin: 1rem;
    }
</style>
