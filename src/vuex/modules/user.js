import Server from 'Server'
var moment = require('moment')
const state = {
    user: [],
    count:[0,0]
}

const mutations = {
    FETCH_USER(state, user) {
        state.user = user;
    },
    FETCH_COUNT(state, count) {
        state.count = count
    }
}

const actions = {
    fetchUser ({ commit }) {
        Server.fetchUserInfo().then( (result) => {
            if (result.status == 200) {
                var json = JSON.parse(result.request.responseText);
                json.create_date = moment(json.create_date).format().replace('T',' ').split('+')[0];
                json.avatar = 'http://localhost:3000/upload/'+ json.avatar
                commit('FETCH_USER', json)
            }
        })
    },
    fetchCount ({ commit }) {
        Server.fetchCount().then( (result) => {
            if (result.status == 200) {
                var json = JSON.parse(result.request.responseText)
                console.log(json)
                var count = [json.follows, json.fans];
                commit('FETCH_COUNT', count)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}