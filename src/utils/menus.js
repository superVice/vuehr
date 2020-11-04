import {getRequest} from "./api";


export const initMenu=(router,store)=>{

    //如果有菜单数据
    if(store.state.routes.length>0){
        return ;
    }
    //获取菜单数据
            
    getRequest("system/config/menu").then(data=>{

        if(data)
        {
            let fmtRoutes = formatRoutes(data );
            console.log(fmtRoutes)
            //动态加载router
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes',fmtRoutes);
        }
    })
}

export const formatRoutes=(routes)=>{
    let fmRoutes =[];
    routes.forEach(router=>{
        //变量定义
        let {
            path,
            component,
            name,
            meta,
            iconcls,
            children
        }=router;
        //如果children节点有数据
        if(children && children instanceof Array){
            //递归调用直到最后一个节点
            children = formatRoutes(children);
        }
        let fmRouter={
            path:path,
            name:name,
            meta:meta,
            iconCls:iconcls,
            children:children,
            component(resolve){
                console.log("component:"+component)
                //动态导入、生成组件
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                } else if (component.startsWith("Pat")) {
                    require(['../views/pat/' + component + '.vue'], resolve);
                }
                
            }
        }
        fmRoutes.push(fmRouter)
    })

    return fmRoutes;
}