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
        v-lazy="baseurl + photo"
        class="avatar"
        alt="photo"
        slot="photo"
        slot-scope="photo"
      />
      <a-button slot="del" style="color: red;border: none;" icon="delete" />
      <a-button slot="edit" icon="edit" style="color: #4199F9;border: none;" />
      <a-button
        @click="showModal"
        slot="look"
        icon="login"
        style="color: #4199F9;border: none;"
      />
    </a-table>
    <a-modal
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
                :class="{ a_input: true, b_input: judge }"
                v-model="form.name"
            /></span>
            <span
              >性别：<input
                style="width: 40px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.sex"
            /></span>
          </p>
          <p>
            <span
              >身份号码：<input
                style="width: 180px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.identity"
            /></span>
          </p>
          <p><span>学 &shy; &shy; &shy; 校：云析实验小学</span></p>
          <p>
            <span
              >年 &shy; &shy; &shy; 级：<input
                style="width: 80px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.grade"
            /></span>
            <span
              >分类：<input
                style="width: 80px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.type"
            /></span>
          </p>
          <p>
            <span
              >班 &shy; &shy; &shy; 级：<input
                style="width: 80px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.squad"
            /></span>
            <span
              >类型：<input
                style="width: 80px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.genre"
            /></span>
          </p>
          <p>
            <span
              >毕业时间：<input
                style="width: 100px"
                :class="{ a_input: true, b_input: judge }"
                v-model="form.graduation"
            /></span>
          </p>
        </div>
        <div></div>
        <div>
          <p>
            <span class="infoTatle">住宿信息</span>
          </p>
          <p>
            <span
              >区 &shy; &shy; &shy; 域：<input
                style="width: 200px"
                :class="{ a_input: true, b_input: judge }"
                value="学生住宿"
            /></span>
          </p>
          <p>
            <span
              >楼 &shy; &shy; &shy; 栋：<input
                style="width: 200px"
                :class="{ a_input: true, b_input: judge }"
                value="学生宿舍一号楼"
            /></span>
          </p>
          <p>
            <span
              >楼 &shy; &shy; &shy; 层：<input
                style="width: 100px"
                :class="{ a_input: true, b_input: judge }"
                value="1层"
            /></span>
            <span
              >房间号：<input
                style="width: 100px"
                :class="{ a_input: true, b_input: judge }"
                value="1102"
            /></span>
          </p>
          <p>
            <span
              >截至时期：<input
                style="width: 200px"
                :class="{ a_input: true, b_input: judge }"
                value="2022-7-15"
            /></span>
          </p>
          <p>
            <span class="infoTatle">关联账号</span>
          </p>
          <p>
            <span>姓名</span> <span>王爸爸</span> <span>联系方式</span
            ><span
              >12345678900 <img src="../../assets/md-phonelink_erase.svg" alt=""
            /></span>
          </p>
          <p>
            <span>姓名</span> <span>王妈妈</span> <span>联系方式</span
            ><span
              >12345678912 <img src="../../assets/md-phonelink_erase.svg" alt=""
            /></span>
          </p>
        </div>
        <!-- 姓名 王爸爸 联系方式 12345678900 姓名 王妈妈 联系方式 12345678912 -->
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ------------------------------------------------------------
      visible: false,
      judge: false,
      form: {
        name: "王可爱",
        sex: "女",
        identity: "341321367801023024",
        school: "云析实验小学",
        grade: "2019级",
        type: "文化生",
        squad: "2班",
        genre: "走读生",
        graduation: "2022-7-15"
      },
      // ------------------------------------------------------------
      columns: [
        {
          title: "照片",
          dataIndex: "picture",
          scopedSlots: { customRender: "photo" }
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: () => (this.falg ? "部门" : "年级"),
          dataIndex: "dept.name"
        },
        {
          title: () => (this.falg ? "分组" : "分类"),
          dataIndex: "part"
        },
        {
          title: () => (this.falg ? "职务" : "班级"),
          dataIndex: "position"
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
          dataIndex: "phone"
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
  methods: {
    // ----------------------------------------------------------------
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.judge = !this.judge;
    },
    handleCancel() {
      this.defalg = false;
      this.visible = false;
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
}
.b_input {
  background: #dcf5fa;
}
</style>
