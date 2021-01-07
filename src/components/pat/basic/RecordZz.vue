<template>
  <div>
    <el-form ref="formZz" :model="formZz" label-width="180px" label-position="left" :inline="true">
      <!-- 患者症状 -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="1. 乏力与疲劳" class="item">
              <el-select v-model="formZz.hzzz['乏力与疲劳']" placeholder="请选择乏力与疲劳" clearable>
                <el-option v-for="item in oneweek_template_data.症状.乏力与疲劳" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="2. 气短/呼吸困难" class="item">
              <el-select v-model="formZz.hzzz['气短/呼吸困难']" placeholder="请选择气短/呼吸困难">
                <el-option
                  v-for="item in oneweek_template_data.症状['气短/呼吸困难']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="3. 活动能力" class="item">
              <el-select v-model="formZz.hzzz['活动能力']" placeholder="请选择活动能力">
                <el-option v-for="item in oneweek_template_data.症状.活动能力" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="4. 自理能力" class="item">
              <el-select v-model="formZz.hzzz['自理能力']" placeholder="请选择自理能力">
                <el-option v-for="item in oneweek_template_data.症状.自理能力" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="5. 日常活动" class="item">
              <el-select v-model="formZz.hzzz['日常活动']" placeholder="请选择日常活动">
                <el-option v-for="item in oneweek_template_data.症状.日常活动" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="6. 其它躯体不适" class="item">
              <el-select v-model="formZz.hzzz['其它躯体不适']" placeholder="请选择其它躯体不适">
                <el-option
                  v-for="item in oneweek_template_data.症状.其它躯体不适"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="7. 焦虑/抑郁" class="item">
              <el-select v-model="formZz.hzzz['焦虑/抑郁']" placeholder="请选择焦虑/抑郁">
                <el-option
                  v-for="item in oneweek_template_data.症状['焦虑/抑郁']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="8. 生活质量自评(分)" class="item">
              <el-input v-model="formZz.hzzz['生活质量自评']" placeholder="请输入生活质量自评" maxlength="4"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="9. 充血性心力衰竭症状" class="item">
              <el-select v-model="formZz.hzzz['充血性心力衰竭症状']" placeholder="请选择充血性心力衰竭症状">
                <el-option
                  v-for="item in oneweek_template_data.症状['充血性心力衰竭症状']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-form-item label="心力衰竭症状等级" class="item">
              <el-select v-model="formZz.hzzz['心力衰竭症状等级']" placeholder="请选择心力衰竭症状等级">
                <el-option
                  v-for="item in oneweek_template_data.症状['心力衰竭症状等级']"
                  :key="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
