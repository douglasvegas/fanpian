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
const PostDetail = resolve => {require(['../components/PostDetail.vue'], resolve)}

// import Home from '../containers/Home.vue'
// import App from '../App.vue'
// import MyContent from '../containers/Content.vue'
// import Profile from '../components/Profile.vue'
// import Category from '../components/Category.vue'

const routers = [
    {
        path: '/post/:action/:id',
        component: Post
    },
    {
        path: '/post/:id',
        component: PostDetail
    },
    {
        path:'/',
        component: App,
        children: [
            {
                path: 'signup',
                component: Signup
            },
            {
                path: 'signin',
                component: Sigin
            },
            {
                path: 'profile',
                component: Profile
            },
            {
                path: '/',
                component: Home,
                children: [
                    {
                        path: '/',
                        component: MyContent
                    },
                    {
                        path:'/category/:id',
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