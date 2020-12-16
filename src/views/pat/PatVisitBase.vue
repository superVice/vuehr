<template>
  <div>
    <div>
      <el-input
        placeholder="请输入患者身份证号"
        prefix-icon="el-icon-search"
        style="width:300px;margin-right:10px;"
        v-model="keyword"
      ></el-input>
      <el-button icon="el-icon-search" type="primary" @click="initVisitBase">搜索</el-button>
      <el-button icon="el-icon-plus" type="primary" @click="addVisitBase()">添加访视基线</el-button>
    </div>
    <hr />
    <div style="margin-top:10px;">
      <el-table
        style="width: 100%"
        :data="visitbases"
        size="small"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="patient_name" label="患者姓名" align="left" fixed width="100"></el-table-column>
        <el-table-column prop="base_name" label="基线名称" align="left" width="185"></el-table-column>
        <!-- <el-table-column prop="base_id" label="id" align="left" width="85" hidden></el-table-column> -->
        <el-table-column prop="address" label="基线地址" align="left" width="120"></el-table-column>
        <el-table-column
          prop="base_time"
          label="基线时间"
          align="left"
          width="150"
          :formatter="dateFormatter"
        ></el-table-column>
        <el-table-column
          prop="week_time"
          label="周访视时间"
          align="left"
          width="110"
          :formatter="dateFormatter"
        ></el-table-column>
        <el-table-column
          prop="month_time"
          label="月访视时间"
          align="left"
          width="110"
          :formatter="dateFormatter"
        ></el-table-column>
        <el-table-column
          prop="halfyear_time"
          label="半年访视时间"
          align="left"
          width="110"
          :formatter="dateFormatter"
        ></el-table-column>
        <el-table-column prop="remark" label="备注" align="left" width="220"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditView(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteBase(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display:flex;justify-content:flex-end">
      <el-pagination
        background
        @current-change="currentChange"
        @size-change="sizeChange"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog :title="title" width="70%" :visible.sync="dialogVisible">
      <div>
        <el-form
          :model="baseForm"
          :rules="rules"
          ref="baseForm"
          label-width="100px"
        >
          <el-form-item label="基线名称" prop="base_name">
            <el-input v-model="baseForm.base_name"></el-input>
          </el-form-item>
          <el-form-item label="加入项目" prop="project_id">
            <el-select v-model="baseForm.project_id" placeholder="请选择基线所属项目">
              <el-option
                v-for="item in projects"
                :key="item.id"
                :label="item.project_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基线区域" prop="address">
            <el-select v-model="baseForm.address" placeholder="请选择基线建立区域">
              <el-option label="402室" value="shanghai"></el-option>
              <el-option label="403室" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基线时间" required>
            <el-col :span="5">
              <el-form-item prop="base_time">
                <el-date-picker
                  type="date" value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="baseForm.base_time" 
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="baseForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('baseForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import BaseLine from "../../components/pat/basic/BaseLine";

export default {
  name: "visitBase",
  data() {
    return {
      title: "",
      visitbases: [],
      projects:[],
      keyword: "",
      loading: false,
      total: 0,
      page: 1,
      size: 10,
      dialogVisible: false,
      baseForm: {
        base_id: "",
        base_name: "",
        patient_id: "",
        project_id: "",
        address: "",
        base_time: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "请输入基线名称", trigger: "blur" }],
        project_id: [
          { required: true, message: "请选择项目", trigger: "blur" }
        ],
        base_time: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {

  },
  methods: {
    emptyVisitBase() {
        this.baseForm =  {
        base_id: "",
        base_name: "",
        patient_id: "",
        project_id: "",
        address: "",
        // base_time: "",
        remark: ""
      }
    },
    addVisitBase() {
      this.title = "新增随访基线信息";
      this.emptyVisitBase()
      if (this.keyword) {
        this.baseForm.patient_id = this.keyword;
        this.dialogVisible = true;
      } else {
        this.$alert("患者编号不正确！", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    showEditView(data) {

      this.title = "编辑随访基线信息";
      this.baseForm = data;
      this.baseForm.project_id = Number(this.baseForm.project_id);
      this.dialogVisible = true;
      // this.$refs.recordZz.loadZzData();
    },
    initVisitBase() {
      this.loading = true;
      this.getRequest(
        "/visit/visitBaseByPage/?page=" +
          this.page +
          "&size=" +
          this.size +
          "&keyword=" +
          this.keyword
      ).then(resp => {
        if (resp) {
          this.loading = false;
          this.visitbases = resp.data;
          this.total = resp.total;
        }
      });
    },
    initProjects(){
      this.getRequest("/proj/getAllByCurDoctor").then(resp => {
        if(resp){
            this.projects = resp
        }
      });
    },
    submitForm() {
      let patient_id = this.keyword;
      if (this.baseForm.base_id) {
        this.$refs.baseForm.validate(valid => {
          if (valid) {
            // 修改
            this.putRequest("/visit/visitBase/", this.baseForm).then(resp => {
              if (resp) {
                this.dialogVisible = false;
                this.initVisitBase();
              }
            });
          }
        });
      } else {
        this.$refs.baseForm.validate(valid => {
          if (valid) {
            // 增加
            console.log(this.baseForm)
            this.postRequest("/visit/visitBase/", this.baseForm).then(resp => {
              if (resp) {
                this.dialogVisible = false;
                this.initVisitBase();
              }
            });
          }
        });
      }
    },
    deleteBase(data) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delRequest("/visit/visitBase/" + data.base_id).then(resp => {
            if (resp) this.initVisitBase();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    currentChange(currentPage) {
      this.page = currentPage;
      this.initVisitBase();
    },
    sizeChange(currentSize) {
      this.size = currentSize;
      this.initVisitBase();
    },
    dateFormatter(row, column) {
      let datetime = row[column.property];
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate();
        return y + mon + d;
      }
      return "";
    }
  },
  mounted() {
    this.initVisitBase();
    this.initProjects();
  }
};
</script>
<style scoped>
</style>