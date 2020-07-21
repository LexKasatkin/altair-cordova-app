<template>
    <div class="main-container mx-auto">
        <v-container>
            <v-row class="justify-center">
                <v-col :key="i"
                       cols="12"
                       md="4"
                       sm="6"
                       v-for="i in companyInfo.length"
                       xs="12"
                >
                    <CompanyCard :data="companyInfo[--i]">
                    </CompanyCard>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import CompanyCard from "./CompanyCard";

    export default {
        name: "Company",
        components: {CompanyCard},
        metaInfo() {
            return {title: this.$title('Компания')};
        },

        data() {
            return {
                numberOfColumns: 3,
                companyInfo:
                    [
                        {

                            title: 'Помощь при оформлении ипотеки и покупки жилья с использованием материнского капитала.' +
                                'Спецпрограммы по ставкам 1% / 2% / 6,5%',
                            image: 'mortgage-company.png'
                        },
                        {
                            title: 'Большой выбор актуальных вариантов во всех районах городах',
                            image: 'flats-company.png'
                        },
                        {
                            title: 'Наша компания является партнером крупных строительных компания г.Красноярска',
                            image: 'building.png'
                        },
                        {
                            title: 'Благодаря деятельности компании в сфере строительства в наличии есть собстенные ' +
                                'квартиры цена и условия приобретения которых не имеет аналогов',
                            image: 'flats.png'
                        },
                        {
                            title: 'Компания "Альтаир-Инвест" - надежный партнер на рынке жилья уже 10 лет',
                            image: '10-years.png'
                        },
                        {
                            title: 'Индивидуальный подход к каждому клиенту',
                            image: 'client.png'
                        },
                        {
                            title: 'Гарантия безопасности сделки от момента обращения в компанию и до заселения',
                            image: 'hands.png'
                        },
                    ]
            }
        },

        methods: {
            companyColumns(row) {
                return this.companyInfo.length - row * this.numberOfColumns;
            }
        },

        computed: {
            companyRows() {
                return Math.ceil(this.companyInfo.length / this.numberOfColumns);
            },
        }
    }
</script>

<style scoped>

</style>
