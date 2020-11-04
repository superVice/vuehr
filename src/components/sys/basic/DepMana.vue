<template>
    <div style="width:500px;">
        <div>
             <el-input
                placeholder="请输入部门名称"
                prefix-icon="el-icon-search"
                v-model="filterText">
                </el-input>

                <el-tree
        
                :data="depts"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                ref="tree">

                        <span class="custom-tree-node" 
                        style="display:flex;justify-content:space-between;width:100%"
                         slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                            <el-button
                                type="primary"
                                size="mini"
                                class="depBtn"
                                @click="() => showAddDepView(data)">
                                添加部门
                            </el-button>
                            <el-button
                                type="danger"
                                size="mini"
                                class="depBtn"
                                @click="() => deleteDep(data)">
                                删除部门
                            </el-button>
                            </span>
                        </span>
                </el-tree>
                <el-dialog
                    title="添加部门"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <div>
                        <table>
                            <tr>
                                <td><el-tag>上级部门</el-tag></td>
                                <td>{{pname}}</td>
                            </tr>
                            <tr>
                               <td><el-tag>部门名称</el-tag></td>
                                <td><el-input v-model="dep.name" placeholder="请输入部门名称"></el-input></td>

                            </tr>
                        </table>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="doAddDep">确 定</el-button>
                    </span>
                    </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name:"DepMana",
    data(){
        return {
            dialogVisible:false,
            filterText:'',
            dep:{
                name:'',
                parentId:-1
            },
            pname:'',
            depts:[],
            defaultProps: {
                children: 'children',
                label: 'name'
                }
        }
    },
    watch: {
      //监视搜索框数据的变化，调用tree的filterNode方法
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },mounted(){
         this.initDepts()
    },
    methods:{
        clear(){
                this.dep = {
                    name:'',
                    parentId:-1
                }
                this.pname=''
        },
        initDepts(){
          this.getRequest("/system/basic/department/").then(resp=>{
             if(resp)
                 this.depts = resp
          })
        },
        doAddDep(){
            this.postRequest("/system/basic/department/",this.dep).then(resp=>{
             if(resp)
             {
                 this.addDep2Deps(this.depts,resp.obj)
                 this.dialogVisible = false
                 this.clear()
             }
                
          })
        },
        /*
          添加成功后，动态局部刷新树形菜单
        */
        addDep2Deps(depts,dep)
        {
            for(let i=0;i<depts.length;i++){
                let d = depts[i]
                if(d.id == dep.parentId){
                    d.children = d.children.concat(dep)
                    return 
                }else
                {
                    this.addDep2Deps(d.children,dep)
                }
            }
               
        },
        /*
        value 搜索框的内容
        data tree中的json对象
        */
        filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
        showAddDepView(data){
            this.pname = data.name
            this.dep.parentId = data.id
            this.dialogVisible = true
        },
        //动态删除树中的指定节点
        removeDepFromDeps(deps,id){
           for (let i=0;i<deps.length;i++)
           {
               let d = deps[i]
               if(d.id == id){
                   deps.splice(i,1)
                   return 
               }else
                  this.removeDepFromDeps(d.children,id)
                 
                  
           }
        },
        deleteDep(data){
             if(data.parent){
                 this.$message.error("父部门删除失败");
             }else
             {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        console.log(data.name)
                        console.log(data.id)
                        this.delRequest("/system/basic/department/"+data.id).then(resp=>{
                            if(resp)
                            {
                               this.removeDepFromDeps(this.depts,data.id)
                            }
                        })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
             }

              
        },
        
    }
}
</script>

<style>
  .depBtn {
      padding: 2px;
  }
</style>>
