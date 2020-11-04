import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//导出
export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    }
    ,
    actions:{

    }
})