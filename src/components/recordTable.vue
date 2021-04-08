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
    <img
      v-lazy="baseurl + identifyPhoto"
      class="avatar"
      alt="identifyPhoto"
      slot="identifyPhoto"
      slot-scope="identifyPhoto"
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
          scopedSlots: { customRender: "avatar" }
        },
        {
          title: "抓拍照",
          dataIndex: "identifyPhoto",
          scopedSlots: { customRender: "identifyPhoto" }
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "类型",
          dataIndex: "userType",
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
          title: "识别时间",
          dataIndex: "timestamp",
          customRender: value =>
            this.moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")
        },
        {
          title: "识别设备",
          dataIndex: "deviceName"
        },
        {
          title: "类型",
          dataIndex: "type",
          customRender: text => (text == 1 ? "进门" : "出门")
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
