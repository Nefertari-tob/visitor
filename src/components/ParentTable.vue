<!--
 * @Author: Yangliwei
 * @Date: 2020-06-11 10:03:39
 * @LastEditTime: 2020-06-11 10:06:17
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\components\ParentTable.vue
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
export default {
  data() {
    return {
      columns: [
        {
          title: "昵称",
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
          title: "年级",
          dataIndex: "gradeName"
        },

        {
          title: "学院",
          dataIndex: "facultyName"
        },
        {
          title: "班级",
          dataIndex: "majorName"
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
