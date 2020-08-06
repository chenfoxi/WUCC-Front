//store all router links
export const pathes = {
    namespaced: true,
    state: {
        drawer: false,
        editPostPage: false,
    },
    getters: {},
    mutations: {
        setDrawer: (state, payload) => (state.drawer = payload),
        toggleDrawer: state => (state.drawer = !state.drawer),
        setEditPostPage: (state, payload) => (state.editPostPage = payload),
    },
    actions: {}

};
