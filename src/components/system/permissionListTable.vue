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
      <span slot="usernameList" slot-scope="text">
        <a-tag color="purple" v-for="item in text" :key="item">
          {{ item }}
        </a-tag>
      </span>
      <!-- 菜单和权限 -->
      <span slot="menus" slot-scope="text, record">
        <div v-if="record.isAll">
          <a-tag color="green" style="margin-bottom: 5px;">
            全部
          </a-tag>
        </div>
        <div v-else v-for="item in text" style="display: flex;" :key="item.id">
          <span class="mr10">{{ item.menuName }}</span>
          <div class="permissiondiv">
            <a-tag
              color="blue"
              v-for="item2 in item.permissions"
              style="margin-bottom: 5px;"
              :key="item2.id"
            >
              {{ item2.name }}
            </a-tag>
          </div>
        </div>
      </span>
      <!-- 操作重置 -->
      <div slot="action" slot-scope="text, record">
        <span style="margin-right:10px;">
          <a-button size="small" type="primary" @click="editItem(record)"
            >编辑</a-button
          >
        </span>
        <span>
          <!-- 只有在没有用户的情况下才能删除角色-->
          <a-popconfirm
            title="确定删除吗?"
            @confirm="
              event => {
                delItem(record);
              }
            "
          >
            <a-button @click.stop type="danger" size="small">
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
          title: "角色序号",
          customRender: (text, record, index) => {
            return index + 1;
          }
        },
        {
          title: "角色名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "用户",
          dataIndex: "usernameList",
          scopedSlots: { customRender: "usernameList" },
          key: "usernameList"
        },
        {
          title: "菜单&权限",
          dataIndex: "menus",
          scopedSlots: { customRender: "menus" },
          key: "menus",
          width: 400
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
