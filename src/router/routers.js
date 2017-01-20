// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// const App = resolve => {
//     require.ensure(['./App.vue'], () => {
//         resolve(require('./App.vue'));
//     });
// };
// const Home = resolve => require(['../containers/Home.vue'], resolve)
// const App = resolve => require(['../App.vue'], resolve)
// const MyContent = resolve => require(['../containers/Content.vue'], resolve)
// const Profile = resolve => require(['../components/Profile.vue'], resolve)

// const Test = resolve => require(['../components/Test.vue'], resolve)

import Home from '../containers/Home.vue'
import App from '../App.vue'
import MyContent from '../containers/Content.vue'
import Profile from '../components/Profile.vue'
import Test from '../components/Test.vue'

const routers = [
    {
        path:'/',
        component: App,
        children: [
            {
                path: '/',
                component: Home,
                children: [
                    {
                        path: '/',
                        component: MyContent
                    },
                    {
                        path:'/test/:id',
                        component: Test
                    },
                    // {
                    //     path: '*',
                    //     redirect:'/'
                    // }
                ]
            },
            {
                path: 'profile',
                component: Profile
            }
        ]
    }
  ]

  export default routers;