<!--
 * @Author: Yangliwei
 * @Date: 2020-06-11 10:03:39
 * @LastEditTime: 2020-06-12 11:00:57
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\components\LeaveApplicationTable.vue
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
    :scroll="{ x: 1200 }"
  >
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
          dataIndex: "applicant"
        },
        {
          title: "身份",
          dataIndex: "identity"
        },
        {
          title: "姓名",
          dataIndex: "childrenName"
        },
        {
          title: "学号",
          dataIndex: "number"
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
        },
        {
          title: "请假时间",
          dataIndex: "createDate",
          customRender: text => this.moment(text).format("YYYY-MM-DD")
        },
        {
          title: "请假类型",
          dataIndex: "type"
        },
        {
          title: "请假原因",
          dataIndex: "reason",
          width: 300
        },
        {
          title: "开始时间",
          dataIndex: "startDate",
          customRender: text => this.moment(text).format("YYYY-MM-DD")
        },
        {
          title: "结束时间",
          dataIndex: "endDate",
          customRender: text => this.moment(text).format("YYYY-MM-DD")
        },
        {
          title: "审批状态",
          dataIndex: "status",
          customRender: text => parentApplicationState[text]
        },
        {
          title: "审批人",
          dataIndex: "approver"
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