<el-tag style="margin-right: 5px; margin-bottom: 10px" type="danger"
            >* 8. 生活质量自评0-100分，0为生活质量最低，100为最高！</el-tag>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('formZz')">保存</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <!-- <el-button @click="initFormZz()">初始化</el-button> -->
        <!-- <el-button @click="loadZzData()">读取数据</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RecordZz",
  props: ["record_id"],
  data() {
    return {
      formZz: {
        record_id: "",
        name: "",
        hzzz: {
          乏力与疲劳: "",
          "气短/呼吸困难": "",
          "焦虑/抑郁": "",
          活动能力: "",
          自理能力: "",
          日常活动: "",
          其它躯体不适:"",
          生活质量自评: "",
          充血性心力衰竭症状: "",
          心力衰竭症状等级: ""
        },
        shfs: {
          饮酒情况: "",
          吸烟情况: "",
          基础血压低: "",
          基础心率低: "",
          治疗依从性高: ""
        },
        tzytg: {}
      },
      oneweek_template_data: {
        患者现状: ["健在", "新的住院，新植入装置，中期非计划随访", "死亡"],
        症状: {
          乏力与疲劳: ["无", "轻度", "明显", "严重", "不适用"],
          "气短/呼吸困难": ["无", "轻度", "明显", "严重", "不适用"],
          活动能力: ["无受限", "降低", "卧床"],
          日常活动: ["无困难", "存在一定困难", "不能正常进行"],
          自理能力: ["能够自理", "穿衣、洗澡部分困难", "无法自行穿衣、洗澡"],
          其它躯体不适: ["无不适", "轻度不适", "严重不适"],
          "焦虑/抑郁": ["无焦虑和抑郁", "轻度焦虑或抑郁", "严重焦虑或抑郁"],
          生活质量自评: " 分",
          充血性心力衰竭症状: [
            "无",
            "呼吸急促",
            "端坐呼吸",
            "夜间阵发性呼吸困难",
            "乏力"
          ],
          心力衰竭症状等级: [
            "心功能I级",
            "心功能II级",
            "心功能III级",
            "心功能IV级"
          ]
        },
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
            "不运动"
          ],
          "经济条件(满足生活及治病需要)": ["很好满足", "刚好满足", "不能满足"],
          对社会及生活的情感: []
        },
        体征与体格检查: {}
      }
    };
  },
  methods: {
    resetForm() {
      // console.log("reset:");
      this.formZz.hzzz["乏力与疲劳"] = null;
      this.formZz.hzzz["气短/呼吸困难"] = null;
          this.formZz.hzzz["活动能力"] = null;
          this.formZz.hzzz["自理能力"] = null;
          this.formZz.hzzz["日常活动"] = null;
          this.formZz.hzzz["其它躯体不适"] = null;
          this.formZz.hzzz["焦虑/抑郁"] = null;
          this.formZz.hzzz["生活质量自评"] =null;
          this.formZz.hzzz["充血性心力衰竭症状"] =null;
          this.formZz.hzzz["心力衰竭症状等级"] =null;
    },
    initFormZz() {
      
    },
    loadZzData() {
      console.log("------loadZzData-------");
      this.resetForm();
      let record_id = this.record_id;
      // 读取数据
      this.getRequest("/visit/record/" + record_id).then(resp => {
        if (resp) {
          // console.log("resp", resp);
          this.formZz.hzzz["乏力与疲劳"] = JSON.parse(resp.hzzz)["乏力与疲劳"];
          this.formZz.hzzz["气短/呼吸困难"] = JSON.parse(resp.hzzz)[
            "气短/呼吸困难"
          ];
          this.formZz.hzzz["活动能力"] = JSON.parse(resp.hzzz)["活动能力"];
          this.formZz.hzzz["自理能力"] = JSON.parse(resp.hzzz)["自理能力"];
          this.formZz.hzzz["日常活动"] = JSON.parse(resp.hzzz)["日常活动"];
          this.formZz.hzzz["其它躯体不适"] = JSON.parse(resp.hzzz)[
            "其它躯体不适"
          ];
          this.formZz.hzzz["焦虑/抑郁"] = JSON.parse(resp.hzzz)["焦虑/抑郁"];
          this.formZz.hzzz["生活质量自评"] = JSON.parse(resp.hzzz)[
            "生活质量自评"
          ];
          this.formZz.hzzz["充血性心力衰竭症状"] = JSON.parse(resp.hzzz)[
            "充血性心力衰竭症状"
          ];
          this.formZz.hzzz["心力衰竭症状等级"] = JSON.parse(resp.hzzz)[
            "心力衰竭症状等级"
          ];
        }
      });
    },
    submitForm() {
      this.formZz.record_id = this.record_id;
      var formData = JSON.stringify(this.formZz);
      console.log("this.formZz", this.formZz);
      this.putRequest("/visit/record/zz/", this.formZz).then(resp => {

        if (resp){
          this.loadZzData();
        }
      });
    },

    queryFuzzySearch(queryString, cb) {
      var ways = Array.from(this.oneweek_template_data.生活方式["饮酒情况"]);
      // console.log("ways:", Array.from(ways));
      var results = queryString
        ? ways.filter(this.createFilter(queryString))
        : ways;
      // console.log("results:", results);
      var resultArr = [];
      for (let item of results) {
        resultArr.push({ value: item });
      }
      // 调用 callback 返回建议列表的数据
      cb(resultArr);
    },
    createFilter(queryString) {
      return ways => {
        return ways.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.loadZzData();
  },
  watch: {
    record_id: function(newData, oldData) {
      // console.log("newData:", newData); //newData就是orderData
      // this.loadZzData();
    }
  }
};
</script>