//store all router links

export const pathes = {
    namespaced: true,
    state: {
        drawer: false,
        editPostPage: false,
        commentDrawer: false
    },
    getters: {},
    mutations: {
        setDrawer: (state, payload) => (state.drawer = payload),
        toggleDrawer: state => (state.drawer = !state.drawer),
        setEditPostPage: (state, payload) => (state.editPostPage = payload),
        toggleCommentDrawer: state => (state.commentDrawer = !state.commentDrawer),
        setCommentDrawer: (state, payload) => (state.commentDrawer = payload)
    },
    actions: {
        setDrawerStatus({ commit }, val){
            commit('setCommentDrawer', val);
        },
    }

};
