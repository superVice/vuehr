<template>
  <div>
    <el-form
      ref="formBase"
      :model="formBase"
      label-width="150px"
      label-position="left"
      :inline="true"
    >
      <el-row>
        <!-- 随访类型 -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="随访类型">
              <el-select v-model="formBase.record_type" placeholder="随访类型">
                <el-option
                  v-for="item in sflxList"
                  :key="item.key"
                  :value="item.key"
                  :label="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <!-- 随访日期 -->
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-form-item label="随访日期" class="item">
              <el-date-picker v-model="formBase.vist_time" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <!-- 随访形式 -->
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-form-item label="随访形式" class="item">
              <el-select v-model="formBase.sfxs" placeholder="随访形式">
                <el-option
                  v-for="item in sfxsList"
                  :key="item.key"
                  :value="item.key"
                  :label="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('formBase')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RecordBase",
  props: ["record_id"],
  data() {
    return {
      formBase: {
        record_type: "",
        vist_time: "",
        sfxs: "",
        lcjg: {}
      },
      sflxList: [
        { key: "WEEK", value: "周随访" },
        { key: "MONTH", value: "月随访" },
        { key: "HALF_YEAR", value: "半年随访" },
        { key: "RANDOM", value: "随机随访" }
      ],
      sfxsList: [
        { key: "DH", value: "电话" },
        { key: "MZ", value: "门诊" },
        { key: "ZCZY", value: "再次住院" }
      ]
    };
  },

  methods: {
    initForm() {
      //console.log("------初始化-------");
    },
    loadBaseData() {
      console.log("------loadBaseData-------");
      let record_id = this.record_id;
      // 读取数据
      this.getRequest("/visit/record/" + record_id).then(resp => {
        if (resp) {
          this.formBase.record_type = resp.record_type;
          this.formBase.vist_time = resp.vist_time;
          this.formBase.sfxs = resp.sfxs;
        }
      });
    },
    submitForm() {
      // var formData = JSON.stringify(this.formBase);
      // console.log("formData", formData);
      this.formBase.record_id = this.record_id;
      this.putRequest("/visit/record/base/", this.formBase).then(resp => {
        if (resp) this.initForm();
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
    this.loadBaseData();
  },
  watch: {
    record_id: function(newData, oldData) {
      // console.log("newData:", newData); //newData就是orderData
    }
  }
};
</script>