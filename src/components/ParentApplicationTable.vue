<!--
 * @Author: Yangliwei
 * @Date: 2020-06-11 10:03:39
 * @LastEditTime: 2020-06-15 16:00:14
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\components\ParentApplicationTable.vue
 * @Just Think
 * @Description: 
-->
<template>
  <a-table
    :columns="columns"
    :pagination="pagination"
    :rowKey="record => record.id"
    :dataSource="data"
    :loading="loading"
    @change="handleTableChange"
  >
    <img
      v-lazy="baseurl + avatar"
      class="avatar"
      alt="avatar"
      slot="avatar"
      slot-scope="avatar"
    />
  </a-table>
</template>

<script>
import { parentApplicationState } from "@/data";
export default {
  data() {
    return {
      columns: [
        {
          title: "申请人",
          dataIndex: "name"
        },
        {
          title: "身份",
          dataIndex: "identity"
        },
        {
          title: "标签",
          dataIndex: "label"
        },
        {
          title: "关联学生",
          dataIndex: "childrenName"
        },
        {
          title: "申请时间",
          dataIndex: "createDate",
          customRender: value =>
            this.moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
        {
          title: "审批时间",
          dataIndex: "modifyDate",
          customRender: value =>
            value ? this.moment(value).format("YYYY-MM-DD HH:mm:ss") : ""
        },
        {
          title: "审批状态",
          dataIndex: "status",
          customRender: text => parentApplicationState[text]
        }
      ]
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
    }
  },
  methods: {
    //表格发生变化的时候
    handleTableChange(pagination) {
      // console.log(pagination);
      this.$emit("changepage", pagination);
    },
    delItem(id) {
      console.log(id);
    },
    lookItem(item) {
      console.log(item);
    }
  }
};
</script>
