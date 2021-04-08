<template>
  <div id="dormitoryinfo">
    <div class="between mb10">
      <div class="flex">
        <div class="mainhead ">
          设备信息
        </div>
      </div>
      <a-button
        type="info"
        @click="addDevice"
        v-if="DeviceLevelValue.length > 2"
        size="small"
        >添加设备</a-button
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
    <DeviceModel
      ref="devicemodel"
      :visible="showDeviceM"
      :title="DeviceMTitle"
      @closeModal="showDeviceM = false"
      @okfunc="
        () => {
          showDeviceM = false;
          getData();
        }
      "
      :isEdit="isEdit"
    />
  </div>
</template>

<script>
import page from "@/mixin/page";
import { device, delDevice } from "@/api";
import DeviceModel from "@/components/device/deviceModel";
export default {
  mixins: [page],
  components: {
    DeviceModel
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          key: "index",
          customRender: (value, record, index) => {
            return (this.pagination.current - 1) * 10 + (index + 1);
          }
        },
        {
          title: "设备名称",
          dataIndex: "name"
        },
        {
          title: "序列号",
          dataIndex: "sn"
        },
        {
          title: "服务器IP",
          dataIndex: "serverIp"
        },
        {
          title: "视频流地址",
          dataIndex: "ipAddress",
          width: 300
        },
        // {
        //   title: "状态",
        //   dataIndex: "state"
        // },
        {
          title: "设备类型",
          dataIndex: "type",
          customRender: text => (text == 1 ? "进门" : "出门")
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      loading: false,
      showDeviceM: false,
      DeviceMTitle: "添加设备",
      isEdit: false
    };
  },
  props: {
    DeviceLevelValue: Array
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //   获取数据
      this.loading = true;
      this.data = [];
      const getparams = {
        pageNumber: this.pagination.current,
        pageSize: this.pagination.pageSize,
        campusId: this.DeviceLevelValue[0],
        deviceAreaId: this.DeviceLevelValue[1],
        deviceGroupId: this.DeviceLevelValue[2]
      };
      device(getparams)
        .then(res => {
          this.loading = false;
          this.pagination.total = res.data.total;
          this.data = res.data.list;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addDevice() {
      this.DeviceMTitle = "添加设备";
      this.isEdit = false;
      this.showDeviceM = true;
    },
    //表格发生变化的时候
    handleTableChange(pagination) {
      this.pagination = pagination;
      this.getData();
    },
    delItem(id) {
      delDevice(id).then(res => {
        this.$message.success(res.msg);
        this.getData();
      });
    },
    lookItem(item) {
      console.log(item);
      this.DeviceMTitle = "查看设备";
      const fromdata = {
        group: [item.campusId, item.deviceAreaId, item.deviceGroupId],
        ...item
      };
      this.isEdit = true;
      this.showDeviceM = true;
      this.$refs.devicemodel.form = { ...fromdata };
    }
  }
};
</script>

<style lang="less">
#dormitoryinfo {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
}
</style>
