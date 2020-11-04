<template>
    <div>
       
        <el-form 
                 :rules="rules" 
                 ref="loginRef" 
                 v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"

                 :model="loginForm" 
                 class="loginContain">
            <h3 class="loginTitle">科研经费管理平台</h3>
            <el-form-item prop="username"> 
                <el-input type="text" v-model="loginForm.username" auto-complete="off"
                placeholder="qingwe"></el-input>
            </el-form-item>
            <el-form-item prop="password"> 
                <el-input type="text" v-model="loginForm.password" auto-complete="off"
                placeholder="ee"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRe"></el-checkbox>
            <el-button type="primary" style="width:100%" @click="btnSubmit">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
//import {postKeyValueRequest} from "../utils/api"
export default {
   
    data(){
        return {
            loginForm:{
              username:'admin',
              password:'123'
            },
            checked:true,
            loading:false,

            rules:{
                username:[ { required: true, message: '请输入用户名', trigger: 'blur' }]
                
            }
        }
    },methods:{ 
                btnSubmit(){
                           

                            this.$refs.loginRef.validate((valid) => {
                                if (valid) {
                                   this.loading = true
                                   this. postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                                       this.loading = false
                                        if(resp){
                                           // alert(JSON.stringify(resp) )
                                           //将登陆信息保存到session对象
                                           window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                                           //登陆后判断是否需要转向到登录前请求的页面
                                           let redirect = this.$route.query.redirect
                                           this.$router.replace((redirect=='/'||redirect==undefined)?'/home':redirect);
                                        }
                                    })
                                    //alert('submit!');
                                } else {
                                    this.$message.error('错了哦，这是一条错误消息');
                                    return false;
                                }
                                });
                        }

    }
        

    
}
</script>
<style>
   .loginContain {
       border-radius: 15px;
       background-clip: padding-box;
       margin: 180px auto;
       width:350px;
       padding: 35px;
       background:#ffffff;
       border: 1px solid #eaeaea;
       /* 阴影效果 */
       box-shadow: 0 0 25px #cac6c6;

   }
   .loginTitle{
     margin: 20px auto;
     text-align: center;
     color: #505458;

   }

   .loginRe {
       text-align: left;
       margin:0px 0px 10px 0px;
   }
</style>