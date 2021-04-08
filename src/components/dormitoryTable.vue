<template>
  <a-table
    :columns="columns"
    :pagination="pagination"
    :rowKey="record => record.id"
    :dataSource="data"
    :loading="loading"
    @change="handleTableChange"
  >
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
export default {
  data() {
    return {
      columns: [
        {
          title: "序号",
          customRender: (value, record, index) => {
            return (this.pagination.current - 1) * 10 + (index + 1);
          }
        },
        {
          title: "宿舍号",
          dataIndex: "houseCodeName"
        },
        {
          title: "楼层",
          dataIndex: "floorName"
        },
        {
          title: "楼栋",
          dataIndex: "buildingName"
        },
        {
          title: "类型",
          dataIndex: "groupName"
        },
        {
          title: "校区",
          dataIndex: "campusName"
        },
        {
          title: "居住人数",
          dataIndex: "count"
        },
        {
          title: "宿管人员",
          dataIndex: "managerName"
        },
        {
          title: "状态",
          dataIndex: "full",
          customRender: text => (text ? "满寝" : "未满")
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
