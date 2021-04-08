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
      v-lazy="lateImg + avatar"
      class="avatar"
      alt="avatar"
      slot="avatar"
      slot-scope="avatar"
    />
    <div slot="building" slot-scope="record">
      {{ record.building }} / {{ record.floor }} /
      {{ record.houseCode }}
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="down"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
  </a-table>
</template>

<script>
import config from "../config";
import { listGrade, listFaculty, listMajor, listGroupName } from "@/api/index";
export default {
  data() {
    return {
      lateImg: config.lateImg,
      grade: [],
      faculty: [],
      major: [],
      groupName: [],
      mode: [
        { text: "全部", value: "" },
        { text: "在寝", value: "1" },
        { text: "不在寝", value: "-1" },
        { text: "无状态", value: "0" }
      ],
      params: {
        numberSort: null,
        pagination: null,
        grade: null,
        faculty: null,
        major: null,
        groupName: null,
        mode: null
      }
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
  computed: {
    columns() {
      const column = [
        {
          title: "姓名",
          dataIndex: "name",
          sorter: true
        },
        {
          title: "识别照片",
          dataIndex: "avatar",
          scopedSlots: { customRender: "avatar" }
        },
        {
          title: "抓拍照片",
          dataIndex: "identPhoto",
          scopedSlots: { customRender: "avatar" }
        },
        {
          title: "学号",
          dataIndex: "number",
          sorter: true
        },
        {
          title: "年级",
          dataIndex: "grade",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.grade,
          filterMultiple: false
        },
        {
          title: "院系",
          dataIndex: "faculty",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.faculty,
          filterMultiple: false
        },
        {
          title: "班级",
          dataIndex: "major",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.major,
          filterMultiple: false
        },
        {
          title: "住宿校区",
          dataIndex: "campus"
        },
        {
          title: "组团",
          dataIndex: "groupName",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.groupName,
          filterMultiple: false
        },
        {
          title: "楼栋/楼层/房间号",
          scopedSlots: { customRender: "building" },
          width: 200
        },
        {
          title: "状态",
          dataIndex: "mode",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.mode,
          filterMultiple: false,
          customRender: text => {
            return text == 1 ? "在寝" : "不在寝";
          }
        }
      ];
      return column;
    }
  },
  methods: {
    //表格发生变化的时候
    handleTableChange(pagination, sort, order) {
      if (sort.grade) {
        this.params.grade = sort.grade[0];
      } else {
        this.params.grade = null;
      }

      if (sort.faculty) {
        this.params.faculty = sort.faculty[0];
      } else {
        this.params.faculty = null;
      }

      if (sort.major) {
        this.params.major = sort.major[0];
      } else {
        this.params.major = null;
      }

      if (sort.groupName) {
        this.params.groupName = sort.groupName[0];
      } else {
        this.params.groupName = null;
      }

      if (sort.mode) {
        this.params.mode = sort.mode[0];
      } else {
        this.params.mode = null;
      }

      if (order.order) {
        this.params.numberSort = order.order.replace("end", "");
      } else {
        this.params.numberSort = null;
      }
      this.params.pagination = pagination;
      this.$emit("changepage", this.params);
    },
    handleChange(selectedKeys, dataIndex) {
      console.log(selectedKeys);
      console.log(dataIndex);
    },
    delItem(id) {
      console.log(id);
    },
    lookItem(item) {
      console.log(item);
    },
    getFilters(val, option) {
      for (let i = 0; i < val.length; i++) {
        option.push({
          text: val[i],
          value: val[i]
        });
      }
    },
    getGrade() {
      listGrade()
        .then(res => {
          this.getFilters(res.data, this.grade);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFaculty() {
      listFaculty()
        .then(res => {
          this.getFilters(res.data, this.faculty);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMajor() {
      listMajor()
        .then(res => {
          this.getFilters(res.data, this.major);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGroupName() {
      listGroupName()
        .then(res => {
          this.getFilters(res.data, this.groupName);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getGrade();
    this.getFaculty();
    this.getMajor();
    this.getGroupName();
  }
};
</script>
