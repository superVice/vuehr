<template>
    <div>
        <div>
              <el-input class="addPosInput"
                    size="small"
                    style=""
                    placeholder="添加职位"
                    prefix-icon="el-icon-plus"
                    v-model="pos.name">
                </el-input>
                <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
        </div>
        <div class="posManaMain">
            <el-table
                :data="Positions"
                border
                stripe
                size="small"
                style="width: 70%"
                @selection-change="handleSelectionChange">
                 <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                prop="id"
                label="编号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="职位"
                width="100">
                </el-table-column>
                <el-table-column
                prop="createDate"
                label="创建日期"
                width="200">
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-button @click="deleteMany" type="danger" size="small" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <el-dialog
            title="修改职位"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"PostMana",
    data(){
        return {
            pos:{
                name:''
            },
            updatePos:{
                name:''
            },
            dialogVisible:false,
            Positions: [],
            multipleSelection: []
            }
        },mounted(){
             this.initPositions()
        }
        ,methods:{
            deleteMany(){
                this.$confirm('即将删除, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                let ids = "?"
                                this.multipleSelection.forEach(item=>{
                                    ids += 'ids='+item.id+'&'
                                })
                                this.delRequest("/system/basic/pos/"+ids).then(resp=>{
                                    if(resp)
                                      this.initPositions()
                                })
                           
                            }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                            });
        },
            handleSelectionChange(val){
               this.multipleSelection = val
               console.log(val)
            },
            doUpdate(){
                this.putRequest("/system/basic/pos/",this.updatePos).then(resp=>{

                    if(resp){
                        this.initPositions()
                        this.updatePos.name=''
                        this.dialogVisible = false
                    }
                })
            },
            showEditView(index,data){
            //    this.updatePos = data
            // 将data信息拷贝给updatePos
               Object.assign(this.updatePos,data)
               this.dialogVisible = true
            },
            handleDelete(index,data){ //删除职位

                    this.$confirm('即将删除, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.delRequest("/system/basic/pos/"+data.id).then(resp=>{
                                    if(resp)
                                      this.initPositions()
                                })
                            // this.$message({
                            //     type: 'success',
                            //     message: '删除成功!'
                            // });
                            }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                            });
            },
            addPosition(){  //添加职位
                    if(this.pos.name){
                        this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
                            if(resp)
                            {
                               this.initPositions()  //添加成功，刷新表格
                               this.pos.name='' //添加成功后，输入框清空
                            }
                               
                        })
                    }else
                       this.$message.error("职位名称不能为空！");
            },
            initPositions(){
                this.getRequest("/system/basic/pos/").then(resp=>{
                    if(resp){
                        this.Positions=resp
                    }
                })
            }
        }
    
}
</script>

<style>
   .addPosInput {
      width:300px; margin-right:8px;
   }

   .posManaMain{
       margin-top:10px;
   }

   .updatePosInput{
       width:200px;
       margin-left: 8px;
   }
</style>>