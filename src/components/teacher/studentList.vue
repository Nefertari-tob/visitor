<template>
  <div>
    <a-table
      :columns="columns"
      :pagination="pagination"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
      @change="handleTableChange"
    >
      <img
        style="height: 50px; margin: 5px 0; width: 40px"
        v-lazy="baseurl + avatar"
        class="avatar"
        alt="photo"
        slot="photo"
        slot-scope="avatar"
      />
      <a-button slot="del" style="color: red;border: none;" icon="delete" />
      <a-button slot="edit" icon="edit" style="color: #4199F9;border: none;" />
      <a-button
        @click="showModal(id)"
        slot="look"
        icon="login"
        slot-scope="id"
        style="color: #4199F9;border: none;"
      />
    </a-table>
    <a-modal
      v-if="visible"
      title="学生信息-住校生"
      :width="964"
      :closable="false"
      cancelText="关闭"
      okText="编辑"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="modal">
        <div>
          <img src="../../assets/Copy.png" alt="" />
          <p>
            <span
              >姓 &shy; &shy; &shy; 名：
              <input
                style="width: 150px"
                :class="{ a_input: !judge, b_input: judge }"
                :disabled="!judge"
                v-model="form.name"
            /></span>
            <span
              >性别：
              <a-select
                style="width: 80px"
                :disabled="!judge"
                :eventKey="form.sex"
                v-model="form.sex"
                :default-value="form.sex"
              >
                <a-select-option :value="1">男</a-select-option>
                <a-select-option :value="0">女</a-select-option>
              </a-select>
            </span>
          </p>
          <p>
            <span
              >身份号码：<input
                style="width: 180px"
                :class="{ a_input: !judge, b_input: judge }"
                :disabled="!judge"
                v-model="form.idCard"
                @blur="identity(form.idCard)"
              />
              <span
                :style="
                  checkIds.status == 1
                    ? 'color:green;'
                    : 'color:red;' + 'font-size: 12px; '
                "
                >{{ checkIds.status == 1 ? checkIds.msg : checkIds.msg }}</span
              ></span
            >
          </p>
          <p>
            <span>学 &shy; &shy; &shy; 校：{{ form.school.name }}</span>
          </p>
          <p>
            <span
              >年 &shy; &shy; &shy; 级：
              <!-- <input
                style="width: 80px"
                :class="{ a_input: !judge, b_input: judge }"
                :disabled="!judge"
                v-model="form.grade"
            /> -->
              <a-select
                style="width: 100px"
                :eventKey="form.grade"
                :disabled="!judge"
                v-model="form.grade"
              >
                <a-select-option v-for="item in grade" :key="item" :value="item"
                  >{{ item }}级</a-select-option
                >
              </a-select>
            </span>
            <span
              >分类：
              <a-select
                style="width: 100px"
                :eventKey="form.classification"
                :disabled="!judge"
                v-model="form.classification"
              >
                <a-select-option
                  v-for="item in type"
                  :key="item"
                  :value="item"
                  >{{ item }}</a-select-option
                >
              </a-select>
            </span>
          </p>
          <p>
            <span
              >班 &shy; &shy; &shy; 级：
              <a-select
                :eventKey="form.team"
                style="width: 100px"
                :disabled="!judge"
                v-model="form.team"
              >
                <a-select-option v-for="item in 9" :key="item" :value="item"
                  >{{ item }}班</a-select-option
                >
              </a-select>
            </span>
            <span
              >类型：
              <a-select
                :eventKey="form.type"
                style="width: 100px"
                :disabled="!judge"
                v-model="form.type"
                :default-value="form.type"
              >
                <a-select-option
                  v-for="item in genre"
                  :key="item"
                  :value="item"
                  >{{ item == 1 ? "住校生" : "走读生" }}</a-select-option
                >
              </a-select>
            </span>
          </p>
          <p>
            <span
              >毕业时间：
              <a-date-picker
                v-if="defalg"
                :default-value="dateFormat(form.graduationDate, 'yyyy-MM-dd')"
                :disabled="!judge"
                @change="onChange"
              />
            </span>
          </p>
        </div>
        <div></div>
        <div v-if="form.type === 1">
          <p>
            <span class="infoTatle">住宿信息</span>
          </p>
          <p>
            <span
              >区 &shy; &shy; &shy; 域：
              <a-select
                style="width: 200px"
                :disabled="!judge"
                v-model="form.genre"
              >
                <a-select-option
                  v-for="item in genre"
                  :key="item"
                  :value="genre"
                  >{{ item }}</a-select-option
                >
              </a-select>
            </span>
          </p>
          <p>
            <span
              >楼 &shy; &shy; &shy; 栋：
              <a-select
                style="width: 200px"
                :disabled="!judge"
                v-model="form.genre"
              >
                <a-select-option
                  v-for="item in genre"
                  :key="item"
                  :value="genre"
                  >{{ item }}</a-select-option
                >
              </a-select></span
            >
          </p>
          <p>
            <span
              >楼 &shy; &shy; &shy; 层：
              <a-select
                style="width: 100px"
                :disabled="!judge"
                v-model="form.genre"
              >
                <a-select-option
                  v-for="item in genre"
                  :key="item"
                  :value="genre"
                  >{{ item }}</a-select-option
                >
              </a-select>
            </span>
            <span
              >房间号：<a-select
                style="width: 100px"
                :disabled="!judge"
                v-model="form.genre"
              >
                <a-select-option
                  v-for="item in genre"
                  :key="item"
                  :value="genre"
                  >{{ item }}</a-select-option
                >
              </a-select>
            </span>
          </p>
          <p>
            <span
              >截至时期：<a-date-picker
                v-if="defalg"
                :default-value="dateFormat(form.expiryDate, 'yyyy-MM-dd')"
                :disabled="!judge"
                @change="onChange1"
            /></span>
          </p>
          <p>
            <span class="infoTatle">关联账号</span>
          </p>
          <p v-for="item in form.familyList" :key="item.id">
            <span>姓名</span>
            <span>{{ item.name }}</span> <span>联系方式</span
            ><span
              >{{ item.phone }}
              <img
                style="margin-left: 20px;"
                src="../../assets/md-phonelink_erase.svg"
                alt=""
            /></span>
          </p>
          <!-- <p>
            <span>姓名</span> <span>王妈妈</span> <span>联系方式</span
            ><span
              >12345678912 <img src="../../assets/md-phonelink_erase.svg" alt=""
            /></span>
          </p> -->
        </div>
        <div v-else-if="form.type === 0">
          <p>
            <span class="infoTatle">走读接送</span>
          </p>
          <p class="gop" v-for="item in 2" :key="item">
            <img src="../../assets/Copy2.png" alt="" />
            <span style="padding: 10px 10px; height: 88px">
              <span style="margin: 15px 20px 0 0">姓名</span>
              <span style="margin: 0 20px 0 0">王妈妈</span>
              <span style="margin: 0 20px 0 0">关系</span>
              <span style="margin: 0 20px 0 0;">母亲</span>
              <span style="margin: 0 20px 0 0; height: 28px">联系方式</span>
              <span style="margin: 0 20px 0 0; height: 28px">16655885588</span>
              <img
                style="width: 20px;"
                src="../../assets/md-delete_forever.svg"
                alt=""
              />
            </span>
          </p>

          <p class="infoTatle1">
            <span class="infoTatle">关联账号</span>
          </p>
          <p
            style="padding: 10px 80px 10px 40px; margin: 0;"
            v-for="item in form.familyList"
            :key="item.id"
          >
            <span>姓名</span>
            <span>{{ item.name }}</span> <span>联系方式</span
            ><span
              >{{ item.phone }}
              <img
                style="margin-left: 20px;"
                src="../../assets/md-phonelink_erase.svg"
                alt=""
            /></span>
          </p>
          <!-- <p>
            <span>姓名</span> <span>王妈妈</span> <span>联系方式</span
            ><span
              >12345678912 <img src="../../assets/md-phonelink_erase.svg" alt=""
            /></span>
          </p> -->
        </div>
        <div v-else></div>
        <!-- 姓名 王爸爸 联系方式 12345678900 姓名 王妈妈 联系方式 12345678912 -->
      </div>
    </a-modal>
  </div>
