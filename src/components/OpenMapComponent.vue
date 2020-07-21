<template>
    <l-map :center="center" :style="mapStyle" :zoom="zoom">
        <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
        <l-marker :icon="icon" :lat-lng="marker">
            <l-popup :content="content"/>
        </l-marker>
    </l-map>
</template>

<script>
    import {icon} from "leaflet";
    import {LPopup} from 'vue2-leaflet';

    export default {
        name: "OpenMapComponent",

        components: {
            LPopup,
        },

        props: {
            height: {
                required: true,
                type: String,
            },

            marker: {
                required: true,
                type: Array,
            },

            center: {
                required: true,
                type: Array,
            },

            content: {
                required: true,
                type: String,
            }
        },

        data() {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                zoom: 16,
                icon: icon({
                    iconUrl: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png",
                    shadowUrl: require("@/assets/img/shadow.png"),
                    iconSize: [48, 48],
                    shadowSize: [48, 48],
                    iconAnchor: [20, 20],
                    shadowAnchor: [20, 20],
                }),
            }
        },

        computed: {
            mapStyle() {
                return {
                    'height': `${this.height}`,
                    'z-index': '0',
                }
            }
        }
    }
</script>

<style scoped>

</style>
