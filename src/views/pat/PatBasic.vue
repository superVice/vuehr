<template>
    <div>
        <div style="display:flex;justify-content:space-between">
            <div>
                <el-input placeholder="请输入病人姓名" prefix-icon="el-icon-search" style="width:300px;margin-right:10px;" v-model="keyword"></el-input>
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
                    :data="pats"
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
                        prop="patient_id"
                        label="id"
                        align="left"
                        fixed
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="patient_name"
                        label="姓名"
                        align="left"
                        fixed
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="hic_no"
                        label="门诊卡号"
                        align="left"
                        width="85">
                    </el-table-column>
                   
                    <el-table-column
                        prop="social_no"
                        label="身份证"
                        align="left"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="diagnosis"
                        label="主诊断"
                        align="left"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="visit_date"
                        label="就诊日期"
                        align="left"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="dept_name"
                        label="就诊科室"
                        align="left"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="home_tel"
                        label="电话"
                        align="left"
                        width="150">
                    </el-table-column>
                    


                    <el-table-column 
                        label="操作"
                        fixed="right"
                        width="200">
                        <template slot-scope="scope">
                            <el-button style="padding:3px;" size="mini" @click="showEditView(scope.row)">基本情况</el-button>
                            <el-button style="padding:3px;" size="mini" type="primary">建档</el-button>
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
        <el-dialog
            title="病人基本资料"
            :visible.sync="dialogVisible"
            width="80%">
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本资料" name="first">

                <el-row :gutter="20">
                    <el-col :span="6"><div ><el-tag>姓名</el-tag><el-input :disabled="true"  v-model="patDetail.patient_name" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    <el-col :span="6"><div ><el-tag>性别</el-tag><el-input style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    <el-col :span="6"><div ><el-tag>卡号</el-tag><el-input :disabled="true"  v-model="patDetail.hic_no" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    <el-col :span="6"><div ><el-tag>联系方式</el-tag><el-input :disabled="true"  v-model="patDetail.home_tel"  style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                  
                    </el-row>
                    
                </el-tab-pane>
                <el-tab-pane label="一般情况" name="third">

                <el-row :gutter="20">
                    <el-col :span="6"><div ><el-tag>饮酒情况</el-tag><el-input  v-model="patDetail.patient_name" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    <el-col :span="6"><div ><el-tag>吸烟情况</el-tag><el-input style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    <el-col :span="6"><div ><el-tag>睡眠质量</el-tag><el-input   v-model="patDetail.hic_no" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    <el-col :span="6"><div ><el-tag>每天进食食盐</el-tag><el-input   v-model="patDetail.home_tel"  style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    
                  
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6"><div ><el-tag>食欲</el-tag><el-input  v-model="patDetail.patient_name" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                    
                  
                </el-row>  
                </el-tab-pane>
                <el-tab-pane label="就诊记录" name="second">
                   
                        <el-table
                            :data="patDetail.patientMzDetailList"
                            style="width: 100%"
                            height="250">
                            <el-table-column
                            fixed
                            prop="drugname"
                            label="医嘱名"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="specification"
                            label="规格"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="dosage"
                            label="剂量"
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="dosage_name"
                            label="单位"
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="supply_name"
                            label="方式"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="freq_code"
                            label="频率"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="persist_days"
                            label="天数"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="drug_amount"
                            label="用量"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="charge_amount"
                            label="领量"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="pack_name"
                            label="单位"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="doctor_name"
                            label="开单医生"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="price_data"
                            label="开药时间"
                            width="120">
                            </el-table-column>
                        </el-table>
                   
              


                </el-tab-pane>
               
            </el-tabs>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data(){
            return {
                loading: false,
                pats:[],
                patDetail:[],
                total:0,
                page:1,
                size:10,
                keyword:'',
                dialogVisible:false,
                activeName: 'first',
                tableData: [{ }]
            }
    },
    mounted(){
         this.initEmps()
     },
     methods:{
         initEmps(){
             
             this.getRequest('/pat/patbasic/?page='+this.page+"&size="+this.size+'&keyword='+this.keyword).then(resp=>{
                 if(resp){
                    
                     this.loading=false
                     this.pats = resp.data
                     this.total = resp.total
                    
                 }
             })
         },
         showEditView(data)
        { 
            //Object.assign(this.updateJl,data)
            this.dialogVisible = true
            this.getRequest('/pat/patbasic/patDetail?patient_id='+data.patient_id).then(resp=>{
                 if(resp){
                     console.log("结果："+JSON.stringify(resp) )
                     this.patDetail = resp
                     //this.empsDetail.name = resp.patient_name
                    //  this.loading=false
                    //  this.emps = resp.data
                    //  this.total = resp.total
                 }
             })
            console.log(data)
        },
         currentChange(currentPage){
              this.page = currentPage
              this.initEmps()
         },
         sizeChange(currentSize){
             this.size=currentSize
             this.initEmps()
         },
         handleClick(tab, event) {
                console.log(tab, event);
            }
     }
}
</script>