</template>

<script>
import { grade, sex, type, genre } from "@/data";
import { studentDetail } from "@/api/index";
import { checkId, dateFormat } from "@/util";
// import { log } from "util";
export default {
  data() {
    return {
      // ------------------------------------------------------------
      grade,
      sex,
      type,
      genre,
      visible: false,
      judge: false,
      form: {
        name: "王可爱",
        sex: "女",
        idCard: null,
        // school: "云析实验小学",
        grade: "2019级",
        type: "文化生",
        squad: "2班",
        genre: "走读生",
        graduationDate: null,
        expiryDate: null
      },
      checkIds: "",
      defalg: false,
      // ------------------------------------------------------------
      columns: [
        {
          title: "照片",
          dataIndex: "avatar",
          scopedSlots: { customRender: "photo" }
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: () => (this.falg ? "部门" : "年级"),
          dataIndex: "grade"
          // customRender: text => text + "级"
        },
        {
          title: () => (this.falg ? "分组" : "分类"),
          dataIndex: "classification"
        },
        {
          title: () => (this.falg ? "职务" : "班级"),
          dataIndex: "team"
        },
        {
          title: "备注",
          dataIndex: "remark"
        },
        {
          title: "身份证号码",
          dataIndex: "idCard"
        },
        {
          title: () => (this.falg ? "联系方式" : "有效期"),
          dataIndex: "expiryDate"
        },
        {
          title: () => (this.falg ? "是否考勤" : "类型"),
          dataIndex: "attendance",
          key: "attendance",
          customRender: text => {
            return text == 1 ? "是" : "否";
          }
        },
        {
          title: "删除",
          key: "del",
          scopedSlots: { customRender: "del" }
        },
        {
          title: "编辑",
          key: "edit",
          scopedSlots: { customRender: "edit" }
        },
        {
          title: "查看",
          key: "look",
          scopedSlots: { customRender: "look" }
        }
      ],
      title: "教师信息",
      isEdit: false
    };
  },
  props: {
    data: Array,
    loading: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          current: 1, //初始页
          pageSize: 10, //分页大小
          total: 0 //数据总数
        };
      }
    },
    falg: {
      type: Boolean
    }
  },
  updated() {
    console.log(this.form.sex);
  },
  methods: {
    // ----------------------------------------------------------------
    //时间格式
    dateFormat,
    // 身份验证
    identity(val) {
      console.log(checkId(val));
      this.checkIds = checkId(val);
      checkId(val);
    },
    showModal(val) {
      console.log(val.id);
      const params = {
        id: val.id
      };
      studentDetail(params).then(res => {
        console.log(res);
        this.form = res.data;
        console.log(this.form.graduationDate);
        // this.form.graduationDate = this.dateFormat(
        //   this.form.graduationDate,
        //   "yyyy-MM-dd"
        // );
        console.log(this.dateFormat(this.form.graduationDate, "yyyy-MM-dd"));
        this.defalg = true;
      });
      this.visible = true;
    },
    handleOk() {
      this.judge = !this.judge;
    },
    handleCancel(e) {
      console.log(e);
      this.defalg = false;
      this.visible = false;
      // this.visible = false;
    },
    // 毕业时间
    onChange(date, dateString) {
      console.log(date, dateString);
      this.form.graduationDate = dateString;
    },
    // 截至时期
    onChange1(date, dateString) {
      console.log(date, dateString);
      this.form.expiryDate = dateString;
    },
    // ----------------------------------------------------------------
    //表格发生变化的时候
    handleTableChange(pagination) {
      console.log(pagination);
      this.$emit("changepage", pagination);
    }
    // del(val){
    // 	console.log(del);
    // },
    // edit(val) {
    // 	console.log(val);
    // },
    // look(val) {
    // 	console.log(val);
    // }
  }
};
</script>

