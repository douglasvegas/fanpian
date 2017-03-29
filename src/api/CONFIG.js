const BASE_URL = 'http://www.douglasvegas.com/api';


const convertURL = (URL) => BASE_URL + URL;

const CONFIG = {
    FETCH_HOT_POST_URL: '/post/hot',
    FETCH_CATEGORIES_URL: '/category',
    FETCH_USERINFO: '/user',
    FETCH_COUNT : '/follow/getCount',
    UPLOAD_IMG : '/uploadImg',
    FETCH_POST_BY_CATEID: '/post'
}

const convertConfig = (CONFIG) => {
    for (var key in CONFIG) {
        CONFIG[key] = convertURL(CONFIG[key]);
    }

    return CONFIG;
}

export default convertConfig(CONFIG);