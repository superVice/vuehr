<template>
    <div>
       <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PostMana></PostMana></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><JobLevelMana></JobLevelMana></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="fourth"><EcMana></EcMana></el-tab-pane>
            <el-tab-pane label="权限组" name="five"><PermissMana></PermissMana></el-tab-pane>
       </el-tabs>
    </div>
</template>

<script>
import DepMana from '../../components/sys/basic/DepMana'
import PostMana from '../../components/sys/basic/PostMana'
import JobLevelMana from '../../components/sys/basic/JobLevelMana'
import EcMana from '../../components/sys/basic/EcMana'
import PermissMana from '../../components/sys/basic/PermissMana'

export default {
    name:"sysBasic",
    data(){
        return {
            activeName:"third"
        }
    },
    components:{
        DepMana,
        PostMana,
        JobLevelMana,
        EcMana,
        PermissMana
    }
}

</script>
<style scoped>

</style>