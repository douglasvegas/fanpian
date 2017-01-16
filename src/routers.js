// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// const App = resolve => {
//     require.ensure(['./App.vue'], () => {
//         resolve(require('./App.vue'));
//     });
// };
import Home from './components/Home.vue'
import App from './App.vue'
import Test from './components/Test.vue'
import MyContent from './components/Content.vue'
import Profile from './components/Profile.vue'
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