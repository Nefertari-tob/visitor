<template>
  <div id="studentlook">
    <div class="mb20 between">
      <div class="flex">
        <a-row type="flex" :gutter="20" justify="space-around" align="middle">
          <a-col :span="2">
            <div class="title">
              <div class="titlebtn skyBlue">
                <a-select
                  default-value="教师管理"
                  placeholder="城市选择"
                  style="width: 120px"
                  @change="handleChange"
                >
                  <a-select-option value="教师管理">教师管理</a-select-option>
                  <a-select-option value="学生管理">学生管理</a-select-option>
                </a-select>
              </div>
              <span class="ml10" style="margin-top: 4px">
                <a-icon type="vertical-left" style="color: #80BCFA" />
              </span>
            </div>
          </a-col>
          <a-col :span="1">
            <a-select :placeholder="placeholder2" style="width: 120px">
              <a-select-option
                v-for="item in dropDownBox2"
                :key="item"
                :value="item"
                >{{ item }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="1">
            <a-select :placeholder="placeholder3" style="width: 120px">
              <a-select-option
                v-for="item in dropDownBox3"
                :key="item"
                :value="item"
                >{{ item }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="1">
            <a-select :placeholder="placeholder4" style="width: 120px">
              <a-select-option
                v-for="item in dropDownBox4"
                :key="item"
                :value="item"
                >{{ item }}</a-select-option
              >
            </a-select>
          </a-col>
          <!-- 按学校
          <a-col :span="3">
            <a-cascader
              :fieldNames="{
                label: 'name',
                value: 'id',
                children: 'children'
              }"
              changeOnSelect
              class="skyBlue"
              style="width: 220px"
              :value="classValue"
              placeholder="年级、院系、班级选择"
            />
          </a-col> -->
          <a-col :span="1">
            <a-input-search
              allowClear
              class="ml10 skyBlue"
              :placeholder="placeholder5"
              style="width: 150px"
              v-model="searchText"
            />
          </a-col>
          <!-- <a-col :span="1"> -->
          <!-- </a-col> -->
        </a-row>
        <a-modal
          width="650px"
          v-model="visible"
          @cancel="handleCancel"
          title="新增教师"
          okText="确认导入"
          cancelText="取消导入"
        >
          <img src="@/assets/close.png" slot="closeIcon" alt="" />
          <template slot="footer">
            <a-row type="flex" justify="center" :gutter="80">
              <a-col class="gutter-row">
                <a-button
                  key="submit"
                  type="primary"
                  :loading="loading"
                  @click="handleOk"
                  class="subBtn"
                >
                  确认导入
                </a-button>
              </a-col>
              <a-col class="gutter-row">
                <a-button key="back" class="cancel" @click="handleCancel"
                  >取消导入</a-button
                >
              </a-col>
            </a-row>
          </template>
          <a-row type="flex">
            <a-col flex="140px">
              <img src="@/assets/addTeacher.png" alt="" />
            </a-col>
            <a-col flex="auto">
              <div class="ml20 mt20">
                <a-row :gutter="[16, 24]">
                  <a-col :span="6">
                    <span>表格选择</span>
                  </a-col>
                  <a-col :span="10">
                    <a-upload
                      name="file"
                      :fileList="infoFile"
                      :before-upload="beforeInfo"
                      :remove="remove"
                    >
                      <a-button v-if="infoFile.length < 1" class="selectFile">
                        <a-icon type="upload" />请选择文件</a-button
                      >
                    </a-upload>
                  </a-col>
                  <a-col :span="8">
                    <a
                      href="javascript:;"
                      @click="download"
                      download="教师导入模版.xlsx"
                      >表格模板下载</a
                    >
                  </a-col>
                </a-row>

                <a-row :gutter="[16, 24]">
                  <a-col :span="6">
                    <span>照片包选择</span>
                  </a-col>
                  <a-col :span="10">
                    <a-upload
                      name="file"
                      :fileList="photoInfo"
                      :before-upload="beforePhoto"
                      :remove="remove1"
                    >
                      <a-button v-if="photoInfo.length < 1" class="selectFile">
                        <a-icon type="upload" />请选择文件</a-button
                      >
                    </a-upload>
                  </a-col>
                  <a-col :span="8">
                    <a href="" download="">照片标准查看</a>
                  </a-col>
                </a-row>
                <!-- <a-text>导入教师{{}}人，成功{{}}人，失败{{}}人，点击下载<a>失败人员表格</a></a-text> -->
              </div>
            </a-col>
            <a-col>
              <div class="ml30 mt30">
                <div v-if="isflag">
                  导入教师{{ addter.amounts }}人，成功{{
                    addter.numbers
                  }}人，失败{{ addter.count }}人
                  <span v-if="addter.url != null">
                    ，点击下载<a style="color:red" @click="countteacher"
                      >失败人员表格</a
                    >
                  </span>
                </div>
                <div v-if="ihflag">
                  导入照片{{ addphot.amounts }}张，成功{{
                    addphot.numbers
                  }}张，失败{{ addphot.count }}张
                  <span v-if="addphot.url != null">
                    ，点击下载<a style="color:red" @click="countzip"
                      >失败照片压缩包</a
                    >
                  </span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-modal>
      </div>
      <a-button style="float: right" type="primary" @click="showModal">
        {{ student }}
      </a-button>
    </div>
    <teacherList
      :data="tabledata"
      :loading="loading"
      :falg="falg"
      :pagination="pagination"
      @changepage="tableChangePage"
    />
  </div>
</template>

<script>
import teacherList from "@/components/teacher/teacherList";
import {
  addTeacher,
  teacherModel,
  addteacherphoto,
  getTeacherList
} from "@/api/index";
import page from "@/mixin/page";
export default {
  mixins: [page],
  components: {
    teacherList
  },
  data() {
    return {
      // -------------------------------------------------------------------
      dropDownBox2: [],
      placeholder2: "部门选择",
      dropDownBox3: [],
      placeholder3: "分组选择",
      dropDownBox4: [],
      placeholder4: "职务选择",
      placeholder5: "搜索教师",
      student: "新增教师",
      falg: true,
      // -------------------------------------------------------------------
      visible: false,
      isflag: false,
      ihflag: false,
      addter: [],
      addphot: [],
      infoFile: [],
      photoInfo: [],
      searchText: null,
      tabledata: [],
      loading: false,
      classValue: null
      // path: process.env.BASE_URL
    };
  },
  // computed: {
  //   downLoadFile() {
  //     return `${this.path}model.xlsx`;
  //   }
  // },
  mounted() {
    this.getData();
    this.renderStripe();
  },
  methods: {
    // ---------------------------------------------------------------------------------------------
    handleChange(value) {
      console.log("select", value);
      console.log(value == "学生管理");
      if (value == "教师管理") {
        // this.falg = true;
        this.$router.push("/user/addTeacher");
      } else if (value == "学生管理") {
        // this.falg = false;
        this.$router.push("/user/addStudent");
      }
    },
    // ---------------------------------------------------------------------------------------------
    showModal() {
      this.visible = true;
    },
    //新增模板下载
    download() {
      teacherModel().then(res => {
        console.log(res.data);
        window.open(this.baseurl + res.data);
      });
    },
    // excelChange({ fileList }) {
    //   this.infoFile = fileList;
    // },
    // photoChange({ fileList }) {
    //   this.photoInfo = fileList;
    // },
    remove() {
      this.infoFile = [];
    },
    remove1() {
      this.photoInfo = [];
    },
    handleOk(e) {
      console.log(e);
      console.log(this.infoFile[0], "infoFile");
      console.log(this.photoInfo[0], "photoInfo");
      const formData = new FormData();
      const formData1 = new FormData();
      formData.append("excel", this.infoFile[0]);
      formData1.append("avatarFile", this.photoInfo[0]);
      formData.append("id", this.$store.state.userinfo.manager.id);
      if (this.infoFile[0] != undefined) {
        this.saveFile(formData);
        console.log("有文件");
        if (this.addter != []) {
          console.log("有返回值", this.addter);
          if (this.photoInfo[0] != undefined) {
            console.log("有照片");
            this.savephoto(formData1);
          }
        }
      } else {
        console.log("没有文件");
        if (this.photoInfo[0] != undefined) {
          console.log("有照片");
          this.savephoto(formData1);
        }
      }
      // this.visible = false;
    },
    handleCancel() {
      this.visible = false;
      this.infoFile = [];
      this.photoInfo = [];
      this.isflag = false;
      this.ihflag = false;
    },
    beforeInfo(file) {
      this.infoFile = [...this.infoFile, file];
      console.log(file.name.split(".")[1], "1111111");
      var ext = file.name.split(".")[1];
      if (ext != "xls") {
        // fileList = [];
        this.$message.error("上传文件格式错误！");
      }
      return false;
    },
    beforePhoto(file) {
      this.photoInfo = [...this.photoInfo, file];
      console.log(file.name.split(".")[1], "222222222");
      var ext = file.name.split(".")[1];
      if (ext != "zip") {
        // fileList = [];
        this.$message.error("上传文件格式错误！");
      }
      return false;
    },
    saveFile(formData) {
      console.log(formData, "1111");
      let params = formData;
      this.loading = true;
      addTeacher(params)
        .then(res => {
          console.log(res.data, "datadatadatadata");
          this.isflag = true;
          this.addter = res.data;
          console.log(this.addter, "addter");
          if (res.code == 0) {
            this.loading = false;
            this.$message.success("上传成功！");
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    savephoto(formData1) {
      console.log(formData1, "1111");
      let params = formData1;
      this.loading = true;
      addteacherphoto(params)
        .then(res => {
          this.addphot = res.data;
          this.ihflag = true;
          if (res.code == 0) {
            this.loading = false;
            this.$message.success("上传成功！");
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //下载失败照片
    countzip() {
      window.open(this.baseurl + this.addphot.url);
    },
    //下载失败人员
    countteacher() {
      window.open(this.baseurl + this.addter.url);
    },
    getData() {
      let params = {
        pageNumber: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      this.loading = true;
      getTeacherList(params)
        .then(res => {
          console.log(res.data.list);
          this.loading = false;
          this.tabledata = res.data.list;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 对表格行进行斑马行格式显示
    renderStripe() {
      const table = document.getElementsByClassName("ant-table-row");
      if (table.length > 0) {
        const rowList = [...table];
        rowList.forEach(row => {
          const index = rowList.indexOf(row);
          if (index % 2 !== 0) {
            row.style.backgroundColor = "#EFFAFC";
          } else {
            row.style.backgroundColor = "#ffffff";
          }
        });
      }
    }
  },
  updated() {
    this.renderStripe();
  }
};
</script>

<style lang="less">
.ml30 {
  // background-color: aqua;
  margin-left: 140px;
}
</style>
