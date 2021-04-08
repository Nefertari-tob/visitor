<!--
 * @Author: Yangliwei
 * @Date: 2020-06-03 14:22:11
 * @LastEditTime: 2020-06-12 16:33:19
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\components\dormitoryManager\buildingTable.vue
 * @Just Think
 * @Description: 
-->
<template>
  <div class="main">
    <div class="between mb10">
      <div class="mainhead ">楼栋信息:{{ managerinfo.name }}</div>
      <a-popover title="关联楼栋" trigger="click" placement="topRight">
        <div slot="content">
          <a-cascader
            :fieldNames="{
              label: 'name',
              value: 'id',
              children: 'children'
            }"
            @change="selectFour"
            style="width: 320px"
            :options="DeviceThreeLevelArr"
            placeholder="校区、组团、楼栋选择"
          />
          <a-button
            :disabled="DeviceLevelValue.length != 3"
            class="ml10"
            type="primary"
            @click="linkbuilding"
            >确定</a-button
          >
        </div>
        <a-button type="primary">关联楼栋</a-button>
      </a-popover>
    </div>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
    >
      <div class="flex" slot="action" slot-scope="record">
        <a-popconfirm title="确定删除吗?" @confirm="del(record.id)">
          <a-button class="ml10" @click.stop type="danger" size="small">
            删除
          </a-button>
        </a-popconfirm>
      </div>
    </a-table>
  </div>
</template>

<script>
import { thirdLevel, bingBuilding, delBind } from "@/api";
export default {
  data() {
    return {
      columns: [
        {
          title: "校区",
          dataIndex: "campusName"
        },
        {
          title: "组团",
          dataIndex: "groupName"
        },
        {
          title: "楼栋",
          dataIndex: "buildingName"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      DeviceThreeLevelArr: [],
      DeviceLevelValue: []
    };
  },
  props: {
    data: Array,
    loading: Boolean,
    managerinfo: Object
  },
  mounted() {
    this.getFour();
  },
  methods: {
    selectFour(value) {
      this.DeviceLevelValue = value;
    },
    getFour() {
      thirdLevel().then(res => {
        this.DeviceThreeLevelArr = [...res.data];
      });
    },
    closeModal() {
      this.showDMangerM = false;
    },
    getData() {
      this.$emit("getData");
    },
    linkbuilding() {
      bingBuilding(this.managerinfo.id, {
        campusId: this.DeviceLevelValue[0],
        groupId: this.DeviceLevelValue[1],
        buildingId: this.DeviceLevelValue[2]
      }).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    },
    del(id) {
      delBind(id).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    }
  }
};
</script>
