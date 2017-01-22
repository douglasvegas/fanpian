import axios from 'axios'
import CONFIG from './CONFIG'

class Server {
    request(url, type, data) {
        if (type === 'get') {
            return this.get(url, data);
        } 
        if (type === 'post') {
            return this.post(url, data);
        }
        return this.get(url ,data)
    }
    get(url, data) {
        return axios.get(url,{params:data});
    }
    post(url, data) {
        return axios.post(url,data);
    }

    fetchPostsByCategory () {
        return this.get(CONFIG.FETCH_POST_URL)
    }

    fetchCategories () {
        return this.get(CONFIG.FETCH_CATEGORIES_URL)
    }

}

export default new Server;