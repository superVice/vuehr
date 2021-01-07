<template>
<div>
        
         <el-form label-width="80px" size="mini" label-position="left">
           <div v-for="(c, index) in classList" :key="index" style="margin: 20px;">
               <el-row :gutter="20">
                            <el-col :span="6">{{c}}</el-col>
                            <el-col :span="14">
                                <el-select  v-model="value" placeholder="请选择" @change="selectChanged($event,index)">
                                        <el-option
                                        v-for="opt_item in opt[index]" 
                                        :key="opt_item.value"
                                        :label="opt_item.colName"
                                        :value="{value:opt_item.colVal,label:opt_item.colName+'|'+opt_item.colType+'|'+opt_item.colClass}">
                                        </el-option>
                                </el-select>
                            </el-col>
                
                </el-row>
                    
            <div
            v-for="(item, index2) in newarray[index].opt"
            :key="index2"
            >
                        <!-- 下拉 -->
                        <el-form-item 
                                    v-show="item.type =='sel'"
                                :label="item.name"  v-model="item.name" >
                                
                                <el-select v-model="item.fuhao" placeholder="请选择">
                                    <el-option 
                                    v-for="item in selopt"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    ></el-option>
                                    
                                </el-select>
                                <el-select v-model="item.zhi"  >
                                <el-option
                                    v-for="option in item.opts"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                                </el-select>
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="deleteData(item,index,index2)"
                                    ></el-button>
                        </el-form-item>
                        <!-- 文本 -->
                        <el-form-item 
                                    :label="item.name"  v-model="item.name" 
                                    v-show="item.type =='text'">
                                        <el-select v-model="item.fuhao" placeholder="请选择">
                                        <el-option 
                                            v-for="item in selopt"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            ></el-option>
                                    </el-select>
                                    <el-input v-model="item.zhi" size="small" style="width:300px"></el-input>
                                    <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="deleteData(item,index,index2)"
                                    ></el-button>
                        </el-form-item>
                        <!-- 日期 -->  
                        <el-form-item 
                                    :label="item.name"  v-model="item.name" 
                                    v-show="item.type =='date'">
                                        <el-select v-model="item.fuhao" placeholder="请选择">
                                        <el-option 
                                                v-for="item in selopt"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                ></el-option>
                                    </el-select>
                                    <el-date-picker
                                            v-model="item.zhi"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                            </el-date-picker>
                                    <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="deleteData(item,index,index2)"
                                    ></el-button>      
                        </el-form-item> 

                                         
                                    </div>
                        

                                   
            </div>
         </el-form>
     
     
     
         
        

        <el-button type="primary" @click="tt2()">查询2</el-button>   
        <el-button type="primary" @click="hideDialog()">隐藏</el-button> 
        
          <p>$data: {{data}}</p>
           <p>$data2: {{data2}}</p>
           <p>$attrs: {{$attrs}}</p>
          
    
</div>
  
</template>
<script>
export default {
    props: {
            data: {
                type: Array ,
                default: function () { return [] }
                // default () {return {}}
                },
            data2: {
                type: Array ,
                default: function () { return [] }
                }

    },
    data() {
        return {
           label:'',
           selopt:[
               {
                    value: '=',
                    label: '='
                }, {
                    value: '>',
                    label: '>'
                }, {
                    value: '<',
                    label: '<'
                }],
           opt:[],
           options: [],
           value:[],
           array:[{
                    "name": "yjqk",
                    "opt": [
                        {
                            "id": 1,
                            "label": "从不",
                            "value":"从不"
                        },
                        {
                            "id": 2,
                            "label": "现在",
                            "value":"现在"
                        },
                        {
                            "id": 3,
                            "label": "既往",
                            "value":"既往"
                        }
                    ]
                },{
                    "name": "xyqk",
                    "opt": [
                        {
                            "id": 1,
                            "label": "从不2",
                            "value":"从不2"
                        },
                        {
                            "id": 2,
                            "label": "现在2",
                            "value":"现在2"
                        },
                        {
                            "id": 3,
                            "label": "既往2",
                            "value":"既往2"
                        }
                    ]
                    
                }],
                newarray:[
                    {
                        class:'基本资料',
                        opt:[]
                    },
                    {
                        class:'shfs', //生活方式
                        opt:[]
                    },
                    {
                        class:'bs', //病史
                        opt:[]
                    },
                    {
                        class:'xzz',//现症状
                        opt:[]
                    },
                    {
                        class:'tgjc', //体格检查与生命体征
                        opt:[]
                    },
                    {
                        class:'jcjg',//出院前的检测结果
                        opt:[]
                    },
                    {
                        class:'cyqk',//出院情况
                        opt:[]
                    },
                ],
                classList:[
                    '基本资料',
                    '生活方式',
                    '病史',
                    '现症状',
                    '体格检查与生命体征',
                    '出院前的检测结果',
                    '出院情况'
                ],
            
          
           

        };
    },
    
    created(){
          //console.log(this.array[0].opt)
          this.initEmps()
     },
    methods: {
        hideDialog(){
               this.$emit('sendMessage', false)
        },
        deleteData(item,index,index2){
            console.log("item:"+JSON.stringify(item) )
            console.log("index:"+JSON.stringify(index) )

            this.newarray[index].opt.splice(index2, 1)
        },
        selectChanged(e,index){
             //console.log("$refs:"+JSON.stringify(this.$refs) )
            
            //  console.log("e:"+ JSON.stringify(e) )
            //  console.log("e:"+ JSON.stringify(index) )
            //  this.$refs.child[index].tt3(e.label,e.value) 
            
            
            this.tt3(e.label,e.value,index)
            
            /*
            this.childData = e.value
              //this.childTitle = e.label
              //console.log(this.childData)
              this.$refs.child.tt3(e.label,e.value)    //调用子组件的增加方法
            
            */
              
        },
        initEmps(){
             
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
                             
                        })
                    for (var i = 0; i < this.classList.length; i ++){
                        var item = that.options.filter((p) => {return p.colClass == this.classList[i]});
                        that.opt.push(item)
                    }
                     
                    // this.list1 =  JSON.stringify(resp[0].colVal)
                    
                    console.log("opt:"+JSON.stringify(that.opt[1]))
                    console.log("options:"+JSON.stringify(that.options) )
                    console.log(that.options.find(item=>item.colClass=="生活方式"))
                 }
             })
         },
        tt3(e,f,index){
                 console.log(e)
                 var aa = e.split('|')
                 console.log(aa[1])
                 console.log(f)
                //    this.title = e
                console.log(this.newarray[index])
                this.newarray[index].opt.push(
                            {
                                    name:aa[0],
                                    type:aa[1],
                                    fuhao: "=",
                                    zhi: "",
                                    opts:f
                            }
                                );
                 console.log("newarray:"+JSON.stringify(this.newarray) )                
        },
        
        tt2(){
                // console.log("title:"+this.title)
                // console.log(this.data)
                this.$emit('func',this.newarray)
        },
        onTest1() {
            console.log('test1 running...');
        },
        onTest2() {
            console.log('test2 running');
        }
    }
};
</script>