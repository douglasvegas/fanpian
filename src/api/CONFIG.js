const BASE_URL = 'http://localhost:3000';

const convertURL = (URL) => BASE_URL + URL;

const CONFIG = {
    FETCH_POST_URL: '/posts',
    FETCH_CATEGORIES_URL: '/categories',
    FETCH_USERINFO: '/user',
    FETCH_COUNT : '/follow/getCount',
    UPLOAD_IMG : '/uploadImg'
}

const convertConfig = (CONFIG) => {
    for (var key in CONFIG) {
        CONFIG[key] = convertURL(CONFIG[key]);
    }

    return CONFIG;
}

export default convertConfig(CONFIG);