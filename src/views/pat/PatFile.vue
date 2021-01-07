<template>
    <div>
        <div style="display:flex;justify-content:space-between">
            <div>
                <el-input placeholder="请输入病人姓名" prefix-icon="el-icon-search" style="width:300px;margin-right:10px;" v-model="keyword"></el-input>
                <el-button icon="el-icon-search" type="primary" @click="centerDialogVisible = true">搜索</el-button>
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
        <el-dialog
                        title="查询条件"
                        :visible.sync="centerDialogVisible"
                        width="50%"
                        center>

           
                        <myselect 
                        v-bind:data="childData"  
                        :title="childTitle"
                        @func="getMsgFormSon" 
                        @sendMessage="showOrhide"
                        ref="child"></myselect>

       </el-dialog>
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
                        prop="id"
                        label="id"
                        align="left"
                        fixed
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="file_id"
                        label="文件编号"
                        align="left"
                        fixed
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="name"
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
                        label="性别"
                        align="left"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="visit_date"
                        label="电话"
                        align="left"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="dept_name"
                        label="地址"
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
            <el-form :inline="true" ref="form" :model="form" label-width="150px">
             <el-tabs  v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本资料" name="基本资料">
                   <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号">
                        <el-input v-model="form.card_no"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.link"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="生活方式" name="生活方式">
                     <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号">
                        <el-input v-model="form.card_no"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.link"></el-input>
                    </el-form-item>
                    <el-form-item label="饮酒情况">
                        <el-select  v-model="form.生活方式.饮酒情况" placeholder="请选择" >
                                        <el-option
                                        v-for="opt_item in  JSON.parse(this.qry.饮酒情况) " 
                                        :key="opt_item.value"
                                        :label="opt_item.label"
                                        :value="opt_item.value">
                                        </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="吸烟情况" >
                        <el-select  v-model="form.生活方式.吸烟情况" placeholder="请选择" >
                                        <el-option
                                        v-for="opt_item in  JSON.parse(this.qry.吸烟情况) " 
                                        :key="opt_item.value"
                                        :label="opt_item.label"
                                        :value="opt_item.value">
                                        </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="基础血压低" >
                        <el-select  v-model="form.生活方式.基础血压低" placeholder="请选择" >
                                        <el-option
                                        v-for="opt_item in  JSON.parse(this.qry.基础血压低) " 
                                        :key="opt_item.value"
                                        :label="opt_item.label"
                                        :value="opt_item.value">
                                        </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="基础心率低" >
                        <el-select  v-model="form.生活方式.基础心率低" placeholder="请选择" >
                                        <el-option
                                        v-for="opt_item in  JSON.parse(this.qry.基础心率低) " 
                                        :key="opt_item.value"
                                        :label="opt_item.label"
                                        :value="opt_item.value">
                                        </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="治疗依从性高" >
                        <el-select  v-model="form.生活方式.治疗依从性高" placeholder="请选择" >
                                        <el-option
                                        v-for="opt_item in  JSON.parse(this.qry.治疗依从性高) " 
                                        :key="opt_item.value"
                                        :label="opt_item.label"
                                        :value="opt_item.value">
                                        </el-option>
                          </el-select>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="病史" name="病史">
                    <!-- 
                        <el-row :gutter="20">
                                <el-col :span="6"><div ><el-tag>初诊心力衰竭的时间</el-tag><el-input v-model="bingshi.初诊心力衰竭的时间"   style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                                <el-col :span="6"><div ><el-tag>本次入院前12月内（不含本次）是否曾因心衰恶化而住院</el-tag><el-input v-model="bingshi.本次入院前12月内是否曾因心衰恶化而住院"  style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                                <el-col :span="6"><div ><el-tag>住院次数（含本次）</el-tag><el-input   v-model="bingshi.住院次数" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                                <el-col :span="6"><div ><el-tag>本次住院时间</el-tag><el-input   v-model="bingshi.本次住院时间"  style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                        </el-row>
                        <el-row :gutter="20">
                                <el-col :span="6"><div ><el-tag>本次出院时间</el-tag><el-input  v-model="bingshi.本次出院时间" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                                <el-col :span="6"><div ><el-tag>最近一次出院时间</el-tag><el-input v-model="bingshi.最近一次出院时间" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                                <el-col :span="6"><div ><el-tag>最近一次住院时间</el-tag><el-input   v-model="bingshi.最近一次住院时间" style="width:150px;margin-left:20px;">11</el-input></div></el-col>
                                <el-col :span="6"><div ><el-tag>最近一次住院原因</el-tag>
                                <el-input   v-model="bingshi.最近一次住院原因" style="width:150px;margin-left:20px;">11</el-input>
                                        <select v-model="bingshi.最近一次住院原因" >
    
                                            <option  v-for="item in listMe(list)" >{{item.name}}</option>
                                        </select>
                                </div></el-col>
                        </el-row>
                    -->
                      <el-form-item label="心力衰竭时间">
                        <el-input v-model="form.病史.心力衰竭时间"></el-input>
                    </el-form-item>
                    <el-form-item label="本次入院前12月内（不含本次）是否曾因心衰恶化而住院">
                        <el-input v-model="form.病史.心衰恶化住院"></el-input>
                    </el-form-item>
                    <el-form-item label="住院次数（含本次） 次">
                        <el-input v-model="form.病史.住院次数"></el-input>
                    </el-form-item>
                    <el-form-item label="本次住院时间">
                        <el-input v-model="form.病史.住院时间"></el-input>
                    </el-form-item>
                   
                    
                    
                    
                    
                   
                </el-tab-pane>
                
               
            </el-tabs>
          </el-form>
           <el-button @click="doUpdate" type="primary">保存</el-button>
        </el-dialog>

    </div>