<style lang="less">
tr > td {
  height: 52px;
  padding: 0 10px !important;
}
.ant-modal-footer {
  border-top: 0;
}
.ant-modal-header {
  border-bottom: 0;
}
.ant-table-tbody > tr {
  // padding: 0px;
  height: 10px;
}
.modal {
  display: flex;
  div:nth-child(1) {
    flex: 1;
    img {
      margin-left: 50%;
      transform: translateX(-50%);
      width: 125px;
      height: 125px;
    }
    p {
      padding: 10px 80px 10px 20px;
      color: #352d7d;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
    }
  }
  div:nth-child(2) {
    width: 1px;
    border-left: 1px solid #352c7d;
  }
  div:nth-child(3) {
    flex: 1;
    p:nth-child(1) {
      padding: 0;
      margin-bottom: 10px;
    }
    p:nth-child(6) {
      padding: 0;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    p {
      padding: 10px 80px 10px 40px;
      color: #352d7d;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      img {
        position: relative;
        top: -2px;
        height: 20px;
      }
    }
  }
  .infoTatle {
    display: inline-block;
    margin-left: 20px;
    padding: 0 20px;
    border: 1px solid #352c7d;
    border-radius: 8px;
  }
  .infoTatle1 {
    padding: 0 !important;
  }
}
.ant-modal-footer {
  text-align: center;

  button:nth-child(2) {
    background: #352c7d;
    color: #fff;
  }
  button:nth-child(1) {
    color: #352c7d;
    background: #fff;
  }
  button {
    width: 120px;
    color: #352c7d;
    background: #fff;
    border: 1px solid #352c7d;
  }
}
.ant-modal-footer button + button {
  margin-bottom: 0;
  margin-left: -432px;
}
.a_input {
  border: 0;
  outline: none;
  cursor: not-allowed;
  background: #fff;
}
.b_input {
  background: #dcf5fa;
  border: 0;
  outline: none;
}
.gop {
  // height: 106px;
  padding-top: 0 !important;
  img {
    width: 88px;
    height: 104px !important;
  }
  span {
    flex: 1;
    img {
      height: 80px !important;
    }
  }
}
</style>
