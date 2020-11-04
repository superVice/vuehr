<template>
  <div class="home">
   <el-container>
    <el-header class="homeHeader">
            <div class="title">心衰病人研究管理平台</div>
            <el-dropdown class="userInfo" @command="commandHandler">
              <span class="el-dropdown-link">
                {{user.name}}<i><img :src="user.userface"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                <el-dropdown-item command="setting">设置</el-dropdown-item>
               <el-dropdown-item divided command="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
    </el-header>
    <el-container>
      
      
        <el-aside width="200px">
          <!-- <el-menu @select="menuClick"> -->
             <el-menu  @select="menuClick"  router unique-opened>
              <!-- <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index"> -->
                <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                <template slot="title">
                  <i :class="item.iconCls" style="margin-right:5px;"></i>
             
                  <span>{{item.name}} </span>
                </template>
              
                  
                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj"> 
                  {{child.name}}
                </el-menu-item>
                <!-- <el-menu-item index="test1">选项1</el-menu-item>
                <el-menu-item index="test2">选项2</el-menu-item> -->
              </el-submenu>
              
            </el-menu>
        </el-aside>
        <el-main>
          <!-- 导航菜单链接的地址在此区域打开 -->
          <router-view class="routerview"/>
        </el-main>
       
      
    </el-container>
</el-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data(){
    return {
      user:JSON.parse(window.sessionStorage.getItem("user"))  //将文本转为json对象
    }
  },
  computed:{
    routes(){
      //返回菜单
      return this.$store.state.routes;
    }
  }
  ,methods:{
    commandHandler(cmd)
    {
       if(cmd=='logout')
       {
              this.$confirm('此操作将注销, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getRequest("/logout");
              window.sessionStorage.removeItem("user")
              this.$store.commit('initRoutes',[]) //注销后清空登陆用户的菜单信息
              this.$router.replace("/") //注销后回到登录页
             
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
       }
    }
    ,menuClick(index,indexPath)
    {
      console.log(index)
      // this.$router.push(index)
    }
  }
}
</script>

<style>
  .homeHeader {
     background-color: #409eff;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0px 15px;
     box-sizing: border-box;

  }

  .homeHeader .title{
    font-size: 30px;
    font-family:'Courier New', Courier, monospace;
    color: #ffffff;
  }

  .homeHeader .userInfo {
    cursor: pointer;  /* 设置光标式样为手指 */
  }
  .el-dropdown-link img{
     width: 48px;
     height: 48px; 
     border-radius: 24px;  /* 边框为圆的*/
     margin-left: 8px;
  }

  .el-dropdown-link{
    display: flex;
    align-items: center; /* 字体居中*/
  }
  .routerview{
    margin: 10px;
  }
</style>
