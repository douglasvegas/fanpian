import Server from 'Server';
import '../../common/Common';
const state = {
    posts: [],
    imgUrl : '',
    canFetch : true
}

const mutations = {
    FETCH_HOT_POSTS(state, data, flag) {
        
        var posts = data.posts;
        posts.map(function (v, i) {
            if(v.imgUrl != "" && v.imgUrl != null) {
                v.imgUrl = API_ROOT + v.imgUrl;
            }
        })
        var flag = data.flag || false;
        if (posts.length <= 0) {
            state.canFetch = false;
            return;
        }
        if (flag) {
            state.posts = posts
        }else{
            state.posts = state.posts.concat(posts);
        }

        state.canFetch = true;
    },
    UPDATA_POST_IMG(state, imgUrl) {
        state.imgUrl = API_ROOT + imgUrl
    },
    RESET_FETCH(state) {
        state.canFetch = true;
    }
}

const actions = {
    fetchHotPosts({commit}, data) {
        Server.fetchHotPosts(data).then((res) => {
            if (res.data) {
                if (res.data.pageNo == 1) {
                    commit('FETCH_HOT_POSTS', {posts:res.data.data,flag: true})
                }else {
                    commit('FETCH_HOT_POSTS', { posts:res.data.data })
                }
                
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