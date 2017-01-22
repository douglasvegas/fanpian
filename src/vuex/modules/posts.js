import Server from 'Server'

const state = {
    posts: []
}

const mutations = {
    FETCH_POST_BY_CATEGORY(state, posts) {
        state.posts = posts;
    }
}

const actions = {
    fetchPostsByCategory({commit}, categoryId) {
        Server.fetchPostsByCategory(categoryId).then((res) => {
            if (res.data) {
                commit('FETCH_POST_BY_CATEGORY', res.data.picList)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}