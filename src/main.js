import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

 

import {postRequest} from './utils/api'
import {postKeyValueRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {delRequest} from './utils/api'

import store from './store'

import {initMenu} from './utils/menus';
import 'font-awesome/css/font-awesome.min.css'

import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入


//封装请求方法
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.delRequest = delRequest;


Vue.config.productionTip = false

Vue.use(ElementUI)

//路由转向前访问此方法 to:去哪个页面 from:从哪个页面来
router.beforeEach((to,from,next)=>{
  // console.log(to)
  // console.log(from)
  // next()
  if(to.path=='/') //如果去登陆页
     next();
  else{
    //如果已登录
    if(window.sessionStorage.getItem("user")){
      initMenu(router,store); //初始化菜单
      NProgress.start() // 设置加载进度条(开始..)
      next();
    }else //没有登陆则转到登陆页面
    {
      //console.log(to)
      next("/?redirect="+to.path) //登陆后转到登陆前请求的地址
    }
  }
})

router.afterEach(() =>{
  NProgress.done()
})


new Vue({
  router, 
  store,   //使用store
  render: h => h(App)
}).$mount('#app')
