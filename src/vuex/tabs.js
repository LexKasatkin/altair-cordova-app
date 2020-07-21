export const tabs = {
    namespaced: true,
    state: {
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
    },

    getters: {
        tabItems(state) {
            return state.tabItems;
        },
    }
};