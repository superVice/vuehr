<template>
  <div>
    <el-form
      ref="formShfs"
      :model="formShfs"
      label-width="180px"
      label-position="left"
      :inline="true"
    >
      <!-- 患者症状 -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="1.饮酒情况" class="item">
              <!-- <el-select v-model="formShfs.shfs['饮酒情况']" placeholder="请选择饮酒情况">
                <el-option v-for="item in template_data.生活方式['饮酒情况']" :key="item" :value="item"></el-option>
              </el-select>-->
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="formShfs.shfs['饮酒情况']"
                :fetch-suggestions="queryYjSearch"
                placeholder="请输入饮酒情况"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="props">
                  <div class="name">{{ props.item.value }}</div>
                  <!-- <span class="addr">{{ props.item.address }}</span> -->
                </template>
              </el-autocomplete>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="2.吸烟情况" class="item">
              <!-- 
              <el-select v-model="formShfs.shfs['吸烟情况']" placeholder="请选择吸烟情况">
                <el-option v-for="item in template_data.生活方式['吸烟情况']" :key="item" :value="item"></el-option>
              </el-select>-->

              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="formShfs.shfs['吸烟情况']"
                :fetch-suggestions="queryYjSearch"
                placeholder="请输入吸烟情况"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="props">
                  <div class="name">{{ props.item.value }}</div>
                  <!-- <span class="addr">{{ props.item.address }}</span> -->
                </template>
              </el-autocomplete>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="3.基础血压低" class="item">
              <el-select
                v-model="formShfs.shfs['基础血压低']"
                placeholder="请选择基础血压低"
              >
                <el-option
                  v-for="item in template_data.生活方式['基础血压低']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="4.基础心率低" class="item">
              <el-select
                v-model="formShfs.shfs['基础心率低']"
                placeholder="请选择基础心率低"
              >
                <el-option
                  v-for="item in template_data.生活方式['基础心率低']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="5.治疗依从性高" class="item">
              <el-select
                v-model="formShfs.shfs['治疗依从性高']"
                placeholder="请选择治疗依从性高"
              >
                <el-option
                  v-for="item in template_data.生活方式['治疗依从性高']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="7.患者本人重视程度高" class="item">
              <el-select
                v-model="formShfs.shfs['患者本人重视程度高']"
                placeholder="请选择患者本人重视程度高"
              >
                <el-option
                  v-for="item in template_data.生活方式['患者本人重视程度高']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="9.患者本人信心" class="item">
              <el-select
                v-model="formShfs.shfs['患者本人信心']"
                placeholder="请选择患者本人信心"
              >
                <el-option
                  v-for="item in template_data.生活方式['患者本人信心']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="10.家属关心程度" class="item">
              <el-select
                v-model="formShfs.shfs['家属关心程度']"
                placeholder="请选择家属关心程度"
              >
                <el-option
                  v-for="item in template_data.生活方式['家属关心程度']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="11.有氧运动" class="item">
              <el-select
                v-model="formShfs.shfs['有氧运动']"
                placeholder="请选择有氧运动"
              >
                <el-option
                  v-for="item in template_data.生活方式['有氧运动']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="13.经济条件(生活及治病)" class="item">
              <el-select
                v-model="formShfs.shfs['经济条件']"
                placeholder="经济条件(满足生活及治病需要)"
              >
                <el-option
                  v-for="item in template_data.生活方式['经济条件']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="14.对社会及生活的情感" class="item">
              <el-select
                v-model="formShfs.shfs['对社会及生活的情感']"
                placeholder="请选择对社会及生活的情感"
              >
                <el-option
                  v-for="item in template_data.生活方式['对社会及生活的情感']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="15.人际关系" class="item">
              <el-select
                v-model="formShfs.shfs['人际关系']"
                placeholder="请选择人际关系"
              >
                <el-option
                  v-for="item in template_data.生活方式['人际关系']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="16.对患病及衰老的态度" class="item">
              <el-select
                v-model="formShfs.shfs['对患病及衰老的态度']"
                placeholder="请选择对患病及衰老的态度"
              >
                <el-option
                  v-for="item in template_data.生活方式['对患病及衰老的态度']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="17.每天进食食盐" class="item">
              <el-select
                v-model="formShfs.shfs['每天进食食盐']"
                placeholder="请选择每天进食食盐"
              >
                <el-option
                  v-for="item in template_data.生活方式['每天进食食盐']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="18.食欲" class="item">
              <el-select
                v-model="formShfs.shfs['食欲']"
                placeholder="请选择食欲"
              >
                <el-option
                  v-for="item in template_data.生活方式['食欲']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="19.平均每日入水量(ml)" class="item">
              <el-input
                v-model="formShfs.shfs['平均每日入水量(ml)']"
                placeholder="平均每日入水量(ml)"
                maxlength="4"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('formShfs')"
          >保存</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
        <!-- <el-button @click="initformShfs()">初始化</el-button> -->
        <!-- <el-button @click="loadZzData()">读取数据</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RecordShfs",
  props: ["record_id"],
  data() {
    return {
      activeNames: "sqlllj",
      activeAdd: "add_first",
      base_selarr: ["是", "否"],
      extend_selarr: ["是", "否", "未知"],
      extend_selarr2: ["是", "否", "不明确"],
      tzbh: ["增加*kg", "减轻*kg", "无变化"],
      gjjmhlz: ["阳性", "阴性"],
      pfsd: ["湿", "干", "正常"],
      formShfs: {
        record_id: "",
        name: "",
        shfs: {
          饮酒情况: "",
          吸烟情况: "",
          基础血压低: "",
          基础心率低: "",
          治疗依从性高: "",
          睡眠质量好: "",
          治疗依从性高: "",
          患者本人重视程度高: "",
          患者本人信心: "",
          家属关心程度: "",
          有氧运动: "",
          经济条件: "",
          对社会及生活的情感: "",
          人际关系: "",
          对患病及衰老的态度: "",
          每天进食食盐: "",
          食欲: "",
          "平均每日入水量(ml)": "",
        },
      },
      oneweek_template_data: {
        患者现状: ["健在", "新的住院，新植入装置，中期非计划随访", "死亡"],
        生活方式: {
          饮酒情况: ["从不", "已戒酒", "? g/天", "偶尔"],
          吸烟情况: ["从不", "已戒酒", "? 支/天", "偶尔"],
          基础血压低: ["是", "否", "不明确"],
          基础心率低: ["是", "否", "不明确"],
          治疗依从性高: ["是", "否"],
          患者本人重视程度高: ["是", "否"],
          患者本人信心: ["能治好", "能缓解", "不能缓解", "完全没有希望"],
          家属关心程度: ["很关心", "一般关心", "不太关心", "不关心"],
          有氧运动: [
            "频繁（每周5~7天）",
            "较少（3~4天）",
            "很少（1~2天）",
            "不运动",
          ],
          "经济条件(满足生活及治病需要)": ["很好满足", "刚好满足", "不能满足"],
          对社会及生活的情感: [],
        },
        体征与体格检查: {},
      },
      template_data: {
        生活方式: {
          饮酒情况: ["从不", "已戒酒", "? g/天", "偶尔"],
          吸烟情况: ["从不", "已戒酒", "? 支/天", "偶尔"],
          基础血压低: [],
          基础心率低: [],
          治疗依从性高: [],
          患者本人重视程度高: [],
          患者本人信心: ["能治好", "能缓解", "不能缓解", "完全没有希望"],
          家属关心程度: ["很关心", "一般关心", "不太关心", "不关心"],
          有氧运动: [
            "频繁（每周5~7天）",
            "较少（3~4天）",
            "很少（1~2天）",
            "不运动",
          ],
          经济条件: ["很好满足", "刚好满足", "不能满足"],
          对社会及生活的情感: ["乐观", "不满", "愤愤不平", "悲观", "其他"],
          人际关系: ["愉快", "一般", "紧张"],
          对患病及衰老的态度: [
            "能理解和接受",
            "感到忧虑",
            "完全不能理解和接受",
          ],
          每天进食食盐: ["小于6克", "6~10克", "大于10克"],
          食欲: ["好", "一般", "不好", "差"],
        },
      },
    };
  },
  methods: {
    resetForm() {
      // console.log("reset:");
      this.formShfs.shfs["饮酒情况"] = null;
      this.formShfs.shfs["吸烟情况"] = null;
      this.formShfs.shfs["基础血压低"] = null;
      this.formShfs.shfs["基础心率低"] = null;
      this.formShfs.shfs["治疗依从性高"] = null;
      this.formShfs.shfs["患者本人重视程度高"] = null;
      this.formShfs.shfs["患者本人信心"] = null;
      this.formShfs.shfs["家属关心程度"] = null;
      this.formShfs.shfs["有氧运动"] = null;
      this.formShfs.shfs["经济条件"] = null;
      this.formShfs.shfs["对社会及生活的情感"] = null;
      this.formShfs.shfs["人际关系"] = null;
      this.formShfs.shfs["对患病及衰老的态度"] = null;
      this.formShfs.shfs["每天进食食盐"] = null;
      this.formShfs.shfs["食欲"] = null;
      this.formShfs.shfs["平均每日入水量(ml)"] = null;
    },
    initFormShfs() {},
    loadShfsData() {
      console.log("------loadShfsData-------");
      this.resetForm();
      let record_id = this.record_id;
      // 读取数据
      this.getRequest("/visit/record/" + record_id).then((resp) => {
        if (resp) {
          // console.log("resp", resp);
          this.formShfs.shfs["饮酒情况"] = JSON.parse(resp.shfs)["饮酒情况"];
          this.formShfs.shfs["吸烟情况"] = JSON.parse(resp.shfs)["吸烟情况"];
          this.formShfs.shfs["基础血压低"] = JSON.parse(resp.shfs)[
            "基础血压低"
          ];
          this.formShfs.shfs["基础心率低"] = JSON.parse(resp.shfs)[
            "基础心率低"
          ];
          this.formShfs.shfs["治疗依从性高"] = JSON.parse(resp.shfs)[
            "治疗依从性高"
          ];
          this.formShfs.shfs["患者本人重视程度高"] = JSON.parse(resp.shfs)[
            "患者本人重视程度高"
          ];
          this.formShfs.shfs["患者本人信心"] = JSON.parse(resp.shfs)[
            "患者本人信心"
          ];
          this.formShfs.shfs["家属关心程度"] = JSON.parse(resp.shfs)[
            "家属关心程度"
          ];
          this.formShfs.shfs["有氧运动"] = JSON.parse(resp.shfs)["有氧运动"];
          this.formShfs.shfs["经济条件"] = JSON.parse(resp.shfs)["经济条件"];
          this.formShfs.shfs["对社会及生活的情感"] = JSON.parse(resp.shfs)["对社会及生活的情感"];
          this.formShfs.shfs["人际关系"] = JSON.parse(resp.shfs)["人际关系"];
          this.formShfs.shfs["对患病及衰老的态度"] = JSON.parse(resp.shfs)["对患病及衰老的态度"];
          this.formShfs.shfs["每天进食食盐"] = JSON.parse(resp.shfs)["每天进食食盐"];
          this.formShfs.shfs["食欲"] = JSON.parse(resp.shfs)["食欲"];
          this.formShfs.shfs["平均每日入水量(ml)"] = JSON.parse(resp.shfs)["平均每日入水量(ml)"];
          
        }
      });
    },
    submitForm() {
      this.formShfs.record_id = this.record_id;
      var formData = JSON.stringify(this.formShfs);
      console.log("this.formShfs", this.formShfs);
      this.putRequest("/visit/record/shfs/", this.formShfs).then((resp) => {
        if (resp) {
          this.loadShfsData();
        }
      });
    },
    createFilter(curArr, queryString) {
      return (curArr) => {
        return curArr.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    // 饮酒情况
    queryYjSearch(queryString, cb) {
      var querydata = this.template_data.生活方式.饮酒情况;
      var results = queryString
        ? querydata.filter(this.createFilter(querydata, queryString))
        : querydata;
      var resultArr = [];
      for (let item of results) {
        resultArr.push({ value: item });
      }
      cb(resultArr);
    },
  },
  mounted() {
    // 初始化数组
    this.template_data.生活方式.基础血压低 = this.base_selarr;
    this.template_data.生活方式.基础心率低 = this.base_selarr;
    this.template_data.生活方式.治疗依从性高 = this.base_selarr;
    this.template_data.生活方式.患者本人重视程度高 = this.base_selarr;

    this.loadShfsData();
  },
  watch: {
    record_id: function (newData, oldData) {},
  },
};
</script>