</template>

<script>
import myselect from '../my-select';
export default {
    components: {
                // 注册所有组件
               myselect
       
                
        },
    data(){
            return {
                centerDialogVisible: false,
                childTitle:'',
                childData:[],     
                form: {  
                         生活方式:{
                                 饮酒情况:'',
                                 吸烟情况:'',
                                 基础血压低:'',
                                 基础心率低:'',
                                 治疗依从性高:''

                         },
                         病史:{
                                 心力衰竭时间:'123',
                                 心衰恶化住院:'456',
                                 住院次数:'',
                                 住院时间:''
                            }
                           
                      },
                qry:{},  
                qy:{},
                arr:[],
                aa:[],  
                loading: false,
                pats:[],
                patDetail:[],
                options: [],
                bingshi:[],
                                list:[{n:11,
                                            list2:[
                                                {name:'心衰恶化',code:'心衰恶化'},
                                                {name:'新发心衰',code:'新发心衰'},
                                                {name:'常规随访',code:'常规随访'},
                                                {name:'其它',code:'其它'}

                                                ]
                                },
                                      {n:22},
                                      {n:33},
                                      {n:44},
                                      {n:55},
                                      {n:66}],

                total:0,
                page:1,
                size:10,
                keyword:'',
                dialogVisible:false,
                activeName: '生活方式',
                tableData: [{ }]
            }
    },
    computed:{
                
            },
    mounted(){
         
         //console.log("aa:"+JSON.parse(this.list))

     },
     created(){
        this.initEmps()
     },
     methods:{
         showOrhide(val){
               this.centerDialogVisible = val
         },
         getMsgFormSon(data){
                 var temp
                 console.log("getMsgFormSon:"+JSON.stringify(data) )
                 this.arr=[]
                 data.forEach(element => {
                      console.log(element.class)
                      temp = ''
                      //this.arr=[]
                      element.opt.forEach(e => {
                                  console.log("name:"+ e.name)
                                  //temp+=e.name+e.fuhao+"'"+e.zhi+"'|"
                                  this.arr.push(e.name+'|'+e.fuhao+'|'+e.zhi)
                                  });  
                 //this.$set(this.qy,element.class,temp) 
                 
                 });
                    // console.log("qy"+ JSON.stringify(this.qy) )
                    console.log(this.arr)
                    this.postRequest("/pat/patFile/patQryFileList",this.arr).then(resp=>{
                    if(resp)
                    {
                        console.log(resp)
                        this.pats = resp
                    }
                        
                        })                
                 
               
                 
               
            },
         onSubmit:function(){
              console.log(this.form)
         },
         tt:function(){
                    //    var aa = [{"id":"1","label":"从不","value":"从不"},{"id":"2","label":"现在","value":"现在"},{"id":"3","label":"既往","value":"既往"}]  
                       console.log("aa:"+ JSON.stringify(this.qry.饮酒情况) )   
         },
         listMe:function(list){
                   var aa =    list.filter(function(item){return item.n==11})
                   return aa[0].list2
                },
                
                
         doUpdate(){
               console.log(this.form)
               console.log(JSON.stringify(this.form[this.activeName]))
               //return false
               this.putRequest("/pat/patFile/updateFile/001/0002/"+this.activeName,this.form[this.activeName]).then(resp=>{
               if(resp)
                console.log(resp)
           })
               
               
         },
         initEmps(){
             
             this.getRequest('/pat/patbasic/?page='+this.page+"&size="+this.size+'&keyword='+this.keyword).then(resp=>{
                 if(resp){
                    
                     this.loading=false
                     this.pats = resp.data
                     this.total = resp.total
                    
                 }
             }),
             //获取下拉选项
             this.getRequest('/pat/qyList/').then(resp=>{
                 if(resp){
                     var that = this
                     resp.forEach(function (item, index) {
                           
                            console.log("item:"+ JSON.stringify(item) )
                            
                            that.options.push(
                                {
                                    colClass:item.colClass,
                                    colName:item.colName,
                                    colType:item.colType,
                                    colVal: item.colVal!=null?JSON.parse(item.colVal):'',  
                                    id:item.id,
                                }
                            )

                            if(item.colType=="sel")
                                that.$set(that.qry,item.colName, item.colVal ) 
                                //that.qry.push(item)
                             
                        })
                     
                     
                    console.log("options:"+that.options) 
                    console.log("qry:"+JSON.stringify(that.qry)  )
                    
                     let jsonStr = '[{"id":"01","open":false,"pId":"0","name":"A部门"},{"id":"01","open":false,"pId":"0","name":"A部门"},{"id":"011","open":false,"pId":"01","name":"A部门"},{"id":"03","open":false,"pId":"0","name":"A部门"},{"id":"04","open":false,"pId":"0","name":"A部门"}, {"id":"05","open":false,"pId":"0","name":"A部门"}, {"id":"06","open":false,"pId":"0","name":"A部门"}]';   
                     let bb = '[{"id":"1","label":"从不","value":"从不"},{"id":"2","label":"现在","value":"现在"},{"id":"3","label":"既往","value":"既往"}]'
                              //'[{"id":"1","label":"从不","value":"从不"},{"id":"2","label":"现在","value":"现在"},{"id":"3","label":"既往","value":"既往"}]'  
                    //JSON.parse(bb)
                   console.log("aa:"+ JSON.parse(that.qry.饮酒情况)  )
                    
                    
               
                 }
             })
         },
         
         showEditView(data)
        { 
            //Object.assign(this.updateJl,data)
            this.dialogVisible = true
            this.getRequest('/pat/patFile/patFileInfo?patient_id='+data.id).then(resp=>{
                 if(resp){
                     //console.log("结果："+JSON.stringify(resp) )

                     resp.forEach(element => {
                        console.log(element.item)  
                        this.form[element.item] = element.value
                     });
                    
                    //  console.log(result.病史.本次入院前12月内是否曾因心衰恶化而住院)
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