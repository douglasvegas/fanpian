import Server from 'Server';
import '../../common/Common';
const state = {
    posts: [],
    imgUrl : ''
}

const mutations = {
    FETCH_HOT_POSTS(state, posts) {
        state.posts = posts;
    },
    UPDATA_POST_IMG(state, imgUrl) {
        state.imgUrl = API_ROOT + '/upload/' + imgUrl
    }
}

const actions = {
    fetchHotPosts({commit}) {
        Server.fetchHotPosts().then((res) => {
            if (res.data) {
                commit('FETCH_HOT_POSTS', res.data)
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