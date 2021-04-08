<template>
  <a-table
    :columns="columns"
    :pagination="pagination"
    :rowKey="record => record.id"
    :dataSource="data"
    :loading="loading"
    @change="handleTableChange"
    :scroll="{ x: 1100 }"
  >
    <img
      v-lazy="baseurl + avatar"
      class="avatar"
      alt="avatar"
      slot="avatar"
      slot-scope="avatar"
    />
    <img
      v-lazy="baseurl + identPhoto"
      class="avatar"
      alt="identPhoto"
      slot="identPhoto"
      slot-scope="identPhoto"
    />
    <div slot="building" slot-scope="record">
      {{ record.buildingName }} / {{ record.floorName }} /
      {{ record.houseCodeName }}
    </div>
    <div class="flex" slot="action" slot-scope="record">
      <a-popconfirm title="确定删除吗?" @confirm="delItem(record.id)">
        <a-button @click.stop type="danger" size="small">
          删除
        </a-button>
      </a-popconfirm>
      <a-button
        type="primary"
        @click="lookItem(record)"
        class="ml10"
        size="small"
        >查看</a-button
      >
    </div>
  </a-table>
</template>

<script>
import { userType } from "@/data";
export default {
  data() {
    return {
      columns: [
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          scopedSlots: { customRender: "avatar" },
          fixed: "left",
          width: 90
        },
        {
          title: "姓名",
          dataIndex: "name",
          fixed: "left",
          width: 80
        },
        {
          title: "类型",
          dataIndex: "type",
          customRender: text => userType[text]
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
          title: "院系",
          dataIndex: "facultyName"
        },
        {
          title: "班级",
          dataIndex: "majorName"
        },
        {
          title: "人脸照片",
          dataIndex: "identPhoto",
          scopedSlots: { customRender: "identPhoto" }
        },
        {
          title: "住宿校区",
          dataIndex: "campusName"
        },
        {
          title: "组团",
          dataIndex: "groupName"
        },
        {
          title: "楼栋/楼层/房间号",
          scopedSlots: { customRender: "building" },
          key: "building",
          width: 200
        },
        {
          title: "住宿有效期",
          dataIndex: "expiryDate",
          customRender: value => this.moment(value).format("YYYY-MM-DD")
        },
        {
          title: "状态",
          dataIndex: "status"
        }
        // {
        //   title: "操作",
        //   key: "action",
        //   scopedSlots: { customRender: "action" },
        //   fixed: "right"
        // }
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
