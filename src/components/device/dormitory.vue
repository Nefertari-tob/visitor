<template>
  <div id="linkdormitory">
    <div class="between mb10">
      <div class="flex">
        <div class="mainhead ">
          关联宿舍
        </div>
      </div>
      <a-button
        :type="state ? 'info' : 'primary'"
        v-if="DeviceLevelValue.length > 2"
        @click="getlink"
        size="small"
        >未关联楼栋</a-button
      >
    </div>
    <a-table
      :columns="columns"
      :pagination="pagination"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
      @change="handleTableChange"
    >
      <div
        class="flex"
        v-if="DeviceLevelValue.length > 2"
        slot="action"
        slot-scope="record"
      >
        <a-popconfirm
          title="确定删除吗?"
          v-if="state"
          @confirm="linkBuildingfunc(record.id, false)"
        >
          <a-button @click.stop type="danger" size="small">
            解除关联
          </a-button>
        </a-popconfirm>
        <a-button
          @click="linkBuildingfunc(record.id, true)"
          size="small"
          v-else
          type="primary"
          >关联</a-button
        >
      </div>
    </a-table>
  </div>
</template>

<script>
import page from "@/mixin/page";
import { Building, linkBuilding } from "@/api";
export default {
  mixins: [page],
  data() {
    return {
      state: true,
      columns: [
        {
          title: "组团",
          dataIndex: "groupName"
        },
        {
          title: "楼栋",
          dataIndex: "name"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      loading: false
    };
  },
  props: {
    DeviceLevelValue: Array
  },
  methods: {
    linkBuildingfunc(buildingId, link) {
      linkBuilding(this.DeviceLevelValue[2], buildingId, link).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    },
    getlink() {
      this.pagination.current = 1;
      this.data = [];
      this.state = !this.state;
      this.getData();
    },
    getData() {
      //   获取数据
      if (this.DeviceLevelValue.length > 2) {
        this.loading = true;
        const getparams = {
          pageNumber: this.pagination.current,
          pageSize: this.pagination.pageSize,
          linked: this.state,
          campusId: this.DeviceLevelValue[0],
          deviceGroupId: this.DeviceLevelValue[2]
        };
        Building(getparams)
          .then(res => {
            this.loading = false;
            this.pagination.total = res.data.total;
            this.data = res.data.list;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.pagination.current = 1;
        this.pagination.total = 0;
        this.data = [];
      }
    },
    //表格发生变化的时候
    handleTableChange(pagination) {
      this.pagination = pagination;
      this.getData();
    }
  }
};
</script>

<style lang="less">
#linkdormitory {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  width: 400px;
}
</style>
