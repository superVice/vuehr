<template>
    <div>
        <div style="display:flex;justify-content:space-between">
            <div>
                <el-input placeholder="请输入员工姓名" prefix-icon="el-icon-search" style="width:300px;margin-right:10px;" v-model="keyword"></el-input>
                <el-button icon="el-icon-search" type="primary" @click="initEmps">搜索</el-button>
                <el-button type="primary">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索</el-button>
            </div>
            <div>
                <el-button type="success">
                    <i class="fa fa-level-up" aria-hidden="true"></i>
                    导入数据
                </el-button>
                <el-button type="success">
                    <i class="fa fa-level-down" aria-hidden="true"></i>
                    导入出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus">
                    添加用户
                </el-button>
            </div>
        </div>
        <div style="margin-top:10px;">
            <el-table
                    :data="emps"
                    stripe
                    border
                  v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"

                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        align="left"
                        fixed
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        prop="birthday"
                        label="出生日期"
                        align="left"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        prop="idCard"
                        label="身份证号"
                        align="left"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        align="left"
                        width="70">
                    </el-table-column>
                    <el-table-column
                        prop="nation.name"
                        label="民族"
                        align="left"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="nativePlace"
                        label="籍贯"
                        align="left"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="politicsstatus.name"
                        label="政治面貌"
                        align="left"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="电子邮件"
                        align="left"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话号码"
                        align="left"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        align="left"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="department.name"
                        label="所属部门"
                        align="left"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="position.name"
                        label="职位"
                        align="left"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="jobLevel.name"
                        label="职称"
                        align="left"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="engageForm"
                        label="聘用形式"
                        align="left"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="beginDate"
                        label="入职日期"
                        align="left"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        prop="conversionTime"
                        label="转正日期"
                        align="left"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        prop="beginContract"
                        label="合同起始日期"
                        align="left"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        prop="endContract"
                        label="合同终止日期"
                        align="left"
                        width="85">
                    </el-table-column>
                    <el-table-column
                        label="合同期限"
                        align="left"
                        width="70">
                        <template slot-scope="scope">
                            <el-tag>{{scope.row.contractTerm}}</el-tag>年
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tiptopDegree"
                        label="最高学历"
                        align="left"
                        width="70">
                    </el-table-column>
                    <el-table-column 
                        label="操作"
                        fixed="right"
                        width="200">
                        <template slot-scope="scope">
                            <el-button style="padding:3px;" size="mini" >编辑</el-button>
                            <el-button style="padding:3px;" size="mini" type="primary">查看高级资料</el-button>
                            <el-button style="padding:3px;" size="mini" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display:flex;justify-content:flex-end">
                    <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change = "sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                        </el-pagination>
                </div>

        </div>

    </div>
</template>
<script>
export default {
     name: 'basic',
     data(){
         return {
             emps:[],
             loading: false,
             total:0,
             page:1,
             size:10,
             keyword:''

         }
     },
     mounted(){
         this.initEmps()
     },
     methods:{
         initEmps(){
             this.loading = true
             this.getRequest('/emp/basic/?page='+this.page+"&size="+this.size+'&keyword='+this.keyword).then(resp=>{
                 if(resp){
                     this.loading=false
                     this.emps = resp.data
                     this.total = resp.total
                 }
             })
         },
         currentChange(currentPage){
              this.page = currentPage
              this.initEmps()
         },
         sizeChange(currentSize){
             this.size=currentSize
             this.initEmps()
         }
     }
}
</script> 