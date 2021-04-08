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
      {{ record.user.building }} / {{ record.user.floor }} /
      {{ record.user.houseCode }}
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
      params: {
        numberSort: null,
        pagination: null,
        grade: null,
        groupName: null,
        faculty: null,
        major: null
      },
      grade: [],
      groupName: [],
      faculty: [],
      major: []
    };
  },
  computed: {
    columns() {
      const column = [
        {
          title: "姓名",
          dataIndex: "user.name",
          sorter: true
        },
        {
          title: "抓拍照片",
          dataIndex: "user.avatar",
          scopedSlots: { customRender: "avatar" }
        },
        {
          title: "日期",
          dataIndex: "time"
        },
        {
          title: "学号",
          dataIndex: "user.number",
          sorter: true
        },
        {
          title: "年级",
          dataIndex: "user.grade",
          key: "grade",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.grade,
          filterMultiple: false
        },
        {
          title: "院系",
          dataIndex: "user.faculty",
          key: "faculty",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.faculty,
          filterMultiple: false
        },
        {
          title: "班级",
          dataIndex: "user.major",
          key: "major",
          scopedSlots: { filterIcon: "filterIcon" },
          filters: this.major,
          filterMultiple: false
        },

        {
          title: "住宿校区",
          dataIndex: "user.campus"
        },
        {
          title: "组团",
          dataIndex: "user.groupName",
          key: "groupName",
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
          dataIndex: "user.mode",
          customRender: () => {
            return "晚归";
            // return text == 1 ? "在寝" : "不在寝";
          }
        }
      ];
      return column;
    }
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
    handleTableChange(pagination, sort, order) {
      //排序
      if (order.order) {
        this.params.numberSort = order.order.replace("end", "");
      } else {
        this.params.numberSort = null;
      }
      //年级
      if (sort.grade) {
        this.params.grade = sort.grade[0];
      } else {
        this.params.grade = null;
      }
      //学历
      if (sort.faculty) {
        this.params.faculty = sort.faculty[0];
      } else {
        this.params.faculty = null;
      }
      //班级
      if (sort.major) {
        this.params.major = sort.major[0];
      } else {
        this.params.major = null;
      }
      //团组
      if (sort.groupName) {
        this.params.groupName = sort.groupName[0];
      } else {
        this.params.groupName = null;
      }

      this.params.pagination = pagination;
      console.log(this.params);
      this.$emit("changepage", this.params);
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
    },
    delItem(id) {
      console.log(id);
    },
    lookItem(item) {
      console.log(item);
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
