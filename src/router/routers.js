// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// const App = resolve => {
//     require.ensure(['./App.vue'], () => {
//         resolve(require('./App.vue'));
//     });
// };
const Home = resolve => {require(['../containers/Home.vue'], resolve)}
const App = resolve => {require(['../App.vue'], resolve)}
const MyContent = resolve => {require(['../containers/Content.vue'], resolve)}
const Profile = resolve => {require(['../components/Profile.vue'], resolve)}
const Category = resolve => {require(['../components/Category.vue'], resolve)}
const Signup = resolve => {require(['../components/Signup.vue'], resolve)}
const Sigin = resolve => {require(['../components/Sigin.vue'], resolve)}
const Post = resolve => {require(['../components/Post.vue'], resolve)}
const Comment = resolve => {require(['../components/Comment.vue'], resolve)}
const PostDetail = resolve => {require(['../components/PostDetail.vue'], resolve)}
const Search = resolve => {require(['../components/Search.vue'], resolve)}
// import Home from '../containers/Home.vue'
// import App from '../App.vue'
// import MyContent from '../containers/Content.vue'
// import Profile from '../components/Profile.vue'
// import Category from '../components/Category.vue'

const routers = [
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/post/:action/:id',
        name:'post',
        component: Post
    },
    {
        path: '/post/:id',
        name:'postDetail',
        component: PostDetail
    },
    {
        path: '/comment/:id',
        name: 'comment',
        component: Comment
    },
    {
        path:'/',
        name:'app',
        component: App,
        children: [
            
            {
                path: 'signup',
                name: 'signup',
                component: Signup
            },
            {
                path: 'signin',
                name: 'signin',
                component: Sigin
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile,
                beforeEnter: (to, from, next) => {
                    if (from.path.indexOf('signin') != -1 && document.cookie.indexOf('fanpian') == -1) {
                        return;
                    }
                    if (document.cookie.indexOf('fanpian') == -1) {
                        next({
                            path: '/signin',
                            // query: { redirect: '/' }
                        })
                    }
                    next();
                }
            },
            {
                path: '/',
                name:'home',
                component: Home,
                children: [
                    {
                        path: '/',
                        component: MyContent
                    },
                    {
                        path:'/category/:id',
                        name:'category',
                        component: Category
                    },
                    {
                        path: '*',
                        redirect:'/'
                    }
                ]
            },
            
        ]
    }
  ]

  export default routers;