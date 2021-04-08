<template>
  <div id="errortable" class=" mr10">
    <div class="between mb10">
      <div class="flex">
        <div class="mainhead ">
          异常头像
        </div>
        <a-select
          style="width: 120px"
          class="round-select ml10"
          placeholder="异常原因"
          size="small"
        >
          <a-select-option
            :value="item.value"
            v-for="item in errorReason"
            :key="item.id"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
      </div>
      <a-button type="info" size="small">下载</a-button>
    </div>
    <a-table
      :columns="columns"
      :pagination="pagination"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
      @change="handleTableChange"
    ></a-table>
  </div>
</template>

<script>
import { errorReason } from "@/data";
import page from "@/mixin/page";
export default {
  mixins: [page],
  data() {
    return {
      errorReason,
      columns: [
        {
          title: "文件名称",
          dataIndex: "name"
        },
        {
          title: "异常原因",
          dataIndex: "reason"
        }
      ],
      data: [],
      loading: false
    };
  },
  methods: {
    getData() {
      //   获取数据
    },
    //表格发生变化的时候
    handleTableChange(pagination) {
      this.pagination = pagination;
    }
  }
};
</script>

<style lang="less">
#errortable {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  width: 350px;
  flex-grow: 1;
  min-width: 300px;
}
</style>
