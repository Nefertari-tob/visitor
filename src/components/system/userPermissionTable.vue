<template>
  <div id="table">
    <a-table
      class="table"
      :columns="columns"
      :pagination="pagination"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 角色 -->
      <span slot="role" slot-scope="role">
        <a-tag color="purple">
          {{ role }}
        </a-tag>
      </span>
      <!-- 操作重置 -->
      <div slot="action" slot-scope="text, record">
        <span style="margin-right:10px;">
          <a-button size="small" type="primary" @click="editItem(record)"
            >编辑</a-button
          >
        </span>
        <span>
          <a-popconfirm
            title="确定删除吗?"
            @confirm="
              event => {
                delItem(record);
              }
            "
          >
            <!-- 当前按钮如果是自身登录进来的就不能删除 -->
            <a-button
              @click.stop
              v-if="$store.state.userinfo.admin.id !== record.id"
              type="danger"
              size="small"
            >
              删除
            </a-button>
          </a-popconfirm>
        </span>
      </div>
      <!-- 状态 -->
      <div slot="status" slot-scope="text">
        <p>{{ text === 0 ? "在线" : "异常" }}</p>
      </div>
    </a-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "用户序号",
          customRender: (text, record, index) => {
            return index + 1;
          }
        },
        {
          title: "用户名",
          dataIndex: "username",
          key: "username"
        },
        {
          title: "角色",
          dataIndex: "roleName",
          scopedSlots: { customRender: "role" },
          key: "roleName"
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          customRender: value => {
            return value
              ? this.moment(value).format("YYYY-MM-DD HH:mm:ss")
              : null;
          }
        },
        {
          title: "最近修改",
          dataIndex: "modifyDate",
          customRender: value => {
            return value
              ? this.moment(value).format("YYYY-MM-DD HH:mm:ss")
              : null;
          }
        },
        {
          title: "有效期",
          dataIndex: "expirationDate",
          customRender: value => {
            return value
              ? this.moment(value).format("YYYY-MM-DD HH:mm:ss")
              : null;
          }
        },
        {
          title: "操作",
          key: "7",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  mounted() {},
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
    }
  },
  methods: {
    //表格发生变化的时候
    handleTableChange(pagination) {
      // console.log(pagination);
      this.$emit("changepage", pagination);
    },
    //修改
    editItem(value) {
      this.$emit("editItem", value);
    },
    //删除点击确定
    delItem(value) {
      this.$emit("delItem", value);
    }
  }
};
</script>
