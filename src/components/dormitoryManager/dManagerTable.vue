<template>
  <div class="main" id="dmanagertable">
    <div class="between mb10">
      <div class="mainhead ">
        宿管信息
      </div>
      <a-button type="primary" @click="addDManager">添加宿管</a-button>
    </div>
    <a-table
      :columns="columns"
      :pagination="pagination"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
      @change="handleTableChange"
      :customRow="selectAdmin"
    >
      <div class="flex" slot="action" slot-scope="record">
        <a-button type="primary" @click.stop="edit(record)" size="small"
          >编辑</a-button
        >
        <a-popconfirm title="确定删除吗?" @confirm="delItem(record.id)">
          <a-button class="ml10" @click.stop type="danger" size="small">
            删除
          </a-button>
        </a-popconfirm>
        <a-popconfirm title="确定重置密码吗?" @confirm="resetPWD(record.id)">
          <a-button class="ml10" @click.stop type="danger" size="small">
            重置密码
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          v-if="record.isBind"
          title="确定解绑吗?"
          @confirm="remove(record.id)"
        >
          <a-button class="ml10" @click.stop type="danger" size="small">
            解绑
          </a-button>
        </a-popconfirm>
      </div>
    </a-table>
    <DMangerM
      :visible="showDMangerM"
      :title="title"
      :isEdit="isEdit"
      @closeModal="closeModal"
      @getData="getData"
      ref="DMangerM"
    />
  </div>
</template>

<script>
import DMangerM from "./dManagerM";
import { delDormitoryManager, removeDormitory, resetDormitory } from "@/api";
export default {
  components: {
    DMangerM
  },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "电话",
          dataIndex: "mobile"
        },
        {
          title: "用户名",
          dataIndex: "username"
        },
        {
          title: "状态",
          dataIndex: "isBind",
          customRender: value => {
            return value ? "已绑定" : "未绑定";
          }
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      showDMangerM: false,
      title: "宿管信息",
      isEdit: false,
      selectAdmin: record => ({
        on: {
          click: () => {
            this.clickrow(record);
          }
        }
      })
    };
  },
  props: {
    data: Array,
    loading: Boolean,
    pagination: {
      type: Object,
      default: () => {
        return {
          current: 1, //初始页
          pageSize: 10, //分页大小
          total: 0 //数据总数
        };
      }
    }
  },
  methods: {
    clickrow(record) {
      this.$emit("selectDManager", record);
    },
    closeModal() {
      this.showDMangerM = false;
    },
    getData() {
      this.$emit("getData");
    },
    addDManager() {
      this.title = "添加宿管";
      this.showDMangerM = true;
      this.isEdit = false;
    },
    //表格发生变化的时候
    handleTableChange(pagination) {
      this.$emit("changepage", pagination);
    },
    edit(item) {
      console.log(item);
      this.showDMangerM = true;
      this.title = `编辑${item.name}`;
      this.isEdit = true;
      this.$refs.DMangerM.form = { ...item };
    },
    delItem(id) {
      delDormitoryManager(id).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    },
    resetPWD(id) {
      resetDormitory(id).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    },
    remove(id) {
      console.log(id);
      removeDormitory(id).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    }
  }
};
</script>
<style lang="less">
#dmanagertable {
  .ant-table-tbody > tr {
    cursor: pointer;
  }
}
</style>
