import Server from 'Server'

const state = {
    categories: []
}

const mutations = {
    FETCH_CATEGORIES (state, categories) {
        state.categories = categories;
    }
}

const actions = {
    fetchCategories({commit}){
        Server.fetchCategories().then((res) => {
            if (res.data) {
                commit('FETCH_CATEGORIES', res.data)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}
