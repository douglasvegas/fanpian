import Server from 'Server'

const state = {
    posts: [],
    imgUrl : ''
}

const mutations = {
    FETCH_POST_BY_CATEGORY(state, posts) {
        state.posts = posts;
    },
    UPDATA_POST_IMG(state, imgUrl) {
        state.imgUrl = 'http://localhost:3000/upload/' + imgUrl
    }
}

const actions = {
    fetchPostsByCategory({commit}, categoryId) {
        Server.fetchPostsByCategory(categoryId).then((res) => {
            if (res.data) {
                commit('FETCH_POST_BY_CATEGORY', res.data.picList)
            }
        })
    },
    pushNewImg( {commit} , data) {
        Server.postImg(data).then((res) => {
            if (res.data && res.data.code == 200) {
                commit('UPDATA_POST_IMG', res.data.imgUrl)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}